import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import marshallImage from "../../assets/Marshall.png";

const Marshall: React.FC<{
  screenWidth: number;
  screenHeight: number;
  isVisible: boolean;
}> = ({ screenWidth, screenHeight, isVisible }) => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState({ top: 200, left: 400 });

  useEffect(() => {
    if (!isVisible) return; // Marshall is not visible, so no need to update its position

    const interval = setInterval(() => {
      const newLeft = Math.random() * (screenWidth - 50);
      const newTop = Math.random() * (screenHeight - 50);
      setPosition({ top: newTop, left: newLeft });
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, screenHeight, screenWidth]);

  return isVisible ? (
    <img
      id="marshall"
      src={marshallImage}
      alt="marshall"
      style={{
        position: "absolute",
        width: "50px",
        height: "50px",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    />
  ) : null;
};

export default Marshall;
