// backend/models/AuthorityReport.js
import mongoose from "mongoose";

const authorityReportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: String,
  reportType: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("AuthorityReport", authorityReportSchema, "authorityreport");
