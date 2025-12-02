// src/components/BubblesBackground.jsx
import React from "react";

const BubblesBackground = () => {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: "linear-gradient(135deg, #D7A9A4, #1D3A89)",
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
      }}
    ></div>
  );
};

export default BubblesBackground;
