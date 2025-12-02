const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const userRoutes = require("./routes/user");
const authorityRoutes = require("./routes/authority");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded files

// Routes
app.use("/api/reports", userRoutes);
app.use("/api/authority/reports", authorityRoutes);

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
