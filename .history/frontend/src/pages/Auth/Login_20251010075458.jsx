// src/pages/Auth/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../../services/auth";
import "../../styles/main.css";
import BubbleLayout from "../../components/BubbleLayout"; // ✅ wrap page content

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roleFromQuery = queryParams.get("role") || "user";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roleFromQuery);
  const [error, setError] = useState("");

  useEffect(() => {
    setRole(roleFromQuery);
  }, [roleFromQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password, role });
      if (role === "user") {
        navigate("/user/home");
      } else if (role === "authority") {
        navigate("/authority/home");
      }
    } catch (err) {
      setError(err.message || "Invalid email, password, or role");
    }
  };

  return (
    <BubbleLayout>
      <div className="page-wrapper flex flex-col justify-center items-center min-h-screen text-white relative overflow-hidden">

        {/* Back arrow */}
        <button
          className="absolute top-4 left-4 text-black text-2xl z-50"
          onClick={() => navigate("/")}
          title="Back to Landing Page"
        >
          ←
        </button>

        <div className="bg-black bg-opacity-90 p-8 rounded-lg shadow-lg w-80 flex flex-col items-center z-50">
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form className="w-full flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-white text-center">
            Don't have an account?{" "}
            <span
              onClick={() => navigate(`/register?role=${role}`)}
              className="text-yellow-500 hover:underline cursor-pointer font-semibold"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </BubbleLayout>
  );
};

export default Login;
