import React, { useEffect, useRef, useState } from "react";

const Kate: React.FC = () => {
  const kateRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(10);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const kate = kateRef.current;
      if (!kate) return;

      const { top, left } = kate.getBoundingClientRect();

      switch (event.key) {
        case "ArrowUp":
          if (top > 0) kate.style.top = `${top - step}px`;
          break;
        case "ArrowDown":
          if (top < window.innerHeight - kate.clientHeight)
            kate.style.top = `${top + step}px`;
          break;
        case "ArrowLeft":
          if (left > 0) kate.style.left = `${left - step}px`;
          break;
        case "ArrowRight":
          if (left < window.innerWidth - kate.clientWidth)
            kate.style.left = `${left + step}px`;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [step]);

  return <div ref={kateRef} className="kate" />;
};

export default Kate;
