// src/pages/Auth/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BubblesBackground from "../../components/BubblesBackground";
import { login } from "../../services/auth";
import "../../styles/main.css";

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
      // Redirect to appropriate home page
      if (role === "user") {
        navigate("/user/home");
      } else if (role === "authority") {
        navigate("/authority/home");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="page-wrapper flex flex-col justify-center items-center min-h-screen text-white relative overflow-hidden">
      {/* Bubbles background */}
      <BubblesBackground />

      {/* Back arrow */}
      <button
        className="absolute top-4 left-4 text-white text-2xl"
        onClick={() => navigate("/")}
        title="Back to Landing Page"
      >
        ←
      </button>

      <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg w-80 flex flex-col items-center">
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

        {/* Sign up link */}
        <p className="mt-4 text-white">
  Don't have an account?{" "}
  <span
    className="text-yellow-500 cursor-pointer hover:underline"
    onClick={() => navigate(`/register?role=${role}`)}
  >
    Register
    </span>
    </p>
      </div>
    </div>
  );
};

export default Login;
