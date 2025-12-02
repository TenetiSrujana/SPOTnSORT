import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reportsRouter from "./routes/reports.js";
import authRouter from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// MongoDB Atlas connection
mongoose.connect(
  "mongodb+srv://spotnsport:spotnsort@myatlasclusteredu.ffju8.mongodb.net/spotnsort?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/reports", reportsRouter);
app.use("/api/auth", authRouter);

// Start server
app.listen(5001, () => console.log("Server running on http://localhost:5001"));
