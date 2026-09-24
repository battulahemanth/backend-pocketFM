import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import connectDB from "./config/db";
import storyRoutes from "./routes/storyRoutes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Increase request size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Test API
app.get("/", (req, res) => {
  res.json({
    message: "Backend Connected Successfully",
  });
});

// Story API
app.use("/api/stories", storyRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});