import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { getTurningAge, getDaysUntilBirthday, isBirthdayToday, FRIEND_NAME } from "@/config/priyanka";

const BirthdayCake = () => {
  const turningAge = getTurningAge();
  const daysLeft = getDaysUntilBirthday();
  const isToday = isBirthdayToday();

  // Set up 5 beautiful luxury ceremonial candles
  const totalCandles = 5;
  const [litCandles, setLitCandles] = useState<boolean[]>(Array(totalCandles).fill(true));
  const allBlown = litCandles.every((c) => !c);
  
  // States for microphone blowing
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  // Audio Context and node references
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Trigger high-end celebration on all candles blown
  useEffect(() => {
    if (allBlown) {
      // Release streams
      stopMicrophone();

      // Fire cinematic celebratory confetti cascade
      confetti({ 
        particleCount: 150, 
        spread: 120, 
        origin: { y: 0.4 }, 
        colors: ["#e9c176", "#ffb4a6", "#d2bcff", "#f472b6", "#ffffff"] 
      });

      const end = Date.now() + 3000;
      const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval);
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#e9c176", "#ffb4a6"]
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#d2bcff", "#ffb4a6"]
        });
      }, 250);
    }
  }, [allBlown]);

  // Handle single candle click blow out
  const blowCandle = (index: number) => {
    if (!litCandles[index]) return;
    setLitCandles((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  // Mic blowing analyzer logic
  const startMicrophone = async () => {
    try {
      setMicError(false);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      setMicActive(true);
      monitorSound();
    } catch (err) {
      console.error("Mic access denied or error:", err);
      setMicError(true);
    }
  };

  const stopMicrophone = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setMicActive(false);
  };

  const monitorSound = () => {
    if (!analyserRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const analyze = () => {
      if (!analyserRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArray);

      // Sum values to detect blowing sound (broad-band noise / wind spikes)
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const averageVolume = sum / dataArray.length;

      // Blowing threshold (typically creates broad high volume spikes)
      if (averageVolume > 48) {
        setIsBlowing(true);
        // Blow out a candle at random that is still lit
        setLitCandles((prev) => {
          const litIndices = prev
            .map((lit, idx) => (lit ? idx : -1))
            .filter(idx => idx !== -1);
          
          if (litIndices.length > 0) {
            const next = [...prev];
            const randomIndexToBlow = litIndices[Math.floor(Math.random() * litIndices.length)];
            next[randomIndexToBlow] = false;
            return next;
          }
          return prev;
        });
      } else {
        setIsBlowing(false);
      }

      if (streamRef.current) {
        requestAnimationFrame(analyze);
      }
    };

    analyze();
  };

  const reset = () => {
    setLitCandles(Array(totalCandles).fill(true));
    stopMicrophone();
  };

  useEffect(() => {
    return () => stopMicrophone();
  }, []);

  return (
    <section className="py-20 px-4 min-h-screen flex flex-col justify-center items-center relative overflow-hidden select-none">
      {/* ambient glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(210,188,255,0.04) 0%, transparent 60%)" }} />

      <motion.p
        className="chapter-label justify-center mb-3 relative z-10"
        style={{ color: "var(--nc-tertiary)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        ✦ Chapter III
      </motion.p>
      
      <motion.h2
        className="font-display text-center mb-2 relative z-10 tracking-[-0.01em] text-white"
        style={{ fontSize: "var(--t-5xl)" }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Celestial Cake 🎂
      </motion.h2>

      <motion.p 
        className="text-center font-body text-pink-200/60 text-sm md:text-base max-w-md mb-8 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        {isToday ? (
          <span className="font-semibold text-[#e9c176]">🎉 Today is Priyanka's Birthday! Happy Birthday! 🎉</span>
        ) : (
          <span>Priyanka's {turningAge}th birthday season is here. Make a beautiful wish. ✨</span>
        )}
      </motion.p>

      {/* Mic Blowing Control panel */}
      <div className="z-20 mb-8 flex flex-col items-center gap-2">
        {!allBlown && (
          <>
            {!micActive ? (
              <motion.button
                onClick={startMicrophone}
                className="px-5 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-body tracking-wider uppercase flex items-center gap-2 cursor-pointer hover:bg-pink-500/25 transition-all shadow-[0_0_15px_rgba(236,72,153,0.1)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🎤 Enable Mic blowing
              </motion.button>
            ) : (
              <div className="px-5 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-xs font-body tracking-wider uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                <span className={`w-2 h-2 rounded-full bg-green-400 ${isBlowing ? 'scale-150 bg-yellow-400 animate-ping' : 'animate-pulse'}`} />
                🎤 Blow into mic to extinguish!
              </div>
            )}
            {micError && (
              <p className="text-[10px] font-body text-red-400">Microphone blocked. Direct tap mode active 🕯️</p>
            )}
          </>
        )}
      </div>

      {/* Cake Container */}
      <div className="relative mt-24 mb-16 flex flex-col items-center">
        
        {/* Sleek Minimalist Candles Container */}
        <div className="absolute top-[-75px] z-30 flex justify-center gap-4.5 w-[220px]">
          {litCandles.map((lit, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center cursor-pointer group p-3 -m-3"
              onClick={() => blowCandle(i)}
            >
              {/* Custom SVG organic Flickering Flame */}
              <AnimatePresence>
                {lit && (
                  <motion.div
                    className="absolute -top-12 z-40 w-6 h-10 select-none pointer-events-none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0, y: -20 }}
                  >
                    {/* Multi-layered flame glow */}
                    <div className="absolute inset-0 bg-yellow-500 rounded-full blur-[8px] opacity-40 animate-pulse" />
                    <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(233,193,118,0.7)]">
                      <motion.path
                        d="M50,10 C20,50 35,110 50,110 C65,110 80,50 50,10 Z"
                        fill="url(#flameGrad)"
                        animate={{
                          d: [
                            "M50,10 C20,50 35,110 50,110 C65,110 80,50 50,10 Z",
                            "M50,13 C15,53 40,110 50,110 C60,110 85,53 50,13 Z",
                            "M50,8 C25,48 30,110 50,110 C70,110 75,48 50,8 Z",
                            "M50,10 C20,50 35,110 50,110 C65,110 80,50 50,10 Z"
                          ]
                        }}
                        transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <defs>
                        <radialGradient id="flameGrad" cx="50%" cy="80%" r="55%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="35%" stopColor="#fff3d1" />
                          <stop offset="70%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Smoke particle feedback */}
              <AnimatePresence>
                {!lit && (
                  <motion.div
                    className="absolute -top-10 z-40 text-sm text-pink-200 pointer-events-none select-none font-body"
                    initial={{ y: 0, opacity: 0.9, scale: 0.8, filter: "blur(0px)" }}
                    animate={{ y: -45, opacity: 0, scale: 1.6, filter: "blur(2px)" }}
                    transition={{ duration: 1.6 }}
                  >
                    💨
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sleek Minimalist Glass Candle Stick */}
              <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-white/40 via-pink-400/30 to-pink-500/50 border border-white/20 shadow-sm relative overflow-hidden backdrop-blur-xs">
                {/* Micro glowing core */}
                {lit && (
                  <div className="absolute top-0 inset-x-0 h-4 bg-yellow-400/40 blur-[1px] animate-pulse" />
                )}
                {/* Sleek metallic wick */}
                <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-0.5 h-3 bg-zinc-800 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Celestial Glassmorphic Cake tiers */}
        
        {/* Tier 1 (Top Frosting / Glaze Layer) */}
        <div className="w-[280px] h-[75px] rounded-[50%] bg-gradient-to-tr from-pink-500/40 via-purple-500/20 to-pink-400/55 border-t border-white/40 shadow-[0_4px_30px_rgba(244,114,182,0.15)] backdrop-blur-md relative z-10">
          {/* Dripping organic gold-glow micro spots */}
          <div className="absolute top-[35px] w-[260px] left-[10px] flex justify-between px-3 opacity-65">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="w-4 bg-pink-400/50 rounded-b-[10px] border-b border-pink-300/30" 
                style={{ height: `${12 + (i * 4) % 15}px` }} 
              />
            ))}
          </div>
        </div>

        {/* Tier 2 (Cake Middle Body Layer) */}
        <div className="w-[280px] h-[95px] mt-[-40px] bg-gradient-to-b from-[#1c183a]/90 via-[#272352]/80 to-[#120f2b]/95 border-x border-white/5 shadow-2xl relative z-0 flex items-center justify-center pt-6">
          <span 
            className="font-display font-black text-[#e9c176] tracking-widest text-4xl"
            style={{ filter: "drop-shadow(0 0 15px rgba(233,193,118,0.5))" }}
          >
            {turningAge}
          </span>
        </div>

        {/* Tier 3 (Cake Base Layer) */}
        <div className="w-[280px] h-[45px] bg-gradient-to-b from-[#120f2b]/95 to-[#0b081b]/100 rounded-[50%] mt-[-22px] shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-0" />

        {/* Holographic Glowing Plate Stand */}
        <div className="w-[360px] h-[65px] bg-gradient-to-r from-white/5 via-white/20 to-white/5 rounded-[50%] mt-[-30px] border border-white/20 backdrop-blur-xl shadow-2xl z-[-1] flex items-center justify-center">
          {/* Ambient platform reflection ring */}
          <div className="w-[320px] h-[45px] rounded-[50%] border border-white/10" />
        </div>
      </div>

      {/* Ceremony Interactive HUD Feedback */}
      <div className="z-10 text-center min-h-[40px]">
        <p className="font-body text-xs text-pink-300/40 uppercase tracking-widest">
          {allBlown ? "✨ Celestial Wish Mode Activated ✨" : "Click candles or enable mic to blow them out"}
        </p>
      </div>

      {/* Wish overlay on successful blowing */}
      <AnimatePresence>
        {allBlown && (
          <motion.div
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center p-6 bg-[#030208]/96 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center max-w-md p-8 rounded-3xl bg-[#161230]/50 border border-pink-500/20 shadow-[0_0_80px_rgba(210,188,255,0.15)] relative"
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <div className="text-5xl mb-6 select-none animate-bounce">🎂</div>
              <h3 className="font-display text-white text-3xl mb-4 text-gradient">
                Wish Granted!
              </h3>
              <p className="text-pink-100/70 font-body leading-relaxed mb-8">
                Your five celestial candles have been extinguished. May every hidden dream and secret hope in your heart flourish, {FRIEND_NAME}. 🌸
              </p>
              
              <div className="flex flex-col gap-3">
                <motion.button
                  onClick={reset}
                  className="px-6 py-2.5 rounded-full bg-pink-500/15 border border-pink-400/25 text-pink-300 text-xs font-body uppercase tracking-wider cursor-pointer hover:bg-pink-500/30 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🕯️ Relight Ceremonial Candles
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BirthdayCake;
