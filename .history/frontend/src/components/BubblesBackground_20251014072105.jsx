// ✅ src/components/BubblesBackground.jsx
import React from "react";

const BubblesBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
      {/* Gradient + subtle texture */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%),
            url('https://www.transparenttextures.com/patterns/asfalt-light.png')
          `,
          backgroundSize: "cover, 300px",
          backgroundBlendMode: "overlay",
          opacity: 0.95,
        }}
      />

      {/* Floating bubbles animation */}
      <ul className="bubbles absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>
    </div>
  );
};

export default BubblesBackground;