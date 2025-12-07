import Comment from "../../models/Comment.Model.js";
import Post from "../../models/Post.Model.js";

// Recursively delete all child comments
const deleteChildrenRecursively = async (commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) return;

  for (const childId of comment.children) {
    await deleteChildrenRecursively(childId);
  }

  await Comment.findByIdAndDelete(commentId);
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const farmerId = req.user?._id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Try to get the post (may be null if deleted)
    const post = await Post.findById(comment.post);

    const isCommentOwner = comment.farmer.toString() === farmerId.toString();
    const isPostOwner = post ? post.farmer.toString() === farmerId.toString() : false;

    // If the post is deleted, only comment owner can delete
    if (!post && !isCommentOwner) {
      return res.status(403).json({
        success: false,
        message: "Post no longer exists — only comment owner can delete this comment",
      });
    }

    // Normal permission check
    if (!isCommentOwner && !isPostOwner) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to delete this comment",
      });
    }

    // Remove reference from post or parent comment
    if (comment.parent === null) {
      // Remove top-level comment from post
      if (post) {
        await Post.findByIdAndUpdate(comment.post, {
          $pull: { comments: commentId },
        });
      }
    } else {
      // Remove from parent comment's children
      await Comment.findByIdAndUpdate(comment.parent, {
        $pull: { children: commentId },
      });
    }

    // Delete the comment and its nested replies
    await deleteChildrenRecursively(commentId);

    return res.json({
      success: true,
      message: "Comment & nested replies deleted",
    });

  } catch (error) {
    console.error("deleteComment error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
