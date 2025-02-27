import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  try {
      await mongoose.connect(MONGODB_URI);
      console.log("Database connected successfully");
  } catch (error) {
      console.error("Database connection error:", error);
      process.exit(1);
  }
}