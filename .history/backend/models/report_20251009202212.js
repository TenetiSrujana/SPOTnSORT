import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  problem: { type: String, required: true },
  subtype: { type: String },
  description: { type: String },
  area: { type: String, required: true },
  priority: { type: String, default: "Normal" },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  photo: { type: String },

  // Authority actions
  scheduleDate: { type: Date },
  estimatedDays: { type: Number },
  completionPhoto: { type: String },

  createdAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date },
});

export default mongoose.model("Report", reportSchema);
