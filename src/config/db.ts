import mongoose from "mongoose";
import { isIP } from "node:net";

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined");
  }

  if (/[<>]/.test(mongoURI)) {
    throw new Error(
      "MONGO_URI contains placeholder values. Replace them with your Atlas connection details."
    );
  }

  let mongoHost: string;
  try {
    mongoHost = new URL(mongoURI).hostname
      .toLowerCase()
      .replace(/^\[|\]$/g, "");
  } catch {
    throw new Error("MONGO_URI is not a valid MongoDB connection URI.");
  }

  const isLoopbackAddress =
    mongoHost === "localhost" ||
    mongoHost.endsWith(".localhost") ||
    (isIP(mongoHost) === 4 && Number(mongoHost.split(".")[0]) === 127) ||
    mongoHost === "::1";

  if (isLoopbackAddress) {
    throw new Error(
      "MONGO_URI points to a local MongoDB server. Set the Railway service variable to your MongoDB Atlas connection URI."
    );
  }

  const authority = mongoURI.split("://")[1]?.split(/[/?#]/, 1)[0] ?? "";
  const atSignCount = (authority.match(/@/g) ?? []).length;

  if (atSignCount > 1) {
    throw new Error(
      "MONGO_URI contains an unescaped @ in the username or password. URL-encode reserved credential characters (for example, @ as %40)."
    );
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      dbName: "ourStories",
    });

    console.log(`MongoDB Connected: ${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export const disconnectFromMongoDB = async (): Promise<void> => {
  await mongoose.disconnect();
};

export default connectDB;