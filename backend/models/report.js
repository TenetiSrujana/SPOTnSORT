import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  userEmail: String,
  name: String,
  phone: String,
  problem: String,
  subtype: String,
  priority: String,
  description: String,
  area: String,
  lat: Number,
  lng: Number,
  photo: String,
  status: { type: String, default: "Pending" },
  comment: String,
  scheduledAt: Date,
  estimatedDays: Number,
  resolvedPic: String,
  userRating: { type: Number, default: 0 },

  // 👇 NEW nested authority info field
  authorityInfo: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    email: String,
    phone: String,
    role: String,
    idCard: String, // optional
  },

  createdAt: Date,
  updatedAt: Date,
});

export default mongoose.model("Report", reportSchema);
