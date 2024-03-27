import React, { useState } from "react";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa"; // Import icons from react-icons library
import { useSelector } from "react-redux";
import { showLevel } from "../../store/levelSlice";

const Info: React.FC = () => {
  const [showModal, setShowModal] = useState(false); // State to manage visibility of modal

  // Function to toggle the modal visibility state
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const level = useSelector(showLevel);

  return (
    <div className="game-info">
      <h2>Game Information:</h2>
      <h2 className="game-task">
        Your current goal is:
        <br />
        {level === 1 && (
          <h3 style={{ textDecoration: "underline pink" }}>
            earn 1000$ and go on vacation by plane
          </h3>
        )}
      </h2>
      <h3>Use arrows to move Kate</h3>
      <div className="arrow-icons">
        <span>
          {" "}
          <FaArrowUp />
        </span>

        <span>
          <FaArrowDown />
        </span>

        <span>
          {" "}
          <FaArrowLeft />
        </span>

        <span>
          <FaArrowRight />
        </span>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              <FaTimesCircle />
            </span>
            <p>This is the game story. It contains details about the game.</p>
            Kate, a resilient and intelligent young woman, faces a multitude of
            challenges in her daily life. Despite her strength and wit, she
            battles with the burdens of her job and struggles with mental health
            issues. However, amidst the chaos, Kate finds solace in her
            passions: traveling, indulging in coffee, cherishing her husband,
            and adoring her faithful dog. As players guide Kate through her
            journey, they must navigate her through the hazardous terrain of
            toxic work environments and confrontations with her own inner
            demons. Each encounter with toxic colleagues or mental obstacles
            threatens to diminish Kate's health, symbolizing the toll these
            challenges take on her well-being. To persevere, Kate can replenish
            her health by seeking refuge in the presence of Marshall, a source
            of comfort and support, or by rejuvenating herself with a cup of
            coffee, her beloved elixir. With determination and resilience, Kate
            strives to overcome these obstacles on her path to achieving her
            ultimate dream: embarking on a well-deserved vacation. But before
            she can bask in the serenity of relaxation, she must overcome the
            trials and tribulations presented by each level, showcasing her
            unwavering determination and resolve.
          </div>
        </div>
      )}
      <button onClick={toggleModal}>
        <FaInfoCircle /> Show a game story
      </button>
    </div>
  );
};

export default Info;
