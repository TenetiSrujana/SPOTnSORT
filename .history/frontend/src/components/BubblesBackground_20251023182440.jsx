// src/components/BubblesBackground.jsx
import React from "react";

const BubblesBackground = () => {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: "radial-gradient(circle at 10% 20%, #000000ff, #e9e8f2ff, #000000ff)",
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
      }}
    ></div>
  );
};

export default BubblesBackground;
