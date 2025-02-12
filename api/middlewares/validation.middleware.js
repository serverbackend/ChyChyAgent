import { body, validationResult } from "express-validator";

export const validateBlog = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("image").notEmpty().withMessage("Image URL is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("tags").isArray().withMessage("Tags must be an array"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
