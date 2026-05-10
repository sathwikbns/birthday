import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import SparkleTrail from "@/components/SparkleTrail";
import SparkleCursor from "@/components/SparkleCursor";
import EasterEggStar from "@/components/EasterEggStar";
import LoadingScreen from "@/components/LoadingScreen";
import MagicalEntry from "@/components/MagicalEntry";
import AuroraBackground from "@/components/AuroraBackground";
import ShootingStars from "@/components/ShootingStars";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CinematicHero from "@/components/CinematicHero";
import FriendshipCounter from "@/components/FriendshipCounter";
import FriendshipTimeline from "@/components/FriendshipTimeline";
import BirthdayCake from "@/components/BirthdayCake";
import FloatingHearts from "@/components/FloatingHearts";
import PolaroidRain from "@/components/PolaroidRain";
import FinalGiftBox from "@/components/FinalGiftBox";
import WishTree from "@/components/WishTree";
import VHSMemories from "@/components/VHSMemories";
import MessageInABottle from "@/components/MessageInABottle";
import WishScrapbook from "@/components/WishScrapbook";
import FriendshipCertificate from "@/components/FriendshipCertificate";
import HandwrittenLetter from "@/components/HandwrittenLetter";
import DarkModeToggle from "@/components/DarkModeToggle";
import MusicPlayer from "@/components/MusicPlayer";
import VirtualHug from "@/components/VirtualHug";
import ChatVault from "@/components/ChatVault";
import { FRIEND_NAME } from "@/config/priyanka";

const sections = [
  { id: "hero",     component: <CinematicHero /> },
  { id: "counter",  component: <FriendshipCounter /> },
  { id: "cake", component: <BirthdayCake /> },
  { id: "timeline", component: <FriendshipTimeline /> },
  { id: "chat-vault", component: <ChatVault /> },
  { id: "polaroids", component: <PolaroidRain /> },
  { id: "letter", component: <HandwrittenLetter /> },
];

const bookVariants = {
  enter: (dir: number) => {
    return {
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.96,
      filter: "blur(4px)",
      zIndex: 0
    };
  },
  center: {
    x: "0%",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    zIndex: 1,
    transition: {
      x: { type: "spring", stiffness: 220, damping: 26 },
      opacity: { duration: 0.5, ease: "easeOut" },
      scale: { duration: 0.5, ease: "easeOut" },
      filter: { duration: 0.4, ease: "easeOut" }
    }
  },
  exit: (dir: number) => {
    return {
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.96,
      filter: "blur(4px)",
      zIndex: 0,
      transition: {
        x: { type: "spring", stiffness: 220, damping: 26 },
        opacity: { duration: 0.5, ease: "easeIn" },
        scale: { duration: 0.5, ease: "easeIn" },
        filter: { duration: 0.4, ease: "easeIn" }
      }
    };
  }
};

const Index = () => {
  const [headphoneScreen, setHeadphoneScreen] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [entered, setEntered] = useState(false);
  const [dark, setDark] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(1);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const triggerStardust = () => {
    confetti({
      particleCount: 100,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#ffffff", "#f472b6", "#c084fc", "#60a5fa"],
      gravity: 0.1,
      scalar: 0.6,
      startVelocity: 30,
      ticks: 150
    });
  };

  const goNext = () => {
    if (isAnimatingRef.current) return;
    if (currentSection < sections.length - 1) {
      isAnimatingRef.current = true;
      setDirection(1);
      setCurrentSection((prev) => prev + 1);
      setTimeout(() => { isAnimatingRef.current = false; }, 800);

      if (currentSection === sections.length - 2) {
        setTimeout(() => {
          confetti({ particleCount: 200, spread: 120, origin: { y: 0.8 }, colors: ["#b794f6", "#90cdf4", "#f6ad55", "#fbb6ce"] });
        }, 800);
      }
    }
  };

  const goPrev = () => {
    if (isAnimatingRef.current) return;
    if (currentSection > 0) {
      isAnimatingRef.current = true;
      setDirection(-1);
      setCurrentSection((prev) => prev - 1);
      setTimeout(() => { isAnimatingRef.current = false; }, 800);
    }
  };

  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  useEffect(() => {
    if (!entered) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent rapid scroll spam
      if (Math.abs(e.deltaY) < 30) return;
      if (e.deltaY > 0) goNext();
      else goPrev();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('.no-page-swipe')) return;
      touchStartXRef.current = e.touches[0].clientX;
      touchEndXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('.no-page-swipe')) return;
      touchEndXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const diff = touchStartXRef.current - touchEndXRef.current;
      // Require more than 60px swipe distance to change chapters
      if (diff > 60) {
        goNext();
      } else if (diff < -60) {
        goPrev();
      }
    };

    // Passive false allows preventDefault for spacebar
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [entered, currentSection]);

  if (headphoneScreen) {
    return (
      <div
        className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6 cursor-pointer selection:bg-transparent overflow-hidden relative"
        onClick={() => setHeadphoneScreen(false)}
      >
        <SparkleCursor />

        {/* Cinematic Video Background C */}
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ zIndex: 0, opacity: 0.65 }}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4" type="video/mp4" />
        </video>

        {/* Soft dark vignette on top of the video */}
        <div className="absolute inset-0 bg-background/25 pointer-events-none" style={{ zIndex: 1 }} />

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(210,188,255,0.08) 0%, transparent 65%)' }} />
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#d2bcff','#ffb4a6','#e9c176'][i % 3],
              zIndex: 2,
            }}
            animate={{ opacity: [0, 0.6, 0], y: [0, -60, -120] }}
            transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}

        <motion.div
          className="z-10 flex flex-col items-center max-w-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <motion.p
            className="chapter-label mb-8 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            A surprise for you
          </motion.p>

          {/* Headphone icon */}
          <motion.span
            className="text-fluid-hero mb-6 block"
            style={{ filter: 'drop-shadow(0 0 24px rgba(255,180,166,0.5))' }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            🎧
          </motion.span>

          {/* Title — Playfair Display gradient */}
          <motion.h1
            className="font-display font-black text-gradient leading-none tracking-tight mb-4"
            style={{ fontSize: 'var(--t-5xl)', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Hey {FRIEND_NAME}...
          </motion.h1>

          {/* Script subtitle */}
          <motion.p
            className="font-script mb-10 leading-relaxed"
            style={{ fontSize: 'var(--t-lead)', color: 'var(--nc-on-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Put your headphones on, turn up the volume,<br />
            take a deep breath, and get ready for a surprise.
          </motion.p>

          {/* CTA — Nocturne Cinema gradient button */}
          <motion.button
            className="btn-cinema px-8 py-4"
            style={{ fontSize: 'var(--t-label)' }}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(255,180,166,0.4)',
                '0 0 28px 4px rgba(255,180,166,0.25)',
                '0 0 0 0 rgba(255,180,166,0.4)',
              ]
            }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            ✦ Click to Enter
          </motion.button>

          <motion.p
            className="font-body mt-6"
            style={{ fontSize: 'var(--t-label)', color: 'rgba(216,194,190,0.3)', letterSpacing: '0.2em' }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            TAP ANYWHERE TO CONTINUE
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-background relative text-foreground [perspective:2000px]">
      <AuroraBackground />
      <ShootingStars />
      <ScrollProgressBar />
      <SparkleCursor />
      <SparkleTrail />
      <EasterEggStar />
      <VirtualHug />
      <FloatingHearts />

      {entered && (
        <div className="z-50 relative pointer-events-auto">
          <DarkModeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
          <MusicPlayer />
        </div>
      )}

      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <AnimatePresence>
        {loaded && !entered && (
          <div className="absolute inset-0 z-[100] overflow-hidden bg-background">
            <MagicalEntry onEnter={() => setEntered(true)} />
          </div>
        )}
      </AnimatePresence>

      {entered && (
        <>
          <AnimatePresence custom={direction} mode="sync">
            <motion.div
              key={currentSection}
              custom={direction}
              variants={bookVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 overflow-y-auto overflow-x-hidden [transform-style:preserve-3d]"
            >
              <div className="min-h-full flex flex-col justify-between items-center py-16 px-4 md:px-8 max-w-6xl mx-auto">
                {/* Section content — clean, full-bleed container with no bounding box */}
                <div className="w-full">
                  {sections[currentSection].component}
                </div>

                {/* ── Film-strip navigation (Nocturne Cinema) ── */}
                <div className="mt-10 mb-4 w-full flex flex-col items-center justify-center">
                  <div
                    className="flex items-center gap-4 px-6 py-3 rounded-full"
                    style={{
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--glass-blur)',
                      WebkitBackdropFilter: 'var(--glass-blur)',
                      border: '1px solid var(--nc-outline)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    }}
                  >
                    {/* Prev arrow */}
                    <button
                      onClick={goPrev}
                      disabled={currentSection === 0}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20"
                      style={{
                        border: '1px solid var(--nc-outline)',
                        color: 'var(--nc-on-muted)',
                        fontSize: 'var(--t-sm)',
                      }}
                    >
                      ←
                    </button>

                    {/* Film-strip dots */}
                    <div className="flex items-center gap-1.5">
                      {sections.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (i > currentSection) { setDirection(1); }
                            else { setDirection(-1); }
                            setCurrentSection(i);
                          }}
                          style={{
                            width: i === currentSection ? 'clamp(18px,4vw,26px)' : '6px',
                            height: '6px',
                            borderRadius: '9999px',
                            background: i === currentSection
                              ? (i === sections.length - 1 ? '#e9c176' : '#ffb4a6')
                              : 'rgba(240,236,255,0.2)',
                            boxShadow: i === currentSection
                              ? (i === sections.length - 1
                                  ? '0 0 10px rgba(233,193,118,0.7)'
                                  : '0 0 10px rgba(255,180,166,0.6)')
                              : 'none',
                            transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                            border: 'none',
                            cursor: 'pointer',
                            flexShrink: 0,
                          }}
                          aria-label={`Go to section ${i + 1}`}
                        />
                      ))}
                    </div>

                    {/* Section counter */}
                    <span
                      className="font-body"
                      style={{ fontSize: 'var(--t-label)', color: 'rgba(216,194,190,0.5)', letterSpacing: '0.15em' }}
                    >
                      {currentSection + 1} / {sections.length}
                    </span>

                    {/* Next arrow */}
                    <button
                      onClick={goNext}
                      disabled={currentSection === sections.length - 1}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20"
                      style={{
                        border: '1px solid var(--nc-outline)',
                        color: 'var(--nc-on-muted)',
                        fontSize: 'var(--t-sm)',
                      }}
                    >
                      →
                    </button>
                  </div>

                  <p
                    className="font-body uppercase mt-4"
                    style={{ fontSize: 'var(--t-label)', letterSpacing: '0.25em', color: 'rgba(216,194,190,0.3)' }}
                  >
                    Scroll · Arrow keys · Swipe
                  </p>

                  {currentSection === sections.length - 1 && (
                    <motion.div
                      className="text-center mt-12 pb-8"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                    >
                      <p className="font-display text-gradient leading-none mb-3" style={{ fontSize: 'var(--t-4xl)' }}>
                        Made with all my love 💙✨
                      </p>
                      <p className="font-script" style={{ fontSize: 'var(--t-lead)', color: 'var(--nc-on-muted)' }}>
                        For Priyanka — the rarest kind of person 🌸
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default Index;
