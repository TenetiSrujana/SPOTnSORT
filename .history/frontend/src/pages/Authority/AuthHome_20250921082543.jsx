import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const AuthHome = () => {
  useEffect(() => {
    // Example API call
    axios.get("/api/authority/home");
    // Removed `data` variable since it was unused
  }, []);

  return (
    <div>
      <header className="flex items-center p-4 bg-gray-800 text-white">
        <FaArrowLeft className="mr-3 cursor-pointer" />
        <h1>Authority Home</h1>
      </header>
      <main className="p-4">
        <p>Welcome, Authority!</p>
      </main>
    </div>
  );
};

export default AuthHome;
