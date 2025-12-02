// src/components/BubblesBackground.jsx
import React from "react";

const BubblesBackground = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
      }}
    />
  );
};

export default BubblesBackground;
