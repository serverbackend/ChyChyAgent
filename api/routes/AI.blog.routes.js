import express from "express";
import dotenv from "dotenv";
import {
  generateAiBlog,
  generateAiIdeas,
} from "../controllers/AI.blog.controller.js";

dotenv.config();

const router = express.Router();

// Generate Blog Content
router.post("/generate", generateAiBlog);

// Generate Blog Ideas
router.post("/ideas", generateAiIdeas);

export default router;
