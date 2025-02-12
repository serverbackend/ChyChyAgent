import User from "../models/user.model.js";
import CustomError from "../utils/CustomError.js";
import cloudinary from "../libs/cloudinary.js";
import generateTokens from "../utils/generateToken.js";
import storeRefreshToken from "../utils/storeRefreshToken.js";
import setCookies from "../utils/setCookies.js";
import { redis } from "../libs/redis.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { email, password, name, image } = req.body;
  try {
    // check if the user exsist
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new CustomError("User already exists", 400);
    }

    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "chychyAdmin_images",
      });
    }

    const user = await User.create({
      email,
      password,
      name,
      image: cloudinaryResponse?.secure_url,
    });

    // authenticate user
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    next(error); // passing the error to middleware
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparedPassword(password))) {
      throw new CustomError("Invalid Credentials", 401);
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    // Set Cookies
    setCookies(res, accessToken, refreshToken);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    next(error); // pass the error to middleware
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_token:${decode.userId}`);
    }

    res.clearCookies("accessToken");
    res.clearCookies("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    next(error);
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log("Error in getProfile controller", error.message);
    next(error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new CustomError("No refresh token provided", 401);
    }
    const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storeToken = await redis.get(`refresh_token:${decode.userId}`);

    if (storeToken !== refreshToken) {
      throw new CustomError("Invalid refresh token", 401);
    }

    const accessToken = jwt.sign(
      { userId: decode.userId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true, // prevent xss attacks cross site scripting (xss attack)
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // prevent csrf attacks  cross site request forgery (csrf attack)
      maxAge: 30 * 60 * 1000, // 30 minutes
    });
    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error in refreshToken controller", error.message);
    next(error);
  }
};
