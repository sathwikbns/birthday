import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

const polaroids = [
  { video: "/VID_20260509_081210_135_bsl.mp4", emoji: "💙", caption: "Every giggle with you is a treasure", date: "Memory I" },
  { video: "/lv_7532382262227127613_20260509182452.mp4", emoji: "🌸", caption: "Crazy fun adventures together", date: "Memory II" },
  { video: "/lv_7321719901901589767_20260509185942.mp4", emoji: "🍰", caption: "Sweet laughter and perfect moments", date: "Memory III" },
  { video: "/lv_7482838075370982709_20260509191210.mp4", emoji: "🎉", caption: "Making memories that last a lifetime", date: "Memory IV" },
];

// Pre-generate stable random rotations so they don't change on re-render
const ROTATIONS = polaroids.map((_, i) => ((i % 2 === 0 ? 1 : -1) * (2 + (i % 3) * 2)));

/* ── 3-D Tilt Wrapper ── */
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 180, damping: 18 });

  if (isTouch) {
    return <div>{children}</div>;
  }

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
  const [selected, setSelected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play preview when flipped, pause when hidden
  useEffect(() => {
    if (videoRef.current) {
      if (flipped) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [flipped]);

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
            {/* ── Back face (glowing click-me cover) ── */}
            <div
              className="absolute inset-0 rounded-xl flex flex-col items-center justify-center p-4 transition-all duration-300 hover:border-pink-500/50"
              style={{
                backfaceVisibility: "hidden",
                background: "linear-gradient(135deg, rgba(20,15,45,0.7) 0%, rgba(10,5,25,0.85) 100%)",
                border: "1px solid rgba(210,188,255,0.25)",
                boxShadow: "inset 0 0 20px rgba(210,188,255,0.05), 0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <motion.div 
                className="text-4xl mb-3"
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                📹
              </motion.div>
              <p className="text-sm font-display text-white tracking-wide font-semibold text-center mb-1">
                Memory {p.date}
              </p>
              <p className="text-xs font-body text-pink-300/60 text-center uppercase tracking-widest" style={{ fontSize: "9px" }}>
                Tap to Play
              </p>
            </div>

            {/* ── Front face (Harry Potter style moving video photo) ── */}
            <div
              className="absolute inset-0 rounded-xl p-3 pb-12 shadow-xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "rgba(18,14,35,0.85)",
                border: "1px solid rgba(210,188,255,0.2)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.6), inset 0 0 15px rgba(255,255,255,0.02)",
              }}
            >
              <div className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden relative"
                style={{ background: "rgba(5,3,15,0.9)" }}>
                <video
                  ref={videoRef}
                  src={p.video}
                  className="w-full h-full object-cover rounded-lg"
                  loop
                  muted
                  playsInline
                />
                
                {/* Visual playing badge */}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-[10px] text-pink-300 font-body px-2.5 py-1 rounded-full border border-pink-400/20 flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                  Live Preview
                </div>
              </div>
              
              {/* Caption in Dancing Script */}
              <div className="absolute bottom-2.5 left-3 right-3 text-center">
                <p className="font-script truncate text-white" style={{ fontSize: "14px" }}>
                  {p.caption}
                </p>
                <p className="font-body text-pink-300/50" style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Tap to Zoom & Listen
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </TiltCard>

      {/* ── Expanded cinematic lightbox with sound controls ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 cursor-default"
            style={{ background: "rgba(3,2,8,0.96)", backdropFilter: "blur(24px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(false)}
          >
            {/* Close instruction */}
            <div className="absolute top-6 right-6 text-white/50 text-xs font-body tracking-widest cursor-pointer hover:text-white transition-colors">
              ✕ CLOSE MEMORY
            </div>

            <motion.div
              className="rounded-2xl p-4 pb-12 max-w-lg w-full shadow-2xl relative"
              style={{
                background: "rgba(16,12,32,0.95)",
                border: "1px solid rgba(210,188,255,0.25)",
                boxShadow: "0 0 100px rgba(210,188,255,0.2)",
              }}
              initial={{ scale: 0.6, rotate: -8 }}
              animate={{ scale: 1, rotate: ROTATIONS[i] * 0.15 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full aspect-[4/5] rounded-xl flex items-center justify-center overflow-hidden mb-4 relative"
                style={{ background: "rgba(5,3,15,0.95)" }}>
                <video
                  src={p.video}
                  className="w-full h-full object-cover rounded-xl"
                  autoPlay
                  controls
                  playsInline
                />
              </div>
              <p className="text-center font-script text-white text-gradient" style={{ fontSize: "22px" }}>
                {p.caption}
              </p>
              <p className="text-center font-body mt-2 text-pink-300/60" style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {p.date} · Click controls to play with audio 🎧
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ── PolaroidRain Section Component ── */
const PolaroidRain = () => (
  <section className="py-20 px-4 relative max-w-5xl mx-auto">
    {/* Section glow */}
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(210,188,255,0.06) 0%, transparent 60%)" }} />

    <motion.div
      className="text-center mb-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p className="chapter-label justify-center mb-3" style={{ color: "var(--nc-tertiary)" }}>✦ Chapter V</p>
      <h2 className="font-display font-black text-white" style={{ fontSize: "var(--t-5xl)", letterSpacing: "-0.01em" }}>
        Memory Reels 📹
      </h2>
    </motion.div>
    <p className="text-center font-body mb-16 text-pink-200/60" style={{ fontSize: "15px" }}>
      These moving moments are forever locked in our vault · Tap cards to reveal & play with sound 🎧
    </p>

    <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6" style={{ perspective: "1500px" }}>
      {polaroids.map((p, i) => (
        <Polaroid key={i} p={p} i={i} />
      ))}
    </div>

    <p className="text-center font-body mt-12 text-pink-300/30 tracking-wider" style={{ fontSize: "11px", textTransform: "uppercase" }}>
      ✦ Hover to tilt · Tap to flip · Tap again to zoom in ✦
    </p>
  </section>
);

export default PolaroidRain;
