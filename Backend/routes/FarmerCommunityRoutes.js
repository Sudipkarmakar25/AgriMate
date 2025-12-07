import { Router } from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";

// Post controllers
import { createPost } from "../controllers/FarmerCommunityController/CreatePost.Controller.js";
import { deletePost } from "../controllers/FarmerCommunityController/DeletePost.Controller.js";
import { getAllPosts } from "../controllers/FarmerCommunityController/GetAllPosts.Controller.js";
import { getPostById } from "../controllers/FarmerCommunityController/GetPostBtId.Controller.js";

// Comment controllers
import { addComment } from "../controllers/CommentController/AddComment.Controller.js";
import { deleteComment } from "../controllers/CommentController/DeleteComment.Controller.js";
import { replyToComment } from "../controllers/CommentController/ReplyComment.Controller.js";

// File upload middleware (multer)
import { upload } from "../utils/uploadImage.js";

const FarmerCommunityRouter = Router();

/* ------------------------------ POSTS ------------------------------ */

// Create new post
FarmerCommunityRouter.post(
  "/post",

  (req, res, next) => {
    console.log("🔥 BEFORE AUTH HEADERS:", req.headers["content-type"]);
    next();
  },

  authMiddleware,

  (req, res, next) => {
    console.log("🔥 BEFORE MULTER — req.files:", req.files);
    next();
  },

  upload.array("images", 5),

  (req, res, next) => {
    console.log("🔥 AFTER MULTER — req.files:", req.files);
    next();
  },

  createPost
);



// Get all posts
FarmerCommunityRouter.get("/posts", getAllPosts);

// Get a specific post
FarmerCommunityRouter.get("/post/:postId", getPostById);

// Delete a post
FarmerCommunityRouter.delete("/post/:postId", authMiddleware, deletePost);


/* ----------------------------- COMMENTS ----------------------------- */

// Add a new comment to a post
FarmerCommunityRouter.post(
  "/comment/:postId",
  authMiddleware,
  addComment
);

// Reply to a specific comment (nested)
FarmerCommunityRouter.post(
  "/reply/:commentId",
  authMiddleware,
  replyToComment
);

// Delete a comment (supports nested tree delete)
FarmerCommunityRouter.delete(
  "/comment/:commentId",
  authMiddleware,
  deleteComment
);


/* --------------------------- EXPORT ROUTER -------------------------- */

export default FarmerCommunityRouter;
