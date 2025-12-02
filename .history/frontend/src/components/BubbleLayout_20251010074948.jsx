// src/components/BubbleLayout.jsx
import React from "react";
import "../styles/main.css";

const BubbleLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Bubble Background */}
      <div className="bubbles-bg">
        <ul className="bubbles">
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
        </ul>
      </div>

      {/* Page content */}
      {children}
    </div>
  );
};

export default BubbleLayout;
