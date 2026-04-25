import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FRIEND_NAME } from "@/config/priyanka";

const milestones = [
  "Booting friendship memory banks...",
  `Loading inside jokes with ${FRIEND_NAME}...`,
  "Compressing a million smiles...",
  "Counting all the times she guided you...",
  "Converting trust into pure stardust...",
  "Wrapping every memory with love...",
  "Almost ready for the most beautiful girl...",
  `Ready. Happy Birthday, ${FRIEND_NAME}! 🎂`,
];

/* Shooting stars that appear during loading */
const LOADING_STARS = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  top: 5 + i * 14,
  left: 5 + i * 12,
  delay: i * 2.5 + 1,
  dur: 2 + i * 0.4,
  width: 80 + i * 20,
}));

interface Props {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: Props) => {
  const [progress, setProgress] = useState(0);
  const [milestoneIdx, setMilestoneIdx] = useState(0);
  const [exiting, setExiting] = useState(false);

  /* Twinkling star positions (stable, computed once) */
  const stars = Array.from({ length: 70 }, (_, i) => ({
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
          style={{ background: "#0a0816" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7 }}
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
              animate={{ opacity: [0.1, 0.9, 0.1] }}
              transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
            />
          ))}

          {/* Aurora glow behind content */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(210,188,255,0.12) 0%, transparent 70%)",
                "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(255,180,166,0.10) 0%, transparent 70%)",
                "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(210,188,255,0.12) 0%, transparent 70%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main content */}
          <div className="text-center max-w-md w-full z-10">
            {/* Animated particle burst icon */}
            <motion.div
              className="text-6xl mb-8 block relative inline-block"
              animate={{ scale: [1, 1.15, 1], rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {/* Orbiting particles */}
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <motion.span
                  key={i}
                  className="absolute text-sm"
                  style={{ top: "50%", left: "50%", transformOrigin: "0 0" }}
                  animate={{ rotate: [deg, deg + 360] }}
                  transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "linear" }}
                >
                  <span style={{
                    display: "inline-block",
                    transform: `translate(-50%, -50%) translateX(${30 + i * 4}px)`,
                    fontSize: `${8 + i}px`,
                  }}>
                    {["✨", "🌸", "💙", "⭐", "🧸"][i]}
                  </span>
                </motion.span>
              ))}
              💙
            </motion.div>

            <motion.h1
              className="text-2xl md:text-3xl font-display mb-10"
              style={{
                background: "linear-gradient(135deg, #d2bcff, #ffb4a6, #e9c176)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Something magical is loading...
            </motion.h1>

            {/* Progress bar */}
            <div className="w-full rounded-full h-3 mb-3 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #d2bcff, #ffb4a6, #e9c176)",
                  boxShadow: "0 0 14px rgba(210,188,255,0.7)",
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.08 }}
              />
            </div>

            <div className="flex justify-between mb-6 px-1">
              <span className="text-sm font-body" style={{ color: "rgba(210,188,255,0.6)" }}>
                {progress}%
              </span>
              <motion.span
                className="text-sm font-body"
                style={{ color: "rgba(210,188,255,0.6)" }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✨ made with love ✨
              </motion.span>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={milestoneIdx}
                className="text-base md:text-lg font-body"
                style={{ color: "rgba(210,188,255,0.75)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
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
