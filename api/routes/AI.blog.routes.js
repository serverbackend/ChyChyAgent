import express from "express";
import dotenv from "dotenv";
import {
  generateAiBlog,
  generateAiIdeas,
} from "../controllers/AI.blog.controller.js";
import { adminRoute, protectedRoute } from "../middlewares/auth.middleware.js";

dotenv.config();

const router = express.Router();

// Public routes - accessible without authentication
router.post("/generate", generateAiBlog);
router.post("/ideas", generateAiIdeas);

// Protected routes - require authentication
router.post("/admin/generate", protectedRoute, generateAiBlog);
router.post("/admin/ideas", protectedRoute, generateAiIdeas);

// Admin-only routes
router.post("/admin/advanced/generate", adminRoute, generateAiBlog);
router.post("/admin/advanced/ideas", adminRoute, generateAiIdeas);

export default router;
