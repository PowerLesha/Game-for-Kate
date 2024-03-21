import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import marshallImage from "../../assets/Marshall.png";
import brownie from "../../assets/brownie.png";

const Marshall: React.FC<{
  screenWidth: number;
  screenHeight: number;
  marshallVissible: boolean;
  cakeVissible: boolean;
}> = ({ screenWidth, screenHeight, marshallVissible, cakeVissible }) => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState({ top1: 200, left1: 400 });
  const [position2, setPosition2] = useState({ top2: 300, left2: 850 });

  useEffect(() => {
    if (!marshallVissible && !cakeVissible) return; // Marshall and Cake are not visible, so no need to update its position

    const interval = setInterval(() => {
      const newLeft1 = Math.random() * (screenWidth - 50);
      const newTop1 = Math.random() * (screenHeight - 50);
      const newLeft2 = Math.random() * (screenWidth - 50);
      const newTop2 = Math.random() * (screenHeight - 50);
      setPosition({ top1: newTop1, left1: newLeft1 });
      setPosition2({ top2: newTop2, left2: newLeft2 });
    }, 3000);

    return () => clearInterval(interval);
  }, [marshallVissible, cakeVissible, screenHeight, screenWidth]);

  return (
    <>
      {marshallVissible ? (
        <img
          id="marshall"
          src={marshallImage}
          alt="marshall"
          style={{
            position: "absolute",
            width: "50px",
            height: "50px",
            top: `${position.top1}px`,
            left: `${position.left1}px`,
          }}
        />
      ) : null}
      {cakeVissible ? (
        <img
          id="brownie"
          src={brownie}
          alt="brownie"
          style={{
            position: "absolute",
            width: "50px",
            height: "50px",
            top: `${position2.top2}px`,
            left: `${position2.left2}px`,
          }}
        />
      ) : null}
    </>
  );
};

export default Marshall;
