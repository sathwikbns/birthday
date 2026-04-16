import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WHY_SHE_MATTERS, FRIEND_NAME } from "@/config/priyanka";

const WhyYouMatterGalaxy = () => {
  const [revealed, setRevealed] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ minHeight: "650px" }}>
      {/* Deep Space Background */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at bottom, hsl(280 60% 8%) 0%, hsl(260 70% 3%) 100%)" }} />
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.7) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <motion.div
        className="relative z-10 font-display text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl text-glow bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 pb-2">
          Your Constellation 🌌
        </h2>
        <p className="text-lg text-pink-200/80 font-body">Tap the glowing stars to read my mind...</p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto z-10" style={{ height: "480px" }}>
        
        {/* Constellation SVG Lines drawing beautifully */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {WHY_SHE_MATTERS.map((star, i) => {
            if (i === 0) return null;
            const prev = WHY_SHE_MATTERS[i - 1];
            return (
              <motion.line
                key={i}
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${star.x}%`}
                y2={`${star.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="4 6"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.3 }}
              />
            );
          })}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(330, 100%, 70%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(280, 100%, 70%)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* The Glowing Stars */}
        {WHY_SHE_MATTERS.map((r, i) => (
          <motion.div
            key={i}
            className="absolute cursor-pointer group"
            style={{ left: `${r.x}%`, top: `${r.y}%`, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: i * 0.3 }}
            onClick={() => setRevealed(revealed === i ? null : i)}
          >
            {/* Supernova physical render instead of emoji */}
            <div className="relative flex items-center justify-center">
              {/* Core */}
              <motion.div 
                className="w-3 h-3 bg-white rounded-full z-20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5 + (i % 2), repeat: Infinity }}
              />
              {/* Inner Glow */}
              <motion.div 
                className="absolute w-8 h-8 rounded-full bg-pink-400/50 blur-[5px] z-10"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2 + (i % 2.5), repeat: Infinity }}
              />
              {/* Outer Halo */}
              <motion.div 
                className="absolute w-16 h-16 rounded-full bg-indigo-500/30 blur-[15px] z-0"
                animate={{ scale: [1, 2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3 + (i % 2), repeat: Infinity }}
              />

              {/* Hover label hint */}
              <motion.div 
                className="absolute top-10 whitespace-nowrap text-xs text-white/50 font-body opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Expand 💫
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {revealed !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRevealed(null)}
          >
            <motion.div
              className="relative bg-background/50 backdrop-blur-2xl rounded-3xl p-10 max-w-md w-full text-center border-2 border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.3)]"
              initial={{ scale: 0, rotate: -5, y: 50 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button X */}
              <button 
                className="absolute top-4 right-6 text-white/50 hover:text-pink-400 transition-colors text-2xl font-body"
                onClick={() => setRevealed(null)}
              >×</button>
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-pink-400 to-indigo-500 border-4 border-background rounded-full flex items-center justify-center shadow-[0_0_30px_#ec4899] text-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.div>
              </div>

              <h3 className="text-2xl font-display text-pink-300 mt-6 mb-4">You Are...</h3>
              <p className="text-xl font-body text-white leading-relaxed font-medium">
                {WHY_SHE_MATTERS[revealed].text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WhyYouMatterGalaxy;
