import React from "react";
import { useSelector } from "react-redux";
import {
  selectHealth,
  selectMoney,
  selectMoralHealth,
} from "../../store/gameSlice";

const ScoreComponent: React.FC = () => {
  const health = useSelector(selectHealth);
  const moralHealth = useSelector(selectMoralHealth);
  const money = useSelector(selectMoney);

  return (
    <div className="score">
      <h2>Health: {health}</h2>
      <h2>Mental Health: {moralHealth}</h2>
      <h2>Money: {money} $</h2>
    </div>
  );
};

export default ScoreComponent;
