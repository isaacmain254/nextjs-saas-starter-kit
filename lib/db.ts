import mongoose, { Connection } from "mongoose";

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(String(process.env.MONGODB_URI));

    return conn;
  } catch (e) {
    throw new Error(String(e));
  }
}
