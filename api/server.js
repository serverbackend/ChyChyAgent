import express from "express";
import donenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./libs/db.js";

// imported Routes
import authRoute from "./routes/auth.routes.js";
import blogRoute from "./routes/blog.routes.js";
import aiBlogRoute from "./routes/AI.blog.routes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
donenv.config();

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/Aiblog", aiBlogRoute);

// custom middlewares
app.use(errorMiddleware);

// Port
const PORT = process.env.PORT || 5000;

// Server Running
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDB();
});
