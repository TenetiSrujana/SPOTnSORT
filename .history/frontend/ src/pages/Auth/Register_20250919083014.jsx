// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { register, setCurrentUser } from "../../services/auth";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect role from query param (?role=user / ?role=authority)
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role") || "user";

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
    govId: "",
    area: "",
    category: "",
    proofFile: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // prepare payload
      const payload = { ...formData, role };
      delete payload.confirmPassword;

      const res = await register(payload);

      if (res.user) {
        setCurrentUser(res.user);
        if (role === "authority") {
          navigate("/authority/home");
        } else {
          navigate("/user/home");
        }
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-50 to-blue-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {role === "authority" ? "Authority Registration" : "User Registration"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Common fields */}
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {role === "user" && (
            <div>
              <label className="block text-gray-600 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Authority-specific fields */}
          {role === "authority" && (
            <>
              <div>
                <label className="block text-gray-600 mb-1">Government ID</label>
                <input
                  type="text"
                  name="govId"
                  value={formData.govId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">
                  Upload Proof Document
                </label>
                <input
                  type="file"
                  name="proofFile"
                  accept="image/*,application/pdf"
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Allocated Area</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                >
                  <option value="">Select Category</option>
                  <option value="roads">Roads</option>
                  <option value="lighting">Street Lighting</option>
                  <option value="water">Water Supply</option>
                  <option value="waste">Waste Management</option>
                  <option value="drainage">Drainage</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to={`/login?role=${role}`}
            className="text-blue-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
