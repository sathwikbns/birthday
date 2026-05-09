import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FRIEND_NAME } from "@/config/priyanka";

// Mapping the user's actual high-quality JPG photos to the story chapters!
const TIMELINE_MEMORIES = [
  { 
    year: "Day 1", 
    title: "The Day We Met", 
    caption: "A random hello turned into a forever friendship. The stars aligned, and my world became brighter. 💫", 
    photo: "/IMG-20240509-WA0001.jpg",
    angle: -3
  },
  { 
    year: "First Secret", 
    title: "You Trusted Me", 
    caption: "The first secret you shared. I knew then that we were building something rare and beautiful. 🔐", 
    photo: "/IMG_20260508_214443.jpg",
    angle: 4
  },
  { 
    year: "Late Nights", 
    title: "3AM Conversations", 
    caption: "The world asleep, but we were very much awake. Talking about everything and nothing under the stars. 🌙", 
    photo: "/IMG_20260508_214629.jpg",
    angle: -2
  },
  { 
    year: "Tough Days", 
    title: "You Guided Me", 
    caption: "When I was lost in the dark, you were the compass that kept me safe and pointed me home. 🧭", 
    photo: "/IMG_20260508_215002.jpg",
    angle: 3
  },
  { 
    year: "Laughter", 
    title: "Unstoppable Giggles", 
    caption: "Those inside jokes that make us wheeze until we can't breathe. Nobody gets our weirdness like you do! 😂", 
    photo: "/IMG_20260509_181916.jpg",
    angle: -4
  },
  { 
    year: "Today", 
    title: "My Favorite Person", 
    caption: "And here we are today — still each other's most trusted sanctuary and partner in crime. 💙", 
    photo: "/20250128_215746.jpg",
    angle: 2
  },
];

const FriendshipTimeline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomPhoto, setZoomPhoto] = useState<string | null>(null);

  const nextMemory = () => {
    if (currentIndex < TIMELINE_MEMORIES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevMemory = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentMemory = TIMELINE_MEMORIES[currentIndex];

  return (
    <section className="py-20 px-4 min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Dynamic Background Glow representing emotional shifts */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="w-[700px] h-[700px] rounded-full blur-[160px]"
          style={{
            background: currentIndex % 3 === 0 
              ? "radial-gradient(circle, rgba(210,188,255,0.18) 0%, transparent 70%)"
              : currentIndex % 3 === 1
              ? "radial-gradient(circle, rgba(255,180,166,0.18) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(233,193,118,0.14) 0%, transparent 70%)"
          }}
        />
      </div>

      <motion.p
        className="chapter-label justify-center mb-3 relative z-10"
        style={{ color: "var(--nc-tertiary)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        ✦ Chapter II
      </motion.p>
      <motion.h2
        className="font-display text-center mb-12 relative z-10 tracking-[-0.02em] text-white"
        style={{ fontSize: "var(--t-5xl)" }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Story Journal 📖
      </motion.h2>

      {/* Cinematic Split Layout Frame */}
      <div className="relative w-full max-w-5xl flex items-center justify-center z-10 min-h-[460px]">
        
        {/* Navigation Arrow — Left */}
        <button 
          onClick={prevMemory}
          disabled={currentIndex === 0}
          className="absolute left-[-20px] md:left-[-35px] z-20 w-12 h-12 rounded-full flex items-center justify-center bg-[#120f23]/60 border border-white/10 text-white/70 disabled:opacity-10 transition-all duration-200 cursor-pointer hover:bg-white/10 hover:border-white/20 hover:text-white"
          aria-label="Previous memory"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="10,3 5,8 10,13" />
          </svg>
        </button>

        {/* Navigation Arrow — Right */}
        <button 
          onClick={nextMemory}
          disabled={currentIndex === TIMELINE_MEMORIES.length - 1}
          className="absolute right-[-20px] md:right-[-35px] z-20 w-12 h-12 rounded-full flex items-center justify-center bg-[#120f23]/60 border border-white/10 text-white/70 disabled:opacity-10 transition-all duration-200 cursor-pointer hover:bg-white/10 hover:border-white/20 hover:text-white"
          aria-label="Next memory"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6,3 11,8 6,13" />
          </svg>
        </button>

        {/* Main Content Card — Responsive Grid Split */}
        <div className="w-full h-full p-4 md:p-8 rounded-[2rem] bg-[#120f22]/40 border border-white/5 backdrop-blur-xl shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Physical Polaroid Photo */}
              <div className="col-span-1 md:col-span-5 flex justify-center items-center">
                <motion.div
                  className="bg-[#faf6f0] p-3 pb-12 shadow-2xl relative cursor-zoom-in group select-none"
                  style={{
                    width: "280px",
                    borderRadius: "4px",
                    transform: `rotate(${currentMemory.angle}deg)`,
                    boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
                  }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  onClick={() => setZoomPhoto(currentMemory.photo)}
                >
                  {/* Polaroid Tape Accent */}
                  <div className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 w-16 h-6 bg-white/10 backdrop-blur-sm border border-white/20 rotate-[-2deg] shadow-sm pointer-events-none" />

                  {/* Photo Frame Container */}
                  <div className="w-full h-56 rounded-sm overflow-hidden bg-zinc-900 relative">
                    <img 
                      src={currentMemory.photo} 
                      alt={currentMemory.title} 
                      className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Handwritten Polaroid Date Badge */}
                  <div className="absolute bottom-3 left-4 right-4 text-center">
                    <span className="font-script text-zinc-700 text-lg select-none">
                      {currentMemory.year} 🌸
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Narrative Story Text */}
              <div className="col-span-1 md:col-span-7 flex flex-col justify-center text-center md:text-left">
                {/* Year Badge */}
                <div className="self-center md:self-start px-4.5 py-1.5 rounded-full border border-[#e9c176]/30 bg-[#e9c176]/10 text-[#e9c176] font-body tracking-[0.2em] text-xs mb-6 uppercase">
                  {currentMemory.year} Milestone
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-display text-white mb-5 leading-tight tracking-tight">
                  {currentMemory.title}
                </h3>

                {/* Caption Description */}
                <p className="text-pink-100/70 font-body leading-relaxed text-base md:text-lg mb-8 max-w-xl">
                  {currentMemory.caption}
                </p>

                {/* Emotional Signature Decor */}
                <div className="font-script text-pink-300/40 text-xl md:text-2xl self-center md:self-start italic">
                  — Always {FRIEND_NAME}'s best friend
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Index Progress Indicators */}
      <div className="mt-8 flex gap-3 z-10">
        {TIMELINE_MEMORIES.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full cursor-pointer transition-all duration-500 ${i === currentIndex ? "w-10 bg-[#e9c176]" : "w-2 bg-white/20 hover:bg-white/40"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Expanded Lightbox Modal on Polaroid Click */}
      <AnimatePresence>
        {zoomPhoto && (
          <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 cursor-zoom-out"
            style={{ background: "rgba(3,2,8,0.96)", backdropFilter: "blur(24px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomPhoto(null)}
          >
            <div className="absolute top-6 right-6 text-white/50 text-xs font-body tracking-widest uppercase">
              ✕ Click anywhere to close
            </div>

            <motion.div
              className="rounded-xl p-3 pb-16 max-w-md w-full shadow-2xl relative bg-[#faf6f0]"
              initial={{ scale: 0.6, rotate: -4 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full aspect-[4/5] rounded-sm overflow-hidden bg-zinc-950 relative shadow-inner">
                <img src={zoomPhoto} alt="Zoomed Memory" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="font-script text-zinc-800 text-2xl">
                  {TIMELINE_MEMORIES.find(m => m.photo === zoomPhoto)?.title} 💙
                </p>
                <p className="font-body text-zinc-500 text-xs tracking-wider uppercase mt-1">
                  Captured Moment
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FriendshipTimeline;
