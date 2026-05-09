/**
 * SparkleCursor — Custom cursor with magnetic ring + sparkle burst on click.
 * Improvement #6: blend-mode difference, lagging ring, desktop only.
 */
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import confetti from "canvas-confetti";

const SparkleCursor = () => {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(useMotionValue(-100), { stiffness: 80, damping: 18, mass: 0.6 });
  const ringY = useSpring(useMotionValue(-100), { stiffness: 80, damping: 18, mass: 0.6 });
  const isHoverRef = useRef(false);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Skip on touch devices
    isTouchDevice.current = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice.current) return;

    // Hide native cursor
    document.documentElement.style.cursor = "none";

    const handleMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      // @ts-ignore — internal set for the spring source
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleClick = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      confetti({
        particleCount: 14,
        spread: 38,
        startVelocity: 14,
        origin: { x, y },
        colors: ["#d2bcff", "#ffb4a6", "#e9c176", "#ffffff"],
        gravity: 0.5,
        ticks: 55,
        zIndex: 9999,
        scalar: 0.8,
      });
    };

    // Track hover on interactive elements
    const setHover = () => { isHoverRef.current = true; };
    const clearHover = () => { isHoverRef.current = false; };
    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, select, textarea, [data-cursor-hover]"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", setHover);
      el.addEventListener("mouseleave", clearHover);
    });

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", setHover);
        el.removeEventListener("mouseleave", clearHover);
      });
    };
  }, []);

  // Don't render on touch devices (SSR safe via null)
  return (
    <>
      {/* Dot — snaps directly to cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 10,
          height: 10,
          background: "#ffb4a6",
          boxShadow: "0 0 10px rgba(255,180,166,0.8)",
          mixBlendMode: "difference",
        }}
      />

      {/* Ring — lags behind with spring */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 36,
          height: 36,
          border: "1.5px solid rgba(210,188,255,0.65)",
          boxShadow: "0 0 12px rgba(210,188,255,0.3)",
          mixBlendMode: "difference",
          scale: 1,
        }}
        whileHover={{ scale: 1.6 }}
      />
    </>
  );
};

export default SparkleCursor;
