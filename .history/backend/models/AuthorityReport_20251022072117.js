import mongoose from "mongoose";

const authoritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  department: { type: String },
  location: { type: String },
  role: { type: String, default: "authority" },
  createdAt: { type: Date, default: Date.now }
});

// ✅ third argument ensures data goes into the "authorityreport" collection
const Authority = mongoose.model("Authority", authoritySchema, "authorityreport");

export default Authority;
