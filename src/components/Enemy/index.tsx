import React, { useEffect, useState } from "react";

interface EnemyProps {
  screenWidth: number;
  screenHeight: number;
}

const Enemy: React.FC<EnemyProps> = ({ screenWidth, screenHeight }) => {
  const [position, setPosition] = useState({ top: 300, left: 500 });

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random position within screen dimensions
      const top = Math.floor(Math.random() * (screenHeight - 50));
      const left = Math.floor(Math.random() * (screenWidth - 50));
      setPosition({ top, left });
    }, 1000); // Adjust interval as needed

    return () => clearInterval(interval);
  }, [screenHeight, screenWidth]);

  return (
    <div
      className="enemy"
      style={{
        position: "absolute",
        width: "50px",
        height: "50px",
        backgroundColor: "red",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    />
  );
};

export default Enemy;
