import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ScoreComponent: React.FC = () => {
  // Select the score from the Redux store state
  const health = useSelector((state: RootState) => state.game.health);

  return (
    <div className="score">
      <h2>Health: {health}</h2>
    </div>
  );
};

export default ScoreComponent;
