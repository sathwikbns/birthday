import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const memories = [
  {
    label: "MEMORY_001.VHS",
    title: "The Day You First Met",
    text: "A random hello. An uncertain smile. And somehow, the universe knew — this was going to be forever.",
  },
  {
    label: "MEMORY_002.VHS",
    title: "The First Time She Guided You",
    text: "Lost and unsure, you turned to her. She didn't hesitate. She never does. That's just who she is.",
  },
  {
    label: "MEMORY_003.VHS",
    title: "3AM Conversations",
    text: "The world was asleep. You two were not. Some truths only come out at 3AM with the right person.",
  },
  {
    label: "MEMORY_004.VHS",
    title: "When She Taught You Something Real",
    text: "Not from a book. From life. From her heart. You learned more from her than any classroom ever gave.",
  },
  {
    label: "MEMORY_005.VHS",
    title: "The Happiest Feeling",
    text: "Every. Single. Time. You meet her — that's your happiest moment. Every time. No exception. No equal.",
  },
  {
    label: "MEMORY_006.VHS",
    title: "Sharing Everything",
    text: "Secrets. Opinions. Feelings. Ups and downs. With her, there is no filter. Just pure, honest truth.",
  },
];

const VHSMemories = () => {
  const [playing, setPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [rewinding, setRewinding] = useState(false);

  const startPlay = () => {
    setRewinding(true);
    setTimeout(() => {
      setRewinding(false);
      setCurrentIdx(0);
      setPlaying(true);
    }, 1600);
  };

  const current = memories[currentIdx];

  return (
    <section className="py-20 px-4" style={{ background: "linear-gradient(135deg, #0d0d1a, #1a0a2e, #0d1a0d)" }}>
      <motion.h2
        className="text-4xl md:text-5xl font-display text-center mb-4"
        style={{ color: "hsl(45 90% 80%)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Memory Rewind 📼
      </motion.h2>
      <p className="text-center font-body mb-12" style={{ color: "hsl(45 50% 65%)" }}>
        Our greatest hits — playing back in glorious VHS
      </p>

      <div className="max-w-2xl mx-auto">
        {/* VHS Player Body */}
        <div
          className="rounded-2xl p-6 relative"
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            border: "3px solid hsl(45 80% 35% / 0.6)",
            boxShadow: "0 0 40px hsl(45 90% 65% / 0.15), inset 0 0 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* CRT Screen */}
          <div
            className="relative rounded-xl overflow-hidden mb-6"
            style={{ background: "#000", height: "240px" }}
          >
            {/* Scanlines overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
              }}
            />

            {!playing && !rewinding && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <motion.div className="text-5xl mb-4" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  📼
                </motion.div>
                <p className="font-body text-sm" style={{ color: "hsl(45 80% 70%)", fontFamily: "monospace" }}>
                  — INSERT TAPE —
                </p>
              </div>
            )}

            {rewinding && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <motion.p
                  className="text-2xl font-bold"
                  style={{ color: "hsl(45 90% 70%)", fontFamily: "monospace" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                >
                  ◄◄ REWINDING...
                </motion.p>
                <div className="mt-4 flex gap-3">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 rounded-full bg-yellow-400"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.13 }}
                    />
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {playing && !rewinding && (
                <motion.div
                  key={currentIdx}
                  className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p
                    className="text-xs mb-3"
                    style={{ color: "hsl(45 70% 60%)", fontFamily: "monospace" }}
                  >
                    ▶ {current.label}
                  </p>
                  <h3
                    className="text-lg font-display mb-4"
                    style={{ color: "hsl(45 90% 80%)" }}
                  >
                    {current.title}
                  </h3>
                  <p
                    className="text-sm font-body leading-relaxed"
                    style={{ color: "hsl(260 30% 80%)" }}
                  >
                    {current.text}
                  </p>

                  {/* Counter */}
                  <p
                    className="mt-4 text-xs"
                    style={{ color: "hsl(45 50% 55%)", fontFamily: "monospace" }}
                  >
                    {currentIdx + 1} / {memories.length}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CRT glow */}
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{ boxShadow: "inset 0 0 30px hsl(260 60% 50% / 0.15)" }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            {!playing ? (
              <motion.button
                className="px-8 py-3 rounded-full font-body font-bold text-sm"
                style={{
                  background: "hsl(45 90% 60%)",
                  color: "#1a1a2e",
                  boxShadow: "0 0 15px hsl(45 90% 60% / 0.4)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startPlay}
              >
                ▶ PLAY MEMORIES
              </motion.button>
            ) : (
              <>
                <motion.button
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ background: "hsl(260 40% 30%)", color: "hsl(260 60% 85%)" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((i) => i - 1)}
                  style={{ background: currentIdx === 0 ? "hsl(260 20% 20%)" : "hsl(260 40% 35%)", color: "hsl(260 60% 85%)", opacity: currentIdx === 0 ? 0.4 : 1 }}
                >
                  ◄
                </motion.button>

                <div
                  className="px-4 py-1 rounded font-body text-xs"
                  style={{ background: "hsl(45 90% 15%)", color: "hsl(45 90% 70%)", fontFamily: "monospace" }}
                >
                  ▶ PLAYING
                </div>

                <motion.button
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ background: currentIdx === memories.length - 1 ? "hsl(260 20% 20%)" : "hsl(260 40% 35%)", color: "hsl(260 60% 85%)", opacity: currentIdx === memories.length - 1 ? 0.4 : 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={currentIdx === memories.length - 1}
                  onClick={() => setCurrentIdx((i) => i + 1)}
                >
                  ►
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VHSMemories;
