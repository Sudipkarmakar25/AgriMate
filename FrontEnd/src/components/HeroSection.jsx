import React from "react";
import {
  Leaf,
  Bug,
  Wind,
  TrendingUp,
  Check,
  CalendarCheck,
  UserCheck,
  Ruler,
  Users,
} from "lucide-react";
import { crop, farming, tractor } from "../assets/index.js";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Leaf, title: "Crop Advisory", href: "/advisory" },
    { icon: Bug, title: "Pest Detection", href: "/pest-detection" },
    { icon: Wind, title: "Weather", href: "/weather" },
    {
      icon: TrendingUp,
      title: "Govt.Schemes",
      href: "https://www.myscheme.gov.in/search/category/Agriculture,Rural%20&%20Environment",
    },
  ];

  function FeatureCard({ icon, title, href }) {
    const Icon = icon;
    if (title === "Govt.Schemes") {
      return (
        <a
          href={href}
          target="_blank"
          className="flex flex-col items-center text-center p-4 group transition-all duration-300 hover:scale-105"
        >
          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300">
            <Icon className="h-14 w-14 text-emerald-600 group-hover:text-emerald-500 transition-all duration-300" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-5 group-hover:text-emerald-700 transition-all">
            {title}
          </h3>
        </a>
      );
    }
    return (
      <a
        onClick={() => navigate(href)}
        className="flex flex-col items-center text-center p-4 group transition-all duration-300 hover:scale-105"
      >
        <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300">
          <Icon className="h-14 w-14 text-emerald-600 group-hover:text-emerald-500 transition-all duration-300" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-5 group-hover:text-emerald-700 transition-all">
          {title}
        </h3>
      </a>
    );
  }

  const steps = [
    {
      icon: CalendarCheck,
      step: "Step 01",
      title: "Add Your Plot",
      description:
        "Start by adding your farmland details including crop type, area, soil type and location.",
    },
    {
      icon: UserCheck,
      step: "Step 02",
      title: "Get Daily Advisory",
      description:
        "Receive AI-powered advisory for your crop based on weather, soil and growth conditions.",
    },
    {
      icon: Ruler,
      step: "Step 03",
      title: "Check Plot Weather",
      description:
        "See accurate weather predictions like rainfall, humidity, wind and temperature for your plot location.",
    },
    {
      icon: Bug,
      step: "Step 04",
      title: "Detect Crop Pest",
      description:
        "Upload a crop image and detect pest or disease instantly with suggested remedies.",
    },
    {
      icon: Users,
      step: "Step 05",
      title: "Farmer Community",
      description:
        "Share your experience and learn from other farmers through the community forum.",
    },
  ];

  return (
    <div className="font-sans">
      {/* HERO SECTION */}
      <header
        className="relative bg-cover bg-center h-[70vh] sm:h-[80vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${crop})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
        <div className="relative z-10 text-center px-4 sm:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Empowering Farmers with Smart Agriculture Solutions
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
            Get personalized crop advice, real-time weather updates, soil health
            insights, and pest detection — all in one place to help you grow
            better and smarter.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/add-plot")}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-lg shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/blog-home")}
             className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-lg shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105"
            >
              Farmer Community
            </button>
          </div>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="bg-gradient-to-b from-white to-emerald-50 py-16 sm:py-24 px-6 sm:px-10 overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-14">
          Our Best Agricultural Services
        </h2>

        <div className="relative w-full overflow-hidden">
          <div className="flex gap-8 animate-train-loop">
            {features.map(
              (
                feature,
                index // duplicate for smooth loop
              ) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  href={feature.href}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* COMMITMENT SECTION */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-emerald-100 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden md:flex">
            {/* Image */}
            <div className="md:w-1/2">
              <img
                className="h-64 w-full object-cover md:h-full"
                src={tractor}
                alt="Organic farm"
              />
            </div>

            {/* Text */}
            <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                Our Values
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
                We're Committed to Caring
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                We are dedicated to providing farmers with the most accurate,
                reliable, and accessible agricultural advice to foster
                sustainable and profitable farming.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  {
                    title: "Sustainable Practices",
                    text: "Promoting eco-friendly farming methods.",
                  },
                  {
                    title: "High-Quality Resources",
                    text: "Curated advice from agricultural experts.",
                  },
                  {
                    title: "Organic Farming",
                    text: "Special focus on natural and organic solutions.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start">
                    <Check className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                    <p className="ml-3 text-gray-700">
                      <span className="font-semibold">{item.title}:</span>{" "}
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DEVELOPMENT SECTION */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-teal-900 via-teal-800 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Text + Image */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Agriculture Matters to the Future of Development
              </h2>
              <p className="mt-6 text-gray-200 text-lg leading-relaxed">
                We provide smart solutions to connect farmers with experts,
                ensuring sustainable growth and development for future
                generations.
              </p>
              <img
                className="mt-8 rounded-3xl shadow-2xl w-full object-cover h-80 sm:h-96"
                src={farming}
                alt="Farmers in field"
              />
            </div>

            {/* Steps */}
            <div className="space-y-10">
              {steps.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex bg-white/10 p-4 rounded-2xl hover:bg-white/15 transition-all"
                  >
                    <div className="flex-shrink-0 mr-6">
                      <Icon className="h-10 w-10 text-emerald-300" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-emerald-200 uppercase tracking-wider">
                        {item.step}
                      </span>
                      <h3 className="text-xl font-semibold text-white mt-1">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-gray-200">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
