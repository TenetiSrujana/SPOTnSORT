import express from "express";
import { scheduleReport, completeReport } from "../controllers/authorityController.js";

const router = express.Router();

// Schedule work (In Progress)
router.put("/schedule/:id", scheduleReport);

// Complete work
router.put("/complete/:id", completeReport);

export default router;
