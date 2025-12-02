// src/components/BubblesBackground.jsx
import React from "react";

const BubblesBackground = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full animate-gradient -z-10"
      style={{
        background: "linear-gradient(270deg, #1e293b, #334155, #0f172a)",
        backgroundSize: "600% 600%",
        animation: "gradientShift 15s ease infinite",
      }}
    />
  );
};

export default BubblesBackground;

// Add this to your global CSS (e.g. index.css or main.css)
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
