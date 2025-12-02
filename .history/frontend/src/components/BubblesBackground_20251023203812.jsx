import React from "react";

const BubblesBackground = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{
        background: `
          linear-gradient(145deg, #0c172a, #1e293b, #334155),
          url('https://www.transparenttextures.com/patterns/asfalt-light.png')
        `,
        backgroundSize: "cover, 250px",
        backgroundBlendMode: "overlay",
        opacity: 0.88,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.02) 2%, transparent 98%)",
          backgroundSize: "50px 50px",
          mixBlendMode: "soft-light",
        }}
      />
    </div>
  );
};

export default BubblesBackground;
