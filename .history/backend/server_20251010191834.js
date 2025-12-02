import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reportsRouter from "./routes/reports.js";
import authRouter from "./routes/auth.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ Local MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/spotnsortDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to Local MongoDB (spotnsortDB)"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Routes
app.use("/api/reports", reportsRouter);
app.use("/api/auth", authRouter);

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
