// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} SpotnSort. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Built for civic issue reporting and smart city solutions.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
