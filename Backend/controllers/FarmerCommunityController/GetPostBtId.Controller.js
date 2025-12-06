import Post from "../../models/Post.Model.js";

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate("farmer")
      .populate({
        path: "comments",
        populate: [
          { path: "farmer" },
          { path: "replies.farmer" },
        ],
      });

    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    return res.json({ success: true, post });
  } catch (error) {
    console.error("getPostById error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
