import React from "react";

const BubblesBackground = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{
        background: `
        linear-gradient(135deg, #1b2431 0%, #4e6a8e 60%, #202d40 100%)
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