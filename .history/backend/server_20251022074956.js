import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reportsRouter from "./routes/reports.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/spotnsortDB")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.use("/api/reports", reportsRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("✅ SpotnSort Backend Server Running");
});

app.listen(5001, () => console.log("🚀 Server running on http://localhost:5001"));
