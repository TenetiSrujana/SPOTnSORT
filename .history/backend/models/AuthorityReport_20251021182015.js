import mongoose from "mongoose";

const authorityReportSchema = new mongoose.Schema({
  authorityEmail: { type: String, required: true },
  name: String,
  role: { type: String, default: "authority" },
  assignedReports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }], // reports assigned
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("AuthorityReport", authorityReportSchema);
