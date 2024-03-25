import React from "react";

type Props = {
  restartGame: () => void;
};

export default function index({ restartGame }: Props) {
  return (
    <>
      <div className="blood-container">
        <div className="blood-text">
          Game Over
          {/* <span>G</span>
          <span>a</span>
          <span>m</span>
          <span>e</span>
          <span>&nbsp;</span>
          <span>O</span>
          <span>v</span>
          <span>e</span>
          <span>r</span> */}
        </div>
      </div>
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </>
  );
}
