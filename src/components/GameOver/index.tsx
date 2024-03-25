import React from "react";

type Props = {
  restartGame: () => void;
};

export default function index({ restartGame }: Props) {
  return (
    <>
      <div className="blood-container">
        <div className="blood-text">Game Over</div>
      </div>
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </>
  );
}
