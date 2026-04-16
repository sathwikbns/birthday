import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MessageInABottle = () => {
  const [opened, setOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const openBottle = () => {
    setOpened(true);
    setTimeout(() => setScrolled(true), 800);
  };

  return (
    <section className="section-sky py-20 px-4 overflow-hidden">
      <motion.h2
        className="text-4xl md:text-5xl font-display text-center mb-4"
        style={{ color: "hsl(200 60% 45%)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Message in a Bottle 🌊
      </motion.h2>
      <p className="text-center text-muted-foreground font-body mb-12">
        Something was waiting just for you...
      </p>

      <div className="flex flex-col items-center">
        {!opened ? (
          <motion.div
            className="cursor-pointer flex flex-col items-center"
            onClick={openBottle}
            whileHover={{ scale: 1.05 }}
          >
            {/* Bottle */}
            <motion.div
              className="relative"
              animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-[120px] leading-none select-none">🍾</div>
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ boxShadow: "0 0 40px hsl(200 70% 70% / 0.4)", borderRadius: "50%" }}
              />
            </motion.div>

            {/* Wave */}
            <motion.div
              className="mt-2 text-3xl"
              animate={{ scaleX: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              〰️〰️〰️
            </motion.div>

            <motion.p
              className="mt-4 font-body text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap to uncork the bottle...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            className="w-full max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
          >
            {/* Bottle open animation */}
            <motion.div
              className="text-6xl text-center mb-6"
              initial={{ rotate: -45, y: -20 }}
              animate={{ rotate: 0, y: 0 }}
              transition={{ type: "spring" }}
            >
              🍾💨
            </motion.div>

            {/* Scroll / note */}
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  className="relative rounded-2xl p-8 text-center"
                  style={{
                    background: "linear-gradient(135deg, hsl(40 60% 96%), hsl(40 40% 90%))",
                    border: "2px solid hsl(40 50% 75%)",
                    boxShadow: "0 8px 32px hsl(200 70% 60% / 0.2)",
                    filter: "sepia(0.15)",
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {/* Ribbon top */}
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 rounded-full"
                    style={{ background: "hsl(200 70% 75%)" }}
                  />

                  <span className="text-4xl block mb-4">📜</span>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p
                      className="text-lg font-display mb-4 leading-relaxed"
                      style={{ color: "hsl(30 40% 30%)", fontStyle: "italic" }}
                    >
                      "Dear Priyanka,
                    </p>
                    <p
                      className="font-body leading-relaxed text-sm mb-3"
                      style={{ color: "hsl(30 30% 35%)" }}
                    >
                      This bottle has traveled across every memory we've made, every 3AM conversation,
                      every moment you guided me when I was lost. It carries one simple truth:
                    </p>
                    <p
                      className="text-xl font-display"
                      style={{ color: "hsl(200 60% 40%)" }}
                    >
                      You are the rarest kind of person. The kind they write poems about.
                    </p>
                    <p
                      className="mt-4 font-body text-sm"
                      style={{ color: "hsl(30 30% 45%)" }}
                    >
                      Happy Birthday. With all my love, always. 💙"
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MessageInABottle;
