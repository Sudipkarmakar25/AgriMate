import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Home,
  Leaf,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login,logout } from "../store/authSlice.js";

const InputGroup = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
  icon: Icon,
  rightIcon,
  onRightIconClick,
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-gray-800 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      {/* Left Icon */}
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="h-5 w-5 text-green-500" aria-hidden="true" />
      </span>

      {/* Input */}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-gray-700 transition-all duration-300"
      />

      {/* Right Icon (Eye / EyeOff) */}
      {rightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-green-600 transition"
        >
          {rightIcon}
        </button>
      )}
    </div>
  </div>
);

const FarmerRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setFarmerName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [authType, setAuthType] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (authType === "signup") {
        if(password!==confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        const formData = { name, email, phonenumber, password, address };
        const response = await axios.post(
          "http://localhost:3693/api/v1/farmer/register",
          formData,
          { withCredentials: true }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          setFarmerName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setConfirmPassword("");
          setAddress("");
          setAuthType("signin")
        } else {
          toast.error(response.data.message);
        }
      } else {
        const formData = { phonenumber, password };
        const response = await axios.post(
          "http://localhost:3693/api/v1/farmer/login",
          formData,
          { withCredentials: true }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          setFarmerName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setConfirmPassword("");
          setAddress("");
          dispatch(login());
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
        console.log(error);
        
      toast.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-green-100 p-6 sm:p-10 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center text-green-600 hover:text-green-700 transition"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="text-center mt-6 sm:mt-0 mb-8">
          <div className="flex justify-center items-center space-x-2">
            <Leaf className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            {authType === "signup"
              ? "Register as a Farmer"
              : "Sign in as a Farmer"}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {authType === "signup"
              ? "Join our community and grow with us"
              : "Welcome back!"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {authType === "signup" && (
            <>
              {" "}
              <InputGroup
                label="Full Name"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder="e.g., Amit chowdhury"
                icon={User}
              />
              <InputGroup
                label="Email Address"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                icon={Mail}
              />
            </>
          )}

          <InputGroup
            label="Phone Number"
            id="phonenumber"
            type="tel"
            value={phonenumber}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 **********"
            icon={Phone}
          />

          {/* Password Field with Show/Hide */}
          <InputGroup
            label="Password"
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={Lock}
            rightIcon={showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            onRightIconClick={() => setShowPassword(!showPassword)}
          />

          {/* Confirm Password */}
          {authType === "signup" && (
            <InputGroup
              label="Confirm Password"
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
              rightIcon={
                showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />
              }
              onRightIconClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />
          )}

          {/* Address Field */}
          {authType === "signup" && (
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-800 mb-1"
              >
                Address
              </label>
              <div className="relative">
                <span className="absolute top-3.5 left-0 flex items-center pl-3">
                  <Home className="h-5 w-5 text-green-500" aria-hidden="true" />
                </span>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your farm or home address"
                  required={authType === "signup"}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-gray-700 transition-all duration-300"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {authType === "signup" ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Toggle Signup/Signin */}
        {authType === "signup" ? (
          <p className="mt-8 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <button
              onClick={() => setAuthType("signin")}
              className="font-medium text-green-600 hover:text-green-500 transition cursor-pointer"
            >
              Sign in
            </button>
          </p>
        ) : (
          <p className="mt-8 text-center text-sm text-gray-700">
            Create new account?{" "}
            <button
              onClick={() => setAuthType("signup")}
              className="font-medium text-green-600 hover:text-green-500 transition cursor-pointer"
            >
              Sign up
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default FarmerRegistration;
