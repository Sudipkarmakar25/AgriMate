import Post from "../../models/Post.Model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const farmerId = req.user?._id;
    const { text } = req.body;

    if (!farmerId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    if (!text || text.trim() === "")
      return res
        .status(400)
        .json({ success: false, message: "Post text is required" });

    const imageUrls = [];

    console.log("REQ FILES:", req.files);
    console.log("REQ BODY:", req.body);

    if (req.files && req.files.length > 0) {
      console.log("Total images received:", req.files.length);

      for (const file of req.files) {
        const uploaded = await uploadOnCloudinary(file.path);

        if (uploaded?.secure_url) {
          imageUrls.push(uploaded.secure_url);
        }
      }
    }

    const post = await Post.create({
      farmer: farmerId,
      text,
      images: imageUrls,
    });

    const populated = await post.populate("farmer");

    return res.status(201).json({
      success: true,
      message: "Post created",
      post: populated,
    });
  } catch (error) {
    console.error("createPost error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
