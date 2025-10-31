import jwt from "jsonwebtoken";
import Farmer from "../models/Farmer.Model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1] || req.headers.accessToken || req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Access token missing." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Farmer.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(404).json({ success: false, message: "Farmer not found." });
    }
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired access token." });
  }
};
