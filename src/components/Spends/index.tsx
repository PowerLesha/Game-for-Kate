import React, { useEffect, useState } from "react";

const Enemy: React.FC = () => {
  const [position, setPosition] = useState({ top1: 300, left1: 500 });
  const [position2, setPosition2] = useState({ top2: 300, left2: 850 });

  useEffect(() => {
    const interval = setInterval(() => {
      const top1 = Math.floor(Math.random() * 600);
      const left1 = Math.floor(Math.random() * 1000);
      const top2 = Math.floor(Math.random() * 600);
      const left2 = Math.floor(Math.random() * 1000);

      setPosition({ top1, left1 });
      setPosition2({ top2, left2 });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="spends1"
        style={{
          top: `${position.top1}px`,
          left: `${position.left1}px`,
        }}
      />
      <div
        className="spends2"
        style={{
          top: `${position2.top2}px`,
          left: `${position2.left2}px`,
        }}
      />
    </>
  );
};

export default Enemy;
