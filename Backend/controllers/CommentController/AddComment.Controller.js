import Comment from "../../models/Comment.Model.js";
import Post from "../../models/Post.Model.js";

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const farmerId = req.user?._id;
    const { text } = req.body;

    if (!farmerId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ success: false, message: "Post not found" });

    if (!text || text.trim() === "")
      return res.status(400).json({
        success: false,
        message: "Comment text cannot be empty",
      });

    const comment = await Comment.create({
      post: postId,
      farmer: farmerId,
      text,
      parent: null,
    });

    post.comments.push(comment._id);
    await post.save();

    const populated = await comment.populate("farmer");

    return res.status(201).json({
      success: true,
      message: "Comment added",
      comment: populated,
    });
  } catch (error) {
    console.error("addComment error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
