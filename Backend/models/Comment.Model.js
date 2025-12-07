// models/Comment.Model.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

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

    // NEW: Parent comment for nested replies
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    // NEW: Child comments (replies)
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
