// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reportsRouter from "./routes/reports.js";
import authRouter from "./routes/auth.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ Connect to local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/spotnsortDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to Local MongoDB (spotnsortDB)"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/reports", reportsRouter);
app.use("/api/auth", authRouter);

// Root route
app.get("/", (req, res) => {
  res.send("✅ SpotnSort Backend Server is Running Successfully!");
});

// Start Server
const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
