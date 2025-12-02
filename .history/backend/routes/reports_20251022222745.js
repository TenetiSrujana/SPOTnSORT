import express from "express";
import { createReport, getReports } from "../controllers/reportController.js";

const router = express.Router();

// POST /api/reports
router.post("/", createReport);

// GET /api/reports
router.get("/", getReports);

export default router;
