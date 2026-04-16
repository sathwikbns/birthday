import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FRIEND_NAME } from "@/config/priyanka";

const VirtualHug = () => {
  const [hugging, setHugging] = useState(false);

  const triggerHug = () => {
    if (hugging) return;
    setHugging(true);
    // Let the hug linger for a realistic amount of time (5 seconds)
    setTimeout(() => setHugging(false), 5000); 
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 left-6 z-40 bg-pink-500/20 hover:bg-pink-500/40 text-pink-200 rounded-full w-16 h-16 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)] border border-pink-400/50 backdrop-blur-md"
        whileHover={{ scale: 1.15, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -8, 0], boxShadow: ["0 0 10px rgba(236,72,153,0.2)", "0 0 30px rgba(236,72,153,0.6)", "0 0 10px rgba(236,72,153,0.2)"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        onClick={triggerHug}
        title="Send a Virtual Hug 🤗"
      >
        <span className="text-3xl drop-shadow-lg">🤗</span>
      </motion.button>

      <AnimatePresence>
        {hugging && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden"
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(30,10,30,0.6)" }} // Warm dark tint, like closing your eyes
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
            transition={{ duration: 1 }}
          >
            {/* The Left Arm Wrapping */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[50vw] bg-gradient-to-r from-pink-500/40 via-pink-400/20 to-transparent blur-[80px]"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: [0, 0.8, 0.5, 0] }}
              transition={{ duration: 4.5, ease: "easeInOut" }}
            />

            {/* The Right Arm Wrapping */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[50vw] bg-gradient-to-l from-indigo-500/40 via-purple-400/20 to-transparent blur-[80px]"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: [0, 0.8, 0.5, 0] }}
              transition={{ duration: 4.5, ease: "easeInOut" }}
            />

            {/* The Heartbeat/Squeeze pulse of warmth in the center */}
            <motion.div
              className="absolute inset-0 bg-pink-500/10 mix-blend-screen"
              animate={{ opacity: [0, 0.6, 0.2, 0.8, 0] }}
              transition={{ duration: 4, times: [0, 0.3, 0.5, 0.7, 1] }}
            />

            {/* Slow, gentle floating warmth/hearts from the bottom */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-5xl md:text-7xl drop-shadow-[0_0_15px_#ec4899]"
                initial={{ 
                  y: "110vh", 
                  x: `${(Math.random() * 80) + 10}vw`, 
                  opacity: 0, 
                  scale: 0.5 
                }}
                animate={{ 
                  y: "-20vh", 
                  opacity: [0, 0.8, 0.8, 0], 
                  scale: [0.5, 1.2, 1], 
                  rotate: (Math.random() - 0.5) * 40 
                }}
                transition={{ 
                  duration: 4 + Math.random() * 2, 
                  ease: "easeOut", 
                  delay: Math.random() * 0.8 
                }}
              >
                {Math.random() > 0.3 ? "💖" : "✨"}
              </motion.div>
            ))}

            <motion.div
              className="bg-background/40 backdrop-blur-3xl px-10 py-8 rounded-[3rem] shadow-[0_0_50px_rgba(236,72,153,0.3)] border border-pink-500/30 relative z-10 max-w-lg text-center"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: [0.8, 1.05, 1], y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            >
              {/* Internal glow */}
              <div className="absolute inset-0 bg-pink-400/10 blur-2xl rounded-full" />
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-5xl mb-4 relative z-10"
              >
                🤗
              </motion.div>
              
              <p className="text-2xl md:text-3xl font-display text-pink-200 relative z-10 leading-snug">
                *Squeeeezes you tightly*
              </p>
              <p className="font-body text-white/80 mt-4 relative z-10 text-lg">
                Sending you the biggest, warmest hug in the universe right now, {FRIEND_NAME}! ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VirtualHug;
