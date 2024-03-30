import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementHealth,
  decrementMoney,
  decrementMoralHealth,
  incrementHealth,
  incrementMoney,
  incrementMoralHealth,
  resetMoney,
  selectHealth,
  selectMoney,
  selectMoralHealth,
} from "../../store/gameSlice";
import Enemy from "../Enemy";
import Treats from "../Treats";
import Money from "../Money";
import Spends from "../Spends";
import GameOver from "../GameOver/index";
import { completeLevel, resetLevels, showLevel } from "../../store/levelSlice";
import mainSound from "../../assets/the-last-piano-112677.mp3";
import planeSound1 from "../../assets/jet-engine-startup-14537.mp3";
import planeSound2 from "../../assets/airplane-atmos-22955.mp3";
import planeSound3 from "../../assets/pilot-announcement-85246.mp3";
import { FaVolumeOff, FaVolumeUp } from "react-icons/fa";
import backgroundLevel1 from "../../assets/background.png";
import backgroundLevel2 from "../../assets/background2.png";

const Kate: React.FC = () => {
  const dispatch = useDispatch();
  const kateRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true); // useRef to track first render
  const health = useSelector(selectHealth);
  const currentLevel = useSelector(showLevel);
  const mentalHealth = useSelector(selectMoralHealth);
  const kateMoney = useSelector(selectMoney);
  const screenWidth = 1400;
  const screenHeight = 600;
  const step = 10;
  const [marshallVisible, setMarshallVisible] = useState(true);
  const [cakeVissible, setCakeVissible] = useState(true);
  const [moneyVissible, setMoneyVissible] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [initialKatePosition, setInitialKatePosition] = useState({
    top: screenHeight - 100,
    left: 0,
  });
  const [playMainSound, setPlayMainSound] = useState(false);
  const [playPlaneSound, setPlayPlaneSound] = useState(false);
  const [ringCatched, setRingCatched] = useState(false);
  const [tiffanyCatched, setTiffanyCatched] = useState(false);

  useEffect(() => {
    if (playMainSound) {
      const mainAudio = new Audio(mainSound);
      mainAudio.loop = true;

      // Set the minimum volume for the main sound when airplane sounds are playing
      const minMainVolume = playPlaneSound ? 0.3 : 1.0;
      mainAudio.volume = minMainVolume;

      mainAudio.play();

      return () => {
        mainAudio.pause();
        mainAudio.currentTime = 0;
      };
    }
  }, [playMainSound, playPlaneSound]);

  useEffect(() => {
    if (health <= 0 || mentalHealth <= 0) {
      setGameOver(true);

      // Additional cleanup or game over logic can be added here
    }
  }, [health, mentalHealth]);

  useEffect(() => {
    if (gameOver) {
      setMoneyVissible(true);
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
      const restrictedAreaTop = 370;
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

      const spends = document.querySelectorAll(".spends1, .spends2");
      spends.forEach((spend) => {
        const spendRect = spend.getBoundingClientRect();

        if (
          kateRect.top < spendRect.bottom &&
          kateRect.bottom > spendRect.top &&
          kateRect.left < spendRect.right &&
          kateRect.right > spendRect.left
        ) {
          if (spend.classList.contains("spends1")) {
            dispatch(decrementMoney());
            setRingCatched(true);
            setTimeout(() => {
              setRingCatched(false);
            }, 1500);
          } else if (spend.classList.contains("spends2")) {
            dispatch(decrementMoney());
            setTiffanyCatched(true);
            setTimeout(() => {
              setTiffanyCatched(false);
            }, 1500);
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

      const money = document.getElementById("money");
      if (kateMoney && kateMoney >= 1000) {
        setMoneyVissible(false);
      }

      if (money && moneyVissible && kateMoney < 1000) {
        const moneyRect = money.getBoundingClientRect();
        if (
          kateRect.top < moneyRect.bottom &&
          kateRect.bottom > moneyRect.top &&
          kateRect.left < moneyRect.right &&
          kateRect.right > moneyRect.left
        ) {
          dispatch(incrementMoney());
          setMoneyVissible(false);
          if (kateMoney < 1000) {
            setTimeout(() => {
              setMoneyVissible(true);
            }, 3000); // 3 seconds
          } else setMoneyVissible(false);
        }
      }

      const aeroplane = document.getElementById("plane");

      if (aeroplane && currentLevel === 1) {
        const aeroplaneRect = aeroplane.getBoundingClientRect();
        if (
          kateRect.top < aeroplaneRect.bottom &&
          kateRect.bottom > aeroplaneRect.top &&
          kateRect.left < aeroplaneRect.right &&
          kateRect.right > aeroplaneRect.left
        ) {
          // Dispatch action to indicate transition to level 2
          setPlayPlaneSound(true);
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
    currentLevel,
    cakeVissible,
    gameOver,
    kateMoney,
    health,
    mentalHealth,
    moneyVissible,
    ringCatched,
    tiffanyCatched,
  ]);
  useEffect(() => {
    const playSequentialSounds = () => {
      const audio1 = new Audio(planeSound1);
      audio1.play();
      setTimeout(() => {
        audio1.pause();
        const audio2 = new Audio(planeSound2);
        audio2.play();
        setTimeout(() => {
          audio2.pause();
          const audio3 = new Audio(planeSound3);
          audio3.play();
          setTimeout(() => {
            audio3.pause();
            dispatch(completeLevel(2));
          }, 6000);
        }, 4000);
      }, 3000);
    };

    if (playPlaneSound && currentLevel === 1) {
      playSequentialSounds();
    }
  }, [playPlaneSound, kateMoney, currentLevel]);

  const restartGame = () => {
    setGameOver(false);
    dispatch(incrementHealth());
    dispatch(incrementMoralHealth());
    dispatch(resetLevels());
    dispatch(resetMoney());
    // Reset Kate's position to initial position
    setInitialKatePosition({ top: screenHeight - 100, left: 0 });
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
  }, [gameOver, initialKatePosition]);

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
    <div
      className="main"
      style={{
        backgroundImage: `url(${
          currentLevel === 1 ? backgroundLevel1 : backgroundLevel2
        })`,
      }}
    >
      <div className="game-effects">
        <button onClick={() => setPlayMainSound(!playMainSound)}>
          <span>{playMainSound ? "OFF" : "ON"}</span>
          {playMainSound ? (
            <FaVolumeOff
              style={{
                paddingTop: "4px",
                display: "inline",
                fontSize: "15px",
              }}
            />
          ) : (
            <FaVolumeUp
              style={{
                paddingTop: "4px",
                display: "inline",
                fontSize: "15px",
              }}
            />
          )}
        </button>
      </div>

      {gameOver ? (
        <GameOver restartGame={restartGame} />
      ) : (
        <div>
          <h1 className="show-level">LEVEL {currentLevel}</h1>
          <div id="kate" ref={kateRef} className="kate"></div>
          {currentLevel === 1 && (
            <>
              <Treats
                screenWidth={screenWidth}
                screenHeight={screenHeight}
                marshallVissible={marshallVisible}
                cakeVissible={cakeVissible}
              />
              <Money moneyVissible={moneyVissible} />
              {renderEnemies()}

              {kateMoney >= 1000 && (
                <div className="aeroplane" id="plane"></div>
              )}
            </>
          )}

          {currentLevel === 2 && (
            <>
              <Treats
                screenWidth={screenWidth}
                screenHeight={screenHeight}
                marshallVissible={marshallVisible}
                cakeVissible={cakeVissible}
              />
              <Spends
                ringCatched={ringCatched}
                tiffanyCatched={tiffanyCatched}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Kate;
