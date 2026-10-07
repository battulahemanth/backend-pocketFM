import mongoose from "mongoose";

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