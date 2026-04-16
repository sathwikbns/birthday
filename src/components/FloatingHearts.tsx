import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<
    { id: number; left: number; delay: number; size: number; duration: number; type: string; drift: number }[]
  >([]);

  useEffect(() => {
    // Generate 40 beautiful glowing hearts that fall continuously
    const newHearts = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Random X position (0-100vw)
      delay: Math.random() * 20, // Stagger start time
      size: Math.random() * 1.5 + 0.5, // Random scale
      duration: Math.random() * 15 + 15, // Ultra slow floating (15-30s)
      type: Math.random() > 0.7 ? "💖" : Math.random() > 0.4 ? "💕" : "✨",
      drift: (Math.random() - 0.5) * 20, // Horizontal drift factor
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-3xl drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]"
          initial={{ y: "-10vh", x: `${h.left}vw`, scale: h.size, opacity: 0 }}
          animate={{
            y: "110vh",
            x: `${h.left + h.drift}vw`,
            opacity: [0, 0.5, 0.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "linear",
          }}
        >
          {h.type}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
