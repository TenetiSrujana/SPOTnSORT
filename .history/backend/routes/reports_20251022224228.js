import express from "express";
import { createReport, getReports, updateReport, addRating } from "../controllers/reportController.js";

const router = express.Router();

// Create new report
router.post("/", createReport);

// Get all reports
router.get("/", getReports);

// Update report (authority updates)
router.put("/:id", updateReport);

// Add user rating
router.put("/:id/rating", addRating);

export default router;
