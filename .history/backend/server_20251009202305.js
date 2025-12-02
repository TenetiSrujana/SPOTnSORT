import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import reportsRouter from "./routes/reports.js";
import authorityRouter from "./routes/authority.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/spotnsort", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/reports", reportsRouter);
app.use("/api/authority", authorityRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
