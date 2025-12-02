// src/components/BubblesBackground.jsx
import React from "react";
import "../styles/main.css"; // ensure CSS for bubbles is loaded

const BubblesBackground = () => {
  return (
    <div className="bubbles-bg">
      <ul className="bubbles">
        <li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li>
      </ul>
    </div>
  );
};

export default BubblesBackground;
