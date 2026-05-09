import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FRIEND_NAME } from "@/config/priyanka";

const milestones = [
  "Booting friendship memory banks…",
  `Loading inside jokes with ${FRIEND_NAME}…`,
  "Compressing a million smiles…",
  "Counting all the times she guided you…",
  "Converting trust into pure stardust…",
  "Wrapping every memory with love…",
  "Almost ready for the most beautiful girl…",
  `Ready. Happy Birthday, ${FRIEND_NAME}! 🎂`,
];

const LOADING_STARS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  top: 5 + i * 13,
  left: 3 + i * 14,
  delay: i * 2.2 + 0.8,
  dur: 2.2 + i * 0.35,
  width: 90 + i * 22,
}));

interface Props {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: Props) => {
  const [progress, setProgress] = useState(0);
  const [milestoneIdx, setMilestoneIdx] = useState(0);
  const [exiting, setExiting] = useState(false);

  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: `${(i * 17 + 3) % 100}%`,
    y: `${(i * 23 + 7) % 100}%`,
    size: (i % 3) + 1,
    dur: 2 + (i % 3),
    delay: (i % 5) * 0.4,
  }));

  useEffect(() => {
    const totalMs = 5000;
    const interval = 50;
    const steps = totalMs / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const pct = Math.min(Math.round((step / steps) * 100), 100);
      setProgress(pct);
      const mIdx = Math.min(Math.floor((pct / 100) * milestones.length), milestones.length - 1);
      setMilestoneIdx(mIdx);
      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 700);
        }, 600);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-8 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #08061a 0%, #0d0a1f 50%, #0a0616 100%)" }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Shooting stars */}
          <style>{`
            @keyframes loadShoot {
              0%   { transform: translateX(0) translateY(0) rotate(-35deg); opacity: 0; }
              8%   { opacity: 1; }
              100% { transform: translateX(110vw) translateY(110vh) rotate(-35deg); opacity: 0; }
            }
          `}</style>
          {LOADING_STARS.map((s) => (
            <div
              key={s.id}
              style={{
                position: "absolute",
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: `${s.width}px`,
                height: "2px",
                borderRadius: "9999px",
                background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(210,188,255,0.9) 55%, #fff 100%)",
                boxShadow: "0 0 6px 1px rgba(210,188,255,0.5)",
                animation: `loadShoot ${s.dur}s linear ${s.delay}s infinite`,
                zIndex: 0,
              }}
            />
          ))}

          {/* Twinkling background stars */}
          {stars.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{ left: s.x, top: s.y, width: s.size, height: s.size }}
              animate={{ opacity: [0.05, 0.8, 0.05] }}
              transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
            />
          ))}

          {/* Animated aurora background */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(ellipse 60% 50% at 25% 55%, rgba(210,188,255,0.14) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 75% 40%, rgba(255,180,166,0.08) 0%, transparent 60%)",
                "radial-gradient(ellipse 60% 50% at 75% 45%, rgba(255,180,166,0.12) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 25% 60%, rgba(210,188,255,0.08) 0%, transparent 60%)",
                "radial-gradient(ellipse 60% 50% at 25% 55%, rgba(210,188,255,0.14) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 75% 40%, rgba(255,180,166,0.08) 0%, transparent 60%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,3,15,0.7) 100%)"
          }} />

          {/* Main content */}
          <div className="text-center max-w-sm w-full z-10">

            {/* Logo icon — orbit rings + heart */}
            <div className="relative flex items-center justify-center mb-10" style={{ height: 100 }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 56 + i * 26,
                    height: 56 + i * 26,
                    border: `1px solid rgba(${i === 0 ? "255,180,166" : i === 1 ? "210,188,255" : "233,193,118"},${0.45 - i * 0.1})`,
                    boxShadow: `0 0 ${8 + i * 4}px rgba(${i === 0 ? "255,180,166" : i === 1 ? "210,188,255" : "233,193,118"},${0.1 - i * 0.02})`,
                  }}
                  animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
                  transition={{ duration: 5 + i * 2.5, repeat: Infinity, ease: "linear" }}
                >
                  {/* Dot on ring */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 5, height: 5,
                      top: -2.5, left: "50%",
                      transform: "translateX(-50%)",
                      background: i === 0 ? "#ffb4a6" : i === 1 ? "#d2bcff" : "#e9c176",
                      boxShadow: `0 0 8px ${i === 0 ? "#ffb4a6" : i === 1 ? "#d2bcff" : "#e9c176"}`,
                    }}
                  />
                </motion.div>
              ))}
              {/* Center pulsing heart */}
              <motion.svg
                width="26" height="26" viewBox="0 0 24 24" fill="none"
                stroke="#ffb4a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="rgba(255,180,166,0.15)" />
              </motion.svg>
            </div>

            {/* Title */}
            <motion.h1
              className="font-display mb-2"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2rem)",
                fontWeight: 900,
                background: "linear-gradient(135deg, #ffffff 0%, #d2bcff 40%, #ffb4a6 80%, #e9c176 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.01em",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Something magical is loading…
            </motion.h1>

            <motion.p
              className="font-body mb-8"
              style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "rgba(210,188,255,0.35)", textTransform: "uppercase" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Nocturne Cinema
            </motion.p>

            {/* Progress bar track */}
            <div
              className="w-full rounded-full mb-3 overflow-hidden relative"
              style={{ height: 3, background: "rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4)" }}
            >
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  background: "linear-gradient(90deg, #d2bcff, #ffb4a6, #e9c176)",
                  boxShadow: "0 0 14px rgba(210,188,255,0.9), 0 0 4px rgba(255,180,166,0.6)",
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.08 }}
              />
            </div>

            {/* Progress % and tagline */}
            <div className="flex justify-between mb-8 px-0.5">
              <span className="font-body" style={{ fontSize: "0.65rem", color: "rgba(210,188,255,0.5)", letterSpacing: "0.1em" }}>
                {progress}%
              </span>
              <motion.span
                className="font-script"
                style={{ fontSize: "0.75rem", color: "rgba(255,180,166,0.4)" }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                made with love ♡
              </motion.span>
            </div>

            {/* Milestone text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={milestoneIdx}
                className="font-body"
                style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)", color: "rgba(210,188,255,0.7)", lineHeight: 1.6 }}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
              >
                {milestones[milestoneIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
