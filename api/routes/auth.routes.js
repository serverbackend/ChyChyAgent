import express from "express";
import {
  getProfile,
  login,
  logout,
  refreshToken,
  signup,
  uploadProfileImage,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = express.Router();
// signup routes
router.post("/signup", signup);
// login routes
router.post("/login", login);
// logout routes
router.post("/logout", logout);
// get profile routes
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
