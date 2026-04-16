import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BIRTHDAY_WISHES, FRIEND_NAME } from "@/config/priyanka";

const leafPositions = [
  { x: 50, y: 8 }, { x: 30, y: 22 }, { x: 70, y: 22 },
  { x: 20, y: 40 }, { x: 50, y: 35 }, { x: 80, y: 40 },
  { x: 35, y: 55 }, { x: 65, y: 55 },
];

const WishTree = () => {
  const [revealedWish, setRevealedWish] = useState<number | null>(null);

  return (
    <section className="section-peach py-20 px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-display text-center mb-4"
        style={{ color: "hsl(20 60% 55%)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Wish Tree 🌳
      </motion.h2>
      <p className="text-center text-muted-foreground font-body mb-12">
        {FRIEND_NAME}, tap each leaf to reveal a birthday wish just for you! 🍃
      </p>

      <div className="relative max-w-md mx-auto" style={{ height: "400px" }}>
        {/* Tree trunk */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-24 rounded-t-lg"
          style={{ background: "hsl(30 40% 40%)" }}
        />

        {leafPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute cursor-pointer"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.3 }}
            onClick={() => setRevealedWish(i)}
          >
            <motion.span
              className="text-3xl md:text-4xl"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            >
              🍃
            </motion.span>
            {/* Revealed indicator */}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {revealedWish !== null && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRevealedWish(null)}
          >
            <motion.div
              className="bg-card rounded-3xl p-8 max-w-sm w-full text-center glow-peach"
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring" }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-5xl">🌿</span>
              <p className="text-lg font-body text-foreground mt-4 leading-relaxed">
                {BIRTHDAY_WISHES[revealedWish]}
              </p>
              <button
                className="mt-5 text-sm text-muted-foreground font-body"
                onClick={() => setRevealedWish(null)}
              >
                Close 🍃
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WishTree;
