import express from 'express'
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors'
import {router} from "./route.js";

const app = express();

app.use(cors());
dotenv.config(); 
const client = new MongoClient(process.env.REACT_APP_MONGO_URL);
const port = process.env.REACT_APP_PORT || 3001;

client.connect((err) => {
    if (err) {
        console.log("DB connection failed:", err);
        return;
    }
    console.log("DB connection successful!");
})

  const db = client.db("portfolio");
  const contactCollection = db.collection("contact");

  // Make the contact collection available to the router
  app.locals.contactCollection = contactCollection;

  // Use the cors middleware
    app.use(cors());
    app.options("*", cors());


  // Use JSON body parser middleware
    app.use(express.json());

  // Import and use the router
  app.use("/", router);

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
  });