// src/pages/Authority/AuthorityHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import BubblesBackground from "../../components/BubblesBackground";

const AuthorityHome = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper flex flex-col justify-center items-center min-h-screen relative overflow-hidden">
      <BubblesBackground />

      <button
        className="absolute top-4 left-4 text-black text-2xl z-50"
        onClick={() => navigate("/")}
        title="Back to Landing Page"
      >
        ←
      </button>

      <div className="bg-black bg-opacity-90 p-8 rounded-lg shadow-lg w-96 flex flex-col items-center z-50 text-white">
        <h1 className="text-3xl font-bold mb-4">Authority Dashboard</h1>
        <p className="text-center mb-6">
          Welcome! Here you can manage your assigned problems, track reports, and take action in your area.
        </p>

        <div className="flex flex-col w-full gap-3">
          <button
            className="px-6 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
            onClick={() => alert("Feature: View assigned reports")}
          >
            View Assigned Reports
          </button>
          <button
            className="px-6 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
            onClick={() => alert("Feature: Update problem status")}
          >
            Update Problem Status
          </button>
          <button
            className="px-6 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
            onClick={() => alert("Feature: View statistics")}
          >
            View Statistics
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorityHome;
