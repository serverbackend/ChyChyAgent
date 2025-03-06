import express from "express";
import dotenv from "dotenv";
import {
  generateAiBlog,
  generateAiIdeas,
} from "../controllers/AI.blog.controller.js";
import { adminRoute, protectedRoute } from "../middlewares/auth.middleware.js";

dotenv.config();

const router = express.Router();

// Generate Blog Content
router.post("/generate", adminRoute, protectedRoute, generateAiBlog);

// Generate Blog Ideas
router.post("/ideas", adminRoute, protectedRoute, generateAiIdeas);

export default router;
