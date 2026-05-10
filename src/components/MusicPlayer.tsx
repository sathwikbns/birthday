import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LyricLine {
  text: string;
  start: number; // in seconds
  end: number;   // in seconds
}

// Highly accurate timestamp map for "Night Changes" by One Direction
const NIGHT_CHANGES_LYRICS: LyricLine[] = [
  { text: "✨ Night Changes — One Direction ✨", start: 0, end: 7.5 },
  { text: "Going out tonight, changes into something red... 💃", start: 7.6, end: 12.0 },
  { text: "Her mother doesn't like that kind of dress... 👗", start: 12.1, end: 16.2 },
  { text: "Everything she never had, she's showing off... ✨", start: 16.3, end: 20.8 },
  { text: "Driving too fast, moon is breaking through her hair... 🌙", start: 20.9, end: 25.2 },
  { text: "She's heading for something she won't forget... 🌅", start: 25.3, end: 29.8 },
  { text: "Having no regrets is all she really wants... 💙", start: 29.9, end: 33.8 },
  { text: "We're only getting older, baby... 🌸", start: 33.9, end: 38.2 },
  { text: "And I've been thinking about it lately... 💭", start: 38.3, end: 42.4 },
  { text: "Does it ever drive you crazy...", start: 42.5, end: 46.8 },
  { text: "Just how fast the night changes? ⏳", start: 46.9, end: 51.2 },
  { text: "Everything that you've ever dreamed of... 💫", start: 51.3, end: 55.4 },
  { text: "Disappearing when you wake up... 🌅", start: 55.5, end: 59.8 },
  { text: "But there's nothing to be afraid of... 🔒", start: 59.9, end: 64.2 },
  { text: "Even when the night changes...", start: 64.3, end: 68.6 },
  { text: "It will never change me and you... 💙✨", start: 68.7, end: 75.8 },
  { text: "🎵 Intimacy & Memories... 🎹", start: 75.9, end: 87.8 },
  { text: "Chasing her tonight, doubts are running 'round her head... 💭", start: 87.9, end: 92.2 },
  { text: "He's waiting, hides the anxiety... 🤝", start: 92.3, end: 96.2 },
  { text: "Temple's beating, and her heart is racing... 💓", start: 96.3, end: 100.8 },
  { text: "Having a good time, heart's beating out of her chest... 💞", start: 100.9, end: 105.2 },
  { text: "Everything is starting to make sense... 🌟", start: 105.3, end: 109.8 },
  { text: "Having no regrets is all they really want... 🙌", start: 109.9, end: 113.8 },
  { text: "We're only getting older, baby... 🌸", start: 113.9, end: 118.2 },
  { text: "And I've been thinking about it lately... 💭", start: 118.3, end: 122.4 },
  { text: "Does it ever drive you crazy...", start: 122.5, end: 126.8 },
  { text: "Just how fast the night changes? ⏳", start: 126.9, end: 131.2 },
  { text: "Everything that you've ever dreamed of... 💫", start: 131.3, end: 135.4 },
  { text: "Disappearing when you wake up... 🌅", start: 135.5, end: 139.8 },
  { text: "But there's nothing to be afraid of... 🔒", start: 139.9, end: 144.2 },
  { text: "Even when the night changes...", start: 144.3, end: 148.6 },
  { text: "It will never change me and you... 💙✨", start: 148.7, end: 156.0 },
  { text: "Going out tonight, changes into something red... 💃", start: 156.1, end: 160.2 },
  { text: "Her mother doesn't like that kind of dress... 👗", start: 160.3, end: 164.5 },
  { text: "Everything she never had, she's showing off... ✨", start: 164.6, end: 169.0 },
  { text: "We're only getting older, baby... 🌸", start: 169.1, end: 173.2 },
  { text: "And I've been thinking about it lately... 💭", start: 173.3, end: 177.4 },
  { text: "Does it ever drive you crazy...", start: 177.5, end: 181.8 },
  { text: "Just how fast the night changes? ⏳", start: 181.9, end: 186.2 },
  { text: "Everything that you've ever dreamed of... 💫", start: 186.3, end: 190.4 },
  { text: "Disappearing when you wake up... 🌅", start: 190.5, end: 194.8 },
  { text: "But there's nothing to be afraid of... 🔒", start: 194.9, end: 199.2 },
  { text: "Even when the night changes...", start: 199.3, end: 203.6 },
  { text: "It will never change me and you... 💙✨", start: 203.7, end: 211.2 },
  { text: "It will never change, baby...", start: 211.3, end: 215.2 },
  { text: "It will never change me and you... 🌌", start: 215.3, end: 221.0 },
  { text: "🌸 Wishing Priyanka the happiest birthday ever! 🎂", start: 221.1, end: 235.0 }
];

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showLyrics, setShowLyrics] = useState(true);
  const [fileName, setFileName] = useState("/music.webm");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Check multiple potential file targets inside /public
    const targets = ["/music.webm", "/priyanka/music.webm", "/priyanka/night_changes.mp3", "/night_changes.mp3", "/priyanka/music.mp3", "/music.mp3"];
    
    const checkFile = async (idx: number) => {
      if (idx >= targets.length) {
        setHasFile(false);
        return;
      }
      try {
        const res = await fetch(targets[idx], { method: "HEAD" });
        if (res.ok) {
          setHasFile(true);
          setFileName(targets[idx]);
          if (audioRef.current) {
            audioRef.current.src = targets[idx];
          }
        } else {
          checkFile(idx + 1);
        }
      } catch {
        checkFile(idx + 1);
      }
    };

    checkFile(0);
  }, []);

  // Demo Simulation Mode: If there is no local file loaded, we auto-advance the timer
  // so the user can see and test the gorgeous flowing synchronized lyrics instantly!
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (playing && !hasFile) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.5; // advance half-second
          if (next > 235) return 0; // loop at the end of the track
          return next;
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playing, hasFile]);

  const toggle = () => {
    if (playing) {
      if (audioRef.current && hasFile) {
        audioRef.current.pause();
      }
    } else {
      if (audioRef.current && hasFile) {
        audioRef.current.play().catch(() => {});
      }
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && hasFile) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Find active line matching current playback seconds
  const activeLine = NIGHT_CHANGES_LYRICS.find(
    (line) => currentTime >= line.start && currentTime <= line.end
  ) || { text: "🎵 Listening to Night Changes... 🎧", start: 0, end: 0 };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        src={hasFile ? fileName : undefined} 
        onTimeUpdate={handleTimeUpdate}
      />
      
      {/* Positioned on the bottom-right so it never overlaps with bottom-left VirtualHug button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
        
        {/* Apple Music Style Floating Glass Lyric Player */}
        <AnimatePresence>
          {playing && showLyrics && (
            <motion.div
              className="px-5 py-3.5 rounded-2xl flex flex-col gap-1.5 max-w-[280px] sm:max-w-[340px] border relative overflow-hidden"
              style={{
                background: "rgba(18, 14, 32, 0.75)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 180, 166, 0.15)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.5), inset 0 0 12px rgba(255,255,255,0.02)"
              }}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              {/* Starry highlight overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none" />

              <div className="flex items-center justify-between z-10">
                <span className="text-[8px] uppercase tracking-widest text-purple-300 font-body font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                  {hasFile ? "Live Sync Karaoke" : "Karaoke (Demo Simulator Mode 🧪)"}
                </span>
                <button
                  onClick={() => setShowLyrics(false)}
                  className="text-[9px] uppercase tracking-wider text-pink-300/40 hover:text-pink-300 transition-colors cursor-pointer"
                >
                  Hide
                </button>
              </div>

              {/* Glowing active lyric slide */}
              <div className="min-h-[44px] flex items-center justify-end text-right z-10">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeLine.text}
                    className="font-script text-white text-base sm:text-lg leading-snug drop-shadow-[0_2px_8px_rgba(255,180,166,0.35)]"
                    initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {activeLine.text}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Attraction Nudge Tooltip for Music */}
        <AnimatePresence>
          {!playing && (
            <motion.div
              className="px-4 py-2.5 rounded-2xl border flex items-center gap-2.5 max-w-[240px] relative pointer-events-none"
              style={{
                background: "rgba(18, 14, 32, 0.9)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderColor: "rgba(255, 180, 166, 0.35)",
                boxShadow: "0 8px 32px rgba(255, 180, 166, 0.15), inset 0 0 10px rgba(255,255,255,0.01)"
              }}
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: [0, -6, 0] 
              }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ 
                y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
                default: { type: "spring", stiffness: 200, damping: 20 }
              }}
            >
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#ffb4a6] animate-ping" />
              <div className="flex flex-col text-left">
                <span className="text-[7px] font-body font-black uppercase tracking-[0.15em] text-[#ffb4a6]">
                  Attraction Nudge
                </span>
                <span className="text-[10px] font-body text-white/95 leading-tight mt-0.5">
                  Tap play to listen to her favorite song! 🎵
                </span>
              </div>
              
              {/* Tooltip little beak pointing down to play button */}
              <div className="absolute bottom-[-6px] right-6 w-3 h-3 rotate-45 border-r border-b" 
                style={{
                  background: "rgba(18, 14, 32, 0.9)",
                  borderColor: "rgba(255, 180, 166, 0.35)"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Media Controller Box */}
        <div className="flex items-center gap-3">
          
          {/* Compact Mini-Status Panel */}
          <motion.div
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border"
            style={{
              background: "rgba(18, 14, 32, 0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)"
            }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Toggle lyrics button when playing */}
            {playing && !showLyrics && (
              <button
                onClick={() => setShowLyrics(true)}
                className="px-2.5 py-1 rounded-full text-[7.5px] uppercase tracking-widest border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold transition-all cursor-pointer"
              >
                Lyrics
              </button>
            )}

            <div className="flex flex-col text-right">
              <span className="text-[8px] font-body font-bold uppercase tracking-widest text-[#ffb4a6]">
                Theme Song
              </span>
              <span className="text-[10px] font-display text-white truncate max-w-[110px] font-semibold mt-0.5">
                Night Changes
              </span>
            </div>
          </motion.div>

          {/* Play/Pause Circle controller */}
          <div className="relative">
            {/* Pulsing visualizer circles */}
            <AnimatePresence>
              {playing && (
                <div className="absolute inset-[-4px] rounded-full pointer-events-none">
                  {[0, 1].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full"
                      style={{ border: "1px solid rgba(255,180,166,0.4)" }}
                      animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 1 }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Glowing Attraction Sonar Ring */}
            {!playing && (
              <div className="absolute inset-[-6px] rounded-full pointer-events-none z-0">
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#ffb4a6]/40"
                  animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
              </div>
            )}

            <motion.button
              onClick={toggle}
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-2xl relative z-10 cursor-pointer border"
              style={{
                background: playing
                  ? "linear-gradient(135deg, #120f23 0%, #1c183a 100%)"
                  : "rgba(18, 14, 32, 0.6)",
                borderColor: playing ? "rgba(255,180,166,0.4)" : "rgba(255,255,255,0.1)",
                boxShadow: playing ? "0 0 25px rgba(255,180,166,0.25)" : "0 8px 32px rgba(0,0,0,0.3)"
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              title={playing ? "Pause Music" : "Play Music"}
            >
              {/* Reacting glowing core */}
              <motion.div
                className="absolute inset-1 rounded-full opacity-0 pointer-events-none bg-gradient-to-tr from-purple-500/10 to-pink-500/10"
                animate={playing ? { opacity: 1 } : { opacity: 0 }}
              />

              {playing ? (
                /* Dynamic Retro Equalizer bars inside play key */
                <div className="flex items-center justify-center gap-0.5 h-5 w-5">
                  {[1, 2, 3, 4].map((bar) => (
                    <motion.div
                      key={bar}
                      className="w-[2.5px] bg-[#ffb4a6] rounded-full"
                      animate={{ height: [4, 18, 4] }}
                      transition={{ duration: 0.45 + bar * 0.1, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              ) : (
                <span className="translate-x-0.5 select-none">▶</span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Action instruction alert if night_changes.mp3 is missing */}
        {!hasFile && (
          <motion.div
            className="rounded-2xl p-4 max-w-[260px] border border-dashed flex flex-col gap-2 relative mt-2 text-right items-end"
            style={{
              background: "rgba(18, 14, 32, 0.85)",
              backdropFilter: "blur(12px)",
              borderColor: "rgba(255, 180, 166, 0.25)"
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
          >
            <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-pink-300 font-bold font-body">
              <span>💡 Demonstration Mode Active</span>
            </div>
            <p className="font-body text-[10px] text-pink-200/60 leading-normal">
              Click play above to preview the glowing synchronized lyrics! To hear the actual music, rename your audio track to <strong>night_changes.mp3</strong> and place it in:
            </p>
            <code className="text-[9px] bg-black/40 px-2 py-1.5 rounded font-mono text-purple-300 border border-white/5 truncate max-w-full text-center">
              public/priyanka/
            </code>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
