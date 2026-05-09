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
    { label: "Years", value: duration.years },
    { label: "Months", value: duration.months },
    { label: "Days", value: duration.days },
    { label: "Hours", value: duration.hours },
    { label: "Min", value: duration.minutes },
    { label: "Sec", value: duration.seconds },
  ];

  return (
    <section className="py-20 px-4 relative min-h-screen flex flex-col justify-center items-center w-full">

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(210,188,255,0.06) 0%, transparent 65%)" }} />

      {/* Heading */}
      <motion.p
        className="chapter-label justify-center mb-4"
        style={{ color: "var(--nc-tertiary)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        ✦ Since we met
      </motion.p>
      <motion.h2
        className="font-display text-center mb-4 tracking-[-0.02em] leading-none"
        style={{ fontSize: "clamp(2.5rem,7vw,5rem)", color: "#f0e8ff", textShadow: "0 0 60px rgba(210,188,255,0.2)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Time in <em className="not-italic" style={{ background: "linear-gradient(135deg,#d2bcff,#ffb4a6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Orbit</em>
      </motion.h2>
      
      <motion.p
        className="text-center font-body mb-12 max-w-lg"
        style={{ fontSize: "var(--t-lead)", color: "rgba(216,194,190,0.65)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Every second shared is a measure of gravity between us.
      </motion.p>

      {/* Counter Cards — 3 per row on mobile, 6 on desktop */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 max-w-4xl w-full mx-auto z-10 relative px-2">
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            className="liquid-glass rounded-2xl py-5 px-2 text-center flex flex-col items-center justify-center cursor-default"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <motion.span
              className="font-display leading-none"
              style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", color: "#f0e8ff" }}
              key={u.value}
              initial={{ scale: 1.15, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {String(u.value).padStart(2, '0')}
            </motion.span>
            <p className="font-body mt-2 uppercase" style={{ fontSize: "0.6rem", color: "rgba(216,194,190,0.5)", letterSpacing: "0.2em" }}>
              {u.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FriendshipCounter;
