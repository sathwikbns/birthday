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

  // Mouse tilt tracking handler for subtle isometric depth shift
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Smooth 3D tilt reaction
    setRotateX(-mouseY / height * 10);
    setRotateY(mouseX / width * 10);
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
      className="py-16 px-4 min-h-screen flex flex-col justify-center items-center relative overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Soft ambient back-glow behind the main section */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out z-0" 
        style={{ 
          background: `radial-gradient(ellipse at 50% 50%, rgba(255, 170, 110, ${0.02 + (litCount * 0.025)}) 0%, rgba(18, 14, 32, 0) 75%)` 
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
      <div className="z-20 mb-6 flex flex-col items-center gap-2">
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

      {/* Breathtakingly Realistic Vector Cake Arena */}
      <motion.div
        className="relative flex flex-col items-center w-full max-w-[420px] aspect-square xs:scale-[0.95] sm:scale-100 md:scale-105 transition-all duration-300 z-10"
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 100, damping: 25 }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      >
        {/* Soft magical halo behind the SVG */}
        <div 
          className="absolute inset-0 rounded-full blur-[90px] pointer-events-none transition-all duration-1000 z-[-1]"
          style={{
            background: `radial-gradient(circle, rgba(233, 160, 110, ${0.16 * (litCount / 5)}) 0%, rgba(190, 110, 255, ${0.08 * (litCount / 5)}) 50%, transparent 80%)`
          }}
        />

        {/* Unified 3D Vector SVG Masterpiece */}
        <svg 
          viewBox="0 0 500 500" 
          className="w-full h-full filter drop-shadow-[0_15px_45px_rgba(0,0,0,0.65)] overflow-visible"
        >
          <defs>
            {/* Soft shadow gradients */}
            <radialGradient id="cakeBaseShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
              <stop offset="70%" stopColor="rgba(0,0,0,0.35)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            
            {/* Chrome/Silver Platter leg */}
            <linearGradient id="platterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#d4d4d8" />
              <stop offset="65%" stopColor="#a1a1aa" />
              <stop offset="100%" stopColor="#71717a" />
            </linearGradient>

            {/* Chocolate fudge layers */}
            <linearGradient id="chocolateSide" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3d210c" />
              <stop offset="15%" stopColor="#2c1606" />
              <stop offset="85%" stopColor="#1e0f03" />
              <stop offset="100%" stopColor="#120801" />
            </linearGradient>
            <radialGradient id="chocolateTop" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4e2c14" />
              <stop offset="70%" stopColor="#2c1606" />
              <stop offset="100%" stopColor="#1a0b01" />
            </radialGradient>

            {/* Strawberry glaze layers */}
            <linearGradient id="strawberrySide" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff456e" />
              <stop offset="15%" stopColor="#e61a4c" />
              <stop offset="85%" stopColor="#a3092b" />
              <stop offset="100%" stopColor="#660014" />
            </linearGradient>
            <radialGradient id="strawberryTop" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff7093" />
              <stop offset="65%" stopColor="#e61a4c" />
              <stop offset="100%" stopColor="#910020" />
            </radialGradient>

            {/* Specular gloss highlights */}
            <linearGradient id="glazeHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.08)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" stopOpacity="0" />
            </linearGradient>

            {/* Gold Leaf Flakes Gradients */}
            <linearGradient id="goldGloss" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff3be" />
              <stop offset="50%" stopColor="#e2b44d" />
              <stop offset="100%" stopColor="#875f10" />
            </linearGradient>

            {/* Candle Candle-sticks Stripe */}
            <linearGradient id="candleStripe" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd1dc" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>

            {/* Flame vector colors */}
            <radialGradient id="fireGrad" cx="50%" cy="80%" r="55%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#fffae0" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. PLATE SHADOW */}
          <ellipse cx="250" cy="445" rx="180" ry="30" fill="url(#cakeBaseShadow)" />

          {/* 2. CHROME CRYSTAL PLATTER */}
          {/* Base Stand foot */}
          <ellipse cx="250" cy="440" rx="90" ry="18" fill="url(#platterGrad)" />
          <path d="M210,438 C210,410 230,400 235,395 L265,395 C270,400 290,410 290,438 Z" fill="url(#platterGrad)" stroke="#71717a" strokeWidth="0.5" />
          {/* Glass plate top edge */}
          <ellipse cx="250" cy="395" rx="175" ry="32" fill="url(#platterGrad)" stroke="#ffffff" strokeWidth="1" />
          {/* Semi-translucent glass lip highlight */}
          <ellipse cx="250" cy="392" rx="170" ry="28" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />

          {/* 3. LOWER TIER (RICH DARK CHOCOLATE VELVET) */}
          {/* Side cylinder body */}
          <path d="M100,310 L100,380 C100,410 400,410 400,380 L400,310 Z" fill="url(#chocolateSide)" />
          {/* Top Oval surface */}
          <ellipse cx="250" cy="310" rx="150" ry="38" fill="url(#chocolateTop)" />
          
          {/* Glossy highlight reflect stripe on chocolate side */}
          <path d="M140,312 C140,312 180,355 180,385 C180,388 160,395 150,395 C145,395 130,360 130,312 Z" fill="url(#glazeHighlight)" opacity="0.3" />

          {/* Vanilla Cream filling sandwich in the center of lower tier */}
          <path d="M100,342 Q250,378 400,342 L400,351 Q250,387 100,351 Z" fill="#fffcf0" stroke="#ebdcb0" strokeWidth="0.5" />

          {/* Shimmering Gold Flakes on Chocolate surface */}
          <g filter="drop-shadow(0 1px 3px rgba(226,180,77,0.5))">
            {/* Flake 1 */}
            <path d="M140,310 L145,308 L142,314 L138,312 Z" fill="url(#goldGloss)" />
            {/* Flake 2 */}
            <path d="M340,318 L343,315 L345,321 L338,320 Z" fill="url(#goldGloss)" />
            {/* Flake 3 */}
            <path d="M250,332 L254,329 L251,335 L247,333 Z" fill="url(#goldGloss)" />
            {/* Flake 4 */}
            <path d="M175,325 L178,322 L176,328 L171,326 Z" fill="url(#goldGloss)" />
          </g>

          {/* 4. UPPER TIER (DELICIOUS STRAWBERRY GLAZE) */}
          {/* Side cylinder body */}
          <path d="M140,210 L140,285 C140,310 360,310 360,285 L360,210 Z" fill="url(#strawberrySide)" />
          {/* Top Oval surface */}
          <ellipse cx="250" cy="210" rx="110" ry="28" fill="url(#strawberryTop)" />

          {/* Specular glass highlight reflection arc on strawberry dome */}
          <ellipse cx="250" cy="207" rx="100" ry="24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeDasharray="140 180" />

          {/* Dripping glossy strawberry jam drops cascading down */}
          <g fill="#7d0019" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))">
            {/* Drip 1 */}
            <path d="M140,210 Q145,235 145,245 C145,249 141,252 138,250 C135,248 136,230 140,210 Z" />
            {/* Drip 2 */}
            <path d="M185,213 Q190,240 191,252 C191,257 184,260 182,255 C180,250 181,230 185,213 Z" />
            {/* Drip 3 */}
            <path d="M245,215 Q248,238 249,248 C249,252 243,254 241,250 C239,246 241,230 245,215 Z" />
            {/* Drip 4 */}
            <path d="M295,214 Q300,242 301,256 C301,262 294,263 291,258 C289,252 291,230 295,214 Z" />
            {/* Drip 5 */}
            <path d="M350,211 Q353,232 353,240 C353,244 348,246 346,242 C344,238 347,225 350,211 Z" />
          </g>

          {/* Whipped Cream Swirls on the top strawberry rim */}
          {[
            { cx: 155, cy: 202, rx: 11, ry: 6 },
            { cx: 195, cy: 218, rx: 12, ry: 7 },
            { cx: 250, cy: 226, rx: 13, ry: 7 },
            { cx: 305, cy: 218, rx: 12, ry: 7 },
            { cx: 345, cy: 202, rx: 11, ry: 6 },
            { cx: 250, cy: 196, rx: 11, ry: 5 }
          ].map((cr, i) => (
            <g key={i}>
              {/* White cream swirl body */}
              <ellipse cx={cr.cx} cy={cr.cy} rx={cr.rx} ry={cr.ry} fill="#fffcf7" stroke="#eadecc" strokeWidth="0.5" />
              <path d={`M${cr.cx - cr.rx * 0.7},${cr.cy} C${cr.cx - 2},${cr.cy - 12} ${cr.cx + 2},${cr.cy - 12} ${cr.cx + cr.rx * 0.7},${cr.cy} Z`} fill="#ffffff" />
              
              {/* Shiny dark-red fresh cherry on top of swirl */}
              <circle cx={cr.cx} cy={cr.cy - 10} r="6.5" fill="none" />
              <path d={`M${cr.cx - 5},${cr.cy - 12} A6,6 0 1,1 ${cr.cx + 5},${cr.cy - 12} Z`} fill="q" />
              {/* Real vector shading for Cherry */}
              <circle cx={cr.cx} cy={cr.cy - 9} r="5" fill="url(#cherryShade)" />
              <radialGradient id="cherryShade" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ff4d70" />
                <stop offset="35%" stopColor="#d61131" />
                <stop offset="85%" stopColor="#7a0114" />
                <stop offset="100%" stopColor="#40000a" />
              </radialGradient>
              {/* Specular cherry reflection highlight */}
              <circle cx={cr.cx - 2} cy={cr.cy - 11} r="1.5" fill="#ffffff" opacity="0.85" />
              {/* Curved cherry stalk */}
              <path d={`M${cr.cx},${cr.cy - 13} Q${cr.cx + 6},${cr.cy - 24} ${cr.cx + 3},${cr.cy - 28}`} fill="none" stroke="#4b5563" strokeWidth="1" strokeLinecap="round" />
            </g>
          ))}


          {/* 5. TURNING AGE BADGE Embedded in the lower Chocolate Tier */}
          <g transform="translate(250, 362) translateZ(10px)">
            {/* Elegant Golden badge frame */}
            <rect x="-32" y="-18" width="64" height="34" rx="6" fill="#180c04" stroke="url(#goldGloss)" strokeWidth="2" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.6))" />
            {/* Micro texts */}
            <text x="0" y="-8" textAnchor="middle" fill="url(#goldGloss)" fontSize="6" fontFamily="sans-serif" fontWeight="900" letterSpacing="1.2">TURNING</text>
            <text x="0" y="11" textAnchor="middle" fill="#ffffff" fontSize="19" fontFamily="'Playfair Display', serif" fontWeight="900" letterSpacing="0.5" filter="drop-shadow(0 0 4px rgba(255,255,255,0.25))">{turningAge}</text>
          </g>


          {/* 6. HYPER-REALISTIC LUXURY CEREMONIAL CANDLES (Interactive) */}
          {[
            { cx: 175, cy: 202, index: 0 },
            { cx: 212, cy: 213, index: 1 },
            { cx: 250, cy: 217, index: 2 },
            { cx: 288, cy: 213, index: 3 },
            { cx: 325, cy: 202, index: 4 }
          ].map((c) => {
            const isLit = litCandles[c.index];
            return (
              <g 
                key={c.index} 
                className="cursor-pointer group select-none" 
                onClick={() => blowCandle(c.index)}
              >
                {/* Invisible larger click/hover shield */}
                <ellipse cx={c.cx} cy={c.cy - 25} rx="16" ry="38" fill="transparent" />

                {/* Candle Wick line */}
                <line x1={c.cx} y1={c.cy - 38} x2={c.cx} y2={c.cy - 44} stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />

                {/* Luxury striped candle-stick */}
                <rect x={c.cx - 3.5} y={c.cy - 38} width="7" height="38" rx="1.5" fill="url(#candleStripe)" stroke="#ffffff" strokeWidth="0.25" />
                {/* Spiral golden stripe overlay wrapper */}
                <path d={`M${c.cx - 3.5},${c.cy - 32} L${c.cx + 3.5},${c.cy - 35} M${c.cx - 3.5},${c.cy - 22} L${c.cx + 3.5},${c.cy - 25} M${c.cx - 3.5},${c.cy - 12} L${c.cx + 3.5},${c.cy - 15}`} stroke="url(#goldGloss)" strokeWidth="1.2" opacity="0.85" />

                {/* FLICKERING CANDLE FLAME AND GLOW HALO */}
                <AnimatePresence>
                  {isLit && (
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [1, 1.06, 0.94, 1],
                        opacity: 1
                      }}
                      exit={{ scale: 0, opacity: 0, y: -25 }}
                      transition={{ 
                        scale: { repeat: Infinity, duration: 0.65, ease: "easeInOut" }
                      }}
                    >
                      {/* Sub-halo background radial flare */}
                      <circle cx={c.cx} cy={c.cy - 52} r="15" fill="#f59e0b" filter="blur(5px)" opacity="0.35" className="pointer-events-none" />
                      
                      {/* Organic Flame path shape */}
                      <path 
                        d={`M${c.cx},${c.cy - 64} C${c.cx - 7},${c.cy - 51} ${c.cx - 5},${c.cy - 43} ${c.cx},${c.cy - 43} C${c.cx + 5},${c.cy - 43} ${c.cx + 7},${c.cy - 51} ${c.cx},${c.cy - 64} Z`} 
                        fill="url(#fireGrad)" 
                        filter="drop-shadow(0 0 6px rgba(245,158,11,0.6))"
                      />
                      
                      {/* Golden micro flame center core */}
                      <ellipse cx={c.cx} cy={c.cy - 48} rx="2" ry="4" fill="#ffffff" opacity="0.9" />
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Smoke particle when candle is extinguished */}
                <AnimatePresence>
                  {!isLit && (
                    <motion.g
                      initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -40, scale: 2 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                      <circle cx={c.cx} cy={c.cy - 48} r="3" fill="#e4e4e7" filter="blur(2px)" />
                      <circle cx={c.cx + 4} cy={c.cy - 56} r="4.5" fill="#d4d4d8" filter="blur(3px)" />
                    </motion.g>
                  )}
                </AnimatePresence>
              </g>
            );
          })}


          {/* 7. MAGNIFICENT METALLIC GOLD CAKE TOPPER SIGNET */}
          <g filter="drop-shadow(0 3px 6px rgba(183,140,49,0.5))">
            {/* Fine physical support wires anchoring into strawberry tier */}
            <line x1="200" y1="180" x2="200" y2="100" stroke="url(#goldGloss)" strokeWidth="1" opacity="0.75" />
            <line x1="300" y1="180" x2="300" y2="100" stroke="url(#goldGloss)" strokeWidth="1" opacity="0.75" />

            {/* Glowing Golden Metallic text vectors */}
            <text 
              x="250" 
              y="114" 
              textAnchor="middle" 
              fill="url(#goldGloss)" 
              fontFamily="'Playfair Display', 'Georgia', serif" 
              fontSize="23" 
              fontWeight="900" 
              fontStyle="italic"
              letterSpacing="0.4"
            >
              Happy Birthday
            </text>
            
            <text 
              x="250" 
              y="138" 
              textAnchor="middle" 
              fill="url(#goldGloss)" 
              fontFamily="'Playfair Display', 'Georgia', serif" 
              fontSize="19" 
              fontWeight="900" 
              fontStyle="italic"
              letterSpacing="1.2"
            >
              {FRIEND_NAME}
            </text>

            {/* Glowing gold design swirls decoration */}
            <path d="M165,122 Q250,135 335,122" fill="none" stroke="url(#goldGloss)" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
            <path d="M190,144 Q250,154 310,144" fill="none" stroke="url(#goldGloss)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
          </g>

        </svg>
      </motion.div>

      {/* Ceremony Interactive HUD Feedback */}
      <div className="z-10 text-center min-h-[40px] mt-2">
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
