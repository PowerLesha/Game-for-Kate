import React from "react";
import { FaKiss } from "react-icons/fa";

const GameCredits: React.FC = () => {
  return (
    <div className="game-credits">
      <ul>
        <li>
          <strong>Author:</strong> Oleksii Titov
        </li>
        <li>
          <strong>Developer:</strong> Oleksii Titov
        </li>
        <li>
          <strong>Creative Director:</strong> Oleksii Titov
        </li>
        <li>
          <strong>Product Manager:</strong> Oleksii Titov
        </li>
      </ul>
      <h3>
        P/s For my lovely wife <FaKiss />
      </h3>
    </div>
  );
};

export default GameCredits;
