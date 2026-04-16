import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FRIENDSHIP_START } from "@/config/priyanka";

const FriendshipCounter = () => {
  const [duration, setDuration] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = now.getTime() - FRIENDSHIP_START.getTime();
      const totalSeconds = Math.floor(diff / 1000);
      const years = Math.floor(totalSeconds / (365.25 * 24 * 3600));
      const months = Math.floor((totalSeconds % (365.25 * 24 * 3600)) / (30.44 * 24 * 3600));
      const days = Math.floor((totalSeconds % (30.44 * 24 * 3600)) / (24 * 3600));
      const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setDuration({ years, months, days, hours, minutes, seconds });
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  const units = [
    { label: "Years", value: duration.years, emoji: "🌟" },
    { label: "Months", value: duration.months, emoji: "🌙" },
    { label: "Days", value: duration.days, emoji: "☀️" },
    { label: "Hours", value: duration.hours, emoji: "⏰" },
    { label: "Min", value: duration.minutes, emoji: "💫" },
    { label: "Sec", value: duration.seconds, emoji: "✨" },
  ];

  return (
    <section className="py-20 px-4 relative min-h-[600px] flex flex-col justify-center">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="flex justify-center mb-6"
        animate={{ scale: [1, 1.2, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <span className="text-6xl drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">💖</span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-6xl font-display text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 pb-2 drop-shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Friends For...
      </motion.h2>
      <p className="text-center text-pink-200/80 font-body text-lg mb-12">
        Every second is a gift to me
      </p>

      <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto z-10 relative">
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 min-w-[100px] md:min-w-[120px] text-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.1, translateY: -10 }}
          >
            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="text-2xl mb-3 drop-shadow-md">{u.emoji}</div>
            <motion.span
              className="text-3xl md:text-5xl font-bold font-body block text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              key={u.value}
              initial={{ scale: 1.3, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {u.value}
            </motion.span>
            <p className="text-sm text-pink-200/70 font-body mt-2 uppercase tracking-widest">{u.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FriendshipCounter;
