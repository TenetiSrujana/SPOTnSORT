// src/components/BubblesBackground.jsx
import React from "react";

const BubblesBackground = () => {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: "radial-gradient(circle at 10% 20%, #0f0c29, #302b63, #24243e)",
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
      }}
    ></div>
  );
};

export default BubblesBackground;
