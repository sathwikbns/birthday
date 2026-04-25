import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Emoji pool with glow colour per type
const EMOJI_POOL: { emoji: string; glow: string }[] = [
  { emoji: "🧸", glow: "rgba(210,160,100,0.5)" },   // Teddy bear — warm amber
  { emoji: "💖", glow: "rgba(255,105,180,0.5)" },   // Sparkling heart
  { emoji: "💕", glow: "rgba(255,180,200,0.4)" },   // Two hearts
  { emoji: "🎀", glow: "rgba(255,100,160,0.45)" },  // Ribbon bow
  { emoji: "🌸", glow: "rgba(255,183,197,0.45)" },  // Cherry blossom
  { emoji: "🌟", glow: "rgba(255,230,100,0.5)" },   // Star
  { emoji: "🦋", glow: "rgba(180,130,255,0.45)" },  // Butterfly
  { emoji: "🍰", glow: "rgba(255,160,120,0.4)" },   // Cake slice
  { emoji: "🎈", glow: "rgba(255,80,80,0.4)" },     // Balloon
  { emoji: "✨", glow: "rgba(255,255,180,0.5)" },   // Sparkle
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
            rotate: h.emoji === "🧸" ? [0, -8, 8, 0] : [0, 180, 360],
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
