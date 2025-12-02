// src/components/BubblesBackground.jsx
import React from "react";

const BubblesBackground = () => {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
      }}
    ></div>
  );
};

export default BubblesBackground;
