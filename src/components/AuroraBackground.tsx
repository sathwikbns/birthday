import { motion } from "framer-motion";

/**
 * AuroraBackground — a living, breathing aurora borealis behind the entire site.
 * Three softly animated radial gradients cycling through the Nocturne Cinema palette.
 * Rendered as a fixed layer behind all content (z-index -1).
 */
const AuroraBackground = () => (
  <>
    {/* Layer 1 — lavender blob, slow drift */}
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -2 }}
      animate={{
        background: [
          "radial-gradient(ellipse 70% 50% at 20% 40%, rgba(210,188,255,0.13) 0%, transparent 70%)",
          "radial-gradient(ellipse 70% 55% at 55% 20%, rgba(210,188,255,0.10) 0%, transparent 70%)",
          "radial-gradient(ellipse 65% 50% at 80% 60%, rgba(210,188,255,0.12) 0%, transparent 70%)",
          "radial-gradient(ellipse 70% 50% at 20% 40%, rgba(210,188,255,0.13) 0%, transparent 70%)",
        ],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Layer 2 — rose blob, medium drift */}
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -2 }}
      animate={{
        background: [
          "radial-gradient(ellipse 55% 45% at 80% 25%, rgba(255,180,166,0.09) 0%, transparent 65%)",
          "radial-gradient(ellipse 60% 40% at 20% 70%, rgba(255,180,166,0.07) 0%, transparent 65%)",
          "radial-gradient(ellipse 55% 45% at 65% 80%, rgba(255,180,166,0.10) 0%, transparent 65%)",
          "radial-gradient(ellipse 55% 45% at 80% 25%, rgba(255,180,166,0.09) 0%, transparent 65%)",
        ],
      }}
      transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Layer 3 — gold accent, slow pulse */}
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -2 }}
      animate={{
        background: [
          "radial-gradient(ellipse 40% 35% at 50% 90%, rgba(233,193,118,0.06) 0%, transparent 60%)",
          "radial-gradient(ellipse 45% 30% at 10% 50%, rgba(233,193,118,0.05) 0%, transparent 60%)",
          "radial-gradient(ellipse 40% 35% at 90% 10%, rgba(233,193,118,0.07) 0%, transparent 60%)",
          "radial-gradient(ellipse 40% 35% at 50% 90%, rgba(233,193,118,0.06) 0%, transparent 60%)",
        ],
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
    />
  </>
);

export default AuroraBackground;
