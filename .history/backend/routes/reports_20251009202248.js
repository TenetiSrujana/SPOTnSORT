import express from "express";
import { createReport, getAllReports, getUserReports } from "../controllers/reportController.js";

const router = express.Router();

// Create report
router.post("/", createReport);

// Get all reports (for admin / map)
router.get("/", getAllReports);

// Get reports for a specific user
router.get("/user/:email", getUserReports);

export default router;
