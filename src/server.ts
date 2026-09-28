import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./config/db";
import storyRoutes from "./routes/stories";
import adminStoryRoutes from "./routes/adminStories";
dotenv.config();

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
connectDB();

// Routes
app.use("/api/stories", storyRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "PocketFM Backend is running",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});