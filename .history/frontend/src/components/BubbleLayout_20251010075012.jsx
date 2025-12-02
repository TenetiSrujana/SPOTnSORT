// src/components/BubbleLayout.jsx
import React from "react";
import BubblesBackground from "./BubblesBackground";

const BubbleLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <BubblesBackground />
      {children}
    </div>
  );
};

export default BubbleLayout;
