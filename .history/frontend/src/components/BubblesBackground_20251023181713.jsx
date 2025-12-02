// src/components/BubblesBackground.jsx
import React from "react";
import "../styles/animatedBackground.css";



const BubblesBackground = () => {
  return (
    <div className="animated-bg fixed inset-0 -z-10"
      style={{
        background: "linear-gradient(135deg, #f5f2f1ff, #0f0101ff)",
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
      }}
    ></div>
  );
};

export default BubblesBackground;
