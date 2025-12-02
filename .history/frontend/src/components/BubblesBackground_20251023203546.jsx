// src/components/BubblesBackground.jsx
import React from "react";

const BubblesBackground = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{
        background: `
          linear-gradient(145deg, #0c111f 0%, #1e293b 50%, #3b4a63 100%),
          url('https://www.transparenttextures.com/patterns/asfalt-light.png')
        `,
        backgroundSize: "cover, 300px",
        backgroundBlendMode: "overlay",
        opacity: 0.9,
        boxShadow: "inset 0 0 60px rgba(255,255,255,0.05)",
      }}
    />
  );
};

export default BubblesBackground;
