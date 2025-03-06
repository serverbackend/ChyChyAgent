import Blog from "../models/Blog.model.js";
import CustomError from "../utils/CustomError.js";

// Create a new blog post
export const createBlog = async (req, res, next) => {
  try {
    const { title, slug, description, content, image, tags, category } =
      req.body;
    const author = req.user.name; // Get author from protectedRoute

    if (!author) {
      throw new CustomError("Unauthorized: Author not found", 401);
    }

    const newBlog = new Blog({
      title,
      slug,
      description,
      content,
      image,
      author,
      tags,
      category,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    next(error);
  }
};

// Delete a blog post
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      throw new CustomError("Blog not found", 404);
    }

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Edit a blog post
export const editBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, content, image, tags, category } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, content, image, tags, category },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      throw new CustomError("Blog not found", 404);
    }

    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    next(error);
  }
};

// Toggle featured status of a blog post
export const toggleFeaturedBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      throw new CustomError("Blog not found", 404);
    }

    blog.isFeatured = !blog.isFeatured;
    await blog.save();

    res.status(200).json({ message: "Blog featured status updated", blog });
  } catch (error) {
    next(error);
  }
};

// Get all blogs
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    if (!blogs.length) {
      throw new CustomError("No blogs found", 404);
    }

    res.status(200).json({ blogs });
  } catch (error) {
    next(error);
  }
};

// Get a single blog post
export const getSingleBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      throw new CustomError("Blog not found", 404);
    }

    res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
};

// Get blogs by category
export const getBlogByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const blogs = await Blog.find({ category });

    if (!blogs.length) {
      throw new CustomError(`No blogs found in category: ${category}`, 404);
    }

    res.status(200).json({ blogs });
  } catch (error) {
    next(error);
  }
};

// Get featured blogs
export const getFeaturedBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ isFeatured: true });

    if (!blogs.length) {
      throw new CustomError("No featured blogs found", 404);
    }

    res.status(200).json({ blogs });
  } catch (error) {
    next(error);
  }
};
