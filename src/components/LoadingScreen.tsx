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

interface Props {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: Props) => {
  const [progress, setProgress] = useState(0);
  const [milestoneIdx, setMilestoneIdx] = useState(0);
  const [exiting, setExiting] = useState(false);

  const stars = Array.from({ length: 60 }, (_, i) => ({
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
      const mIdx = Math.min(
        Math.floor((pct / 100) * milestones.length),
        milestones.length - 1
      );
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
          className="fixed inset-0 z-[100] starry-bg flex flex-col items-center justify-center px-8"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7 }}
        >
          {stars.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{ left: s.x, top: s.y, width: s.size, height: s.size }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
            />
          ))}

          <div className="text-center max-w-md w-full z-10">
            <motion.div
              className="text-7xl mb-8 block"
              animate={{ scale: [1, 1.2, 1], rotate: [-8, 8, -8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💙
            </motion.div>

            <motion.h1
              className="text-2xl md:text-3xl font-display mb-10"
              style={{ color: "hsl(45 90% 85%)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Something magical is loading...
            </motion.h1>

            <div className="w-full bg-white/10 rounded-full h-3 mb-3 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(260 60% 70%), hsl(200 70% 75%), hsl(45 90% 65%))",
                  boxShadow: "0 0 12px hsl(260 60% 70% / 0.8)",
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.08 }}
              />
            </div>

            <div className="flex justify-between mb-6 px-1">
              <span className="text-sm font-body" style={{ color: "hsl(260 40% 75%)" }}>
                {progress}%
              </span>
              <motion.span
                className="text-sm font-body"
                style={{ color: "hsl(260 40% 75%)" }}
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
                style={{ color: "hsl(270 30% 80%)" }}
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
