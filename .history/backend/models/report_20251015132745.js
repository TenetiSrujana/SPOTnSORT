import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
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
  status: { type: String, default: "Pending" },
  comment: String,
  scheduledAt: Date,
  resolvedPic: String,
  userRating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Report", reportSchema);
