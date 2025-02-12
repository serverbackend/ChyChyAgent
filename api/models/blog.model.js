import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    author: { type: String, required: true },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create a slug from the title before saving
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
