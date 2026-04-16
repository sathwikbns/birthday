import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EasterEggStar = () => {
  const [found, setFound] = useState(false);
  const [showBonus, setShowBonus] = useState(false);

  return (
    <>
      {/* Hidden star - small, tucked in corner */}
      <motion.button
        className="fixed bottom-4 right-4 z-30 text-lg opacity-20 hover:opacity-100 transition-opacity"
        onClick={() => { setFound(true); setShowBonus(true); }}
        whileHover={{ scale: 1.5, rotate: 180 }}
        title="You found me!"
      >
        ⭐
      </motion.button>

      <AnimatePresence>
        {showBonus && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBonus(false)}
          >
            <motion.div
              className="bg-card rounded-3xl p-10 max-w-md w-full text-center"
              style={{ boxShadow: "0 0 60px hsl(45 90% 65% / 0.5), 0 0 120px hsl(260 60% 70% / 0.3)" }}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="text-6xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🌟
              </motion.div>
              <h3 className="text-2xl font-display text-gold mt-4">Easter Egg Found!</h3>
              <p className="text-muted-foreground font-body mt-4 leading-relaxed">
                You're the kind of person who pays attention to the little things — 
                just like how you always notice when something's off with me. 
                That's one of a million reasons why you're the best. 
              </p>
              <p className="mt-4 text-lg">🌟 You are my brightest star 🌟</p>
              <button
                className="mt-6 px-6 py-2 rounded-full bg-gold text-foreground font-body font-semibold hover:opacity-90 transition"
                onClick={() => setShowBonus(false)}
              >
                Close ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEggStar;
