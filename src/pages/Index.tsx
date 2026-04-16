import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import SparkleTrail from "@/components/SparkleTrail";
import SparkleCursor from "@/components/SparkleCursor";
import EasterEggStar from "@/components/EasterEggStar";
import LoadingScreen from "@/components/LoadingScreen";
import MagicalEntry from "@/components/MagicalEntry";
import FriendshipCounter from "@/components/FriendshipCounter";
import FriendshipTimeline from "@/components/FriendshipTimeline";
import SecretMessageVault from "@/components/SecretMessageVault";
import WhyYouMatterGalaxy from "@/components/WhyYouMatterGalaxy";
import BirthdayGame from "@/components/BirthdayGame";
import BirthdayCake from "@/components/BirthdayCake";
import FloatingHearts from "@/components/FloatingHearts";
import PolaroidRain from "@/components/PolaroidRain";
import FinalGiftBox from "@/components/FinalGiftBox";
import WishTree from "@/components/WishTree";
import VHSMemories from "@/components/VHSMemories";
import MessageInABottle from "@/components/MessageInABottle";
import WishScrapbook from "@/components/WishScrapbook";
import FriendshipAura from "@/components/FriendshipAura";
import FriendshipCertificate from "@/components/FriendshipCertificate";
import HandwrittenLetter from "@/components/HandwrittenLetter";
import DarkModeToggle from "@/components/DarkModeToggle";
import MusicPlayer from "@/components/MusicPlayer";
import VirtualHug from "@/components/VirtualHug";
import { FRIEND_NAME } from "@/config/priyanka";

const sections = [
  { id: "counter", component: <FriendshipCounter /> },
  { id: "cake", component: <BirthdayCake /> },
  { id: "timeline", component: <FriendshipTimeline /> },
  { id: "polaroids", component: <PolaroidRain /> },
  { id: "aura", component: <FriendshipAura /> },
  { id: "game", component: <BirthdayGame /> },
  { id: "galaxy", component: <WhyYouMatterGalaxy /> },
  { id: "vault", component: <SecretMessageVault /> },
  { id: "letter", component: <HandwrittenLetter /> },
];

const bookVariants = {
  enter: (dir: number) => {
    if (dir > 0) {
      // Going forward: New page waits underneath, slightly smaller
      return { opacity: 0, scale: 0.9, rotateY: 0, originX: 0, filter: "blur(5px)", zIndex: 0 };
    } else {
      // Going backward: The previous page flips BACK IN from the left side
      return { opacity: 0, scale: 1, rotateY: -90, originX: 0, filter: "blur(0px)", zIndex: 10 };
    }
  },
  center: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    originX: 0,
    filter: "blur(0px)",
    zIndex: 1,
    transition: { duration: 1.2 }
  },
  exit: (dir: number) => {
    if (dir > 0) {
      // Going forward: The current page grabs its left edge and FLIPS completely over like a book
      return { opacity: 0, scale: 1, rotateY: -90, originX: 0, filter: "blur(0px)", zIndex: 10, transition: { duration: 1.2 } };
    } else {
      // Going backward: The current page just fades out softly underneath
      return { opacity: 0, scale: 0.9, rotateY: 0, originX: 0, filter: "blur(5px)", zIndex: 0, transition: { duration: 1.2 } };
    }
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
      triggerStardust();
      setDirection(1);
      setCurrentSection((prev) => prev + 1);
      setTimeout(() => { isAnimatingRef.current = false; }, 1500);

      if (currentSection === sections.length - 2) {
        setTimeout(() => {
          confetti({ particleCount: 200, spread: 120, origin: { y: 0.8 }, colors: ["#b794f6", "#90cdf4", "#f6ad55", "#fbb6ce"] });
        }, 1500);
      }
    }
  };

  const goPrev = () => {
    if (isAnimatingRef.current) return;
    if (currentSection > 0) {
      isAnimatingRef.current = true;
      triggerStardust();
      setDirection(-1);
      setCurrentSection((prev) => prev - 1);
      setTimeout(() => { isAnimatingRef.current = false; }, 1500);
    }
  };

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

    // Passive false allows preventDefault for spacebar
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [entered, currentSection]);

  if (headphoneScreen) {
    return (
      <div 
        className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-center px-4 cursor-pointer selection:bg-transparent"
        onClick={() => setHeadphoneScreen(false)}
      >
        <SparkleCursor />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <span className="text-6xl mb-6 block drop-shadow-2xl">🎧</span>
          <h1 className="text-3xl md:text-5xl font-display text-pink-300 mb-4 tracking-wider">Hey {FRIEND_NAME}...</h1>
          <p className="text-lg md:text-xl font-body text-white/80 mb-12 max-w-md mx-auto leading-relaxed">
            Put your headphones on, turn up the volume, take a deep breath, and get ready for a surprise.
          </p>
          <motion.button
            className="px-8 py-3 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/50 font-body tracking-widest text-sm hover:bg-pink-500/40 transition-colors"
            animate={{ opacity: [0.6, 1, 0.6], boxShadow: ["0 0 0px #ec4899", "0 0 20px #ec4899", "0 0 0px #ec4899"] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            CLICK TO ENTER
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-background relative text-foreground [perspective:2000px]">
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
              <div className="min-h-full flex flex-col justify-between items-center py-20 px-4 md:px-8 max-w-6xl mx-auto">
                <div className="w-full bg-background/50 backdrop-blur-sm rounded-3xl p-4 md:p-10 shadow-2xl border border-white/5">
                  {sections[currentSection].component}
                </div>

                {/* Navigation Hint Footer */}
                <div className="mt-16 mb-4 w-full flex flex-col items-center justify-center opacity-70">
                  <div className="flex gap-8 items-center bg-card/60 px-8 py-3 rounded-full border border-white/10 backdrop-blur-md">
                    <button onClick={goPrev} disabled={currentSection === 0} className="hover:scale-125 transition-transform disabled:opacity-20 text-2xl">
                      👈
                    </button>
                    <span className="text-xs font-body tracking-[0.3em] uppercase opacity-70">
                      Page {currentSection + 1} of {sections.length}
                    </span>
                    <button onClick={goNext} disabled={currentSection === sections.length - 1} className="hover:scale-125 transition-transform disabled:opacity-20 text-2xl">
                      👉
                    </button>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest mt-4 opacity-50">Scroll down or use arrows to turn the page</p>

                  {currentSection === sections.length - 1 && (
                    <div className="text-center mt-16 pb-8">
                      <p className="font-display text-3xl text-lavender pb-2 drop-shadow-md">
                        Made with all my love 💙✨
                      </p>
                      <p className="font-body text-sm text-white/50">
                        For Priyanka — the rarest kind of person 🌸
                      </p>
                    </div>
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
