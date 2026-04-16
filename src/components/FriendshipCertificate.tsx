import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FRIEND_NAME, getTurningAge, getDaysUntilBirthday, isBirthdayToday } from "@/config/priyanka";

const FriendshipCertificate = () => {
  const [revealed, setRevealed] = useState(false);
  const age = getTurningAge();
  const daysLeft = getDaysUntilBirthday();
  const isToday = isBirthdayToday();

  const reveal = () => {
    setRevealed(true);
    if (isToday) {
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
    }
  };

  return (
    <section className="section-peach py-20 px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-display text-center mb-4"
        style={{ color: "hsl(20 60% 50%)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Official Certificate 🎖️
      </motion.h2>
      <p className="text-center text-muted-foreground font-body mb-12">
        Certified by the universe itself
      </p>

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="sealed"
            className="flex flex-col items-center"
            exit={{ scale: 0, opacity: 0 }}
          >
            <motion.div
              className="cursor-pointer"
              animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.05 }}
              onClick={reveal}
            >
              <div className="text-[100px] leading-none">📜</div>
            </motion.div>
            <motion.p
              className="mt-4 font-body text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap to reveal the certificate...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="cert"
            className="max-w-2xl mx-auto"
            initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            {/* Certificate */}
            <div
              className="rounded-3xl p-10 text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(40 70% 97%), hsl(40 50% 92%))",
                border: "3px solid hsl(45 80% 65%)",
                boxShadow: "0 0 40px hsl(45 90% 65% / 0.3), inset 0 0 40px hsl(40 60% 90%)",
              }}
            >
              {/* Corner decorations */}
              {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
                <div key={i} className={`absolute ${pos} text-2xl opacity-50`}>✦</div>
              ))}

              {/* Inner border */}
              <div
                className="absolute inset-4 rounded-2xl pointer-events-none"
                style={{ border: "1px solid hsl(45 70% 70% / 0.5)" }}
              />

              <div className="relative z-10">
                <motion.span
                  className="text-5xl block mb-4"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ⭐
                </motion.span>

                <p
                  className="text-xs uppercase tracking-widest font-body mb-2"
                  style={{ color: "hsl(30 40% 50%)" }}
                >
                  Certificate of Extraordinary Friendship
                </p>

                <h3
                  className="text-3xl md:text-4xl font-display my-4"
                  style={{ color: "hsl(30 50% 35%)" }}
                >
                  This Certifies That
                </h3>

                <div
                  className="text-5xl md:text-6xl font-display my-6"
                  style={{
                    color: "hsl(20 60% 50%)",
                    textShadow: "0 2px 4px hsl(20 60% 50% / 0.2)",
                  }}
                >
                  {FRIEND_NAME}
                </div>

                <p className="font-body text-sm leading-relaxed max-w-md mx-auto mb-4" style={{ color: "hsl(30 30% 40%)" }}>
                  is hereby awarded the <strong>Medal of Extraordinary Friendship</strong>,
                  the <strong>Star of Unconditional Trust</strong>, and the
                  <strong> Golden Heart of Guidance</strong> — for being someone
                  whose friendship is worth more than the entire universe combined.
                </p>

                <div className="flex justify-center gap-6 my-6 text-2xl">
                  {["💙", "🌟", "🤝", "✨", "💫"].map((e, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>

                <div className="border-t border-dashed pt-4 mt-4" style={{ borderColor: "hsl(45 70% 70%)" }}>
                  <p className="font-body text-xs" style={{ color: "hsl(30 30% 55%)" }}>
                    Turning {age} • {isToday ? "Today is your day! 🎂" : `${daysLeft} days until birthday ✨`}
                  </p>
                  <p className="font-display text-lg mt-2" style={{ color: "hsl(30 50% 45%)" }}>
                    Sealed with love, forever ♾️
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground font-body mt-4">
              📸 Screenshot this to save your certificate!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FriendshipCertificate;
