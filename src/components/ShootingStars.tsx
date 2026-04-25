import { useEffect, useState } from "react";

interface Star {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  width: number;
}

/**
 * ShootingStars — periodic diagonal shooting stars across the background.
 * Pure CSS animation; no JS on every frame. Randomized starts at staggered delays.
 */
const ShootingStars = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      // Start from top-left quadrant spread so they cross diagonally
      top: Math.random() * 55,
      left: Math.random() * 60,
      delay: i * 3.2 + Math.random() * 4,
      duration: 2.4 + Math.random() * 1.4,
      width: 90 + Math.random() * 80,
    }));
    setStars(generated);
  }, []);

  return (
    <>
      <style>{`
        @keyframes shootingStar {
          0%   { transform: translateX(0) translateY(0) rotate(-35deg); opacity: 0; }
          8%   { opacity: 1; }
          100% { transform: translateX(110vw) translateY(110vh) rotate(-35deg); opacity: 0; }
        }
        .shooting-star {
          position: fixed;
          height: 2px;
          border-radius: 9999px;
          pointer-events: none;
          z-index: 0;
          animation: shootingStar linear infinite;
        }
      `}</style>
      {stars.map((s) => (
        <div
          key={s.id}
          className="shooting-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.width}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(233,193,118,0.9) 55%, rgba(255,255,255,1) 100%)",
            boxShadow: "0 0 6px 1px rgba(233,193,118,0.5)",
          }}
        />
      ))}
    </>
  );
};

export default ShootingStars;
