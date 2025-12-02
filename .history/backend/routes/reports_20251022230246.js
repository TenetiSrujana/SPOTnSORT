import express from "express";
import {
  createReport,
  getReports,
  updateReport,
  getReportsByAuthority
} from "../controllers/reportController.js";
router.put("/:id/rating", updateReportRating);

const router = express.Router();

// User submits report
router.post("/", createReport);

// Get all reports
router.get("/", getReports);

// Authority updates report
router.put("/:id", updateReport);

// Get reports assigned to a specific authority
router.get("/authority/:email", getReportsByAuthority);

export default router;
