import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const polaroids = [
  { photo: "/priyanka/photo1.jpg", emoji: "🌸", caption: "That spring day we'll never forget" },
  { photo: "/priyanka/photo2.jpg", emoji: "☕", caption: "Our favourite café spot" },
  { photo: "/priyanka/photo3.jpg", emoji: "🌅", caption: "Sunsets and life conversations" },
  { photo: "/priyanka/photo4.jpg", emoji: "🎵", caption: "Singing our hearts out" },
  { photo: "/priyanka/photo5.jpg", emoji: "📚", caption: "Study sessions turned gossip hours" },
  { photo: "/priyanka/photo6.jpg", emoji: "🍕", caption: "Pizza nights forever" },
  { photo: "/priyanka/photo7.jpg", emoji: "🎪", caption: "That unforgettable day!" },
  { photo: "/priyanka/photo8.jpg", emoji: "🌊", caption: "Best memories, best friend" },
];

const Polaroid = ({ p, i }: { p: typeof polaroids[0]; i: number }) => {
  const [flipped, setFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <>
      <motion.div
        className="cursor-pointer"
        style={{ perspective: "1000px" }}
        initial={{ opacity: 0, y: 60, rotate: (i % 2 === 0 ? 1 : -1) * (Math.floor(i / 2) * 3) }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        whileHover={{ scale: 1.08, rotate: 0 }}
        onClick={() => { if (flipped) setSelected(true); else setFlipped(true); }}
      >
        <motion.div
          style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", paddingBottom: "140%" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Back face */}
          <div
            className="absolute inset-0 rounded-lg flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              background: "linear-gradient(135deg, hsl(260 40% 92%), hsl(200 50% 92%))",
              border: "1px solid hsl(260 30% 80%)",
            }}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🤫</div>
              <p className="text-xs font-body text-muted-foreground">Tap to reveal</p>
            </div>
          </div>

          {/* Front face (photo) */}
          <div
            className="absolute inset-0 bg-card rounded-lg p-2 pb-10 shadow-lg"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="w-full h-4/5 rounded bg-lavender/20 flex items-center justify-center overflow-hidden">
              {!imgError ? (
                <img
                  src={p.photo}
                  alt={p.caption}
                  className="w-full h-full object-cover rounded"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="text-5xl">{p.emoji}</span>
              )}
            </div>
            <p className="absolute bottom-2 left-2 right-2 text-xs font-body text-muted-foreground text-center truncate">
              {p.caption}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Expanded view */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(false)}
          >
            <motion.div
              className="bg-card rounded-2xl p-4 pb-12 max-w-sm w-full shadow-2xl"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full aspect-square rounded-xl bg-lavender/20 flex items-center justify-center overflow-hidden mb-3">
                {!imgError ? (
                  <img src={p.photo} alt={p.caption} className="w-full h-full object-cover rounded-xl" onError={() => setImgError(true)} />
                ) : (
                  <span className="text-8xl">{p.emoji}</span>
                )}
              </div>
              <p className="text-center font-body text-foreground">{p.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const PolaroidRain = () => (
  <section className="section-lavender py-20 px-4">
    <motion.h2
      className="text-4xl md:text-5xl font-display text-center text-lavender mb-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Memory Polaroids 📸
    </motion.h2>
    <p className="text-center text-muted-foreground font-body mb-12">
      Tap each polaroid to flip it and reveal the memory 🌸
    </p>
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
      {polaroids.map((p, i) => (
        <Polaroid key={i} p={p} i={i} />
      ))}
    </div>
    <p className="text-center text-xs text-muted-foreground font-body mt-8">
      📸 Add your photos as photo1.jpg–photo8.jpg in <code>public/priyanka/</code>
    </p>
  </section>
);

export default PolaroidRain;
