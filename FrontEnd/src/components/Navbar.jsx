import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Mic,
  Plus,
  User,
  LogOut,
  Settings,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Navbar = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navLinks = [
    { href: "#", label: "Crop Advisory" },
    { href: "#", label: "Soil Health" },
    { href: "#", label: "Pest Detection" },
    { href: "#", label: "Weather" },
    { href: "#", label: "Market Prices" },
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "hi", label: "हिन्दी" },
    { value: "bn", label: "বাংলা" },
    { value: "te", label: "తెలుగు" },
    { value: "mr", label: "मराठी" },
    { value: "ta", label: "தமிழ்" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    navigate("/");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-emerald-400 to-teal-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold tracking-tight">
            AgriMate
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-semibold bg-white/15 hover:scale-105 transition"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white/20 hover:scale-105 transition">
              <Mic className="h-6 w-6" />
            </button>

            {/* Profile */}
            {authStatus ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-2 rounded-full bg-white/15 hover:scale-105 transition"
                >
                  <User className="h-6 w-6" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white text-gray-800 rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => navigate("/add-plot")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Plot
                    </button>
                    <button
                      onClick={() => navigate("/get-all-plots")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" /> My Plots
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <User className="w-4 h-4 mr-2" /> Profile
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </button>
                    <div className="border-t my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/farmer-registration")}
                className="px-3 py-2 rounded-md text-sm font-semibold bg-white/15 hover:scale-105 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-white/20 hover:scale-105 transition"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Mobile Dropdown Menu (Proper Placement) */}
      {isMenuOpen && (
        <div className="md:hidden bg-emerald-700/95 px-4 py-4 space-y-3 transition-all">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base text-green-50 hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}

          <div className="border-t border-white/20 my-2" />

          {/* Language Selector */}
          <div className="flex justify-between items-center">
            <button className="p-2 rounded-full bg-white/20 hover:scale-105 transition">
              <Mic className="h-5 w-5" />
            </button>
          </div>

          <div className="border-t border-white/20 my-2" />

          {/* Auth Buttons */}
          {authStatus ? (
            <>
              <button
                onClick={() => navigate("/")}
                className="flex items-center w-full px-3 py-2 text-white hover:bg-white/10"
              >
                <User className="w-4 h-4 mr-2" /> Profile
              </button>
              <button
                onClick={() => navigate("/add-plot")}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Plot
              </button>
              <button
                onClick={() => navigate("/get-all-plots")}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                <ArrowRight className="w-4 h-4 mr-2" /> My Plots
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex items-center w-full px-3 py-2 text-white hover:bg-white/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-red-300 hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/farmer-registration")}
              className="w-full px-3 py-2 rounded-md font-semibold bg-white/15 hover:scale-105 transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
