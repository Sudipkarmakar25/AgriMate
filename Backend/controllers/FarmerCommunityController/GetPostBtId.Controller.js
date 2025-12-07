import Post from "../../models/Post.Model.js";
import Comment from "../../models/Comment.Model.js";

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    // STEP 1: Load post with its farmer
    const post = await Post.findById(postId)
      .populate("farmer")
      .lean(); // makes data faster and cleaner

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comments = await Comment.find({ post: postId })
      .populate("farmer")
      .populate("children")
      .lean();
    const commentMap = new Map();
    comments.forEach((c) => commentMap.set(c._id.toString(), c));

    const rootComments = [];

    comments.forEach((comment) => {
      if (comment.parent) {
        const parent = commentMap.get(comment.parent.toString());
        if (parent) {
          if (!parent.childrenData) parent.childrenData = [];
          parent.childrenData.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    post.comments = rootComments;

    return res.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("getPostById error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
