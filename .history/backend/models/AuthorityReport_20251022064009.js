import mongoose from "mongoose";

const authoritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, default: "General" },
  phone: { type: String },
  role: { type: String, default: "authority" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Authority", authoritySchema);
