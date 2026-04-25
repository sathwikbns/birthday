import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WHY_SHE_MATTERS, FRIEND_NAME } from "@/config/priyanka";

/* Unique colour per star — shifts the nebula hue when clicked */
const STAR_COLORS = [
  { hue: 330, label: "rose",    glow: "#ff7eb3", bg: "rgba(255,126,179,0.18)" },
  { hue: 270, label: "violet",  glow: "#c084fc", bg: "rgba(192,132,252,0.18)" },
  { hue: 210, label: "sky",     glow: "#60c8fa", bg: "rgba(96,200,250,0.18)"  },
  { hue: 45,  label: "gold",    glow: "#f5c842", bg: "rgba(245,200,66,0.18)"  },
  { hue: 160, label: "mint",    glow: "#34d399", bg: "rgba(52,211,153,0.18)"  },
  { hue: 300, label: "fuchsia", glow: "#e879f9", bg: "rgba(232,121,249,0.18)" },
  { hue: 20,  label: "peach",   glow: "#fb9678", bg: "rgba(251,150,120,0.18)" },
  { hue: 240, label: "blue",    glow: "#818cf8", bg: "rgba(129,140,248,0.18)" },
  { hue: 350, label: "pink",    glow: "#f472b6", bg: "rgba(244,114,182,0.18)" },
];

const WhyYouMatterGalaxy = () => {
  const [revealed, setRevealed] = useState<number | null>(null);
  const [activeHue, setActiveHue] = useState<number | null>(null);

  const handleStarClick = (i: number) => {
    const next = revealed === i ? null : i;
    setRevealed(next);
    setActiveHue(next !== null ? STAR_COLORS[i % STAR_COLORS.length].hue : null);
  };

  const activeColor = revealed !== null ? STAR_COLORS[revealed % STAR_COLORS.length] : null;

  return (
    <section
      className="py-20 px-4 relative overflow-hidden transition-all duration-700"
      style={{
        minHeight: "650px",
        /* Nebula hue-shift: entire background rotates hue on click */
        filter: activeHue !== null ? `hue-rotate(${activeHue - 270}deg)` : "none",
        transition: "filter 0.8s ease",
      }}
    >
      {/* Deep Space Background */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at bottom, hsl(280 60% 8%) 0%, hsl(260 70% 3%) 100%)" }} />
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.7) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Active colour nebula burst behind stars */}
      <AnimatePresence>
        {activeColor && (
          <motion.div
            key={activeColor.hue}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 50%, ${activeColor.bg} 0%, transparent 65%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-10 font-display text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="chapter-label justify-center mb-3" style={{ color: "var(--nc-secondary)" }}>✦ Your universe</p>
        <h2 className="text-4xl md:text-5xl text-glow bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 pb-2">
          Your Constellation 🌌
        </h2>
        <p className="text-lg text-pink-200/80 font-body">
          Tap each glowing star to shift the cosmos ✨
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto z-10" style={{ height: "480px" }}>

        {/* Constellation SVG Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {WHY_SHE_MATTERS.map((star, i) => {
            if (i === 0) return null;
            const prev = WHY_SHE_MATTERS[i - 1];
            return (
              <motion.line
                key={i}
                x1={`${prev.x}%`} y1={`${prev.y}%`}
                x2={`${star.x}%`} y2={`${star.y}%`}
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
              <stop offset="0%"   stopColor="hsl(330, 100%, 70%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(280, 100%, 70%)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Stars */}
        {WHY_SHE_MATTERS.map((r, i) => {
          const col = STAR_COLORS[i % STAR_COLORS.length];
          const isActive = revealed === i;
          return (
            <motion.div
              key={i}
              className="absolute cursor-pointer group"
              style={{ left: `${r.x}%`, top: `${r.y}%`, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: i * 0.3 }}
              onClick={() => handleStarClick(i)}
            >
              <div className="relative flex items-center justify-center">
                {/* Core */}
                <motion.div
                  className="w-3 h-3 rounded-full z-20"
                  style={{ background: col.glow, boxShadow: `0 0 12px ${col.glow}` }}
                  animate={{
                    scale: isActive ? [1, 1.6, 1.3] : [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ duration: 1.5 + (i % 2), repeat: Infinity }}
                />
                {/* Inner glow */}
                <motion.div
                  className="absolute w-8 h-8 rounded-full blur-[5px] z-10"
                  style={{ background: col.glow + "80" }}
                  animate={{ scale: isActive ? [1.5, 2.5, 1.5] : [1, 1.5, 1] }}
                  transition={{ duration: 2 + (i % 2.5), repeat: Infinity }}
                />
                {/* Outer halo */}
                <motion.div
                  className="absolute w-16 h-16 rounded-full blur-[15px] z-0"
                  style={{ background: col.glow + "40" }}
                  animate={{ scale: isActive ? [2, 3.5, 2] : [1, 2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3 + (i % 2), repeat: Infinity }}
                />
                {/* Hover label */}
                <div className="absolute top-10 whitespace-nowrap text-xs text-white/50 font-body opacity-0 group-hover:opacity-100 transition-opacity">
                  {isActive ? "Close ✕" : "Expand 💫"}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Reveal popup */}
      <AnimatePresence>
        {revealed !== null && activeColor && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,8,22,0.75)", backdropFilter: "blur(16px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setRevealed(null); setActiveHue(null); }}
          >
            <motion.div
              className="relative rounded-3xl p-10 max-w-md w-full text-center overflow-hidden"
              style={{
                background: "rgba(20,16,38,0.85)",
                border: `2px solid ${activeColor.glow}55`,
                boxShadow: `0 0 60px ${activeColor.glow}30, 0 30px 60px rgba(0,0,0,0.5)`,
              }}
              initial={{ scale: 0, rotate: -5, y: 50 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Inner nebula glow matching the star */}
              <div className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${activeColor.bg} 0%, transparent 60%)` }} />

              {/* Close */}
              <button
                className="absolute top-4 right-5 text-2xl font-body transition-colors"
                style={{ color: activeColor.glow + "aa" }}
                onClick={() => { setRevealed(null); setActiveHue(null); }}
              >×</button>

              {/* Star icon */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${activeColor.glow}88, ${activeColor.glow}44)`,
                    border: `2px solid ${activeColor.glow}66`,
                    boxShadow: `0 0 24px ${activeColor.glow}`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >⭐</motion.div>
              </div>

              <h3 className="text-2xl font-display mt-6 mb-4" style={{ color: activeColor.glow }}>
                You Are…
              </h3>
              <p className="text-xl font-body text-white leading-relaxed">
                {WHY_SHE_MATTERS[revealed].text}
              </p>

              <p className="mt-6 font-body text-xs uppercase tracking-widest" style={{ color: activeColor.glow + "80" }}>
                {FRIEND_NAME}'s constellation · Star {revealed + 1} of {WHY_SHE_MATTERS.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WhyYouMatterGalaxy;
