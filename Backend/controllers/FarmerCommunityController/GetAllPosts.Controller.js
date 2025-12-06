import Post from "../../models/Post.Model.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("farmer")
      .populate({
        path: "comments",
        populate: [
          { path: "farmer" },
          { path: "replies.farmer" },
        ],
      })
      .sort({ createdAt: -1 });

    return res.json({ success: true, posts });
  } catch (error) {
    console.error("getAllPosts error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
