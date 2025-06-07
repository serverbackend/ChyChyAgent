import express from "express";
import {
  getProfile,
  login,
  logout,
  refreshToken,
  signup,
  uploadProfileImage,
  useOauth,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import multer from "multer";
import passport from "../libs/passport.js";

const router = express.Router();
// signup routes
router.post("/signup", signup);
// login routes
router.post("/login", login);
// logout routes
router.post("/logout", logout);
// get profile routes

// Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: false,
  }),
  useOauth
);
router.get("/profile", protectedRoute, getProfile);
// refresh token routes
router.post("/refresh-token", refreshToken);
// upload profile image
// Configure Multer to store file in memory
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload-image",
  protectedRoute,
  upload.single("file"),
  uploadProfileImage
);

export default router;
