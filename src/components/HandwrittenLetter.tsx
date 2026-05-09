import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FRIEND_NAME } from "@/config/priyanka";

/* ─── Letter content ─── */
const LETTER_LINES = [
  { text: `Dear ${FRIEND_NAME},`, style: "salutation" },
  { text: `I've been sitting here for a while, trying to find the right words. The kind that actually do justice to what you mean to me. I don't think they exist — but I'm going to try anyway.`, style: "body" },
  { text: `You are the person I call when everything falls apart. The one whose voice makes hard days feel survivable. The one who guides me when I can't see the road ahead — who teaches me without making me feel small, who shares in my joy like it's her own.`, style: "body" },
  { text: `Meeting you changed something in me. Every time I see you, it is — without exaggeration — the happiest I feel. Not because life is suddenly perfect, but because with you, it doesn't have to be.`, style: "body" },
  { text: `I trust you the way I trust very few people in this world. After my parents, there is you. That is not a small thing. That is everything.`, style: "body" },
  { text: `You are beautiful, ${FRIEND_NAME}. Not just the way you look — but the way you listen, the way you care, the way you show up. The way you make someone feel like they matter just by being near you.`, style: "body" },
  { text: `I never want to lose you. I hope you know that. I hope you carry it with you, especially on the days when the world feels heavy.`, style: "body" },
  { text: `Happy Birthday. 🎂 Here's to every year ahead — may they be as beautiful as you are.`, style: "closing" },
  { text: `With all my love,`, style: "sign-pre" },
  { text: `Your best friend 💙`, style: "signature" },
];

/* ─── Cute sticker decorations on the letter ─── */
const STICKERS = [
  { emoji: "🌸", top: "4%",   left: "3%",  rotate: -12, scale: 1.4 },
  { emoji: "✨", top: "6%",   right: "5%", rotate: 8,   scale: 1.1 },
  { emoji: "🦋", top: "22%",  right: "2%", rotate: -5,  scale: 1.2 },
  { emoji: "💌", bottom: "8%",left: "4%",  rotate: 10,  scale: 1.3 },
  { emoji: "⭐", bottom: "5%",right: "4%", rotate: -8,  scale: 1.1 },
  { emoji: "🌙", top: "48%",  left: "1%",  rotate: 5,   scale: 1.0 },
];

/* ─── Typewriter hook ─── */
// idx never resets — text stays frozen once typed so paragraphs don't vanish
function useTypewriter(text: string, active: boolean, speed = 55) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!active) return;            // paused — keep current idx frozen
    if (idx >= text.length) return; // fully typed, do nothing
    const t = setTimeout(() => setIdx(i => i + 1), speed);
    return () => clearTimeout(t);
  }, [active, idx, text, speed]);
  return { displayed: text.slice(0, idx), done: idx >= text.length };
}

/* ─── Single animated line ─── */
const LetterLine = ({
  line, active, onDone,
}: { line: typeof LETTER_LINES[0]; active: boolean; onDone: () => void }) => {
  // Comfortable speeds: salutation dramatic, body readable, signature slow
  const speed = line.style === "salutation" ? 100 : line.style === "signature" ? 120 : 55;
  const { displayed, done } = useTypewriter(line.text, active, speed);

  useEffect(() => {
    if (done && active) {
      // Extra pause after each paragraph so reader can finish reading it
      const delay = line.style === "salutation" ? 1000 : line.style === "body" ? 1200 : 900;
      const t = setTimeout(onDone, delay);
      return () => clearTimeout(t);
    }
  }, [done, active, onDone, line.style]);

  const cls = {
    salutation:  "font-[cursive] text-3xl md:text-4xl mb-8 text-[#c4785c] font-bold",
    body:        "font-[cursive] text-xl md:text-2xl leading-relaxed mb-7 text-[#3d2b1f]",
    closing:     "font-[cursive] text-xl md:text-2xl mb-4 text-[#3d2b1f] italic",
    "sign-pre":  "font-[cursive] text-lg text-[#6b4f3f] mb-2",
    signature:   "font-[cursive] text-3xl md:text-4xl text-[#c4785c] mt-2 font-bold",
  }[line.style] ?? "font-[cursive] text-xl text-[#3d2b1f]";

  // Render once started — never disappear
  if (displayed.length === 0) return null;

  return (
    <motion.p
      className={cls}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayed}
      {active && !done && (
        <motion.span
          className="inline-block w-[2px] h-[1.1em] bg-[#c4785c] ml-[1px] translate-y-[2px]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.55 }}
        />
      )}
    </motion.p>
  );
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
const HandwrittenLetter = () => {
  /* Stages: envelope → seal-breaking → unfolding → reading → done */
  const [stage, setStage] = useState<"envelope" | "breaking" | "unfolding" | "reading" | "done">("envelope");
  const [activeLine, setActiveLine] = useState(-1);
  const [visibleLines, setVisibleLines] = useState<Set<number>>(new Set());
  const [skipped, setSkipped] = useState(false);
  const paperRef = useRef<HTMLDivElement>(null);

  /* Kick off typing after unfolding */
  useEffect(() => {
    if (stage === "reading" && activeLine === -1) {
      const t = setTimeout(() => {
        setVisibleLines(new Set([0]));
        setActiveLine(0);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [stage, activeLine]);

  const handleLineDone = (i: number) => {
    if (i < LETTER_LINES.length - 1) {
      setVisibleLines(prev => new Set([...prev, i + 1]));
      setActiveLine(i + 1);
    } else {
      setStage("done");
    }
  };

  const skipAll = () => {
    setSkipped(true);
    const all = new Set(LETTER_LINES.map((_, i) => i));
    setVisibleLines(all);
    setActiveLine(LETTER_LINES.length);
    setStage("done");
  };

  const handleSealClick = () => {
    setStage("breaking");
    setTimeout(() => setStage("unfolding"), 900);
    setTimeout(() => setStage("reading"), 2100);
  };

  return (
    <section className="py-12 px-4 flex flex-col items-center relative z-10 select-none min-h-screen justify-center">

      {/* ── Section label ── */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="chapter-label justify-center mb-2" style={{ color: "var(--nc-secondary)" }}>
          ✦ A letter, written just for you
        </p>
        <h2 className="font-display font-black leading-none" style={{
          fontSize: "clamp(1.8rem,5vw,3rem)",
          background: "linear-gradient(135deg, #e9c176, #ffb4a6, #d2bcff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Chapter VI — The Letter
        </h2>
      </motion.div>

      {/* ── Envelope Stage ── */}
      <AnimatePresence mode="wait">
        {stage === "envelope" && (
          <motion.div
            key="envelope"
            className="relative cursor-pointer"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
            onClick={handleSealClick}
            style={{ filter: "drop-shadow(0 20px 50px rgba(196,120,92,0.35))" }}
          >
            {/* Envelope body */}
            <div
              className="relative rounded-2xl overflow-visible"
              style={{
                width: "clamp(280px, 80vw, 420px)",
                height: "clamp(190px, 55vw, 280px)",
                background: "linear-gradient(160deg, #fdf6ec 0%, #f5e9d5 60%, #eedfc7 100%)",
                border: "1px solid #d4b896",
                boxShadow: "inset 0 0 40px rgba(180,130,80,0.08)",
              }}
            >
              {/* Envelope lines texture */}
              <div className="absolute inset-0 opacity-[0.06] rounded-2xl" style={{
                backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 23px, #8b6040 24px)",
                backgroundSize: "100% 24px",
              }} />

              {/* Diagonal flaps */}
              {/* Left flap */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                  background: "linear-gradient(135deg, #f0dfc0 0%, transparent 50%)",
                  opacity: 0.5,
                }} />
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                  background: "linear-gradient(225deg, #f0dfc0 0%, transparent 50%)",
                  opacity: 0.5,
                }} />
              </div>

              {/* Envelope border lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ borderRadius: "1rem" }}>
                <line x1="0" y1="0" x2="50%" y2="42%" stroke="#c9a87a" strokeWidth="1" strokeOpacity="0.4" />
                <line x1="100%" y1="0" x2="50%" y2="42%" stroke="#c9a87a" strokeWidth="1" strokeOpacity="0.4" />
                <line x1="0" y1="100%" x2="50%" y2="58%" stroke="#c9a87a" strokeWidth="1" strokeOpacity="0.4" />
                <line x1="100%" y1="100%" x2="50%" y2="58%" stroke="#c9a87a" strokeWidth="1" strokeOpacity="0.4" />
              </svg>

              {/* Decorative stamp top-right */}
              <div className="absolute top-4 right-4 rounded-sm flex flex-col items-center justify-center"
                style={{
                  width: 44, height: 54,
                  border: "1px solid #c9a87a",
                  background: "rgba(233,193,118,0.15)",
                  boxShadow: "inset 0 0 8px rgba(180,130,80,0.1)",
                }}>
                <span style={{ fontSize: 22 }}>💙</span>
                <span className="font-body text-[7px] text-[#8b6040] mt-0.5 tracking-widest" style={{ fontFamily: "cursive" }}>LOVE</span>
              </div>

              {/* "To: Priyanka" address */}
              <div className="absolute bottom-8 left-8">
                <p style={{ fontFamily: "cursive", fontSize: "0.75rem", color: "#8b6040", lineHeight: 1.8 }}>
                  To:<br />
                  <span style={{ fontSize: "1.05rem", color: "#5c3d22" }}>{FRIEND_NAME} 🌸</span><br />
                  <span style={{ fontSize: "0.65rem", color: "#a08060" }}>The most special person</span>
                </p>
              </div>

              {/* Wax seal */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ bottom: -28, zIndex: 20 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative flex items-center justify-center" style={{
                  width: 68, height: 68,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 35%, #e84b6a, #9b1c35)",
                  boxShadow: "0 4px 20px rgba(155,28,53,0.6), 0 2px 8px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,100,120,0.3)",
                }}>
                  {/* Seal texture rings */}
                  <div style={{
                    position: "absolute", inset: 4,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,180,190,0.25)",
                  }} />
                  <div style={{
                    position: "absolute", inset: 10,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,180,190,0.15)",
                  }} />
                  <span style={{ fontSize: "1.5rem", position: "relative", zIndex: 2 }}>💌</span>
                </div>
              </motion.div>
            </div>

            {/* "Click to open" hint */}
            <motion.p
              className="text-center mt-12 font-body"
              style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "rgba(216,194,190,0.6)", textTransform: "uppercase" }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦ tap the seal to open ✦
            </motion.p>

            {/* Floating hearts around envelope */}
            {["💕","🌸","✨","💫"].map((e, i) => (
              <motion.span
                key={i}
                className="absolute pointer-events-none"
                style={{
                  fontSize: "1.1rem",
                  left: `${[10, 80, 15, 75][i]}%`,
                  top: `${[20, 15, 70, 65][i]}%`,
                }}
                animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3], rotate: [0, 10, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.6 }}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* ── Seal Breaking ── */}
        {stage === "breaking" && (
          <motion.div
            key="breaking"
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={{ fontSize: "4rem" }}
              animate={{ scale: [1, 1.4, 0.8, 1.2, 0], rotate: [0, -15, 15, -10, 0], opacity: [1, 1, 1, 0.5, 0] }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              💌
            </motion.div>
            <motion.p
              className="font-body"
              style={{ color: "rgba(255,180,166,0.7)", letterSpacing: "0.3em", fontSize: "0.65rem", textTransform: "uppercase" }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8 }}
            >
              ✦ seal broken ✦
            </motion.p>
          </motion.div>
        )}

        {/* ── Unfolding ── */}
        {stage === "unfolding" && (
          <motion.div
            key="unfolding"
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={{ fontSize: "3rem" }}
              animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              📜
            </motion.div>
            <motion.p
              className="font-body"
              style={{ color: "rgba(255,180,166,0.6)", letterSpacing: "0.3em", fontSize: "0.65rem", textTransform: "uppercase" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ✦ unfolding… ✦
            </motion.p>
          </motion.div>
        )}

        {/* ── Letter / Reading ── */}
        {(stage === "reading" || stage === "done") && (
          <motion.div
            key="letter"
            className="w-full"
            style={{ maxWidth: 680 }}
            initial={{ opacity: 0, scaleY: 0.1, y: -30 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", damping: 18 }}
          >
            {/* Paper card */}
            <div
              ref={paperRef}
              className="relative rounded-[2rem] overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #fefaf3 0%, #fdf3e3 40%, #fbeeda 100%)",
                border: "1px solid #e2c99a",
                boxShadow: "0 30px 80px rgba(120,80,40,0.25), 0 4px 20px rgba(120,80,40,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              {/* Ruled lines */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
                backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, #8b6040 32px)",
                backgroundSize: "100% 32px",
                backgroundPositionY: "64px",
              }} />

              {/* Left margin line */}
              <div className="absolute top-0 bottom-0 pointer-events-none" style={{
                left: 52, width: 1, background: "rgba(230,160,120,0.3)",
              }} />

              {/* Paper crease top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(200,160,100,0.2), transparent)" }} />

              {/* Stickers */}
              {STICKERS.map((s, i) => (
                <motion.span
                  key={i}
                  className="absolute pointer-events-none select-none"
                  style={{
                    fontSize: `${s.scale * 1.4}rem`,
                    top: s.top,
                    left: (s as any).left,
                    right: (s as any).right,
                    bottom: s.bottom,
                    transform: `rotate(${s.rotate}deg)`,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
                    zIndex: 1,
                  }}
                  initial={{ scale: 0, rotate: s.rotate - 20 }}
                  animate={{ scale: s.scale, rotate: s.rotate }}
                  transition={{ delay: 0.5 + i * 0.15, type: "spring", bounce: 0.5 }}
                >
                  {s.emoji}
                </motion.span>
              ))}

              {/* Tape strip at top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
                width: 80, height: 22,
                background: "rgba(255,220,180,0.45)",
                border: "1px solid rgba(200,160,100,0.3)",
                borderTop: "none",
                borderRadius: "0 0 6px 6px",
                backdropFilter: "blur(2px)",
              }} />

              {/* Letter content */}
              <div className="relative z-10 px-8 md:px-14 py-12 md:py-14" style={{ minHeight: 500 }}>
                {/* Date header */}
                <motion.p
                  className="text-right mb-8"
                  style={{ fontFamily: "cursive", fontSize: "0.8rem", color: "#a08060", fontStyle: "italic" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </motion.p>

                {/* Lines */}
                <div className="space-y-1 pl-2">
                  {LETTER_LINES.map((line, i) => (
                    <div key={i}>
                      {(visibleLines.has(i) || skipped) && (
                        <LetterLine
                          line={line}
                          active={!skipped && activeLine === i}
                          onDone={() => handleLineDone(i)}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Skip button */}
                {stage === "reading" && !skipped && activeLine >= 0 && activeLine < LETTER_LINES.length && (
                  <motion.button
                    className="mt-6 flex items-center gap-2 font-body rounded-full px-4 py-1.5 cursor-pointer"
                    style={{
                      fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "#a08060", background: "rgba(180,130,80,0.08)",
                      border: "1px solid rgba(180,130,80,0.2)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    onClick={skipAll}
                    whileHover={{ background: "rgba(180,130,80,0.15)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polyline points="2,2 6,5 2,8" /><line x1="7" y1="2" x2="7" y2="8" />
                    </svg>
                    Skip to end
                  </motion.button>
                )}

                {/* Finishing flourish */}
                {stage === "done" && (
                  <motion.div
                    className="mt-10 flex flex-col items-center gap-4"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
                  >
                    {/* Decorative divider */}
                    <div className="flex items-center gap-3 w-full">
                      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #d4b896)" }} />
                      <span style={{ fontFamily: "cursive", color: "#c4785c", fontSize: "1.1rem" }}>✦</span>
                      <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #d4b896)" }} />
                    </div>

                    {/* Heart row */}
                    <div className="flex gap-3">
                      {["💙", "🌸", "✨", "💖", "🦋"].map((e, i) => (
                        <motion.span
                          key={i}
                          style={{ fontSize: "1.5rem" }}
                          initial={{ scale: 0, y: 10 }}
                          animate={{ scale: 1, y: 0 }}
                          transition={{ delay: 0.4 + i * 0.12, type: "spring", bounce: 0.6 }}
                        >
                          {e}
                        </motion.span>
                      ))}
                    </div>

                    {/* Bottom note */}
                    <motion.p
                      style={{ fontFamily: "cursive", color: "#a08060", fontSize: "0.8rem", fontStyle: "italic", textAlign: "center" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      P.S. — I'll always be here. 🌸
                    </motion.p>
                  </motion.div>
                )}
              </div>

              {/* Paper bottom fold shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none" style={{
                background: "linear-gradient(to top, rgba(180,130,80,0.06), transparent)",
              }} />
            </div>

            {/* Paper shadow underneath */}
            <div className="mx-6 h-4 rounded-b-[2rem]" style={{
              background: "rgba(120,80,40,0.12)",
              filter: "blur(8px)",
              transform: "translateY(-8px)",
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HandwrittenLetter;
