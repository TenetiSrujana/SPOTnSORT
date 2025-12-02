// src/components/BubblesBackground.jsx
import React from "react";

const BubblesBackground = () => {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: "linear-gradient(135deg, #56ab2f, #a8e063)",
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
      }}
    ></div>
  );
};

export default BubblesBackground;
