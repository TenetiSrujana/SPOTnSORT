// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/main.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100">
      {/* Logo */}
      <div className="animate-fadeIn mb-6">
        <img
          src={logo}
          alt="SpotnSort Logo"
          className="h-32 w-32 object-contain drop-shadow-lg"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-wide animate-slideIn">
        SpotnSort
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-md animate-fadeIn delay-200">
        A citizen-powered platform to report, track, and solve civic issues in
        your community 🚀
      </p>

      {/* Buttons */}
      <div className="flex gap-8 animate-bounceIn">
        <button
          onClick={() => navigate("/login?role=user")}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition transform hover:scale-105"
        >
          I’m a User
        </button>

        <button
          onClick={() => navigate("/login?role=authority")}
          className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition transform hover:scale-105"
        >
          I’m an Authority
        </button>
      </div>

      {/* Footer text */}
      <div className="absolute bottom-6 text-sm text-gray-500 animate-fadeIn delay-500">
        Empowering citizens • Inspiring change • Building better cities
      </div>
    </div>
  );
};

export default Landing;
m