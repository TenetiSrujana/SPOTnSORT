import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reportsRouter from "./routes/reports.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/spotnsort");

app.use("/api/reports", reportsRouter);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
