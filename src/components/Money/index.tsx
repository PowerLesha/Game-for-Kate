import React, { useEffect, useState } from "react";
import money from "../../assets/money.png";
import { useSelector } from "react-redux";
import { selectMoney } from "../../store/gameSlice";

type Props = {
  moneyVissible: boolean;
};

function index({ moneyVissible }: Props) {
  const [position, setPosition] = useState({ top1: 200, left1: 400 });
  const kateMoney = useSelector(selectMoney);
  let screenWidth = 900;
  let screenHeight = 600;
  useEffect(() => {
    if (!moneyVissible || kateMoney >= 1000) return;

    const interval = setInterval(() => {
      const newLeft1 = Math.random() * (screenWidth + 150);
      const newTop1 = Math.random() * (screenHeight - 50);

      setPosition({ top1: newTop1, left1: newLeft1 });
    }, 3000);

    return () => clearInterval(interval);
  }, [screenHeight, screenWidth, moneyVissible, kateMoney]);
  return (
    <>
      {moneyVissible && (
        <img
          id="money"
          src={money}
          alt="money"
          style={{
            position: "absolute",
            width: "50px",
            height: "50px",
            top: `${position.top1}px`,
            left: `${position.left1}px`,
          }}
        />
      )}
    </>
  );
}

export default index;
