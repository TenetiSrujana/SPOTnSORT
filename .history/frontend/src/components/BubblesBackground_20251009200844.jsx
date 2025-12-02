// Civic Background 2
import React from "react";

const CivicBackground2 = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{
        background: `
          linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%),
          url('https://www.transparenttextures.com/patterns/asfalt-light.png')
        `,
        backgroundSize: "cover, 300px",
        backgroundBlendMode: "overlay",
        opacity: 0.85,
      }}
    />
  );
};

export default CivicBackground2;
