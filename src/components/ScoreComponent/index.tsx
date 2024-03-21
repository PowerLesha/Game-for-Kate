import React from "react";
import { useSelector } from "react-redux";
import { selectHealth, selectMoralHealth } from "../../store/gameSlice";

const ScoreComponent: React.FC = () => {
  const health = useSelector(selectHealth);
  const moralHealth = useSelector(selectMoralHealth);

  return (
    <div className="score">
      <h2>Health: {health}</h2>
      <h2>Mental Health: {moralHealth}</h2>
    </div>
  );
};

export default ScoreComponent;
