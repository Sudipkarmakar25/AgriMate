import Comment from "../../models/Comment.Model.js";
import Post from "../../models/Post.Model.js";

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
    const farmerId = req.farmer?._id;

    const comment = await Comment.findById(commentId);
    if (!comment)
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });

    const post = await Post.findById(comment.post);

    const isCommentOwner = comment.farmer.toString() === farmerId.toString();
    const isPostOwner = post.farmer.toString() === farmerId.toString();

    if (!isCommentOwner && !isPostOwner) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to delete this comment",
      });
    }

 
    if (comment.parent === null) {
      await Post.findByIdAndUpdate(comment.post, {
        $pull: { comments: commentId },
      });
    }
   
    else {
      await Comment.findByIdAndUpdate(comment.parent, {
        $pull: { children: commentId },
      });
    }

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
