import Post from "../../models/Post.Model.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("farmer")
      .populate({
        path: "comments",
        match: { parent: null }, // only fetch root-level comments
        populate: [
          { path: "farmer" },
          {
            path: "children",
            populate: [
              { path: "farmer" },
              {
                path: "children",
                populate: [
                  { path: "farmer" },
                  {
                    path: "children",
                    populate: { path: "farmer" } // supports 3-level nested replies
                  }
                ]
              }
            ]
          }
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
