import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";
import storyRoutes from "./routes/storyRoutes";

dotenv.config();

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());

// Allow larger JSON requests
app.use(express.json({ limit: "50mb" }));

// Allow larger URL-encoded requests
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

// MongoDB
connectDB();

// Story routes
app.use("/api/stories", storyRoutes);

// Test route
app.get("/", (_req, res) => {
  res.json({
    message: "PocketFM Backend is running",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});