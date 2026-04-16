import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface GameHeart {
  id: number;
  x: number;
  size: number;
  speed: number;
  emoji: string;
  hasMemory: boolean;
}

const heartEmojis = ["💖", "💝", "💕", "💗", "💓"];

const BirthdayGame = () => {
  const [playing, setPlaying] = useState(false);
  const [hearts, setHearts] = useState<GameHeart[]>([]);
  const [memoriesFound, setMemoriesFound] = useState(0);
  const [won, setWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const idRef = useRef(0);
  const goalMemories = 3;

  const spawnHeart = useCallback(() => {
    idRef.current++;
    const isMemory = Math.random() > 0.7; // 30% chance a heart contains a memory
    
    const heart: GameHeart = {
      id: idRef.current,
      x: Math.random() * 80 + 10, // 10% to 90% across screen
      size: Math.random() * 1.5 + 1.5, // 1.5rem to 3rem
      speed: Math.random() * 3 + 2, // 2s to 5s float time
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      hasMemory: isMemory,
    };
    
    setHearts((prev) => [...prev, heart]);
    
    // Automatically remove heart after it floats away
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== heart.id));
    }, heart.speed * 1000);
  }, []);

  useEffect(() => {
    if (!playing || won) return;
    const spawn = setInterval(spawnHeart, 800);
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { 
          setPlaying(false); 
          setHearts([]);
          return 0; 
        }
        return t - 1;
      });
    }, 1000);
    return () => { clearInterval(spawn); clearInterval(timer); };
  }, [playing, won, spawnHeart]);

  const popHeart = (h: GameHeart) => {
    // Remove heart
    setHearts((prev) => prev.filter((prevH) => prevH.id !== h.id));
    
    if (h.hasMemory) {
      // Memory found!
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#ec4899", "#fff", "#8b5cf6"]
      });
      
      setMemoriesFound((m) => {
        const next = m + 1;
        if (next >= goalMemories) {
          setTimeout(() => setWon(true), 500);
        }
        return next;
      });
    } else {
      // Just a normal pop
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { y: 0.5 },
        colors: ["#fff", "#fbcfe8"]
      });
    }
  };

  const startGame = () => {
    setPlaying(true);
    setMemoriesFound(0);
    setHearts([]);
    setWon(false);
    setTimeLeft(20);
  };

  return (
    <section className="py-20 px-4 min-h-[600px] flex flex-col justify-center relative overflow-hidden">
      <motion.h2
        className="text-4xl md:text-5xl font-display text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Memory Hearts 💖
      </motion.h2>
      <p className="text-center text-pink-200/80 font-body mb-8">
        Catch the floating hearts to find {goalMemories} hidden memories!
      </p>

      {!playing && !won && (
        <div className="text-center z-10 relative">
          {timeLeft === 0 && <p className="text-pink-300 mb-6 font-body">Time's up! You found {memoriesFound} memories. Try again! 💪</p>}
          <button
            className="px-8 py-3 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/50 font-body font-bold text-lg hover:bg-pink-500/40 transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] backdrop-blur-md"
            onClick={startGame}
          >
            {timeLeft === 0 ? "Try Again ✨" : "Start Catching ✨"}
          </button>
        </div>
      )}

      {playing && !won && (
        <div className="max-w-2xl mx-auto w-full z-10 relative">
          <div className="flex justify-between items-center mb-6 font-body font-semibold text-white bg-pink-900/40 backdrop-blur-md px-6 py-3 rounded-full border border-pink-500/30">
            <div className="flex items-center gap-2">
              <span>Memories:</span>
              <div className="flex gap-1">
                {Array.from({ length: goalMemories }).map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i < memoriesFound ? 'bg-pink-400 shadow-[0_0_10px_#ec4899]' : 'bg-white/20'}`} />
                ))}
              </div>
            </div>
            <span className={timeLeft <= 5 ? "text-red-400 animate-pulse" : "text-pink-200"}>
              ⏰ {timeLeft}s
            </span>
          </div>

          <div className="relative h-[400px] w-full rounded-3xl border border-pink-500/10 overflow-hidden bg-gradient-to-b from-transparent to-pink-900/10">
            <AnimatePresence>
              {hearts.map((heart) => (
                <motion.button
                  key={heart.id}
                  className="absolute rounded-full cursor-crosshair focus:outline-none flex items-center justify-center drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]"
                  style={{ 
                    left: `${heart.x}%`, 
                    fontSize: `${heart.size}rem`,
                  }}
                  initial={{ y: 450, opacity: 0, scale: 0 }}
                  animate={{ 
                    y: -100, 
                    opacity: [0, 1, 1, 0],
                    scale: 1,
                    x: [0, Math.random() * 40 - 20, 0] // Gentle swaying
                  }}
                  exit={{ scale: 0, opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ 
                    duration: heart.speed,
                    ease: "linear",
                    x: { duration: heart.speed, repeat: Infinity, repeatType: "mirror" }
                  }}
                  onClick={() => popHeart(heart)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 1.5, opacity: 0 }}
                >
                  {heart.emoji}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      <AnimatePresence>
        {won && (
          <motion.div
            className="text-center w-full z-20 relative h-[400px] flex flex-col justify-center items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-pink-500/10 blur-[100px] rounded-full -z-10" 
            />
            
            <span className="text-7xl drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">📸</span>
            <h3 className="text-3xl md:text-5xl font-display text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 mt-6 drop-shadow-md">
              Memories Unlocked!
            </h3>
            
            <motion.div
              className="mt-8 bg-black/40 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 max-w-md mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 blur-[40px]" />
              
              <p className="text-xl font-body text-white relative z-10 font-medium">
                "We have made so many memories, but my favorite ones are the ones we haven't made yet."
              </p>
              <p className="mt-4 text-pink-200/80 font-body text-sm uppercase tracking-widest relative z-10">
                You collected all the polaroids
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BirthdayGame;
