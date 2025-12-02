// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          SpotnSort
        </Link>
        <div className="space-x-4">
          <Link to="/user/home" className="hover:underline">
            Home
          </Link>
          <Link to="/user/report" className="hover:underline">
            Report
          </Link>
          <Link to="/user/map" className="hover:underline">
            Map
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
