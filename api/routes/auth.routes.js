import express from "express";
import {
  getProfile,
  login,
  logout,
  refreshToken,
  signup,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.midlleware.js";

const router = express.Router();
// signup routes
router.get("/signup", signup);
// login routes
router.get("/login", login);
// logout routes
router.get("/logout", logout);
// get profile routes
router.get("/profile", protectedRoute, getProfile);
// refresh token routes
router.get("/refresh-token", refreshToken);

export default router;
