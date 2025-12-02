// src/components/BubblesBackground.jsx
import React from "react";

const BubblesBackground = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{
        background: `
          linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%),
          url('https://www.transparenttextures.com/patterns/cubes.png')
        `,
        backgroundSize: "cover, 400px",
        backgroundBlendMode: "overlay",
        opacity: 0.9,
      }}
    />
  );
};

export default BubblesBackground;
