// backend/models/AuthorityReport.js
import mongoose from "mongoose";

const authorityReportSchema = new mongoose.Schema({
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: "Report", required: true },
  authorityName: { type: String, required: true },
  authorityEmail: { type: String, required: true },
  department: { type: String, required: true },
  assignedAt: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" }, // Pending, In Progress, Resolved
  notes: { type: String },
});

export default mongoose.model("AuthorityReport", authorityReportSchema);
