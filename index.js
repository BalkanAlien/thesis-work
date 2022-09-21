import "dotenv/config"; //loads environment variables
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { getAllCannedMessages } from "./modules/export/export.controller.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://0.0.0.0:27017/testdb");

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database connection established!");
});

app.use(express.json()); //recognize incoming request as JSON object

app.route("/export").get(getAllCannedMessages);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
