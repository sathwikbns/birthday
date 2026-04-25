import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

const polaroids = [
  { photo: "/priyanka/photo1.jpg", emoji: "🌸", caption: "That spring day we'll never forget", date: "Spring '22" },
  { photo: "/priyanka/photo2.jpg", emoji: "☕", caption: "Our favourite café spot",            date: "Summer '22" },
  { photo: "/priyanka/photo3.jpg", emoji: "🌅", caption: "Sunsets and life conversations",     date: "Autumn '22" },
  { photo: "/priyanka/photo4.jpg", emoji: "🎵", caption: "Singing our hearts out",             date: "Winter '22" },
  { photo: "/priyanka/photo5.jpg", emoji: "📚", caption: "Study sessions turned gossip hours", date: "Spring '23" },
  { photo: "/priyanka/photo6.jpg", emoji: "🍕", caption: "Pizza nights forever",               date: "Summer '23" },
  { photo: "/priyanka/photo7.jpg", emoji: "🎪", caption: "That unforgettable day!",            date: "Autumn '23" },
  { photo: "/priyanka/photo8.jpg", emoji: "🌊", caption: "Best memories, best friend",         date: "Today 💙" },
];

// Pre-generate stable random rotations so they don't change on re-render
const ROTATIONS = polaroids.map((_, i) => ((i % 2 === 0 ? 1 : -1) * (2 + (i % 3) * 2)));

/* ── 3-D Tilt Wrapper ── */
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 180, damping: 18 });

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
};

/* ── Single Polaroid ── */
const Polaroid = ({ p, i }: { p: typeof polaroids[0]; i: number }) => {
  const [flipped, setFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <>
      <TiltCard>
        <motion.div
          className="cursor-pointer"
          initial={{ opacity: 0, y: 60, rotate: ROTATIONS[i] }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, type: "spring", bounce: 0.3 }}
          whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
          onClick={() => { if (flipped) setSelected(true); else setFlipped(true); }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", paddingBottom: "145%" }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.65, type: "spring" }}
          >
            {/* ── Back face (hidden) ── */}
            <div
              className="absolute inset-0 rounded-xl flex items-center justify-center"
              style={{
                backfaceVisibility: "hidden",
                background: "linear-gradient(135deg, hsl(260 40% 16%), hsl(200 40% 14%))",
                border: "1px solid rgba(210,188,255,0.2)",
              }}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">🤫</div>
                <p className="text-xs font-body" style={{ color: "var(--nc-on-muted)" }}>Tap to flip</p>
              </div>
            </div>

            {/* ── Front face (photo) ── */}
            <div
              className="absolute inset-0 rounded-xl p-2 pb-10 shadow-xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "var(--nc-surface-mid)",
                border: "1px solid rgba(210,188,255,0.15)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            >
              <div className="w-full h-4/5 rounded-lg flex items-center justify-center overflow-hidden"
                style={{ background: "var(--nc-surface-lo)" }}>
                {!imgError ? (
                  <img
                    src={p.photo}
                    alt={p.caption}
                    className="w-full h-full object-cover rounded-lg"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span className="text-5xl">{p.emoji}</span>
                )}
              </div>
              {/* Caption in Dancing Script */}
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <p className="font-script truncate" style={{ fontSize: "var(--t-sm)", color: "var(--nc-on-muted)" }}>
                  {p.caption}
                </p>
                <p className="font-body" style={{ fontSize: "9px", color: "var(--nc-secondary)", letterSpacing: "0.12em", opacity: 0.7, textTransform: "uppercase" }}>
                  {p.date}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </TiltCard>

      {/* ── Expanded lightbox ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,8,22,0.85)", backdropFilter: "blur(18px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(false)}
          >
            <motion.div
              className="rounded-2xl p-3 pb-10 max-w-sm w-full shadow-2xl relative"
              style={{
                background: "var(--nc-surface-mid)",
                border: "1px solid rgba(210,188,255,0.2)",
                boxShadow: "0 0 80px rgba(210,188,255,0.15)",
              }}
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: ROTATIONS[i] * 0.3 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3"
                style={{ background: "var(--nc-surface-lo)" }}>
                {!imgError ? (
                  <img src={p.photo} alt={p.caption} className="w-full h-full object-cover rounded-xl" onError={() => setImgError(true)} />
                ) : (
                  <span className="text-8xl">{p.emoji}</span>
                )}
              </div>
              <p className="text-center font-script" style={{ fontSize: "var(--t-lead)", color: "var(--nc-on-surface)" }}>
                {p.caption}
              </p>
              <p className="text-center font-body mt-1" style={{ fontSize: "var(--t-label)", color: "var(--nc-secondary)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {p.date}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ── Section ── */
const PolaroidRain = () => (
  <section className="py-20 px-4 relative">
    {/* Section glow */}
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(210,188,255,0.06) 0%, transparent 60%)" }} />

    <motion.div
      className="text-center mb-3"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p className="chapter-label justify-center mb-3" style={{ color: "var(--nc-tertiary)" }}>✦ Our memories</p>
      <h2 className="font-display font-black" style={{ fontSize: "var(--t-5xl)", color: "var(--nc-on-surface)" }}>
        Memory Polaroids 📸
      </h2>
    </motion.div>
    <p className="text-center font-body mb-12" style={{ fontSize: "var(--t-base)", color: "var(--nc-on-muted)" }}>
      Hover to tilt · Tap to flip · Tap again to expand 🌸
    </p>

    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6" style={{ perspective: "1200px" }}>
      {polaroids.map((p, i) => (
        <Polaroid key={i} p={p} i={i} />
      ))}
    </div>

    <p className="text-center font-body mt-8" style={{ fontSize: "var(--t-xs)", color: "rgba(216,194,190,0.3)" }}>
      📸 Add photos as photo1–photo8.jpg in <code>public/priyanka/</code>
    </p>
  </section>
);

export default PolaroidRain;
