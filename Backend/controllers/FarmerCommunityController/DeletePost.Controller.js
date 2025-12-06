// controllers/post/deletePost.js
import Post from "../../models/Post.Model.js";
import Comment from "../../models/Comment.Model.js";

/** Recursive delete for nested comments */
const deleteChildrenRecursively = async (commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) return;

  for (const childId of comment.children) {
    await deleteChildrenRecursively(childId);
  }

  await Comment.findByIdAndDelete(commentId);
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const farmerId = req.user?._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.farmer.toString() !== farmerId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to delete this post",
      });
    }

    // Delete all comments with nested replies
    const comments = await Comment.find({ post: postId });

    for (const comment of comments) {
      await deleteChildrenRecursively(comment._id);
    }

    // Delete the post itself
    await Post.findByIdAndDelete(postId);

    return res.json({
      success: true,
      message: "Post and all nested comments deleted",
    });
  } catch (error) {
    console.error("deletePost error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
