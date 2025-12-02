import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reportsRouter from "./routes/reports.js";
import authRouter from "./routes/auth.js";
import authorityReportsRouter from "./routes/authorityReports.js";

const app = express(); // app MUST be declared before using it

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/reports", reportsRouter);
app.use("/api/auth", authRouter);
app.use("/api/authority", authorityReportsRouter); // ✅ now safe

// Root route
app.get("/", (req, res) => {
  res.send("✅ SpotnSort Backend Server is Running Successfully!");
});

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/spotnsortDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to Local MongoDB (spotnsortDB)"))
.catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
