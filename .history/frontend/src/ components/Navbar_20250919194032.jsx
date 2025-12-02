// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        SpotnSort
      </Link>
      <div className="flex gap-4">
        <Link to="/user/home" className="hover:underline">
          Home
        </Link>
        <Link to="/user/report" className="hover:underline">
          Report
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
