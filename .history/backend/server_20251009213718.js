import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reportsRouter from "./routes/reports.js"; // your reports routes
// import authRouter from "./routes/auth.js"; // uncomment if you have auth

import Report from "./models/report.js"; // import Report model for test route

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/spotnsort", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// 🌟 Health check route
app.get("/", (req, res) => {
  res.send("SpotnSort backend is running 🚀");
});

// 🌟 Test route to view all reports in JSON
app.get("/api/reports/test", async (req, res) => {
  try {
    const reports = await Report.find({});
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// Routes
app.use("/api/reports", reportsRouter);
// app.use("/api/auth", authRouter); // uncomment if you have auth

// Start server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
