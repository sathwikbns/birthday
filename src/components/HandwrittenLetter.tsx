import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FRIEND_NAME } from "@/config/priyanka";

const paragraphs = [
  `Dear ${FRIEND_NAME},`,
  `I've been trying to find the right words for a while now. The kind that actually do justice to what you mean to me. I don't think they exist — but I'm going to try.`,
  `You are the person I call when everything falls apart. The person whose voice makes hard days feel survivable. The person who guides me when I can't see the road ahead, who teaches me without making me feel small, who shares in my joy like it's her own.`,
  `Meeting you changed something in me. Every time I see you, it is — without exaggeration — the happiest I feel. Not because life is suddenly perfect, but because with you, it doesn't have to be.`,
  `I trust you the way I trust very few people in this world. After my parents, there is you. That is not a small thing. That is everything.`,
  `You are beautiful, ${FRIEND_NAME}. Not just the way you look — but the way you listen, the way you care, the way you show up. The way you make someone feel like they matter just by being near you.`,
  `I never want to lose you. I hope you know that. I hope you carry it with you, especially on the days when the world feels heavy.`,
  `Happy Birthday. Here's to every year ahead — may they be as beautiful as you are. 💙`,
];

const TypewriterParagraph = ({ text, isTyping, onComplete, isFirst, isLast }: any) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isTyping) {
      if (displayedText.length < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, isFirst ? 60 : 35); // Write the first line slightly slower for impact
        return () => clearTimeout(timeout);
      } else {
        setTimeout(onComplete, 500); // Wait half a second before starting next paragraph
      }
    }
  }, [isTyping, displayedText, text, onComplete, isFirst]);

  return (
    <p 
      className={`leading-relaxed ${isFirst ? "text-3xl font-display text-pink-500 drop-shadow-md mb-8" : "text-lg font-body text-pink-100"}`}
      style={{
        fontStyle: isLast ? "italic" : "normal",
        textShadow: "0 0 10px rgba(255,100,150,0.2)"
      }}
    >
      {displayedText}
      {isTyping && displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="inline-block w-[3px] h-[1em] bg-pink-400 ml-1 translate-y-1 shadow-[0_0_8px_#ec4899]"
        />
      )}
    </p>
  );
};

const HandwrittenLetter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeParagraph, setActiveParagraph] = useState(-1);

  useEffect(() => {
    if (isInView && activeParagraph === -1) {
      setTimeout(() => setActiveParagraph(0), 1000); // Wait 1 second before starting to write
    }
  }, [isInView, activeParagraph]);

  return (
    <section className="py-20 px-4 flex flex-col items-center relative z-10" ref={ref}>
      <motion.div
        className="w-full max-w-2xl relative"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        {/* Glowing Halo — rose + lavender blend */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,180,166,0.12) 0%, rgba(210,188,255,0.06) 50%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="rounded-[2rem] p-8 md:p-14 relative overflow-hidden" style={{
          background: 'var(--nc-surface-lo)',
          border: '1px solid rgba(255,180,166,0.18)',
          boxShadow: '0 0 60px rgba(255,180,166,0.08), 0 30px 60px rgba(0,0,0,0.4)',
        }}>

          {/* Paper lined texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 27px, rgba(210,188,255,0.8) 28px)',
            backgroundSize: '100% 28px',
          }} />

          {/* Warm parchment tint */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 20% 20%, rgba(233,193,118,0.04) 0%, transparent 60%)',
          }} />

          {/* Letter Content */}
          <div className="relative z-10 space-y-8 min-h-[500px]">
            {paragraphs.map((para, i) => (
              <div key={i} className={i > activeParagraph ? "hidden" : "block"}>
                <TypewriterParagraph
                  text={para}
                  isFirst={i === 0}
                  isLast={i === paragraphs.length - 1}
                  isTyping={i === activeParagraph}
                  onComplete={() => setActiveParagraph(i + 1)}
                />
              </div>
            ))}
            
            {/* Show a beautiful glowing heart when the entire letter finishes writing */}
            {activeParagraph >= paragraphs.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0.5, duration: 1.5, delay: 1 }}
                className="flex items-center justify-center pt-8"
              >
                <div className="relative">
                  <span className="text-6xl drop-shadow-[0_0_20px_#ec4899]">💖</span>
                  <motion.div 
                    className="absolute inset-0 bg-pink-500 rounded-full blur-[30px] -z-10"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HandwrittenLetter;
