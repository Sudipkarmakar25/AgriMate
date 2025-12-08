import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Share2,
  MessageCircle,
  User,
  Send,
  Trash2,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const formatDate = (isoString) => {
  if (!isoString) return "N/A";
  const d = new Date(isoString);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const fetchPost = async ({ id, setPost }) => {
  try {
    const res = await axios.get(
      `http://localhost:3693/api/v1/community/post/${id}`
    );
    if (res.data.success) {
      setPost(res.data.post);
    }
  } catch (error) {
    toast.error(error.response?.data?.error || error.message);
  }
};

const renderPostText = (text) => {
  if (!text) return null;
  // Split into paragraphs on blank lines or single line breaks
  return text
    .split(/\n{2,}|\r\n\r\n|\n/g)
    .filter((p) => p.trim().length > 0)
    .map((para, idx) => (
      <p
        key={idx}
        className="mb-3 text-base leading-relaxed text-gray-800 whitespace-pre-wrap"
      >
        {para.trim()}
      </p>
    ));
};

export default function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (id) fetchPost({ id, setPost });
  }, [id]);

  const handleShare = async () => {
    if (!post) return;
    const url = window.location.href;
    const title = post.text?.slice(0, 80) || "AgriMate Blog Post";

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: post.text,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch (err) {
      // User cancel → no toast needed
      if (err?.name !== "AbortError") {
        console.error(err);
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:3693/api/v1/community/comment/${id}`,
        { text: newComment.trim() },
        { withCredentials: true }
      );

      if (res.data.success) {
        setNewComment("");
        fetchPost({ id, setPost });
      } else {
        toast.error(res.data.message || "Failed to add comment");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const handlePostDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3693/api/v1/community/post/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Post Deleted Successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const handleCommentDelete = async (e,commentId)=>{
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:3693/api/v1/community/comment/${commentId}`,{withCredentials:true});
      if(res.data.success){
        toast.success("Comment Deleted Successfully");
        fetchPost({ id, setPost });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  }

  if (post.length == 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        <h1 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
          Blog
        </h1>

        <div className="flex items-center gap-2">
          {/* SHARE BUTTON */}
          <button
            onClick={handleShare}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
          >
            <Share2 className="h-6 w-6" />
          </button>

          {/* DELETE BUTTON (only if user owns post) */}

          <button
            onClick={() => handlePostDelete(id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto pb-12">
        {/* AUTHOR & DATE */}
        <div className="px-4 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              {post.farmer?.name || "Farmer"}
            </p>
            <p className="text-xs text-gray-500">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        {/* FEATURED IMAGE */}
        <div className="w-full aspect-video flex items-center justify-center bg-gray-100 overflow-hidden">
          <img
            src={
              post.images?.[0]
                ? post.images[0]
                : "https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg"
            }
            alt="Blog"
            className="w-full h-full object-cover"
          />
        </div>

        {/* TITLE & CONTENT */}
        <article className="px-4 py-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
            {post.text?.length > 80
              ? post.text.slice(0, 80) + "..."
              : post.text}
          </h1>
          {renderPostText(post.text)}
        </article>

        {/* COMMENTS SECTION */}
        <section className="border-t border-gray-100 mt-4">
          <div className="px-4 py-4 bg-gray-50">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Comments ({post.comments.length})
            </h3>

            {/* Comment Input */}
            <form className="flex gap-3 mb-6" onSubmit={handleCommentSubmit}>
              <div className="h-8 w-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                <User className="h-4 w-4 text-green-700" />
              </div>
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white text-sm"
                  placeholder="Add a comment..."
                />
                <button
                  onClick={handleCommentSubmit}
                  className="absolute right-2 top-1.5 p-1 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-4">
              {post.comments.length === 0 && (
                <p className="text-xs text-gray-500">
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}

              {post.comments.map((com, index) => {
                const name = com?.farmer?.name || "Farmer";
                const initials = name
                  .split(" ")
                  .filter(Boolean)
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();

                return (
                  <div
                    key={com._id || index}
                    className="flex gap-3 items-start w-full"
                  >
                    {/* Avatar */}
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-blue-700">
                      {initials}
                    </div>

                    {/* Comment Box */}
                    <div className="flex-1 bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-200 relative">
                      {/* Name + Date + Delete */}
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-gray-900 text-xs">
                            {name}
                          </p>
                          <p className="text-gray-400 text-[11px]">
                            {formatDate(com.createdAt)}
                          </p>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => handleCommentDelete(e,com._id)}
                          className="text-red-500 text-xs hover:text-red-700 ml-2 hover:bg-gray-300 rounded-full p-1"
                        >
                          Delete
                        </button>
                      </div>

                      {/* Comment Text */}
                      <p className="text-gray-700 whitespace-pre-wrap text-sm mt-2">
                        {com.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
