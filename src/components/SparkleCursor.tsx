import { useEffect } from "react";
import confetti from "canvas-confetti";

const SparkleCursor = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Create a tiny magical burst exactly where the user clicks
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // Make a tiny burst of stars and hearts
      const scalar = 2;
      const heart = confetti.shapeFromText({ text: "💖", scalar });
      const star = confetti.shapeFromText({ text: "✨", scalar });

      confetti({
        particleCount: 15,
        spread: 40,
        startVelocity: 15,
        origin: { x, y },
        shapes: [heart, star],
        gravity: 0.5,
        ticks: 50,
        zIndex: 9999, // very high so it's always on top
      });
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return null; // purely logic component
};

export default SparkleCursor;
