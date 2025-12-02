// src/components/BubblesBackground.jsx
import React from "react";
import cityBg from "../assets/city-bg.png"; // add your city vector here

const BubblesBackground = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10 opacity-80"
      style={{
        backgroundImage: `url(${cityBg})`,
        backgroundColor: "#0f172a",
      }}
    />
  );
};

export default BubblesBackground;
