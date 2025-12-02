import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("citizen");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict phone to 10 digits only (numeric)
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, ""); // remove non-digits
      if (digitsOnly.length > 10) return; // prevent more than 10 digits
      setFormData({ ...formData, [name]: digitsOnly });
      return;
    }

    // Restrict email to proper format
    if (name === "email") {
      setFormData({ ...formData, [name]: value.trim() });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, phone, password } = formData;

    if (!name || !email || !phone || !password) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        ...formData,
        role,
      });
      setSuccess(res.data.message || "Registered successfully!");
      setTimeout(() => navigate(`/login?role=${role}`), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
          Register as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>

        {/* Role Selection */}
        <div className="flex justify-around mb-6">
          {["citizen", "authority"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                role === r
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-700 text-white hover:bg-yellow-500 hover:text-black"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <div className="flex items-center">
              <span className="bg-gray-700 px-3 py-2 rounded-l-lg border border-gray-600 text-gray-300">
                +91
              </span>
              <input
                type="text"
                name="phone"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-r-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-center font-medium">{success}</p>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg mt-4 hover:bg-yellow-300 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-300">
          Already have an account?{" "}
          <span
            className="text-yellow-400 cursor-pointer hover:underline font-semibold"
            onClick={() => navigate(`/login?role=${role}`)}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
