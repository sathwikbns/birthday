import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Star = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary-foreground"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
    transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay }}
  />
);

const stars = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 3,
}));

interface Props {
  onEnter: () => void;
}

/* ── Magnetic Portal ── */
const MagneticPortal = ({ onClick }: { onClick: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.6 });
  const [isTouch] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches
  );

  useEffect(() => {
    if (isTouch) return;
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const pull = Math.max(0, 1 - dist / 220); // magnetic range 220px
      x.set((e.clientX - cx) * pull * 0.18);
      y.set((e.clientY - cy) * pull * 0.18);
    };
    const handleLeave = () => { x.set(0); y.set(0); };
    window.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [isTouch]);

  return (
    <motion.div
      ref={containerRef}
      style={{ x: springX, y: springY }}
      className="w-48 h-48 md:w-64 md:h-64 rounded-full cursor-pointer relative flex items-center justify-center"
    >
      <motion.div
        className="w-full h-full rounded-full relative flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 40% 35%, rgba(210,188,255,0.5), rgba(145,176,255,0.3), rgba(255,180,166,0.15), transparent 70%)",
          boxShadow: "0 0 60px rgba(210,188,255,0.4), 0 0 120px rgba(200,170,255,0.2), inset 0 0 50px rgba(210,188,255,0.1)",
          border: "1px solid rgba(210,188,255,0.2)",
        }}
        animate={{
          scale: [1, 1.04, 1],
          boxShadow: [
            "0 0 60px rgba(210,188,255,0.4), 0 0 120px rgba(200,170,255,0.2)",
            "0 0 80px rgba(210,188,255,0.6), 0 0 160px rgba(200,170,255,0.3)",
            "0 0 60px rgba(210,188,255,0.4), 0 0 120px rgba(200,170,255,0.2)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        onClick={onClick}
        whileTap={{ scale: 0.96 }}
      >
        <div className="absolute inset-4 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />
        <span className="text-5xl relative z-10" style={{ filter: "drop-shadow(0 0 12px rgba(255,105,180,0.7))" }}>💖</span>
      </motion.div>
    </motion.div>
  );
};

const FULL_TEXT = "Today is the birthday of someone truly irreplaceable…";
const NAME = "Priyanka.";

const MagicalEntry = ({ onEnter }: Props) => {
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState("");
  const [namePart, setNamePart] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Typewriter effect
  useEffect(() => {
    if (phase !== 1) return;
    let i = 0;
    const t = setInterval(() => {
      if (i < FULL_TEXT.length) {
        setTyped(FULL_TEXT.slice(0, i + 1));
        i++;
      } else {
        clearInterval(t);
        // After main text, type the name
        let j = 0;
        const nt = setInterval(() => {
          if (j < NAME.length) {
            setNamePart(NAME.slice(0, j + 1));
            j++;
          } else {
            clearInterval(nt);
            // Show portal after name typed
            setTimeout(() => setPhase(2), 800);
          }
        }, 90);
      }
    }, 40);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    return () => clearTimeout(t1);
  }, []);

  // Parallax mouse tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <motion.section
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #08061a 0%, #0c0920 50%, #0a0618 100%)" }}
      onMouseMove={handleMouseMove}
    >
      {/* Deep vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 35%, rgba(5,3,15,0.7) 100%)",
        zIndex: 1
      }} />

      {/* Cinematic Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0, opacity: 0.75 }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4" />
      </video>

      {/* Dark video overlay for maximum contrast and elegance */}
      <div className="absolute inset-0 bg-background/25 backdrop-blur-[1px] pointer-events-none" style={{ zIndex: 1 }} />

      {/* Ambient aurora */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 50% 40% at 30% 60%, rgba(210,188,255,0.1) 0%, transparent 70%), radial-gradient(ellipse 40% 35% at 70% 35%, rgba(255,180,166,0.07) 0%, transparent 65%)",
            "radial-gradient(ellipse 50% 40% at 70% 40%, rgba(255,180,166,0.09) 0%, transparent 70%), radial-gradient(ellipse 40% 35% at 30% 65%, rgba(210,188,255,0.07) 0%, transparent 65%)",
            "radial-gradient(ellipse 50% 40% at 30% 60%, rgba(210,188,255,0.1) 0%, transparent 70%), radial-gradient(ellipse 40% 35% at 70% 35%, rgba(255,180,166,0.07) 0%, transparent 65%)",
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Parallax star layers */}
      <motion.div
        className="absolute inset-0"
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        {stars.slice(0, 40).map((s) => (
          <Star key={s.id} delay={s.delay} x={s.x} y={s.y} size={s.size} />
        ))}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        animate={{ x: mousePos.x * 1.2, y: mousePos.y * 1.2 }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >
        {stars.slice(40).map((s) => (
          <Star key={s.id} delay={s.delay} x={s.x} y={s.y} size={s.size * 1.5} />
        ))}
      </motion.div>

      {/* Moon with halo */}
      <motion.div
        className="absolute top-10 right-14 flex items-center justify-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Halo ring */}
        <div className="absolute rounded-full" style={{
          width: 100, height: 100,
          border: "1px solid rgba(255,230,140,0.15)",
          boxShadow: "0 0 30px rgba(255,215,100,0.1)"
        }} />
        <motion.div
          className="w-20 h-20 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, hsl(45 90% 95%), hsl(44 75% 70%))",
            boxShadow: "0 0 40px hsl(45 80% 75% / 0.55), 0 0 80px hsl(45 80% 75% / 0.2)",
          }}
          animate={{ x: mousePos.x * 0.3, y: mousePos.y * 0.15 }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        />
      </motion.div>

      {/* Floating heart — top left corner accent */}
      <motion.div
        className="absolute top-10 left-12 select-none"
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          filter: "drop-shadow(0 0 20px rgba(255,105,180,0.65))",
        }}
        animate={{ y: [0, -10, 0], rotate: [-8, 8, -8], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        💖
      </motion.div>

      {/* Phase 1: Typewriter text */}
      {phase >= 1 && phase < 2 && (
        <motion.div
          className="text-center px-6 z-10 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Chapter eyebrow */}
          <motion.p
            className="font-body mb-6"
            style={{ fontSize: "0.65rem", letterSpacing: "0.4em", color: "rgba(233,193,118,0.5)", textTransform: "uppercase" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ✦ Nocturne Cinema ✦
          </motion.p>

          <h1
            className="font-display leading-relaxed"
            style={{
              fontSize: "clamp(1.4rem, 4vw, 2.6rem)",
              fontWeight: 600,
              fontStyle: "italic",
              color: "hsl(45 90% 87%)",
              textShadow: "0 0 40px rgba(233,193,118,0.25), 0 2px 20px rgba(0,0,0,0.5)",
              letterSpacing: "0.01em",
            }}
          >
            {typed}
            {typed.length < FULL_TEXT.length && (
              <motion.span
                style={{ display: "inline-block", width: 2, height: "1em", background: "#e9c176", marginLeft: 4, verticalAlign: "middle" }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.55, repeat: Infinity }}
              />
            )}
          </h1>

          {typed === FULL_TEXT && (
            <motion.p
              className="font-display mt-4"
              style={{
                fontSize: "clamp(2.2rem, 7vw, 4rem)",
                fontWeight: 900,
                background: "linear-gradient(135deg, #d2bcff, #ffb4a6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 20px rgba(210,188,255,0.3))",
              }}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
              {namePart}
              {namePart.length < NAME.length && (
                <motion.span
                  style={{ display: "inline-block", width: 3, height: "0.85em", background: "#d2bcff", marginLeft: 5, verticalAlign: "middle" }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.55, repeat: Infinity }}
                />
              )}
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Phase 2: Portal */}
      {phase >= 2 && (
        <motion.div
          className="flex flex-col items-center z-10 text-center"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 100, damping: 16 }}
        >
          {/* Chapter label */}
          <motion.p
            className="font-body mb-6"
            style={{ fontSize: "0.65rem", letterSpacing: "0.4em", color: "rgba(233,193,118,0.5)", textTransform: "uppercase" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ✦ Chapter II ✦
          </motion.p>

          {/* Magnetic portal — nudges toward cursor */}
          <MagneticPortal onClick={onEnter} />

          {/* Tap prompt with animated chevron */}
          <motion.div
            className="mt-8 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.p
              className="font-display"
              style={{
                fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)",
                color: "hsl(45 90% 78%)",
                textShadow: "0 0 24px rgba(233,193,118,0.35)",
                letterSpacing: "0.05em",
              }}
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Tap the portal to enter…
            </motion.p>
            <motion.svg
              width="18" height="18" viewBox="0 0 18 18" fill="none"
              stroke="rgba(233,193,118,0.45)" strokeWidth="1.5" strokeLinecap="round"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <polyline points="4,6 9,12 14,6" />
            </motion.svg>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default MagicalEntry;
