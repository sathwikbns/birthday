import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface ChatCard {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  hint: string;
  era: string;
  comment?: string;
}

const CHAT_DATA: ChatCard[] = [
  {
    id: 1,
    src: "/Screenshot_2026-05-10-02-19-09-04_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "The Chapter Origin 💫",
    subtitle: "How it all began",
    hint: "Do you remember when our conversation flow started hitting this exact stride? Pure connection.",
    era: "Early 2021",
    comment: "navu ebru avaglu ange edvi eglu ange edivi alva da"
  },
  {
    id: 2,
    src: "/Screenshot_2026-05-10-02-21-23-35_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "Double-Texting Habit 📱",
    subtitle: "Endless blocks of joy",
    hint: "We literally didn't care about rules — just sending paragraphs after paragraphs of pure happiness.",
    era: "Early 2021",
    comment: "edhu i think ninge engineering nali ninge yar adru propose madthre antha mathu adtha edvi ansuthe but betting nali nanne win agidhu "
  },
  {
    id: 3,
    src: "/Screenshot_2026-05-10-02-22-33-35_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "3AM Sleep-Deprived Logic 🌙",
    subtitle: "Banter when the world was asleep",
    hint: "We would stay up till sunrise talking about everything and nothing. Time stood still.",
    era: "Early 2021",
    comment: "yours first lover ANAMIKA"
  },
  {
    id: 4,
    src: "/Screenshot_2026-05-10-02-25-41-97_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "Your Guiding Compass 🧭",
    subtitle: "How you always look out for me",
    hint: "Whenever I was lost in my thoughts, you would pull me back with the best advice ever.",
    era: "Mid 2021",
    comment: "edhu nenapu ediya da we saying this before saying good night"
  },
  {
    id: 5,
    src: "/Screenshot_2026-05-10-02-28-00-01_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "Holographic Heart-To-Heart 💖",
    subtitle: "Deep emotional waves",
    hint: "This conversation was a turning point. Real, unfiltered, beautiful honesty between us.",
    era: "Late 2021",
    comment: "edhu mostly ninu hostel odaglo or nanu hostel ge ogida ansuthe illa ninu cet ge antha 25 days hostel ogidhe aga ansuthe 'nanu imagination nali ninge jothe math adtha edidu'"
  },
  {
    id: 6,
    src: "/Screenshot_2026-05-10-02-36-44-14_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "The Cosmic Vibe Check 🌌",
    subtitle: "Late night reflections",
    hint: "We started questioning the universe, sharing our deepest life patterns. Pure cosmic sync.",
    era: "Late 2021",
    comment: "why we are missing each other so much mostly some is going to hostel i guess"
  },
  {
    id: 7,
    src: "/Screenshot_2026-05-10-02-38-39-62_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "Safety Net 🤝",
    subtitle: "Zero judgment zone",
    hint: "You listened to my absolute weirdest ideas and made me feel heard. After family, it's always been you.",
    era: "Late 2021",
    comment: "nenap ediya aga ninge reels and memes na inge screenshot kalstidhe."
  },
  {
    id: 8,
    src: "/Screenshot_2026-05-10-02-41-26-72_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "The Happiest Triggers ✨",
    subtitle: "A ping that changed the day",
    hint: "No matter how bad a day was, seeing 'Priyanka is typing...' instantly fixed everything.",
    era: "Early 2021",
    comment: "yenu nange da antha kariyaalvaaaaaaaa haaaa"
  },
  {
    id: 9,
    src: "/Screenshot_2026-05-10-02-47-47-79_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "Inside Jokes Archive 📂",
    subtitle: "The language only we speak",
    hint: "If someone else read this, they would think we're speaking an alien language. But to us, it was hilarious!",
    era: "Early 2021",
    comment: "edhur bagge nanu enu mathadala ."
  },
  {
    id: 10,
    src: "/Screenshot_2026-05-10-02-48-14-88_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "A Gentle Anchor 🌸",
    subtitle: "Warmth when it got cold",
    hint: "You've always had this magical ability to bring warmth into my life just by being yourself.",
    era: "Mid 2021",
    comment: "nanu 10th nali nan prantes bandaga nanu ninma appa accound nali yastu msg madidhe gotha reply ne barthairla 10th mugsi manege bandaglu yastu msg madidini gotha mostly sai angels ge join agidhu babu chikkapa helirlila andire msg he madthairlila ansuthe  "
  },
  {
    id: 11,
    src: "/Screenshot_2026-05-10-02-48-42-07_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "Silly Text Fight 🥊",
    subtitle: "Playful arguments",
    hint: "We were literally debating something so incredibly pointless but with absolute drama. Classic!",
    era: "Mid 2021",
    comment: "ALVAAAA"
  },
  {
    id: 12,
    src: "/Screenshot_2026-05-10-02-55-04-22_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "Vintage Text Flow 🧪",
    subtitle: "Early years charm",
    hint: "Look at our vocabulary back then! It feels like looking at a different life, yet so familiar.",
    era: "Late 2021",
    comment: "nam appa ninu na hostel warden ge inge kelidru nan sose elle odidhu hostel nali edlu antha   "
  },
  {
    id: 13,
    src: "/Screenshot_2026-05-10-03-06-09-78_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "Midnight Philosophical Debates 🛸",
    subtitle: "Two weirdos talking",
    hint: "We literally reached peak intellect and peak craziness in the same 5 minutes. Brilliant.",
    era: " 2021",
    comment: "edglu aste ninuna nenep madale iro dinane ila andko ega onthu ninge baiyoke andru nenp madkoltha irthini "
  },
  {
    id: 14,
    src: "/Screenshot_2026-05-10-03-06-28-70_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "Our Quiet Sanctuary 🌍",
    subtitle: "Away from the chaos",
    hint: "No matter how messy the rest of the world felt, our chat was the perfect escape.",
    era: "Early 2021",
    comment: "I wish I could get all those days back. "
  },
  {
    id: 15,
    src: "/Screenshot_2026-05-10-03-16-26-95_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "Sweeter Than Cake 🍰",
    subtitle: "Your infinite kindness",
    hint: "You always prioritized making me happy, sending the sweet pings right when I needed them most.",
    era: "Mid 2021",
    comment: "edhu nenp ediya edhu iroke chance he illa nange nenpirlila acttually navu ebru 1st Friendship Anniversary celebarate madidvii chat nale cake cut madidvi date nenp madko nodana (26rd july 2021)"
  },
  {
    id: 16,
    src: "/Screenshot_2026-05-10-03-26-53-15_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "Celestial Sync 💫",
    subtitle: "Two stars in the same orbit",
    hint: "A beautiful check-in where we realized how lucky we are to have each other.",
    era: "Early 2021",
    comment: "edhu en gotha nanu ninge prabhu antha karitha edhe PRABHU HELIDUNA MIRODU UNTHEE antha dailog heltah edhe nenp aythaaa"
  },
  {
    id: 17,
    src: "/Screenshot_2026-05-10-03-35-55-70_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "The Nostalgia Box 📦",
    subtitle: "Five full years of laughter",
    hint: "A true artifact of our time. It’s crazy to think we have five whole years of digital footprints.",
    era: "Mid 2021",
    comment: "edhuna read madidre literally aga yastu kushi angitho eglu aste kushi aguthe it never gets old and edhuna nodidre egalu adhe scence kanmudhe baruthe gotha  "
  },
  {
    id: 18,
    src: "/Screenshot_2026-05-10-03-35-58-36_be80aec1db9a2b53c9d399db0c602181.jpg",
    title: "Our Legacy Archive 👑",
    subtitle: "To forever and beyond",
    hint: "The last frame in this digital time capsule. But the best chapters of us are yet to be written. 💙",
    era: "Late 2021",
    comment: "nanu imagine kuda madirlila nanu ninu estuyala close agtivi antha andru olden days nenp madkolodhe ondu kushi adre navu strangers inda inge edivi ,nanige en naru chance sikudre nanu a olden days ge ogi nannu ninjothe yange chat madtidhe anoduna nodbeku ansuthe da i miss those day and i am happy for that even knowing we can't recreate those moments but we can create new moments for sure with us together forever"
  }
];

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

const ChatVault = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showGridView, setShowGridView] = useState(false);
  const [reactions, setReactions] = useState<Record<number, string>>({});
  const [showHint, setShowHint] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [emojiIdCounter, setEmojiIdCounter] = useState(0);
  const [direction, setDirection] = useState(0);

  // Play browser-synthesized high-end micro-sound feedback!
  const playSound = (type: "click" | "swipe" | "success" | "bubble") => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === "swipe") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === "bubble") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.10);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.10);
        osc.start();
        osc.stop(ctx.currentTime + 0.10);
      } else if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      console.warn("AudioContext not allowed or ready yet:", e);
    }
  };

  const goNextChat = () => {
    if (currentIdx < CHAT_DATA.length - 1) {
      setDirection(1);
      setCurrentIdx((prev) => prev + 1);
      playSound("swipe");
    }
  };

  const goPrevChat = () => {
    if (currentIdx > 0) {
      setDirection(-1);
      setCurrentIdx((prev) => prev - 1);
      playSound("swipe");
    }
  };

  // Keyboard controls for Arrow keys & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isZoomed) {
        setIsZoomed(false);
        playSound("click");
      }
      if (e.key === "ArrowRight") {
        goNextChat();
      }
      if (e.key === "ArrowLeft") {
        goPrevChat();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZoomed, currentIdx]);

  // Load reactions from localstorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("priyanka_chat_reactions");
      if (saved) {
        setReactions(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleReact = (emoji: string) => {
    const nextReactions = { ...reactions, [currentIdx]: emoji };
    setReactions(nextReactions);
    try {
      localStorage.setItem("priyanka_chat_reactions", JSON.stringify(nextReactions));
    } catch (e) {
      console.error(e);
    }

    playSound("bubble");

    // Spawn stardust/confetti based on reaction
    if (emoji === "💖" || emoji === "😭💙") {
      confetti({
        particleCount: 40,
        spread: 60,
        colors: ["#ffb4a6", "#d2bcff", "#e9c176"],
        origin: { y: 0.7 }
      });
      playSound("success");
    } else if (emoji === "😂") {
      confetti({
        particleCount: 25,
        spread: 40,
        colors: ["#e9c176", "#ffb4a6"],
        origin: { y: 0.7 }
      });
    }

    // Spawn floating emoji animation
    const newEmojis: FloatingEmoji[] = [];
    let counter = emojiIdCounter;
    for (let i = 0; i < 5; i++) {
      newEmojis.push({
        id: counter++,
        emoji,
        x: Math.random() * 80 - 40, // random offset
        y: Math.random() * -60 - 40 // float up
      });
    }
    setEmojiIdCounter(counter);
    setFloatingEmojis((prev) => [...prev, ...newEmojis]);

    // Cleanup floating emojis
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((item) => !newEmojis.some((ne) => ne.id === item.id)));
    }, 1500);
  };

  const activeChat = CHAT_DATA[currentIdx];
  const reactedEmoji = reactions[currentIdx];

  const totalReplied = Object.keys(reactions).length;
  const progressPercent = Math.round((totalReplied / CHAT_DATA.length) * 100);

  return (
    <section className="py-20 px-4 relative min-h-screen flex flex-col justify-center items-center w-full no-page-swipe">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 30%, rgba(255,180,166,0.05) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(210,188,255,0.05) 0%, transparent 60%)" }} />

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <motion.p
          className="chapter-label justify-center mb-3"
          style={{ color: "var(--nc-primary)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ✦ Chapter V
        </motion.p>

        {/* Title */}
        <motion.h2
          className="font-display text-center leading-none tracking-tight text-white mb-4"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The <span className="text-gradient font-black">Chat Time-Capsule</span> ⏳
        </motion.h2>

        <motion.p
          className="text-center font-body mb-10 max-w-2xl text-pink-200/60 leading-relaxed"
          style={{ fontSize: "var(--t-lead)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          A secret digital vault containing our exact chats from literally 5 years back.
          Priyanka, do you still remember these sweet, chaotic, and beautiful conversations? 💙
        </motion.p>

        {/* Memory progress bar */}
        <motion.div
          className="w-full max-w-md px-6 py-3 rounded-full mb-8 flex flex-col gap-2 relative overflow-hidden"
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "var(--glass-blur)",
            border: "1px solid var(--nc-outline)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-center text-xs font-body uppercase tracking-wider text-pink-300/80">
            <span>Capsule Memories Explored</span>
            <span className="font-semibold">{totalReplied} of {CHAT_DATA.length} Unlocked</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden progress-shimmer">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #d2bcff, #ffb4a6)",
                boxShadow: "0 0 10px rgba(255,180,166,0.5)"
              }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          {progressPercent === 100 && (
            <motion.span
              className="text-[10px] text-center font-body text-gradient font-bold uppercase tracking-widest mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              🎉 Perfect Memory Unlocked! You're a true soulmate! ✨
            </motion.span>
          )}
        </motion.div>

        {/* Main Content Arena: Chat Box Frame */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-stretch relative">

          {/* Main Monitor Display — Left (8 cols on desktop) */}
          <div className="md:col-span-8 flex flex-col">
            <motion.div
              className="rounded-3xl p-4 md:p-6 flex flex-col justify-between relative overflow-hidden h-full flex-grow"
              style={{
                background: "rgba(18, 14, 32, 0.6)",
                backdropFilter: "var(--glass-blur)",
                border: "1px solid rgba(255, 180, 166, 0.15)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.5), inset 0 0 30px rgba(255,255,255,0.02)"
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Scanline / CRT Retro Overlay */}
              <div
                className="absolute inset-0 z-10 pointer-events-none opacity-30"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)"
                }}
              />

              {/* Glowing Ambient Spot behind image */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(210,188,255,0.05)_0%,transparent_70%)]" />

              {/* Chat Card Header */}
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-white/5 relative z-20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-pink-500/10 border border-pink-400/30 flex items-center justify-center text-md shadow-inner">
                    💬
                  </div>
                  <div>
                    <h3 className="font-display text-white text-base font-bold leading-none tracking-wide">
                      {activeChat.title}
                    </h3>
                    <p className="font-body text-[10px] uppercase text-pink-300/50 tracking-widest mt-1">
                      {activeChat.subtitle}
                    </p>
                  </div>
                </div>

                {/* ERA Badge */}
                <div className="px-3 py-1 rounded-full text-[10px] font-body uppercase tracking-wider text-gradient font-bold bg-white/5 border border-white/10">
                  {activeChat.era}
                </div>
              </div>

              {/* Screenshot Display Box with Swipe Gestures & Slide Transitions */}
              <div
                className="relative rounded-2xl overflow-hidden cursor-zoom-in group flex items-center justify-center bg-black/40 border border-white/5 shadow-inner select-none"
                style={{ minHeight: "350px", height: "450px" }}
                onClick={() => {
                  setIsZoomed(true);
                  playSound("click");
                }}
              >
                {/* Floating animations for selected reactions */}
                <AnimatePresence>
                  {floatingEmojis.map((fe) => (
                    <motion.div
                      key={fe.id}
                      className="absolute text-4xl pointer-events-none z-30"
                      initial={{ opacity: 1, scale: 0.8, x: 0, y: 150 }}
                      animate={{ opacity: 0, scale: 1.6, x: fe.x, y: fe.y }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                      {fe.emoji}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Animated sliding container for screenshot */}
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeChat.id}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({
                          x: dir > 0 ? 150 : -150,
                          opacity: 0,
                          scale: 0.94,
                          filter: "blur(4px)"
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                          scale: 1,
                          filter: "blur(0px)",
                          transition: {
                            x: { type: "spring", stiffness: 350, damping: 30 },
                            opacity: { duration: 0.2 }
                          }
                        },
                        exit: (dir: number) => ({
                          x: dir > 0 ? -150 : 150,
                          opacity: 0,
                          scale: 0.94,
                          filter: "blur(4px)",
                          transition: {
                            x: { type: "spring", stiffness: 350, damping: 30 },
                            opacity: { duration: 0.2 }
                          }
                        })
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.4}
                      onDragEnd={(_, info) => {
                        const swipeThreshold = 50;
                        if (info.offset.x < -swipeThreshold) {
                          // Swipe Left -> Next card
                          if (currentIdx < CHAT_DATA.length - 1) {
                            setDirection(1);
                            setCurrentIdx((i) => i + 1);
                            playSound("swipe");
                          }
                        } else if (info.offset.x > swipeThreshold) {
                          // Swipe Right -> Prev card
                          if (currentIdx > 0) {
                            setDirection(-1);
                            setCurrentIdx((i) => i - 1);
                            playSound("swipe");
                          }
                        }
                      }}
                      className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                    >
                      <motion.img
                        src={activeChat.src}
                        alt="Nostalgic 5 Year Chat Screenshot"
                        className="max-h-full max-w-full object-contain rounded-xl pointer-events-none select-none"
                        layoutId={`chat-img-${activeChat.id}`}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Watermark badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[9px] text-pink-300/80 font-body px-2.5 py-1 rounded-full border border-pink-400/20 uppercase tracking-widest shadow-lg pointer-events-none z-20">
                  🔒 Encrypted Memory
                </div>

                {/* Tap to zoom hover hint */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-all duration-300 z-20 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white text-lg">
                    🔍
                  </div>
                  <p className="font-body text-xs text-white uppercase tracking-widest font-semibold">
                    Tap to Zoom in & Read 📱
                  </p>
                </div>
              </div>

              {/* Bottom Carousel Controls */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 relative z-20">
                <button
                  onClick={() => {
                    if (currentIdx > 0) {
                      setDirection(-1);
                      setCurrentIdx((i) => i - 1);
                      playSound("swipe");
                    }
                  }}
                  disabled={currentIdx === 0}
                  className="px-4 py-2 rounded-full font-body text-xs flex items-center gap-2 transition-all duration-200 disabled:opacity-20 border border-white/10 hover:bg-white/5 active:scale-95 text-pink-200 cursor-pointer"
                >
                  ← Prev
                </button>

                <button
                  onClick={() => {
                    setShowGridView(true);
                    playSound("click");
                  }}
                  className="px-4 py-2 rounded-full font-body text-xs flex items-center gap-1.5 transition-all duration-200 border border-pink-500/20 bg-pink-500/5 hover:bg-pink-500/10 active:scale-95 text-pink-300 font-semibold cursor-pointer"
                >
                  📂 Grid View ({currentIdx + 1}/{CHAT_DATA.length})
                </button>

                <button
                  onClick={() => {
                    if (currentIdx < CHAT_DATA.length - 1) {
                      setDirection(1);
                      setCurrentIdx((i) => i + 1);
                      playSound("swipe");
                    }
                  }}
                  disabled={currentIdx === CHAT_DATA.length - 1}
                  className="px-4 py-2 rounded-full font-body text-xs flex items-center gap-2 transition-all duration-200 disabled:opacity-20 border border-white/10 hover:bg-white/5 active:scale-95 text-pink-200 cursor-pointer"
                >
                  Next →
                </button>
              </div>

            </motion.div>
          </div>

          {/* Interactive Console — Right (4 cols on desktop) */}
          <div className="md:col-span-4 flex flex-col gap-6">

            {/* Context/Hint Box */}
            <motion.div
              className="rounded-3xl p-5 relative overflow-hidden"
              style={{
                background: "rgba(18, 14, 32, 0.45)",
                backdropFilter: "var(--glass-blur)",
                border: "1px solid rgba(255, 180, 166, 0.1)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.3)"
              }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 blur-[45px]" />

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💡</span>
                <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider">
                  Memory Hint & Context
                </h4>
              </div>

              <p className="font-body text-xs leading-relaxed text-pink-200/70 mb-4">
                {activeChat.hint}
              </p>

              <button
                onClick={() => setShowHint(!showHint)}
                className="w-full py-2.5 rounded-xl font-body text-[10px] uppercase tracking-widest border border-white/10 hover:bg-white/5 active:scale-[0.98] transition-all text-pink-300"
              >
                {showHint ? "Hide Comment ✕" : "Reveal Surprise Comment 🤫"}
              </button>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    className="mt-3 p-3.5 rounded-xl bg-pink-500/10 border border-pink-400/20 text-[11px] font-script text-pink-100 leading-relaxed relative"
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <div className="absolute top-0 right-1 text-pink-400/30 text-3xl font-serif">”</div>
                    {activeChat.comment || "Looking back at these screenshots makes me realize how beautifully consistent our friendship has been, Priyanka. 💙"}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Reaction Selector Panel */}
            <motion.div
              className="rounded-3xl p-5 relative overflow-hidden flex-grow flex flex-col justify-between"
              style={{
                background: "rgba(18, 14, 32, 0.45)",
                backdropFilter: "var(--glass-blur)",
                border: "1px solid rgba(255, 180, 166, 0.1)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.3)"
              }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🧐</span>
                  <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider">
                    Do you remember this?
                  </h4>
                </div>

                <p className="font-body text-xs text-pink-200/50 leading-relaxed mb-6">
                  Select how this exact chat log makes you feel! Let’s populate our shared time-capsule dashboard.
                </p>

                {/* Reaction Options */}
                <div className="flex flex-col gap-2.5">
                  {[
                    { emoji: "😭💙", label: "I totally remember this!" },
                    { emoji: "😂", label: "OMG we were so weird!" },
                    { emoji: "🥺", label: "This is so nostalgic..." },
                    { emoji: "🤔", label: "Wait, I need a context reload!" }
                  ].map((item) => {
                    const isSelected = reactedEmoji === item.emoji;
                    return (
                      <button
                        key={item.emoji}
                        onClick={() => handleReact(item.emoji)}
                        className={`w-full py-3 px-4 rounded-xl font-body text-xs flex items-center justify-between border transition-all duration-300 relative overflow-hidden group active:scale-[0.98] ${isSelected
                            ? "border-pink-500/40 bg-pink-500/10 text-white shadow-[0_0_15px_rgba(236,72,153,0.15)] font-semibold"
                            : "border-white/5 bg-white/5 hover:border-white/15 hover:bg-white/10 text-pink-200/80"
                          }`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="reaction-glow"
                            className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent pointer-events-none"
                          />
                        )}
                        <span className="flex items-center gap-2.5">
                          <span className="text-base group-hover:scale-115 transition-transform duration-200">{item.emoji}</span>
                          <span>{item.label}</span>
                        </span>
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-[10px] uppercase font-bold text-gradient tracking-widest"
                          >
                            Selected
                          </motion.span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Memory Score Status Card */}
              <div
                className="mt-6 p-4 rounded-2xl border border-white/5 bg-black/20 flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-pink-300/60 font-body">Priyanka's Memory Score</span>
                  <span className="text-sm font-display text-white font-bold mt-0.5">
                    {totalReplied === CHAT_DATA.length
                      ? "100% Nostalgic Legend 👑"
                      : `${Math.round((totalReplied / CHAT_DATA.length) * 100)}% Re-Initialized 🔌`}
                  </span>
                </div>
                <div className="text-2xl">
                  {totalReplied === CHAT_DATA.length ? "👑" : "🧪"}
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Grid View Sliding Side Panel overlay */}
      <AnimatePresence>
        {showGridView && (
          <motion.div
            className="fixed inset-0 z-[600] flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "rgba(3,2,8,0.7)", backdropFilter: "blur(12px)" }}
            onClick={() => setShowGridView(false)}
          >
            <motion.div
              className="w-full max-w-md h-screen p-6 overflow-y-auto flex flex-col justify-between"
              style={{
                background: "rgba(16, 12, 32, 0.95)",
                borderLeft: "1px solid rgba(255, 180, 166, 0.15)",
                boxShadow: "-10px 0 50px rgba(0,0,0,0.8)"
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/5">
                  <div>
                    <h3 className="font-display text-white text-lg font-bold">
                      Chat Capsule Vault
                    </h3>
                    <p className="font-body text-[10px] uppercase text-pink-300/50 tracking-wider mt-1">
                      Explore all 22 vintage screenshots
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowGridView(false);
                      playSound("click");
                    }}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 text-white text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Screenshot Thumbnails Grid */}
                <div className="grid grid-cols-2 gap-3 max-h-[75vh] overflow-y-auto pr-1">
                  {CHAT_DATA.map((chat, idx) => {
                    const isCurrent = currentIdx === idx;
                    const hasReaction = reactions[idx];
                    return (
                      <button
                        key={chat.id}
                        onClick={() => {
                          const dir = idx > currentIdx ? 1 : -1;
                          setDirection(dir);
                          setCurrentIdx(idx);
                          setShowGridView(false);
                          playSound("swipe");
                        }}
                        className={`group relative rounded-xl overflow-hidden aspect-[4/5] bg-black border transition-all duration-300 cursor-pointer ${isCurrent
                            ? "border-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.3)] scale-[0.98]"
                            : "border-white/5 hover:border-white/20 hover:scale-[1.02]"
                          }`}
                      >
                        <img
                          src={chat.src}
                          alt={chat.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter group-hover:brightness-110"
                        />

                        {/* Shading */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                        {/* Badges on Thumbnail */}
                        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[8px] font-body bg-black/70 text-pink-200 border border-white/5 uppercase tracking-wider">
                          {chat.era}
                        </div>

                        {hasReaction && (
                          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-pink-500/20 backdrop-blur-md border border-pink-400/30 flex items-center justify-center text-[10px] shadow-md animate-bounce">
                            {hasReaction}
                          </div>
                        )}

                        <div className="absolute bottom-2 left-2 right-2 text-left">
                          <p className="font-display text-[9px] font-bold text-white leading-none truncate">
                            {chat.title}
                          </p>
                          <p className="font-body text-[7px] text-pink-300/40 uppercase tracking-widest leading-none mt-1">
                            Tape #{chat.id}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 mt-6 text-center">
                <button
                  onClick={() => setShowGridView(false)}
                  className="px-6 py-2.5 rounded-full bg-pink-500/15 border border-pink-500/30 font-body text-xs text-pink-200 tracking-wider hover:bg-pink-500/25 active:scale-95 transition-all w-full"
                >
                  Return to Active Frame
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Full Screen Lightbox Zoom */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center cursor-zoom-out p-4 overflow-y-auto"
            style={{ background: "rgba(3,2,8,0.97)", backdropFilter: "blur(24px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsZoomed(false);
              playSound("click");
            }}
          >
            {/* Lightbox instructions */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <p className="text-[10px] md:text-xs font-body uppercase tracking-widest text-pink-300/60 font-semibold">
                Cinematic Lightbox Display
              </p>
            </div>

            <div
              onClick={() => {
                setIsZoomed(false);
                playSound("click");
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 text-[10px] md:text-xs font-body tracking-widest cursor-pointer hover:text-white transition-colors uppercase z-50"
            >
              ✕ Close
            </div>

            {/* High Res Cinematic Split-View Render */}
            <motion.div
              className="max-w-4xl w-full flex flex-col md:flex-row items-stretch gap-6 rounded-3xl p-4 md:p-6 relative mt-12 md:mt-0"
              style={{
                background: "rgba(16,12,32,0.85)",
                border: "1px solid rgba(255,180,166,0.2)",
                boxShadow: "0 0 100px rgba(255,180,166,0.15)",
                maxHeight: "90vh"
              }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Desktop Side Arrows floating outside/inside container boundaries */}
              {currentIdx > 0 && (
                <button
                  onClick={goPrevChat}
                  className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full hidden md:flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/10 text-white hover:border-pink-500/50 transition-all duration-200 shadow-[0_4px_20px_rgba(236,72,153,0.15)] active:scale-90 cursor-pointer z-50 select-none"
                  aria-label="Previous memory"
                >
                  <span className="text-xl">←</span>
                </button>
              )}

              {currentIdx < CHAT_DATA.length - 1 && (
                <button
                  onClick={goNextChat}
                  className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full hidden md:flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/10 text-white hover:border-pink-500/50 transition-all duration-200 shadow-[0_4px_20px_rgba(236,72,153,0.15)] active:scale-90 cursor-pointer z-50 select-none"
                  aria-label="Next memory"
                >
                  <span className="text-xl">→</span>
                </button>
              )}

              {/* Left Side: Screenshot Container */}
              <div
                className="w-full md:w-1/2 rounded-2xl overflow-hidden flex items-center justify-center bg-black/40 relative p-1 cursor-default select-none max-h-[45vh] md:max-h-[80vh]"
              >
                <motion.img
                  src={activeChat.src}
                  alt="Zoomed Retro Chat Screenshot"
                  className="max-h-[40vh] md:max-h-[72vh] max-w-full object-contain rounded-xl select-none pointer-events-auto"
                  layoutId={`chat-img-${activeChat.id}`}
                />
              </div>

              {/* Right Side: Comment and Meta Info Container */}
              <div className="w-full md:w-1/2 flex flex-col justify-center text-left p-2 md:p-4 overflow-y-auto max-h-[35vh] md:max-h-[80vh]">
                <div className="mb-2">
                  <span className="text-[9px] uppercase tracking-widest text-pink-300/60 font-body font-semibold">
                    ✦ Tape #{activeChat.id} ({activeChat.era})
                  </span>
                  <h3 className="font-display text-white text-xl md:text-2xl font-black mt-1 text-gradient">
                    {activeChat.title}
                  </h3>
                  <p className="font-body text-[10px] md:text-xs text-pink-200/40 uppercase tracking-widest mt-1">
                    {activeChat.subtitle}
                  </p>
                </div>

                {/* Main Comment Box with Retro Soundwave Voice-Note player visualizer */}
                <div className="p-4 md:p-5 rounded-2xl bg-pink-500/10 border border-pink-400/20 relative my-4 flex flex-col gap-3">
                  <span className="absolute top-0 right-3 text-pink-400/20 text-5xl font-serif leading-none">”</span>
                  <p className="font-script text-pink-100 text-lg md:text-xl leading-relaxed pr-6">
                    {activeChat.comment}
                  </p>

                  {/* Decorative Retro Voice Player */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                    <span className="text-[9px] uppercase tracking-widest text-pink-300/50 font-body font-bold flex items-center gap-1 select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                      Retro Audio-Tape Visualizer
                    </span>
                    <div className="flex gap-0.5 items-center h-4 flex-grow justify-end pr-2 select-none">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((bar) => (
                        <motion.div
                          key={bar}
                          className="w-[2px] bg-pink-400/60 rounded-full animate-pulse"
                          animate={{
                            height: [4, Math.random() * 14 + 4, 4]
                          }}
                          transition={{
                            duration: 0.4 + Math.random() * 0.4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Friendly Navigation Row */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2 select-none gap-4">
                  <button
                    onClick={goPrevChat}
                    disabled={currentIdx === 0}
                    className="flex-1 py-2.5 px-4 rounded-xl font-body text-xs font-semibold uppercase tracking-wider text-center border border-white/10 text-pink-200/80 hover:bg-white/5 disabled:opacity-25 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    ← Prev
                  </button>
                  <span className="font-body text-xs text-pink-300/40 font-bold px-1 whitespace-nowrap">
                    {currentIdx + 1} / {CHAT_DATA.length}
                  </span>
                  <button
                    onClick={goNextChat}
                    disabled={currentIdx === CHAT_DATA.length - 1}
                    className="flex-1 py-2.5 px-4 rounded-xl font-body text-xs font-semibold uppercase tracking-wider text-center bg-pink-500/10 border border-pink-500/20 text-pink-300 hover:bg-pink-500/20 disabled:opacity-25 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Next →
                  </button>
                </div>

                <div className="text-center mt-3 select-none">
                  <p className="font-body text-[9px] text-pink-300/30 uppercase tracking-widest">
                    ✦ Press Arrow Keys to navigate, tap outside to exit ✦
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ChatVault;
