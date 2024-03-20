import React, { useEffect, useState } from "react";

interface EnemyProps {
  screenWidth: number;
  screenHeight: number;
}

const Enemy: React.FC<EnemyProps> = ({ screenWidth, screenHeight }) => {
  const [position, setPosition] = useState({ top: 300, left: 500 });

  useEffect(() => {
    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * (screenHeight - 5));
      const left = 400;
      // const left = Math.floor(Math.random() * (screenWidth - 5));
      setPosition({ top, left });
    }, 1000); // Update every 500 milliseconds (0.5 seconds)

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
