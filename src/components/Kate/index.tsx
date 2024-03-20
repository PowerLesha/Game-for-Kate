import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementHealth, selectHealth } from "../../store/gameSlice";
import Enemy from "../Enemy";

const Kate: React.FC = () => {
  const dispatch = useDispatch();
  const kateRef = useRef<HTMLDivElement>(null);
  const health = useSelector(selectHealth);
  const screenWidth = 1100; // Adjust these values as needed
  const screenHeight = 600; // Adjust these values as needed
  const step = 10; // Adjust the movement step as needed

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
      const enemies = document.querySelectorAll(".enemy");
      enemies.forEach((enemy) => {
        const enemyRect = enemy.getBoundingClientRect();
        if (
          kateRect.top < enemyRect.bottom &&
          kateRect.bottom > enemyRect.top &&
          kateRect.left < enemyRect.right &&
          kateRect.right > enemyRect.left
        ) {
          dispatch(decrementHealth());
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, screenHeight, screenWidth]);

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
    <div style={{ width: "500px", height: "500px", position: "relative" }}>
      <div
        id="kate"
        ref={kateRef}
        className="kate"
        style={{
          position: "absolute",
          width: "50px",
          height: "50px",
        }}
      ></div>
      {renderEnemies()}
    </div>
  );
};

export default Kate;
