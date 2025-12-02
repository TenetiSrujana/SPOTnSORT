import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userEmail: { type: String, required: true },
  name: String,
  problem: String,
  subtype: String,
  priority: String,
  description: String,
  area: String,
  lat: Number,
  lng: Number,
  photo: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },

  // NEW FIELDS
  scheduleDate: Date,
  estimatedDays: Number,
  scheduledAt: Date, // when authority scheduled
  completionPhoto: String,
  resolvedAt: Date,
});

export default mongoose.model("Report", reportSchema);
