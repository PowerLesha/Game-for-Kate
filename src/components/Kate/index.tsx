import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementHealth,
  decrementMoralHealth,
  incrementHealth,
  incrementMoralHealth,
  selectHealth,
} from "../../store/gameSlice";
import Enemy from "../Enemy";
import Marshall from "../Marshall";

const Kate: React.FC = () => {
  const dispatch = useDispatch();
  const kateRef = useRef<HTMLDivElement>(null);
  const health = useSelector(selectHealth);
  const screenWidth = 1100; // Adjust these values as needed
  const screenHeight = 600; // Adjust these values as needed
  const step = 10; // Adjust the movement step as needed
  const [marshallVisible, setMarshallVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const kate = kateRef.current;
      if (!kate) return;

      const { top, left } = kate.getBoundingClientRect();

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

      const marshall = document.getElementById("marshall");
      if (marshall && marshallVisible) {
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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, screenHeight, screenWidth, marshallVisible]);

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
    <>
      <div id="kate" ref={kateRef} className="kate"></div>
      <Marshall
        screenWidth={screenWidth}
        screenHeight={screenHeight}
        isVisible={marshallVisible}
      />
      {renderEnemies()}
    </>
  );
};

export default Kate;
