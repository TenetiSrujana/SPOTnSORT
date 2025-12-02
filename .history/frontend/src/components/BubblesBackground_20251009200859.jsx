// Civic Background 3
import React from "react";

const CivicBackground3 = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{
        background: `
          linear-gradient(120deg, #f0f9ff 0%, #cfe8fc 50%, #a0d8fd 100%),
          url('https://www.transparenttextures.com/patterns/connected.png')
        `,
        backgroundSize: "cover, 350px",
        backgroundBlendMode: "overlay",
        opacity: 0.9,
      }}
    />
  );
};

export default CivicBackground3;
