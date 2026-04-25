import { useScroll, useSpring, motion } from "framer-motion";

/**
 * ScrollProgressBar — a thin gradient bar pinned to the very top of the page.
 * Fills left→right as the user scrolls through the experience.
 * Uses spring for smooth lag-free tracking.
 */
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] origin-left"
      style={{
        scaleX,
        height: "3px",
        background: "linear-gradient(90deg, #d2bcff 0%, #ffb4a6 50%, #e9c176 100%)",
        boxShadow: "0 0 12px rgba(210,188,255,0.6)",
      }}
    />
  );
};

export default ScrollProgressBar;
