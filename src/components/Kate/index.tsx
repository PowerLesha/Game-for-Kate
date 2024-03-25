import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementHealth,
  decrementMoralHealth,
  incrementHealth,
  incrementMoralHealth,
  selectHealth,
  selectMoralHealth,
} from "../../store/gameSlice";
import Enemy from "../Enemy";
import Treats from "../Treats";
import GameOver from "../GameOver/index";
import { resetLevels, showLevel } from "../../store/levelSlice";
import aeroplane from "../../assets/aeroplane.png";
const Kate: React.FC = () => {
  const dispatch = useDispatch();
  const kateRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true); // useRef to track first render
  const health = useSelector(selectHealth);
  const currentLevel = useSelector(showLevel);
  const mentalHealth = useSelector(selectMoralHealth);
  const screenWidth = 1400;
  const screenHeight = 600;
  const step = 10;
  const [marshallVisible, setMarshallVisible] = useState(true);
  const [cakeVissible, setCakeVissible] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [initialKatePosition, setInitialKatePosition] = useState({
    top: screenHeight - 300,
    left: 0,
  });
  useEffect(() => {
    if (health <= 0 || mentalHealth <= 0) {
      setGameOver(true);
      // Additional cleanup or game over logic can be added here
    }
  }, [health, mentalHealth]);

  useEffect(() => {
    if (gameOver) {
      // Handle game over logic here, such as showing a game over message, resetting the game, etc.
    }
  }, [gameOver]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameOver) return; // Prevent any actions when the game is over

      const kate = kateRef.current;
      if (!kate) return;

      const { top, left, bottom, right } = kate.getBoundingClientRect();

      // Define the boundaries of the restricted area
      const restrictedAreaTop = 250;
      const restrictedAreaLeft = 230;

      // Check if Kate's current position is within or near the restricted area
      const isNearRestrictedArea =
        top < restrictedAreaTop && left < restrictedAreaLeft;

      // Prevent Kate from moving into the restricted area
      if (isNearRestrictedArea) {
        if (event.key === "ArrowUp" && top < restrictedAreaTop) return;
        if (event.key === "ArrowLeft" && left < restrictedAreaLeft) return;
      }

      // Move Kate within the game boundaries
      switch (event.key) {
        case "ArrowUp":
          if (top > step) kate.style.top = `${top - step * 2}px`;
          break;
        case "ArrowDown":
          if (top < screenHeight - kate.clientHeight - step)
            kate.style.top = `${top + step}px`;
          break;
        case "ArrowLeft":
          if (left > step) kate.style.left = `${left - step * 2}px`;
          break;
        case "ArrowRight":
          if (left < screenWidth - kate.clientWidth - step)
            kate.style.left = `${left + step}px`;
          break;
        default:
          break;
      }

      // Check for collisions with enemies
      const kateRect = kate.getBoundingClientRect();
      const enemies = document.querySelectorAll(".enemy1, .enemy2");
      enemies.forEach((enemy) => {
        const enemyRect = enemy.getBoundingClientRect();
        if (
          kateRect.top < enemyRect.bottom &&
          kateRect.bottom > enemyRect.top &&
          kateRect.left < enemyRect.right &&
          kateRect.right > enemyRect.left
        ) {
          if (enemy.classList.contains("enemy1")) {
            dispatch(decrementHealth());
          } else if (enemy.classList.contains("enemy2")) {
            dispatch(decrementMoralHealth());
          }
        }
      });

      const cappucchino = document.getElementById("cappucchino");
      if (cappucchino && cakeVissible && health < 100) {
        const cappucchinoRect = cappucchino.getBoundingClientRect();
        if (
          kateRect.top < cappucchinoRect.bottom &&
          kateRect.bottom > cappucchinoRect.top &&
          kateRect.left < cappucchinoRect.right &&
          kateRect.right > cappucchinoRect.left
        ) {
          dispatch(incrementHealth());
          setCakeVissible(false);
          setTimeout(() => {
            setCakeVissible(true);
          }, 30000); // 30 seconds
        }
      }

      const marshall = document.getElementById("marshall");
      if (marshall && marshallVisible && mentalHealth < 100) {
        const marshallRect = marshall.getBoundingClientRect();
        if (
          kateRect.top < marshallRect.bottom &&
          kateRect.bottom > marshallRect.top &&
          kateRect.left < marshallRect.right &&
          kateRect.right > marshallRect.left
        ) {
          dispatch(incrementMoralHealth());
          setMarshallVisible(false);
          setTimeout(() => {
            setMarshallVisible(true);
          }, 30000); // 30 seconds
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    dispatch,
    screenHeight,
    screenWidth,
    marshallVisible,
    cakeVissible,
    gameOver,
    health,
    mentalHealth,
  ]);
  const restartGame = () => {
    setGameOver(false);
    dispatch(incrementHealth());
    dispatch(incrementMoralHealth());
    dispatch(resetLevels());
    // Reset Kate's position to initial position
    setInitialKatePosition({ top: screenHeight - 300, left: 0 });
  };
  useEffect(() => {
    if (firstRender.current || !gameOver) {
      const kate = kateRef.current;
      if (kate) {
        kate.style.top = `${initialKatePosition.top}px`;
        kate.style.left = `${initialKatePosition.left}px`;
      }
      firstRender.current = false;
    }
  }, [initialKatePosition]);

  const renderEnemies = () => {
    const enemies = [];
    for (let i = 0; i < 5; i++) {
      enemies.push(
        <Enemy key={i} screenWidth={screenWidth} screenHeight={screenHeight} />
      );
    }
    return enemies;
  };

  return (
    <div className="main">
      {gameOver ? (
        <GameOver restartGame={restartGame} />
      ) : (
        <>
          <h1 className="show-level">LEVEL {currentLevel}</h1>
          <div id="kate" ref={kateRef} className="kate"></div>
          <Treats
            screenWidth={screenWidth}
            screenHeight={screenHeight}
            marshallVissible={marshallVisible}
            cakeVissible={cakeVissible}
          />
          {renderEnemies()}
          <div className="aeroplane">
            <img src={aeroplane} />
          </div>
        </>
      )}
    </div>
  );
};

export default Kate;
