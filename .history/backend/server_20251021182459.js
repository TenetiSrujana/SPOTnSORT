import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/auth.js";
import reportsRouter from "./routes/reports.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/spotnsortDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/reports", reportsRouter);

// Root route
app.get("/", (req, res) => res.send("✅ SpotnSort Backend Running!"));

const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
