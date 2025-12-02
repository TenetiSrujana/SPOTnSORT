import mongoose from "mongoose";

const authoritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, default: "" },
  phone: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Ensure this uses the same collection name you mentioned ("authorityreport")
export default mongoose.model("Authority", authoritySchema, "authorityreport");
