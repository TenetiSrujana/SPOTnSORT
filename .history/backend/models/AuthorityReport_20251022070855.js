import mongoose from "mongoose";

const authoritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "authority" },
  department: { type: String },
  phone: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// 👇 third argument ensures data goes into your "authorityreport" collection
const Authority = mongoose.model("Authority", authoritySchema, "authorityreport");

export default Authority;
