import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TIMELINE_MEMORIES, FRIEND_NAME } from "@/config/priyanka";

const FriendshipTimeline = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="section-lavender py-20 px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-display text-center text-lavender mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Story, {FRIEND_NAME} 📖
      </motion.h2>

      <div className="relative max-w-5xl mx-auto overflow-x-auto pb-8">
        <div className="flex gap-6 min-w-max px-8">
          {TIMELINE_MEMORIES.map((m, i) => (
            <motion.div
              key={i}
              className="w-52 flex-shrink-0 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              onClick={() => setSelected(i)}
            >
              <div className="relative">
                <div className="w-full h-48 rounded-2xl bg-card flex items-center justify-center text-6xl glow-lavender border border-border hover:scale-105 transition-transform">
                  {m.emoji}
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-lavender border-4 border-card" />
              </div>
              <p className="text-center mt-5 font-body font-semibold text-foreground">{m.year}</p>
              <p className="text-center text-sm text-muted-foreground">{m.title}</p>
            </motion.div>
          ))}
        </div>
        {/* Timeline line */}
        <div className="absolute bottom-[4.25rem] left-8 right-8 h-0.5 bg-lavender/30" />
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-card rounded-3xl p-8 max-w-md w-full text-center glow-lavender"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-6xl">{TIMELINE_MEMORIES[selected].emoji}</span>
              <h3 className="text-2xl font-display text-lavender mt-4">
                {TIMELINE_MEMORIES[selected].title}
              </h3>
              <p className="text-muted-foreground mt-3 font-body">
                {TIMELINE_MEMORIES[selected].caption}
              </p>
              <button
                className="mt-6 px-6 py-2 rounded-full bg-lavender text-primary-foreground font-body font-semibold hover:opacity-90 transition"
                onClick={() => setSelected(null)}
              >
                Close 💜
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FriendshipTimeline;
