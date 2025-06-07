import { create } from "zustand";
import axios from "../utils/axios";
import { toast } from "react-toastify";

export const useBlogStore = create((set) => ({
  blogs: [],
  loading: false,

  setBlogs: (blogs) => set({ blogs }),

  createBlog: async ({
    title,
    slug,
    description,
    content,
    image,
    tags,
    category,
  }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/blog", {
        title,
        slug,
        description,
        content,
        image,
        tags,
        category,
      });
      set((prevState) => ({
        blogs: [...prevState.blogs, res.data],
        loading: false,
      }));
      toast.success(res.data.message || "Blog created successfully");
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },
  getAllBlog: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/blog");
      set({ blogs: res.data.blogs, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch Blogs", loading: false });
      toast.error(
        blogs.length === 0
          ? "No Blogs found"
          : error.response.data.error || "Failed to fetch Blogs"
      );
    }
  },
  // get by id (single blog)
  getById: async (blogId) => {
    try {
      const res = await axios.get(`/blog/${blogId}`);
      set({ blog: res.data.blog, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch single Blog", loading: false });
      toast.error(error.response.data.error || "Failed to fetch single Blogs");
    }
  },
  deleteBlog: async (id) => {
    try {
      const res = await axios.delete(`/blog/delete/${id}`);
      set((prevState) => ({
        blogs: prevState.blogs.filter((blog) => blog._id !== id),
      }));
      toast.success(res.data.message || "Blog deleted successfully");
    } catch (error) {
      set({ error: "Failed to delete Blog", loading: false });
      toast.error(error.response.data.error || "Failed to delete Blog");
    }
  },
  toggleFeaturedBlog: async (id) => {
    try {
      const res = await axios.patch(`/blog/${id}`);
      // this will update the isFeatured prop of the blog
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === id
            ? { ...product, isFeatured: res.data.isFeatured }
            : product
        ),
        loading: false,
      }));
      toast.success(res.data.message || "Featured status toggled successfully");
    } catch (error) {
      set({ error: "Failed to toggle featured status", loading: false });
      toast.error(
        error.response.data.error || "Failed to toggle featured status"
      );
    }
  },
  editBlog: async (id, blogData = {}) => {
    try {
      if (!id || Object.keys(blogData).length === 0) {
        throw new Error("Invalid blog data provided");
      }

      const res = await axios.patch(`/blog/edit/${id}`, blogData);

      set((prevState) => ({
        blog: prevState.blog.map((b) => (b.id === id ? res.data.blog : b)),
        loading: false,
      }));

      toast.success(res.data.message || "Blog Edited successfully");
    } catch (error) {
      set({ error: "Failed to Edit Blog", loading: false });
      toast.error(error.response?.data?.error || "Failed to Edit Blog");
    }
  },
}));
