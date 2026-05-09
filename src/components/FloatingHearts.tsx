import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Hearts-only pool — every variety with its matching glow colour
const EMOJI_POOL: { emoji: string; glow: string }[] = [
  { emoji: "❤️",  glow: "rgba(255,  80,  80, 0.55)" },  // Classic red
  { emoji: "🧡",  glow: "rgba(255, 150,  50, 0.50)" },  // Orange
  { emoji: "💛",  glow: "rgba(255, 220,  60, 0.50)" },  // Yellow
  { emoji: "💚",  glow: "rgba( 80, 200, 120, 0.45)" },  // Green
  { emoji: "💙",  glow: "rgba( 80, 160, 255, 0.50)" },  // Blue
  { emoji: "💜",  glow: "rgba(180, 100, 255, 0.50)" },  // Purple
  { emoji: "🖤",  glow: "rgba(100,  80, 120, 0.40)" },  // Black
  { emoji: "🤍",  glow: "rgba(255, 255, 255, 0.40)" },  // White
  { emoji: "💗",  glow: "rgba(255, 160, 200, 0.50)" },  // Pink beating
  { emoji: "💖",  glow: "rgba(255, 105, 180, 0.55)" },  // Sparkling
  { emoji: "💕",  glow: "rgba(255, 180, 200, 0.45)" },  // Two hearts
  { emoji: "💞",  glow: "rgba(255, 130, 170, 0.50)" },  // Revolving
  { emoji: "💓",  glow: "rgba(255, 100, 140, 0.50)" },  // Beating
  { emoji: "💝",  glow: "rgba(255,  80, 130, 0.50)" },  // Heart with ribbon
  { emoji: "🩷",  glow: "rgba(255, 160, 190, 0.50)" },  // Light pink
];

const FloatingHearts = () => {
  const [items, setItems] = useState<
    { id: number; left: number; delay: number; size: number; duration: number; emoji: string; glow: string; drift: number }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 50 }).map((_, i) => {
      const pick = EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
      return {
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 22,
        size: Math.random() * 1.4 + 0.5,
        duration: Math.random() * 14 + 16, // 16–30 s — very slow drift
        emoji: pick.emoji,
        glow: pick.glow,
        drift: (Math.random() - 0.5) * 22,
      };
    });
    setItems(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((h) => (
        <motion.div
          key={h.id}
          className="absolute select-none"
          style={{
            fontSize: `${h.size * 1.8}rem`,
            filter: `drop-shadow(0 0 10px ${h.glow})`,
          }}
          initial={{ y: "-10vh", x: `${h.left}vw`, scale: h.size, opacity: 0 }}
          animate={{
            y: "110vh",
            x: `${h.left + h.drift}vw`,
            opacity: [0, 0.55, 0.55, 0],
            rotate: [-12, 12, -12],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "linear",
          }}
        >
          {h.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
