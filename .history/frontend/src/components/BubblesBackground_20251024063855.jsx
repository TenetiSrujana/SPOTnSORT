import React from "react";

const BubblesBackground = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{
        background: `
        linear-gradient(135deg, #161b22 0%, #5d6e82 50%, #2b3a4a 100%)
          url('https://www.transparenttextures.com/patterns/asfalt-light.png')
        `,
        backgroundSize: "cover, 300px",
        backgroundBlendMode: "overlay",
        opacity: 0.85,
      }}
    />
  );
};

export default BubblesBackground;