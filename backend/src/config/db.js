import dotenv from "dotenv"
dotenv.config({path:'./.env'})
import mongoose from "mongoose"

const  main=async()=> {
    try {
      await mongoose.connect(`${process.env.Mongo_Url}`);
      console.log("✅ MongoDB connected successfully");
      // Start server only after DB connect
    } catch (err) {
      console.error("❌ MongoDB connection error:", err);
    }
  }
  export {main}