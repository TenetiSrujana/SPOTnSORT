import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  // User info
  userEmail: { type: String, required: true },
  name: String,
  phone: String,

  // Report info
  problem: { type: String, required: true },
  subtype: { type: String, required: true },
  priority: String,
  description: { type: String, required: true },
  area: { type: String, required: true },
  lat: Number,
  lng: Number,
  photo: String,

  // Status & authority info
  status: { type: String, default: "Pending" },
  authorityName: String,        // Name of authority handling
  authorityEmail: String,       // Email of authority handling
  comment: String,              // Authority comment
  scheduledAt: Date,            // Scheduled completion
  estimatedDays: Number,        // Estimated completion days
  resolvedPic: String,          // Photo uploaded by authority

  // User rating
  userRating: { type: Number, default: 0 },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Report", reportSchema);
