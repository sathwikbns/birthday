import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Star = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary-foreground"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
    transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay }}
  />
);

const stars = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 3,
}));

interface Props {
  onEnter: () => void;
}

const FULL_TEXT = "Today is the birthday of someone truly irreplaceable…";
const NAME = "Priyanka.";

const MagicalEntry = ({ onEnter }: Props) => {
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState("");
  const [namePart, setNamePart] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Typewriter effect
  useEffect(() => {
    if (phase !== 1) return;
    let i = 0;
    const t = setInterval(() => {
      if (i < FULL_TEXT.length) {
        setTyped(FULL_TEXT.slice(0, i + 1));
        i++;
      } else {
        clearInterval(t);
        // After main text, type the name
        let j = 0;
        const nt = setInterval(() => {
          if (j < NAME.length) {
            setNamePart(NAME.slice(0, j + 1));
            j++;
          } else {
            clearInterval(nt);
            // Show portal after name typed
            setTimeout(() => setPhase(2), 800);
          }
        }, 90);
      }
    }, 40);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    return () => clearTimeout(t1);
  }, []);

  // Parallax mouse tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <motion.section
      className="fixed inset-0 z-50 starry-bg flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Parallax star layers */}
      <motion.div
        className="absolute inset-0"
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        {stars.slice(0, 40).map((s) => (
          <Star key={s.id} delay={s.delay} x={s.x} y={s.y} size={s.size} />
        ))}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        animate={{ x: mousePos.x * 1.2, y: mousePos.y * 1.2 }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >
        {stars.slice(40).map((s) => (
          <Star key={s.id} delay={s.delay} x={s.x} y={s.y} size={s.size * 1.5} />
        ))}
      </motion.div>

      {/* Moon */}
      <motion.div
        className="absolute top-12 right-16 w-20 h-20 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(45 90% 90%), hsl(45 60% 70%))",
          boxShadow: "0 0 40px hsl(45 80% 75% / 0.6), 0 0 80px hsl(45 80% 75% / 0.3)",
        }}
        animate={{ y: [0, -8, 0], x: [mousePos.x * 0.3, mousePos.x * 0.3, mousePos.x * 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Phase 1: Typewriter text */}
      {phase >= 1 && phase < 2 && (
        <motion.div
          className="text-center px-6 z-10 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-4xl font-display" style={{ color: "hsl(45 90% 85%)" }}>
            {typed}
            {typed.length < FULL_TEXT.length && (
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>|</motion.span>
            )}
          </h1>
          {typed === FULL_TEXT && (
            <motion.p
              className="text-3xl md:text-5xl font-display mt-6"
              style={{ color: "hsl(260 60% 85%)" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              {namePart}
              {namePart.length < NAME.length && (
                <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>|</motion.span>
              )}
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Phase 2: Portal */}
      {phase >= 2 && (
        <motion.div
          className="flex flex-col items-center z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <motion.div
            className="w-48 h-48 md:w-64 md:h-64 rounded-full cursor-pointer relative"
            style={{
              background: "radial-gradient(circle, hsl(260 60% 80% / 0.6), hsl(200 70% 75% / 0.3), transparent)",
              boxShadow: "0 0 60px hsl(260 60% 70% / 0.5), 0 0 120px hsl(200 70% 75% / 0.3), inset 0 0 60px hsl(260 60% 80% / 0.3)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 60px hsl(260 60% 70% / 0.5), 0 0 120px hsl(200 70% 75% / 0.3)",
                "0 0 80px hsl(260 60% 70% / 0.8), 0 0 160px hsl(200 70% 75% / 0.5)",
                "0 0 60px hsl(260 60% 70% / 0.5), 0 0 120px hsl(200 70% 75% / 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            onClick={onEnter}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl">✨</span>
            </div>
          </motion.div>
          <motion.p
            className="mt-8 text-xl font-display"
            style={{ color: "hsl(45 90% 85%)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap the portal to enter…
          </motion.p>
        </motion.div>
      )}
    </motion.section>
  );
};

export default MagicalEntry;
