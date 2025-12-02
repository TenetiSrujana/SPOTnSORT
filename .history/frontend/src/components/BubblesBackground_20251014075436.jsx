// src/components/BubblesBackground.jsx
import React from "react";

const BubblesBackground = () => {
  return (
    <div className="bubbles-bg fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
      <ul className="bubbles">
        <li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li>
      </ul>
    </div>
  );
};

export default BubblesBackground;
