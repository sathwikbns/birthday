import { motion } from "framer-motion";
import { FRIEND_NAME, getTurningAge } from "@/config/priyanka";

const CinematicHero = () => {
  const age = getTurningAge();

  return (
    <section className="relative w-full flex flex-col items-center justify-center text-center px-6 py-20">
      {/* Ambient glow ring behind heading */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "min(800px, 100vw)",
          height: "min(800px, 100vw)",
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 60%)",
          top: "50%",
          left: "50%",
          translate: "-50% -50%",
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
        {/* Eyebrow / Age Badge */}
        <motion.div
          className="mb-8 inline-flex items-center justify-center px-6 py-1.5 rounded-full font-body font-medium"
          style={{
            fontSize: "var(--t-sm)",
            background: "rgba(255,180,166,0.07)",
            border: "1px solid rgba(255,180,166,0.3)",
            color: "var(--nc-primary)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            backdropFilter: "blur(10px)",
            boxShadow: "0 0 20px rgba(255,180,166,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span style={{ color: "var(--nc-secondary)", marginRight: 10 }}>✦</span>
          Chapter {age}
          <span style={{ color: "var(--nc-secondary)", marginLeft: 10 }}>✦</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="font-display font-normal leading-[0.95] tracking-[-0.02em] mb-8"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            color: "#f0e8ff",
            textShadow: "0 0 80px rgba(210,188,255,0.3), 0 10px 40px rgba(0,0,0,0.6)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Happy Birthday,
          <br />
          <em
            className="not-italic"
            style={{
              background: "linear-gradient(135deg, #d2bcff 0%, #ffb4a6 50%, #e9c176 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(210,188,255,0.4))",
            }}
          >
            {FRIEND_NAME}.
          </em>
        </motion.h1>

        {/* Cinematic subtitle */}
        <motion.p
          className="font-body leading-relaxed max-w-2xl"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(232,220,255,0.75)",
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          The universe designed something extraordinary on this day. A quiet celebration of presence, meaning, and the rare kind of energy you bring to the world.
        </motion.p>

        {/* Scroll hint - Minimalist vertical line */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.div
            style={{
              width: "1px",
              height: "64px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
            }}
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3], transformOrigin: "top" }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span
            className="font-body uppercase"
            style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--muted-foreground)" }}
          >
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicHero;
