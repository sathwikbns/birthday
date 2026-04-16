import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SECRET_MESSAGES, FRIEND_NAME } from "@/config/priyanka";
import confetti from "canvas-confetti";

const SecretMessageVault = () => {
  const [opened, setOpened] = useState(false);
  const [currentMsg, setCurrentMsg] = useState(0);
  const [fillAmount, setFillAmount] = useState(0);
  const intervalRef = useRef<any>(null);

  const startUnlock = () => {
    if (opened) return;
    let progress = 0;
    // @ts-ignore
    intervalRef.current = setInterval(() => {
      progress += 2;
      setFillAmount(progress);
      if (progress >= 100) {
        clearInterval(intervalRef.current);
        setOpened(true);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#ec4899", "#8b5cf6", "#fbbf24"] });
      }
    }, 30);
  };

  const cancelUnlock = () => {
    if (opened) return;
    clearInterval(intervalRef.current);
    setFillAmount(0);
  };

  return (
    <section className="py-20 px-4 relative flex flex-col items-center justify-center min-h-[600px]">
      <motion.h2
        className="text-4xl md:text-5xl font-display text-center mb-12 text-glow"
        style={{ color: "hsl(340 80% 85%)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        The Secret Vault 🔐
      </motion.h2>

      <div className="flex flex-col items-center z-10 w-full max-w-md">
        {!opened ? (
          <motion.div
            className="flex flex-col items-center text-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="mb-12 font-body text-pink-200 text-lg">
              Authorized access only for {FRIEND_NAME}.
            </p>
            
            {/* Hold to unlock button */}
            <div className="relative w-40 h-40">
              {/* Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                <circle 
                  cx="80" cy="80" r="70" 
                  fill="none" 
                  stroke="url(#pinkGradient)" 
                  strokeWidth="8"
                  strokeDasharray="439.8"
                  strokeDashoffset={439.8 - (439.8 * fillAmount) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-75 ease-linear"
                  style={{ filter: "drop-shadow(0 0 8px #ec4899)" }}
                />
                <defs>
                  <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbcfe8" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Action Button */}
              <motion.button
                className="absolute inset-0 m-auto w-28 h-28 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.5)] border-4 border-background focus:outline-none"
                onPointerDown={startUnlock}
                onPointerUp={cancelUnlock}
                onPointerLeave={cancelUnlock}
                onContextMenu={(e) => e.preventDefault()} // Prevent right click menu on long press
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={fillAmount > 0 ? { scale: [1, 1.1, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] } : {}}
                transition={{ duration: 0.5, repeat: fillAmount > 0 ? Infinity : 0 }}
              >
                <span className="text-4xl">❤️</span>
              </motion.button>
            </div>
            
            <p className="mt-12 text-white/50 font-body animate-pulse font-medium tracking-widest uppercase text-sm">
              Press and hold to unlock
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="w-full relative"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            {/* The Vault Card */}
            <div className="absolute inset-0 bg-pink-500/10 blur-[50px] -z-10 rounded-full"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMsg}
                className="bg-card/60 backdrop-blur-3xl rounded-[2rem] p-10 text-center border border-pink-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[250px] flex flex-col items-center justify-center relative overflow-hidden"
                initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: -90, opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                {/* Internal Card Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 blur-[40px]"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-[40px]"></div>

                <span className="text-5xl mb-6 relative z-10 drop-shadow-md">💌</span>
                <p className="text-xl md:text-2xl font-body text-white leading-relaxed font-medium relative z-10 text-shadow-sm">
                  {SECRET_MESSAGES[currentMsg]}
                </p>
                <div className="mt-8 px-4 py-1 rounded-full bg-white/10 text-pink-200 text-sm font-body tracking-widest border border-white/20">
                  MEMORY {currentMsg + 1} OF {SECRET_MESSAGES.length}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots & Arrows */}
            <div className="flex items-center justify-between mt-8 px-6">
              <button
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-pink-500/40 text-white disabled:opacity-20 transition-all border border-white/20 backdrop-blur-md"
                disabled={currentMsg === 0}
                onClick={() => setCurrentMsg((p) => p - 1)}
              >
                ←
              </button>
              
              <div className="flex gap-2">
                {SECRET_MESSAGES.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 rounded-full transition-all duration-300 ${i === currentMsg ? 'w-6 bg-pink-500 glow-peach' : 'w-2 bg-white/20'}`}
                  />
                ))}
              </div>

              <button
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-pink-500/40 text-white disabled:opacity-20 transition-all border border-white/20 backdrop-blur-md"
                disabled={currentMsg === SECRET_MESSAGES.length - 1}
                onClick={() => setCurrentMsg((p) => p + 1)}
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SecretMessageVault;
