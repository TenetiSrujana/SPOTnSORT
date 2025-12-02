import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const AuthHome = () => {
  const navigate = useNavigate();
  // Removed 'reports' as it was unused
  const [data, setData] = useState([]);

  useEffect(() => {
    // Example fetch (replace with your API)
    axios.get("/api/authority/home").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <header className="flex items-center p-4 bg-gray-800 text-white">
        <FaArrowLeft className="mr-3 cursor-pointer" onClick={() => navigate(-1)} />
        <h1>Authority Home</h1>
      </header>
      <main className="p-4">
        <p>Welcome, Authority!</p>
      </main>
    </div>
  );
};

export default AuthHome;
