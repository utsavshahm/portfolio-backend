import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes/route.js";
import mongoose from "mongoose";

const app = express();
dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.REACT_APP_MONGO_URL);
    return db;
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    throw error;
  }
};

const startServer = async () => {
  try {
    const myDatabase = await connectDB();
    const db = mongoose.connection;
    const contactCollection = db.collection("contact");

    app.locals.contactCollection = contactCollection;

    app.use(cors());
    app.options("*", cors());

    app.use(express.json());

    // Import and use the router
    app.use("/", router);

    const port = process.env.PORT || 3001; // Use PORT from environment or default to 5000
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}!`);
    });
  } catch (error) {
    console.log("Error occurred:", error);
    throw error;
  }
};

startServer();
