import React from "react";
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

const HeroSection1 = () => {
  const products = [
    { icon: Sprout, title: "Agriculture Products", description: "Fresh, locally-sourced produce and grains." },
    { icon: Users, title: "Professional Farmers", description: "Connect with experienced agricultural professionals." },
    { icon: Carrot, title: "Fresh Vegetables", description: "Farm-to-table vegetables, picked daily." },
    { icon: Milk, title: "Dairy Products", description: "High-quality milk, cheese, and yogurt from local farms." },
    { icon: Award, title: "Quality Products", description: "Certified for quality and sustainable practices." },
    { icon: Cog, title: "Modern Equipment", description: "Access to the latest in farming technology and equipment." },
  ];

  const farmers = [
    { name: "Jacob Martin", title: "Lead Farmer", img: "https://placehold.co/300x300/a3e635/ffffff?text=Jacob&font=merriweather" },
    { name: "Clara Henry", title: "Vegetable Expert", img: "https://placehold.co/300x300/a3e635/ffffff?text=Clara&font=merriweather" },
    { name: "Paula Osa", title: "Dairy Manager", img: "https://placehold.co/300x300/a3e635/ffffff?text=Paula&font=merriweather" },
    { name: "Clara Hall", title: "Organic Specialist", img: "https://placehold.co/300x300/a3e635/ffffff?text=Clara&font=merriweather" },
    { name: "John Doe", title: "Equipment Tech", img: "https://placehold.co/300x300/a3e635/ffffff?text=John&font=merriweather" },
  ];

  const partners = ["RICE", "FARM", "FARM VAY", "FOOD", "ECO HARVEST", "AGRO"];

  const posts = [
    { 
      img: "https://placehold.co/600x400/a3e635/ffffff?text=Vertical+Farming&font=merriweather",
      category: "Farming",
      date: "Oct 28, 2025",
      title: "What technology is used in vertical farming?",
    },
    { 
      img: "https://placehold.co/600x400/5a6a4a/ffffff?text=Modern+Farming&font=merriweather",
      category: "Technology",
      date: "Oct 27, 2025",
      title: "Which type of farming is more prevalent today?",
    },
    { 
      img: "https://placehold.co/600x400/9ca3af/ffffff?text=Farm+Animal&font=merriweather",
      category: "Animals",
      date: "Oct 26, 2025",
      title: "The Farmtory Sentiment Defies(n) Hopes Fade",
    },
  ];

  return (
    <>
      {/* 🌾 Products Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-lime-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12">
            Anyone Can Make Eco-Friendly Products From Scratch
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {products.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-gray-500 border-2"
                >
                  <div className="bg-lime-100 w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4">
                    <Icon className="h-8 w-8 text-lime-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🌱 Banner Section */}
      <section
        className="relative bg-gradient-to-r from-emerald-900 via-green-800 to-lime-800 py-20 text-white"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <div className="bg-lime-300/30 rounded-full p-4 border-2 border-lime-400">
              <ShieldCheck className="h-12 w-12 text-lime-300" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold ml-4">
              We're global leaders in the agriculture market
            </h2>
          </div>
          <a
            href="#"
            className="mt-8 md:mt-0 px-8 py-3 rounded-full bg-white text-emerald-700 font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-md"
          >
            Discover More
          </a>
        </div>
      </section>

      {/* 👨‍🌾 Farmers Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Meet The Farmers</h2>
          <div className="flex overflow-x-auto space-x-8 pb-4 scrollbar-hide">
            {farmers.map((farmer) => (
              <div
                key={farmer.name}
                className="flex-shrink-0 w-56 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={farmer.img}
                  alt={farmer.name}
                  className="w-40 h-40 rounded-full mx-auto object-cover shadow-md"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{farmer.name}</h3>
                <p className="text-emerald-600 text-sm">{farmer.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌾 Partners */}
      <section className="py-14 bg-gradient-to-r from-lime-300 via-white to-emerald-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner) => (
              <span
                key={partner}
                className="text-2xl sm:text-3xl font-bold text-gray-400 hover:text-emerald-700 transition-all duration-300"
                style={{ fontFamily: "Merriweather, serif" }}
              >
                {partner}
              </span>
            ))}
          </div>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Get a free quote</h2>
            <form className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name" className="input-style" />
                <input type="email" placeholder="Email Address" className="input-style" />
                <input type="tel" placeholder="Phone Number" className="input-style" />
                <input type="text" placeholder="Subject" className="input-style" />
              </div>
              <textarea placeholder="Your Message" rows="4" className="input-style"></textarea>
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
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Latest Posts & Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.title} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105">
                <div className="relative">
                  <img src={post.img} alt={post.title} className="w-full h-56 object-cover" />
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 text-left">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                    <a href="#">{post.title}</a>
                  </h3>
                  <a href="#" className="inline-flex items-center mt-4 font-medium text-emerald-600 hover:text-emerald-800">
                    Read More <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
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
