import { motion } from "framer-motion";
import { FRIEND_NAME, getTurningAge } from "@/config/priyanka";

const FLOATERS = [
  { emoji: "🧸", x: "8%",  y: "15%", dur: 5.0, size: "3rem",  delay: 0   },
  { emoji: "🌸", x: "85%", y: "10%", dur: 4.2, size: "2.5rem",delay: 0.8 },
  { emoji: "🎀", x: "75%", y: "75%", dur: 6.0, size: "2rem",  delay: 1.5 },
  { emoji: "✨", x: "15%", y: "80%", dur: 4.8, size: "2rem",  delay: 0.4 },
  { emoji: "💖", x: "50%", y: "88%", dur: 5.5, size: "2.5rem",delay: 2.0 },
  { emoji: "🌟", x: "90%", y: "45%", dur: 3.8, size: "2rem",  delay: 1.0 },
];

/**
 * CinematicHero — full-viewport cinematic opening section.
 * Giant gradient "Happy Birthday" heading, floating emoji particles,
 * a pulsing glow ring, age badge, and a scroll-down CTA.
 */
const CinematicHero = () => {
  const age = getTurningAge();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6"
      style={{
        background:
          "radial-gradient(ellipse at 30% 60%, rgba(42,10,58,0.9) 0%, transparent 60%), #0f0d17",
      }}
    >
      {/* Ambient glow ring behind heading */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "min(600px, 90vw)",
          height: "min(600px, 90vw)",
          background:
            "radial-gradient(ellipse at center, rgba(210,188,255,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          translate: "-50% -50%",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating emoji decorations */}
      {FLOATERS.map((f, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: f.x,
            top: f.y,
            fontSize: f.size,
            filter: "drop-shadow(0 0 12px rgba(210,188,255,0.5))",
          }}
          animate={{ y: [0, -14, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
        >
          {f.emoji}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-3xl">
        {/* Eyebrow */}
        <motion.p
          className="chapter-label justify-center mb-6"
          style={{ color: "var(--nc-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          ✦ A Special Day
        </motion.p>

        {/* Age badge */}
        <motion.div
          className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full font-body font-semibold"
          style={{
            fontSize: "var(--t-sm)",
            background: "rgba(233,193,118,0.12)",
            border: "1px solid rgba(233,193,118,0.35)",
            color: "var(--nc-secondary)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
        >
          🎂 Turning {age}
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="font-display font-black leading-none tracking-tight mb-6"
          style={{
            fontSize: "var(--t-hero)",
            background: "var(--grad-text)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Happy<br />Birthday<br />{FRIEND_NAME} 🎉
        </motion.h1>

        {/* Script subtitle */}
        <motion.p
          className="font-script leading-relaxed mb-10"
          style={{
            fontSize: "var(--t-2xl)",
            color: "var(--nc-on-muted)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          The universe made something extraordinary on this day.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <motion.div
            style={{
              width: "1px",
              height: "48px",
              background: "linear-gradient(to bottom, rgba(210,188,255,0.6), transparent)",
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span
            className="font-body uppercase tracking-widest"
            style={{ fontSize: "var(--t-label)", color: "rgba(210,188,255,0.4)" }}
          >
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicHero;
