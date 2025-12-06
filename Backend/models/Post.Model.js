// models/Post.Model.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    farmer: {
      type: Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String, // store image URL or relative path (e.g. /uploads/abc.jpg)
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
