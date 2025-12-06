import Comment from "../../models/Comment.Model.js";

export const replyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const farmerId = req.farmer?._id;
    const { text } = req.body;

    if (!farmerId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    if (!text || text.trim() === "")
      return res.status(400).json({
        success: false,
        message: "Reply text cannot be empty",
      });

    const parentComment = await Comment.findById(commentId);
    if (!parentComment)
      return res.status(404).json({
        success: false,
        message: "Parent comment not found",
      });

    const reply = await Comment.create({
      post: parentComment.post,
      farmer: farmerId,
      text,
      parent: commentId,
    });

    parentComment.children.push(reply._id);
    await parentComment.save();

    const populatedReply = await reply.populate("farmer");

    return res.status(201).json({
      success: true,
      message: "Reply added",
      reply: populatedReply,
    });
  } catch (error) {
    console.error("replyToComment error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
