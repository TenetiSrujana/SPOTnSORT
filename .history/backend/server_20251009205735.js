import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reportsRouter from "./routes/reports.js"; // make sure extension is .js

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/spotnsort", {
  useNewUrlParser: true,
  useUnifiedTopology: trues
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

app.use("/api/reports", reportsRouter);

app.listen(5001, () => console.log("Server running on http://localhost:5001"));
