import mongoose from "mongoose";

let isConnected = false; // cache connection state

export const connectDB = async () => {
  if (isConnected) {
    // already connected, reuse existing connection
    return;
  }

  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined");
    throw new Error("MONGO_URI is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);

    throw err;
  }
};
