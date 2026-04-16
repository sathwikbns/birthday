import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FRIEND_NAME } from "@/config/priyanka";

interface WishBubble {
  id: number;
  text: string;
  x: number;
}

const WishScrapbook = () => {
  const [wish, setWish] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [bubbles, setBubbles] = useState<WishBubble[]>([]);

  const submitWish = () => {
    if (!wish.trim()) return;
    const newBubble: WishBubble = {
      id: Date.now(),
      text: wish.trim(),
      x: 30 + Math.random() * 40,
    };
    setBubbles((prev) => [...prev, newBubble]);
    setSubmitted(true);
    setWish("");
    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
      setSubmitted(false);
    }, 4500);
  };

  return (
    <section className="section-mixed py-20 px-4 relative overflow-hidden min-h-[500px]">
      <motion.h2
        className="text-4xl md:text-5xl font-display text-center text-lavender mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Send a Wish to the Stars 🌠
      </motion.h2>
      <p className="text-center text-muted-foreground font-body mb-10">
        Write your birthday wish for {FRIEND_NAME} — watch it fly to the universe
      </p>

      {/* Floating wish bubbles */}
      <AnimatePresence>
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute z-20 max-w-xs"
            style={{ left: `${b.x}%`, bottom: "160px", transform: "translateX(-50%)" }}
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: -600, opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: "easeOut" }}
          >
            <div
              className="rounded-2xl px-4 py-3 text-center font-body text-sm shadow-lg"
              style={{
                background: "linear-gradient(135deg, hsl(260 60% 85%), hsl(200 70% 85%))",
                border: "1px solid hsl(260 60% 70% / 0.4)",
                boxShadow: "0 0 20px hsl(260 60% 70% / 0.3)",
              }}
            >
              <span className="text-xl">🌠</span>
              <p className="mt-1 text-foreground">{b.text}</p>
            </div>
            {/* String */}
            <div className="w-px h-8 mx-auto" style={{ background: "hsl(260 60% 70% / 0.4)" }} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Input area */}
      <div className="max-w-lg mx-auto">
        <motion.div
          className="relative rounded-3xl p-6"
          style={{
            background: "hsl(var(--card))",
            border: "2px dashed hsl(var(--lavender) / 0.5)",
            boxShadow: "0 0 30px hsl(260 60% 70% / 0.1)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Sticky note style header */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📝</span>
            <span className="font-body font-semibold text-foreground">Your wish for {FRIEND_NAME}...</span>
          </div>

          <textarea
            className="w-full rounded-2xl p-4 font-body text-sm resize-none focus:outline-none focus:ring-2"
            style={{
              background: "hsl(45 90% 97%)",
              border: "1px solid hsl(45 70% 80%)",
              color: "hsl(30 30% 30%)",
              minHeight: "100px",
              focusRingColor: "hsl(260 60% 70%)",
            }}
            placeholder={`Write something beautiful for ${FRIEND_NAME}...`}
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            maxLength={150}
            disabled={submitted}
          />

          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-muted-foreground font-body">{wish.length}/150</span>
            <motion.button
              className="px-6 py-2 rounded-full font-body font-bold text-sm"
              style={{
                background: "linear-gradient(135deg, hsl(260 60% 70%), hsl(200 70% 75%))",
                color: "white",
                boxShadow: "0 4px 15px hsl(260 60% 70% / 0.4)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={submitWish}
              disabled={!wish.trim() || submitted}
            >
              {submitted ? "Flying to the stars! 🌠" : "Release to the Stars ✨"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WishScrapbook;
