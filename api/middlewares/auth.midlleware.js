import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import CustomError from "../utils/CustomError.js";

export const adminRoute = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  throw new CustomError("Access denied - Admin Only", 403);
};

export const protectedRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw new CustomError("Unauthorized - No access token provided.", 401);
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        throw new CustomError("User not found", 401);
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new CustomError("Unauthorized - Access token expired", 401);
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    throw new CustomError("Unauthorized - Invalid access token", 401);
  }
};
