import React, { useEffect, useState } from "react";

interface EnemyProps {
  screenWidth: number;
  screenHeight: number;
}

const Enemy: React.FC<EnemyProps> = ({ screenWidth, screenHeight }) => {
  const [position, setPosition] = useState({ top1: 300, left1: 500 });
  const [position2, setPosition2] = useState({ top2: 300, left2: 850 });

  useEffect(() => {
    const interval = setInterval(() => {
      const top1 = Math.floor(Math.random() * (screenHeight - 5));
      const left1 = 400;
      const top2 = Math.floor(Math.random() * (screenHeight - 5));
      const left2 = 600;

      // const left = Math.floor(Math.random() * (screenWidth - 5));
      setPosition({ top1, left1 });
      setPosition2({ top2, left2 });
    }, 1000); // Update every 500 milliseconds (0.5 seconds)

    return () => clearInterval(interval);
  }, [screenHeight, screenWidth]);

  return (
    <>
      <div
        className="enemy1"
        style={{
          top: `${position.top1}px`,
          left: `${position.left1}px`,
        }}
      />
      <div
        className="enemy2"
        style={{
          top: `${position2.top2}px`,
          left: `${position2.left2}px`,
        }}
      />
      <div
        className="enemy1"
        style={{
          top: `${position.top1 * 0.9}px`,
          left: `${position.left1 + 350}px`,
        }}
      />
      <div
        className="enemy2"
        style={{
          top: `${position2.top2 * 0.9}px`,
          left: `${position2.left2 + 350}px`,
        }}
      />
    </>
  );
};

export default Enemy;
