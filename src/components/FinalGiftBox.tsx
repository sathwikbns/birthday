import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FRIEND_NAME, getTurningAge } from "@/config/priyanka";

const FinalGiftBox = () => {
  const [opened, setOpened] = useState(false);
  const age = getTurningAge();

  const openGift = () => {
    setOpened(true);
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ["#b794f6", "#90cdf4", "#f6ad55", "#fbb6ce", "#ffd700"] });
    setTimeout(() => confetti({ particleCount: 100, angle: 60, spread: 60, origin: { x: 0 } }), 400);
    setTimeout(() => confetti({ particleCount: 100, angle: 120, spread: 60, origin: { x: 1 } }), 600);
    setTimeout(() => confetti({ particleCount: 150, spread: 180, origin: { y: 0.3 } }), 1000);
  };

  return (
    <section className="section-mixed py-20 px-4 min-h-[80vh] flex flex-col items-center justify-center">
      <motion.h2
        className="text-4xl md:text-5xl font-display text-center text-lavender mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        One Last Surprise... 🎁
      </motion.h2>

      {!opened ? (
        <motion.div
          className="cursor-pointer text-center"
          onClick={openGift}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="text-[120px] md:text-[160px] leading-none"
            animate={{ rotate: [-2, 2, -2, 2, 0], scale: [1, 1.02, 1, 1.02, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
          >
            🎁
          </motion.div>
          <motion.p
            className="mt-6 text-lg font-body text-muted-foreground"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap to open your gift, {FRIEND_NAME}!
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          className="text-center max-w-lg mx-auto"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4, delay: 0.3 }}
        >
          <motion.div
            className="bg-card rounded-3xl p-10 glow-gold shadow-2xl"
            animate={{
              boxShadow: [
                "0 0 30px hsl(45 90% 65% / 0.3)",
                "0 0 60px hsl(45 90% 65% / 0.6)",
                "0 0 30px hsl(45 90% 65% / 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-6xl">💝</span>
            <h3 className="text-3xl md:text-4xl font-display text-lavender mt-6 leading-snug">
              Happy {age}th Birthday, {FRIEND_NAME}! 💙
            </h3>
            <p className="mt-6 text-muted-foreground font-body leading-relaxed">
              You are the most precious person in my life — my guide, my teacher, my safe place,
              my happiest feeling. You are beautiful in ways words can't fully hold.
              Thank you for being you. I love you endlessly. Here's to every beautiful year ahead. 🥂✨
            </p>
            <div className="mt-8 flex justify-center gap-3 text-3xl flex-wrap">
              {["🎂", "🎉", "💜", "✨", "🌟", "🦋", "🌸", "💙"].map((e, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default FinalGiftBox;
