import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  // User info
  userEmail: { type: String, required: true },
  name: String,
  phone: String,
  problem: { type: String, required: true },
  subtype: { type: String, required: true },
  priority: String,
  description: { type: String, required: true },
  area: { type: String, required: true },
  lat: Number,
  lng: Number,
  photo: String,
  userRating: { type: Number, default: 0 },

  // Authority info
  authorityName: String,
  authorityEmail: String,
  comment: String,
  scheduledAt: Date,
  estimatedDays: Number,
  resolvedPic: String, // uploaded image by authority
  status: { type: String, default: "Pending" },

  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export default mongoose.model("Report", reportSchema);
