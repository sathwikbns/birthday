import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { getTurningAge, getDaysUntilBirthday, isBirthdayToday, FRIEND_NAME } from "@/config/priyanka";

const BirthdayCake = () => {
  const turningAge = getTurningAge();
  const daysLeft = getDaysUntilBirthday();
  const isToday = isBirthdayToday();

  // Show max 10 interactive candles (representing the age visually)
  const totalCandles = Math.min(turningAge, 10);
  const [litCandles, setLitCandles] = useState<boolean[]>(Array(totalCandles).fill(true));
  const allBlown = litCandles.every((c) => !c);

  const blowCandle = (index: number) => {
    if (!litCandles[index]) return;
    setLitCandles((prev) => {
      const next = [...prev];
      next[index] = false;
      const allOut = next.every((c) => !c);
      if (allOut) {
        setTimeout(() => {
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ["#b794f6", "#90cdf4", "#f6ad55", "#fbb6ce"] });
          setTimeout(() => confetti({ particleCount: 100, spread: 120, origin: { y: 0.5 } }), 300);
        }, 200);
      }
      return next;
    });
  };

  const reset = () => setLitCandles(Array(totalCandles).fill(true));

  return (
    <section className="section-mixed py-20 px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-display text-center text-lavender mb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Birthday Cake Ceremony 🎂
      </motion.h2>

      {/* Birthday countdown or celebration */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {isToday ? (
          <p className="text-lg font-body font-semibold" style={{ color: "hsl(45 90% 60%)" }}>
            🎉 TODAY IS THE DAY! HAPPY BIRTHDAY {FRIEND_NAME.toUpperCase()}! 🎉
          </p>
        ) : (
          <p className="text-sm font-body text-muted-foreground">
            🗓️ {daysLeft} day{daysLeft !== 1 ? "s" : ""} until {FRIEND_NAME} turns{" "}
            <span className="font-bold text-lavender">{turningAge}</span>! 🎂
          </p>
        )}
      </motion.div>

      <p className="text-center text-muted-foreground font-body mb-12">
        {allBlown
          ? "🎉 You blew them all out!"
          : `Blow out the candles for ${FRIEND_NAME}'s ${turningAge}th birthday! 🕯️`}
      </p>

      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        {/* Cute 3D CSS Cake */}
        <div className="relative mt-20 flex flex-col items-center">
          {/* Candles directly sitting on the cake! */}
          <div className="flex gap-4 mb-0 relative z-20 px-8 flex-wrap justify-center w-[280px]">
            {litCandles.map((lit, i) => (
              <motion.div
                key={i}
                className="relative flex flex-col items-center cursor-pointer group"
                onClick={() => blowCandle(i)}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Flame */}
                {lit && (
                  <motion.div
                    className="text-3xl absolute -top-10 z-30 drop-shadow-[0_0_15px_#f6ad55]"
                    animate={{ scale: [1, 1.15, 1], rotate: [-4, 4, -4] }}
                    transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                  >
                    🔥
                  </motion.div>
                )}
                {/* Smoke */}
                {!lit && (
                  <motion.div
                    className="text-lg absolute -top-8 z-30 opacity-60 text-white"
                    initial={{ y: 0, opacity: 1, scale: 1 }}
                    animate={{ y: -30, opacity: 0, scale: 1.5 }}
                    transition={{ duration: 1.5 }}
                  >
                    💨
                  </motion.div>
                )}
                {/* Candle Stick */}
                <div className="w-3.5 h-14 rounded-full bg-gradient-to-b from-white to-pink-200 border border-pink-300 shadow-sm relative z-20">
                   {/* Cute Stripes */}
                   <div className="absolute inset-0 rounded-full overflow-hidden">
                     <div className="w-full h-3 bg-pink-400 mt-2 rotate-12 opacity-80"></div>
                     <div className="w-full h-3 bg-pink-400 mt-3 rotate-12 opacity-80"></div>
                     <div className="w-full h-3 bg-pink-400 mt-3 rotate-12 opacity-80"></div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Top Layer (Frosting) */}
          <div className="w-[320px] h-[100px] mt-[-15px] z-10 relative pointer-events-none">
            <div className="absolute inset-0 bg-pink-400 rounded-[50%] shadow-[0_5px_25px_rgba(255,100,150,0.4)] border-t-2 border-pink-300"></div>
            
            {/* Frosting Drips */}
            <div className="absolute top-[45px] w-[310px] left-[5px] flex justify-between px-2">
               {[...Array(8)].map((_,i) => (
                 <motion.div 
                    key={i} 
                    className="w-8 bg-pink-400 rounded-b-[20px] shadow-sm relative" 
                    style={{ 
                      height: `${30 + Math.random() * 30}px`,
                      marginTop: `${-Math.random() * 5}px`
                    }}
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                 >
                   <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-white/30"></div>
                 </motion.div>
               ))}
            </div>
          </div>
          
          {/* Middle Body */}
          <div className="w-[320px] h-[120px] mt-[-55px] bg-gradient-to-b from-amber-100 to-amber-200 shadow-inner z-0 flex items-center justify-center pt-10 pointer-events-none">
            <span className="font-display text-pink-500 text-5xl font-bold tracking-widest bg-white/70 px-6 py-2 rounded-full backdrop-blur-md shadow-sm border border-white/80">
              {turningAge}
            </span>
          </div>

          {/* Bottom Cake Rim */}
          <div className="w-[320px] h-[60px] bg-amber-200 rounded-[50%] mt-[-30px] shadow-[0_20px_40px_rgba(255,100,200,0.2)] z-0 pointer-events-none">
            {/* Base Sprinkles */}
            <div className="w-full flex justify-around px-8 mt-2 opacity-60">
               <div className="w-2 h-1 bg-pink-400 rounded-full rotate-45"></div>
               <div className="w-2 h-1 bg-blue-400 rounded-full -rotate-12"></div>
               <div className="w-2 h-1 bg-purple-400 rounded-full rotate-90"></div>
               <div className="w-2 h-1 bg-yellow-400 rounded-full rotate-12"></div>
               <div className="w-2 h-1 bg-pink-400 rounded-full rotate-45"></div>
               <div className="w-2 h-1 bg-blue-400 rounded-full -rotate-12"></div>
            </div>
          </div>

          {/* Beautiful Glass Plate */}
          <div className="w-[420px] h-[80px] bg-gradient-to-r from-white/10 via-white/30 to-white/10 rounded-[50%] mt-[-40px] shadow-2xl backdrop-blur-xl border border-white/40 z-[-1] flex items-center justify-center">
            <div className="w-[360px] h-[60px] rounded-[50%] border-t border-white/60 mx-auto"></div>
          </div>
        </div>

        {/* After blowing */}
        {allBlown && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xl font-display text-lavender mb-4">
              🎊 Make a wish, {FRIEND_NAME}! The universe is listening... 🌟
            </p>
            <motion.button
              className="px-5 py-2 rounded-full text-sm font-body border border-border text-muted-foreground"
              whileHover={{ scale: 1.05 }}
              onClick={reset}
            >
              🕯️ Relight candles
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default BirthdayCake;
