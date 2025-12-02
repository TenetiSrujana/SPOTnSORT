import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/main.css";
import BubblesBackground from "../components/BubblesBackground"; // ✅ Import background

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper flex flex-col justify-center items-center min-h-screen text-white relative overflow-hidden">
      {/* ✅ Use your bubble gradient background */}
      <BubblesBackground />

      {/* White Circle with logo */}
      <div
        className="flex items-center justify-center w-44 h-44 rounded-full mb-8 shadow-xl"
        style={{
          background: "radial-gradient(circle, #ffffff 60%, #f1f1f1 100%)",
          boxShadow: "0 0 35px rgba(255, 255, 255, 0.25)",
          overflow: "hidden",
          border: "2px solid rgba(255,255,255,0.8)",
        }}
      >
        <img
          src={logo}
          alt="SpotnSort Logo"
          className="object-contain"
          style={{
            width: "75%", // slightly zoomed out
            height: "75%",
            mixBlendMode: "multiply",
            filter: "brightness(0.9) contrast(1.2)",
          }}
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-yellow-400 mb-3">
        Welcome to SpotnSort
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Choose your role to get started
      </p>

      {/* Buttons */}
      <div className="flex space-x-6">
        <button
          className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition transform hover:scale-105"
          onClick={() => navigate("/login?role=user")}
        >
          I am a User
        </button>
        <button
          className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-400 transition transform hover:scale-105"
          onClick={() => navigate("/login?role=authority")}
        >
          I am an Authority
        </button>
      </div>
    </div>
  );
};

export default Landing;