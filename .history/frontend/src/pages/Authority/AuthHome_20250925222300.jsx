// src/pages/Authority/AuthHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";

const AuthHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // remove current user
    navigate("/login"); // redirect to login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl mb-6">Authority Dashboard</h1>
      <div className="flex gap-4 mb-4">
        <button
          className="px-6 py-3 bg-yellow-500 text-black rounded"
          onClick={() => navigate("/authority/manage")}
        >
          View Assigned Reports
        </button>
        <button
          className="px-6 py-3 bg-green-500 text-black rounded"
          onClick={() => navigate("/authority/analysis")}
        >
          Analytics
        </button>
        <button
          className="px-6 py-3 bg-blue-500 text-black rounded"
          onClick={() => navigate("/authority/map")}
        >
          Map
        </button>
      </div>
      <button
        className="px-6 py-3 bg-red-500 text-black rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default AuthHome;