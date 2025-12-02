import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reportsRouter from "./routes/reports.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/spotnsortDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB (spotnsortDB)"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/reports", reportsRouter);

// Root route
app.get("/", (req, res) => {
  res.send("✅ SpotnSort Backend Server is Running Successfully!");
});

// Start server
const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
