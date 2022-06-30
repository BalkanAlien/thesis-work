import express from "express";
import 'dotenv/config';
import { getAllCannedMessages } from "./modules/export/export.controller.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.route("/export").get(getAllCannedMessages);

app.listen(port);