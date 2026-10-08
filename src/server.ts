import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB, { disconnectFromMongoDB } from "./config/db";
import storiesRouter from "./routes/stories";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 5000;

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

// Story routes
app.use("/api/stories", storiesRouter);

// Test route
app.get("/", (_req, res) => {
  res.json({
    message: "OurStories Backend is running",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is running",
  });
});

const startServer = async (): Promise<void> => {
  await connectDB();

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });

  const shutdown = async (): Promise<void> => {
    try {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
      await disconnectFromMongoDB();
      console.log("MongoDB connection closed");
    } catch (error) {
      console.error("Error during server shutdown:", error);
      process.exitCode = 1;
    }
  };

  process.once("SIGINT", () => void shutdown());
  process.once("SIGTERM", () => void shutdown());
};

void startServer().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exitCode = 1;
});