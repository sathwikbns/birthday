import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FRIEND_NAME } from "@/config/priyanka";

const ScratchCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawingRef = useRef(false);
  const isRevealedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [hint, setHint] = useState("Scratch the golden foil to reveal your surprise!");

  /* ── Canvas initialisation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    /* Nocturne Cinema gold foil */
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0,   "#b8882a");
    gradient.addColorStop(0.3, "#e9c176");
    gradient.addColorStop(0.6, "#f5d78e");
    gradient.addColorStop(1,   "#9a6e1a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* Subtle shimmer pattern */
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 60 + 20;
      const spot = ctx.createRadialGradient(x, y, 0, x, y, r);
      spot.addColorStop(0,   "rgba(255,255,255,0.12)");
      spot.addColorStop(1,   "rgba(255,255,255,0)");
      ctx.fillStyle = spot;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }

    /* Foil text */
    ctx.fillStyle = "rgba(80,50,10,0.55)";
    ctx.font = `bold ${Math.round(canvas.width * 0.055)}px 'Playfair Display', Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH ME ✦", canvas.width / 2, canvas.height / 2);

    /* ── Pointer helpers ── */
    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const src = "touches" in e ? (e as TouchEvent).touches[0] : (e as MouseEvent);
      return {
        x: (src.clientX - rect.left) * (canvas.width / rect.width),
        y: (src.clientY - rect.top)  * (canvas.height / rect.height),
      };
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current || isRevealedRef.current) return;
      e.preventDefault();
      const { x, y } = getPos(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();
    };

    const checkReveal = () => {
      if (isRevealedRef.current) return;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) transparent++;
      }
      const pct = (transparent / (canvas.width * canvas.height)) * 100;
      if (pct > 45) {
        isRevealedRef.current = true;
        /* Fade canvas out */
        canvas.style.transition = "opacity 0.6s ease";
        canvas.style.opacity = "0";
        setTimeout(() => { canvas.style.display = "none"; }, 600);
        setRevealed(true);
        setHint("Yay! You found it! 🎉");
        confetti({
          particleCount: 180,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#e9c176", "#d2bcff", "#ffb4a6", "#fff"],
          zIndex: 9999,
        });
      }
    };

    canvas.addEventListener("mousedown",  () => { isDrawingRef.current = true;  });
    canvas.addEventListener("touchstart", () => { isDrawingRef.current = true;  }, { passive: true });
    canvas.addEventListener("mouseup",    () => { isDrawingRef.current = false; checkReveal(); });
    canvas.addEventListener("touchend",   () => { isDrawingRef.current = false; checkReveal(); });
    canvas.addEventListener("mousemove",  scratch);
    canvas.addEventListener("touchmove",  scratch, { passive: false });

    return () => {
      canvas.replaceWith(canvas.cloneNode(true)); // clean up listeners
    };
  }, []);

  return (
    <section className="py-20 px-4 relative min-h-[600px] flex flex-col items-center justify-center">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(233,193,118,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Heading */}
      <motion.div
        className="text-center mb-10 z-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p
          className="chapter-label justify-center mb-4"
          style={{ color: "var(--nc-secondary)" }}
        >
          ✦ A little secret
        </p>
        <h2
          className="font-display font-black leading-none mb-3"
          style={{
            fontSize: "var(--t-5xl)",
            background: "var(--grad-text)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Your Surprise 🎁
        </h2>
        <p
          className="font-body"
          style={{ fontSize: "var(--t-lead)", color: "var(--nc-on-muted)" }}
        >
          Scratch the golden foil to reveal what's hidden, {FRIEND_NAME}
        </p>
      </motion.div>

      {/* Scratch container */}
      <motion.div
        className="relative z-10 w-full"
        style={{ maxWidth: "400px" }}
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Card border glow */}
        <div
          className="rounded-3xl p-[2px]"
          style={{
            background: "linear-gradient(135deg, #e9c176, #d2bcff, #ffb4a6)",
            boxShadow: "var(--glow-gold)",
          }}
        >
          <div
            className="rounded-3xl overflow-hidden relative"
            style={{ background: "var(--nc-surface-mid)" }}
          >
            {/* Hidden message revealed underneath */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center"
              style={{ pointerEvents: "none" }}
            >
              <AnimatePresence>
                {revealed && (
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <span className="text-5xl">💝</span>
                    <h3
                      className="font-display font-bold"
                      style={{ fontSize: "var(--t-3xl)", color: "var(--nc-secondary)" }}
                    >
                      My Best Friend 🧸
                    </h3>
                    <p
                      className="font-script leading-relaxed"
                      style={{ fontSize: "var(--t-xl)", color: "var(--nc-on-muted)" }}
                    >
                      I coded this entire page just for you — every pixel, every
                      animation, every word. Because you deserve the whole world,
                      and I'll keep finding ways to give you pieces of it. 💙
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Scratch canvas */}
            <div
              ref={containerRef}
              className="relative"
              style={{ width: "100%", height: "220px" }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="14" fill="%23e9c176" stroke="%23b8882a" stroke-width="2"/></svg>') 16 16, crosshair`,
                  borderRadius: "1.5rem",
                  display: "block",
                  touchAction: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Hint text */}
        <motion.p
          className="text-center mt-4 font-body"
          style={{ fontSize: "var(--t-sm)", color: "var(--nc-on-muted)" }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {hint}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ScratchCard;
