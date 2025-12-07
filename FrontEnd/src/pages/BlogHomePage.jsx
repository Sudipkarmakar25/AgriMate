import React, { useEffect, useState } from "react";
import {
  Calendar,
  User,
  ArrowRight,
  TrendingUp,
  Sprout,
  X,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const formatDate = (isoString) => {
  if (!isoString) return "N/A";
  const d = new Date(isoString);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const fetchPosts = async (setPosts) => {
  try {
    const res = await axios.get("http://localhost:3693/api/v1/community/posts");
    if (res.data.success) {
      setPosts(res.data.posts);
      console.log(res.data.posts);
    }
  } catch (error) {
    toast.error(error.response?.data?.error || error.message);
  }
};

export default function BlogHomePage() {
  const [posts, setPosts] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [blogText, setBlogText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const authStatus = useSelector((state) => state.auth.status);

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  useEffect(() => {
    fetchPosts(setPosts);
  }, []);

  // 👉 1️⃣ If no posts found (loading or empty)
  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lime-50">
        <div className="text-center">
          <Sprout className="h-14 w-14 text-green-600 mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-gray-800">No posts yet</h2>
          <p className="text-gray-500 mt-1">
            Farmers will start sharing their experience soon.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("text", blogText);
      if (imageFile) {
        formData.append("images", imageFile);
      }

      const res = await axios.post(
        "http://localhost:3693/api/v1/community/post",
        formData,
        {
          withCredentials: true,
        }
      );      

      if(res.data.success){
        toast.success("Blog posted successfully");
      setIsAddOpen(false);
      setBlogText("");
      setImageFile(null);
      setPreview(null);
      fetchPosts(setPosts);
      }
    } catch (error) {
        console.log(error);
        
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 👉 2️⃣ When posts exist
  return (
    <div className="min-h-screen bg-lime-50 font-sans relative">
      {/* 1. HERO SECTION */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4 tracking-wide uppercase">
                Farmer&apos;s Knowledge Hub
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Cultivating Ideas for{" "}
                <span className="text-green-600">Better Growth</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Expert advice, latest market trends, and practical farming tips
                delivered straight to your screen.
              </p>
            </div>

            {/* Add Blog Button */}
            <div className="text-center sm:text-right">
              {authStatus && <button
                onClick={() => setIsAddOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-colors"
              >
                + Add Blog
              </button>}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 2. FEATURED POST */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-600" />
            Featured Article
          </h2>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/2 bg-green-50 relative min-h-[300px] flex items-center justify-center overflow-hidden">
                <img
                  src={
                    featuredPost.images[0]
                      ? featuredPost.images[0]
                      : "https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg"
                  }
                />
              </div>
              <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(featuredPost.createdAt)}</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight feature-title">
                  {featuredPost.text}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {featuredPost.farmer.name}
                    </span>
                  </div>
                  <button className="flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors">
                    Read Article <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. RECENT POSTS GRID */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Articles
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
            >
              {/* Card Image */}
              <div className="h-48 flex items-center justify-center relative overflow-hidden">
                <img
                  src={
                    post.images[0]
                      ? post.images[0]
                      : "https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg"
                  }
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                  {post.text}
                </h3>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <div className="text-xs font-medium text-gray-500 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.farmer.name}
                  </div>
                  <button className="text-green-600 hover:text-green-800 text-sm font-semibold flex items-center gap-1">
                    Read <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Add Blog Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setIsAddOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Add New Blog
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Text
                </label>
                <textarea
                  value={blogText}
                  onChange={(e) => setBlogText(e.target.value)}
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="Share your farming experience, tips or story..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {preview && (
                <div className="mt-2">
                  <img
                    src={preview}
                    className="w-full h-48 object-cover rounded-lg"
                    alt="preview"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
                >
                  Post Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
