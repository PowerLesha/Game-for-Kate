import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface EnglishProps {
  handleCollision: (wordId: string) => void;
}

const English: React.FC<EnglishProps> = ({ handleCollision }) => {
  const [correctWords, setCorrectWords] = useState<
    { word: string; id: string; left: number }[]
  >([]);
  const [incorrectWords, setIncorrectWords] = useState<
    { word: string; id: string; left: number }[]
  >([]);
  const screenWidth = 1400;
  const wordSpeed = 1; // Adjust the speed of words

  useEffect(() => {
    const interval = setInterval(() => {
      const allWords = [
        { word: "inevitable", correct: true },
        { word: "ineviteble", correct: false },
        { word: "accommodate", correct: true },
        { word: "accomodate", correct: false },
        { word: "maintenance", correct: true },
        { word: "maintanance", correct: false },
        { word: "definitely", correct: true },
        { word: "definately", correct: false },
        { word: "separate", correct: true },
        { word: "seperate", correct: false },
        { word: "occasionally", correct: true },
        { word: "occassionally", correct: false },
        { word: "embarrass", correct: true },
        { word: "embarass", correct: false },
        { word: "privilege", correct: true },
        { word: "priviledge", correct: false },
        { word: "conscious", correct: true },
        { word: "concious", correct: false },
        { word: "recommend", correct: true },
        { word: "reccommend", correct: false },
        { word: "necessary", correct: true },
        { word: "neccessary", correct: false },
        { word: "accommodation", correct: true },
        { word: "accomodation", correct: false },
        { word: "calendar", correct: true },
        { word: "calender", correct: false },
        { word: "restaurant", correct: true },
        { word: "restaraunt", correct: false },
        { word: "occasion", correct: true },
        { word: "ocassion", correct: false },
        { word: "occurrence", correct: true },
        { word: "occurance", correct: false },
        { word: "independent", correct: true },
        { word: "independant", correct: false },
        { word: "necessary", correct: true },
        { word: "neccessary", correct: false },
        { word: "environment", correct: true },
        { word: "enviroment", correct: false },
        { word: "conscience", correct: true },
        { word: "concience", correct: false },
        { word: "receive", correct: true },
        { word: "recieve", correct: false },
        { word: "committee", correct: true },
        { word: "comittee", correct: false },
        { word: "license", correct: true },
        { word: "lisence", correct: false },
        { word: "occasion", correct: true },
        { word: "ocassion", correct: false },
        { word: "cemetery", correct: true },
        { word: "cemetary", correct: false },
      ];

      const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
      const id = uuidv4();
      if (randomWord.correct) {
        setCorrectWords((prevWords) => [
          ...prevWords,
          { word: randomWord.word, id, left: screenWidth },
        ]);
      } else {
        setIncorrectWords((prevWords) => [
          ...prevWords,
          { word: randomWord.word, id, left: screenWidth },
        ]);
      }
    }, 3000); // Add a new word every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateWordsPosition = setInterval(() => {
      setCorrectWords((prevWords) =>
        prevWords.map((word) => ({
          ...word,
          left: word.left - wordSpeed,
        }))
      );
      setIncorrectWords((prevWords) =>
        prevWords.map((word) => ({
          ...word,
          left: word.left - wordSpeed,
        }))
      );
    }, 10); // Update position every 10 milliseconds

    return () => clearInterval(updateWordsPosition);
  }, []);

  useEffect(() => {
    const handleWordCollisions = () => {
      const kateRect = document.getElementById("kate")?.getBoundingClientRect();
      if (!kateRect) return;

      const words = document.querySelectorAll(".word");
      words.forEach((word) => {
        const wordRect = word.getBoundingClientRect();
        const wordId = word.id;

        if (
          kateRect.top < wordRect.bottom &&
          kateRect.bottom > wordRect.top &&
          kateRect.left < wordRect.right &&
          kateRect.right > wordRect.left
        ) {
          handleCollision(wordId); // Call handleCollision with the word id
        }
      });
    };

    const collisionInterval = setInterval(handleWordCollisions, 100); // Check collisions every 100 milliseconds
    return () => clearInterval(collisionInterval);
  }, [handleCollision]);

  return (
    <>
      <div className="english"></div>
      {correctWords.map((word) => (
        <div
          key={word.id}
          id={"correct" + word.id}
          className="word correct-word"
          style={{ left: word.left, top: 300 }}
        >
          {word.word}
        </div>
      ))}
      {incorrectWords.map((word) => (
        <div
          key={word.id}
          id={"incorect" + word.id}
          className="word incorrect-word"
          style={{ left: word.left, top: 300 }}
        >
          {word.word}
        </div>
      ))}
    </>
  );
};

export default English;
