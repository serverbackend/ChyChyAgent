import express from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlogByCategory,
  getFeaturedBlogs,
  getSingleBlog,
  toggleFeaturedBlog,
} from "../controllers/blog.controller.js";
import { adminRoute, protectedRoute } from "../middlewares/auth.middleware.js";
import { validateBlog } from "../middlewares/validation.middleware.js";

const router = express.Router();

// Admin routes
router.post("/", protectedRoute, adminRoute, validateBlog, createBlog);
router.patch("/:id", protectedRoute, adminRoute, toggleFeaturedBlog);
router.patch("/edit/:id", protectedRoute, adminRoute, validateBlog, editBlog);
router.delete("/delete/:id", protectedRoute, adminRoute, deleteBlog);

// Users routes
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.get("/category/:category", getBlogByCategory);
router.get("/recommendations", getFeaturedBlogs);

export default router;
