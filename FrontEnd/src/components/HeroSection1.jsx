import React, { useEffect, useState } from "react";
import {
  Sprout,
  Users,
  Carrot,
  Milk,
  Award,
  Cog,
  ShieldCheck,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const fetchPosts = async (setPosts) => {
  try {
    const res = await axios.get("http://localhost:3693/api/v1/community/posts");
    if (res.data.success) {
      const posts = res.data.posts.slice(0, 3);
      setPosts(posts);
    }
  } catch (error) {
    toast.error(error.response?.data?.error || error.message);
  }
};

const formatDate = (isoString) => {
  if (!isoString) return "N/A";
  const d = new Date(isoString);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const HeroSection1 = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const products = [
    {
      icon: Sprout,
      title: "Agriculture Products",
      description: "Fresh, locally-sourced produce and grains.",
    },
    {
      icon: Users,
      title: "Professional Farmers",
      description: "Connect with experienced agricultural professionals.",
    },
    {
      icon: Carrot,
      title: "Fresh Vegetables",
      description: "Farm-to-table vegetables, picked daily.",
    },
    {
      icon: Milk,
      title: "Dairy Products",
      description: "High-quality milk, cheese, and yogurt from local farms.",
    },
    {
      icon: Award,
      title: "Quality Products",
      description: "Certified for quality and sustainable practices.",
    },
    {
      icon: Cog,
      title: "Modern Equipment",
      description: "Access to the latest in farming technology and equipment.",
    },
  ];

  const farmers = [
    {
      name: "Jacob Martin",
      title: "Lead Farmer",
      img: "https://placehold.co/300x300/a3e635/ffffff?text=Jacob&font=merriweather",
    },
    {
      name: "Clara Henry",
      title: "Vegetable Expert",
      img: "https://placehold.co/300x300/a3e635/ffffff?text=Clara&font=merriweather",
    },
    {
      name: "Paula Osa",
      title: "Dairy Manager",
      img: "https://placehold.co/300x300/a3e635/ffffff?text=Paula&font=merriweather",
    },
    {
      name: "Clara Hall",
      title: "Organic Specialist",
      img: "https://placehold.co/300x300/a3e635/ffffff?text=Clara&font=merriweather",
    },
    {
      name: "John Doe",
      title: "Equipment Tech",
      img: "https://placehold.co/300x300/a3e635/ffffff?text=John&font=merriweather",
    },
  ];

  const partners = ["RICE", "FARM", "FARM VAY", "FOOD", "ECO HARVEST", "AGRO"];

  useEffect(() => {
    fetchPosts(setPosts);
  }, []);
  return (
    <>
      <section className="relative bg-gradient-to-r from-emerald-900 via-green-800 to-lime-800 py-20 text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <div className="bg-lime-300/30 rounded-full p-4 border-2 border-lime-400">
              <ShieldCheck className="h-12 w-12 text-lime-300" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold ml-4">
              We’re building powerful AI solutions that make farming smarter and
              easier.
            </h2>
          </div>
          <button
            onClick={() => navigate("/add-plot")}
            className="mt-8 md:mt-0 px-8 py-3 rounded-full bg-white text-emerald-700 font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-md inline-flex items-center justify-center"
          >
            Start Now
          </button>
        </div>
      </section>

      {/* ✉️ Quote Form */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-lime-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <img
            src="https://placehold.co/800x1000/a3e635/ffffff?text=Farmer+with+Veggies"
            alt="Farmer"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Get a free quote
            </h2>
            <form className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input-style"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-style"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input-style"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="input-style"
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows="4"
                className="input-style"
              ></textarea>
              <button className="px-8 py-3 rounded-lg bg-emerald-600 text-white font-medium text-lg hover:bg-emerald-700 transition-colors shadow-lg w-full sm:w-auto">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 📰 Latest Posts */}
      <section className="py-16 bg-gradient-to-b from-lime-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
            Latest Posts & Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105"
              >
                <div className="relative">
                  {post.images[0] ? (
                    <img
                      src={post.images[0]}
                      alt="image not available"
                      className="w-full h-56 object-fit"
                    />
                  ) : (
                    <img
                      src={
                        "https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg"
                      }
                      alt="image not available"
                      className="w-full h-56 object-fit"
                    />
                  )}
                </div>
                <div className="p-6 text-left">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                    <p>{post.farmer.name}</p>
                  </h3>
                  <p
                    onClick={() => navigate("/blog-home")}
                    className="inline-flex items-center mt-4 font-medium text-emerald-600 hover:text-emerald-800 cursor-pointer"
                  >
                    Read More <ArrowRight className="h-4 w-4 ml-2" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection1;
