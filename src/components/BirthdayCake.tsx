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

  // States for 3D mouse tilt interaction
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Calculate lit candle count for lighting dynamics
  const litCount = litCandles.filter(Boolean).length;

  // Trigger high-end celebration on all candles blown
  useEffect(() => {
    if (allBlown) {
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

  // Mouse tilt tracking handler
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Scale rotation to max 12 degrees to keep it smooth and elegant
    setRotateX(-mouseY / height * 12);
    setRotateY(mouseX / width * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

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

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const averageVolume = sum / dataArray.length;

      // Blowing threshold (spikes represent broad air friction)
      if (averageVolume > 48) {
        setIsBlowing(true);
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
    <section 
      className="py-20 px-4 min-h-screen flex flex-col justify-center items-center relative overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic ambient candle lighting background glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out z-0" 
        style={{ 
          background: `radial-gradient(ellipse at 50% 50%, rgba(255, 180, 100, ${0.03 + (litCount * 0.02)}) 0%, rgba(18, 14, 32, 0) 70%)` 
        }} 
      />

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

      {/* 3D Tilting Cake Arena */}
      <motion.div
        className="relative mt-20 mb-16 flex flex-col items-center"
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 120, damping: 28 }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      >
        {/* Ambient Candle back-glow (behind the cake platter) */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[70px] pointer-events-none transition-all duration-1000 z-[-10]"
          style={{
            background: `radial-gradient(circle, rgba(233, 150, 100, ${0.12 * (litCount / 5)}) 0%, rgba(180, 100, 255, ${0.05 * (litCount / 5)}) 50%, transparent 100%)`
          }}
        />

        {/* Dynamic Celestial Gourmet 3D Cake */}
        <div className="relative flex flex-col items-center select-none scale-[0.85] xs:scale-[0.95] sm:scale-100 md:scale-110 transition-all duration-300">
          
          {/* ELEGANT METALLIC GOLDEN CAKE TOPPER SIGNET */}
          <div className="absolute top-[-92px] z-30 flex flex-col items-center select-none pointer-events-none">
            {/* The physical support rods that push into the cake */}
            <div className="absolute bottom-[-10px] left-[35%] w-[1.5px] h-10 bg-gradient-to-b from-yellow-300/60 to-transparent shadow-sm z-10" />
            <div className="absolute bottom-[-10px] right-[35%] w-[1.5px] h-10 bg-gradient-to-b from-yellow-300/60 to-transparent shadow-sm z-10" />

            <svg viewBox="0 0 200 60" className="w-[180px] h-[65px] filter drop-shadow-[0_2px_8px_rgba(233,193,118,0.75)]">
              <defs>
                <linearGradient id="goldLuster" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff3be" />
                  <stop offset="25%" stopColor="#dfb256" />
                  <stop offset="50%" stopColor="#9a7123" />
                  <stop offset="75%" stopColor="#ebd289" />
                  <stop offset="100%" stopColor="#bfa14c" />
                </linearGradient>
              </defs>
              <text x="50%" y="32" textAnchor="middle" fill="url(#goldLuster)" className="font-script text-[22px] font-black italic tracking-wide">
                Happy Birthday
              </text>
              <text x="50%" y="54" textAnchor="middle" fill="url(#goldLuster)" className="font-script text-[18px] font-black italic tracking-wider">
                Priyanka
              </text>
            </svg>
          </div>

          {/* THE CANDLES: Placed inside the top cake tier */}
          <div className="absolute top-[-34px] z-30 flex justify-center gap-3 w-[180px]">
            {litCandles.map((lit, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center cursor-pointer group p-3 -m-3 z-30"
                onClick={() => blowCandle(i)}
              >
                {/* Custom SVG organic Flickering Flame */}
                <AnimatePresence>
                  {lit && (
                    <motion.div
                      className="absolute -top-11 z-40 w-5 h-9 select-none pointer-events-none"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0, y: -25 }}
                    >
                      {/* Multi-layered flame glow */}
                      <div className="absolute inset-0 bg-yellow-500 rounded-full blur-[8px] opacity-40 animate-pulse" />
                      <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(233,193,118,0.85)]">
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
                          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <defs>
                          <radialGradient id="flameGrad" cx="50%" cy="80%" r="55%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="30%" stopColor="#ffe99d" />
                            <stop offset="65%" stopColor="#f59e0b" />
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
                      animate={{ y: -50, opacity: 0, scale: 1.8, filter: "blur(2px)" }}
                      transition={{ duration: 1.8 }}
                    >
                      💨
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sleek Minimalist Glass Candle Stick */}
                <div className="w-1.5 h-12 rounded-full bg-gradient-to-b from-white/70 via-pink-400/40 to-pink-500/60 border border-white/30 shadow-sm relative overflow-hidden backdrop-blur-xs">
                  {/* Micro glowing core */}
                  {lit && (
                    <div className="absolute top-0 inset-x-0 h-4 bg-yellow-400/40 blur-[1px] animate-pulse" />
                  )}
                  {/* Sleek metallic wick */}
                  <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-zinc-800 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* TIER 2 (TOP TIER) - STRAWBERRY GLAZE & FRESH CHERRIES */}
          {/* Top Oval Face */}
          <div 
            className="w-[180px] h-[60px] rounded-[50%] bg-gradient-to-tr from-[#ff3c69] via-[#ff5c84] to-[#ffa3b8] border-t-2 border-white/85 shadow-[0_6px_30px_rgba(255,60,105,0.45)] relative z-20 flex items-center justify-center overflow-visible"
            style={{ boxShadow: "inset 0 4px 12px rgba(255,255,255,0.4), 0 8px 32px rgba(255, 60, 105, 0.3)" }}
          >
            {/* Real Candlestick Base indents */}
            <div className="absolute inset-0 flex justify-center gap-3 items-center pt-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-800/40 shadow-inner" />
              ))}
            </div>

            {/* Scattered Shimmering Gold Flakes & Sprinkles */}
            {[
              { top: "12px", left: "25px", color: "#ffd700", rot: "15deg" },
              { top: "28px", left: "55px", color: "#ffffff", rot: "-25deg" },
              { top: "15px", left: "105px", color: "#ffd700", rot: "45deg" },
              { top: "32px", left: "135px", color: "#ffffff", rot: "-10deg" },
              { top: "38px", left: "80px", color: "#ffe066", rot: "70deg" },
            ].map((sp, i) => (
              <div
                key={i}
                className="absolute w-2 h-1 rounded-full shadow-[0_1px_4px_rgba(255,215,0,0.6)] animate-pulse"
                style={{
                  top: sp.top,
                  left: sp.left,
                  backgroundColor: sp.color,
                  transform: `rotate(${sp.rot})`,
                  opacity: 0.95
                }}
              />
            ))}

            {/* Glossy Reflection Highlight Arc */}
            <div className="absolute top-[3px] left-[15px] right-[15px] h-[12px] bg-white/20 rounded-[50%] blur-[1px] pointer-events-none" />

            {/* Swirling Whipped Cream Puffs with Glossy Red Cherries */}
            {[
              { top: "-4px", left: "18px" },
              { top: "-9px", left: "76px" },
              { top: "-4px", left: "134px" },
              { top: "20px", left: "152px" },
              { top: "34px", left: "80px" },
              { top: "20px", left: "4px" },
            ].map((c, i) => (
              <div
                key={i}
                className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-white via-pink-50 to-pink-100 shadow-md border-t border-white z-25 flex items-center justify-center"
                style={{ top: c.top, left: c.left }}
              >
                {/* 3D Cherry on top with metallic reflection stem */}
                <div className="relative w-3 h-3 rounded-full bg-gradient-to-tr from-[#7c0018] via-[#e61234] to-[#ffa4b3] border border-rose-900 shadow-sm flex items-center justify-center">
                  <div className="absolute top-[1.5px] left-[2.5px] w-1 h-1 bg-white/80 rounded-full blur-[0.2px]" />
                  {/* Cherry Stem */}
                  <div className="absolute top-[-6px] left-[5px] w-[1px] h-5 bg-zinc-800 origin-bottom rotate-[15deg]" />
                </div>
              </div>
            ))}
          </div>

          {/* Side Cylinder Body (Strawberry Red velvet) */}
          <div className="w-[180px] h-[70px] mt-[-30px] bg-gradient-to-b from-[#ff3c69] via-[#cc2449] to-[#8c0a24] border-x border-white/10 relative z-10 overflow-hidden">
            
            {/* Glossy vertical reflection bar */}
            <div className="absolute inset-y-0 left-[25%] w-8 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

            {/* Delicious Strawberry Jam Glaze Drips running down the side */}
            <div className="absolute top-0 inset-x-0 flex justify-between px-1">
              {[12, 26, 16, 32, 14, 28, 20, 11, 24].map((h, i) => (
                <div
                  key={i}
                  className="w-3 bg-gradient-to-b from-[#8c0a24] to-[#590011] rounded-b-full shadow-md border-b border-rose-900/45"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>

            {/* Embedded white vanilla sponge cream swirl */}
            <div className="absolute bottom-2 inset-x-0 h-2 bg-[#fffbf2] shadow-sm opacity-90 border-y border-[#dfd6be]" />
          </div>

          {/* TIER 1 (BOTTOM TIER) - RICH DARK CHOCOLATE WITH GOLD EMERALD DETAILS */}
          {/* Top Oval Face */}
          <div 
            className="w-[260px] h-[70px] mt-[-35px] rounded-[50%] bg-gradient-to-tr from-[#2d1706] via-[#4d2d12] to-[#3a1f0a] border-t-2 border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.6)] relative z-0 flex items-center justify-center"
            style={{ boxShadow: "inset 0 3px 8px rgba(255,255,255,0.15), 0 12px 40px rgba(0,0,0,0.5)" }}
          >
            {/* Shimmering gold leaf dust scattered on the chocolate tier */}
            {[
              { top: "15px", left: "35px", size: "3px" },
              { top: "25px", left: "215px", size: "4px" },
              { top: "35px", left: "185px", size: "3px" },
              { top: "42px", left: "65px", size: "5px" },
              { top: "18px", left: "140px", size: "3px" },
            ].map((sp, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-tr from-yellow-100 to-[#dfb256] rounded-full shadow-[0_0_5px_rgba(223,178,86,0.8)] animate-pulse"
                style={{
                  top: sp.top,
                  left: sp.left,
                  width: sp.size,
                  height: sp.size,
                  opacity: 0.9
                }}
              />
            ))}
          </div>

          {/* Side Cylinder Body with Sponge & Dual Cream Layers */}
          <div className="w-[260px] h-[95px] mt-[-35px] bg-gradient-to-b from-[#3a1f0a] via-[#211104] to-[#120901] border-x border-white/10 relative z-[-1] overflow-hidden flex items-center justify-center">
            
            {/* Glossy vertical reflection bar */}
            <div className="absolute inset-y-0 left-[30%] w-12 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

            {/* Thick Double Whipped Vanilla & Fudge Cream Layer in the middle */}
            <div className="absolute top-[40px] inset-x-0 h-4 bg-[#fffcf5] border-y border-[#dfd6be] shadow-[0_0_12px_rgba(255,255,255,0.25)] z-10 flex justify-between px-6">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2.5 h-3 bg-[#120901] rounded-b-full shadow-inner border-b border-black/40" 
                  style={{ transform: `translateY(${Math.sin(i) * 2.5}px)` }} 
                />
              ))}
            </div>

            {/* Luxurious Gold Signet Frame for the Turning Age */}
            <div 
              className="px-4 py-1.5 rounded-lg border-2 border-[#dfb256] bg-gradient-to-b from-[#211104]/90 to-[#120901]/90 z-20 mt-[-10px] shadow-[0_0_15px_rgba(223,178,86,0.25)] flex items-center justify-center flex-col min-w-[55px]"
              style={{ transform: "translateY(-10px) translateZ(20px)" }}
            >
              <span className="text-[6px] text-[#dfb256]/60 font-body uppercase tracking-[0.2em] font-bold">
                Turning
              </span>
              <span
                className="font-display font-black text-[#dfb256] tracking-wide text-3xl select-none leading-none mt-0.5"
                style={{ filter: "drop-shadow(0 0 8px rgba(223,178,86,0.5))" }}
              >
                {turningAge}
              </span>
            </div>
          </div>

          {/* Base bottom curve */}
          <div className="w-[260px] h-[55px] bg-gradient-to-b from-[#120901] to-[#040200] rounded-[50%] mt-[-28px] shadow-[0_15px_30px_rgba(0,0,0,0.85)] z-[-2]" />


          {/* THE LUXURY CRYSTAL CAKE STAND / PLATTER */}
          {/* Silver/Chrome Plate Top */}
          <div className="w-[320px] h-[80px] bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-100 rounded-[50%] mt-[-42px] border-t-2 border-white/60 shadow-[0_12px_32px_rgba(0,0,0,0.4)] z-[-3] flex items-center justify-center relative">
            {/* Mirror circular ring reflections */}
            <div className="w-[290px] h-[60px] rounded-[50%] border-t border-white/30" />
            <div className="w-[245px] h-[48px] rounded-[50%] border border-zinc-400/25 absolute" />
            
            {/* Soft ambient shadow cast by the cake tier on the plate */}
            <div className="absolute inset-0 bg-black/45 rounded-[50%] scale-[0.84] filter blur-[6px] z-[-1]" />
          </div>

          {/* Frosted Glass Stand Pedestal Leg */}
          <div className="w-[80px] h-[50px] bg-gradient-to-b from-zinc-200 to-zinc-400/80 border-x border-white/20 mt-[-40px] z-[-4] rounded-b-xl shadow-inner relative flex items-center justify-center">
            {/* Light specular highlight strip */}
            <div className="absolute inset-y-0 left-1/4 w-3.5 bg-white/25 blur-[1.5px]" />
          </div>
          
          {/* Stand Foot Base Platter */}
          <div className="w-[150px] h-[38px] bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200 rounded-[50%] mt-[-20px] z-[-5] border-t border-white/30 shadow-2xl" />
        </div>
      </motion.div>

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
