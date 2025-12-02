// src/components/BubblesBackground.jsx
import React from "react";

const BubblesBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Smooth gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 30%, #cbd5e1 100%)",
        }}
      />

      {/* Subtle geometric city grid overlay */}
      <svg
        className="absolute inset-0 opacity-25"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Slight blur & shading layer for depth */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(20px)",
          background: "rgba(255, 255, 255, 0.15)",
        }}
      />
    </div>
  );
};

export default BubblesBackground;
