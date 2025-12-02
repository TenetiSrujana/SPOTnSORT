import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reportsRouter from "./routes/reports.js";
import authRouter from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

// --- MongoDB Atlas connection ---
const atlasURI = "mongodb+srv://spotnsport:spotnsort@myatlasclusteredu.ffju8.mongodb.net/spotnsort?retryWrites=true&w=majority&appName=myAtlasClusterEDU";

mongoose.connect(atlasURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.log("MongoDB Atlas connection error:", err));

// --- Routes ---
app.use("/api/reports", reportsRouter);
app.use("/api/auth", authRouter);

// --- Root test route ---
app.get("/", (req, res) => {
  res.send("SpotnSort backend is running 🚀");
});

// --- Start server ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
