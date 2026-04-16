import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch("/priyanka/music.mp3", { method: "HEAD" })
      .then((r) => { if (r.ok) setHasFile(true); })
      .catch(() => {});
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} loop src="/priyanka/music.mp3" />
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
        {/* Ripple rings when playing */}
        <AnimatePresence>
          {playing && (
            <div className="relative w-14 h-14">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid hsl(260 60% 70% / 0.5)" }}
                  animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6 }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <motion.button
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl"
          style={{
            background: playing
              ? "linear-gradient(135deg, hsl(260 60% 70%), hsl(200 70% 75%))"
              : "hsl(var(--card))",
            border: "2px solid hsl(var(--border))",
            boxShadow: playing ? "0 0 20px hsl(260 60% 70% / 0.5)" : undefined,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggle}
          title={hasFile ? (playing ? "Pause music" : "Play music") : "Add music.mp3 to /public/priyanka/"}
        >
          <motion.span animate={playing ? { scale: [1, 1.15, 1] } : {}} transition={{ duration: 0.6, repeat: Infinity }}>
            {playing ? "🎵" : "🎶"}
          </motion.span>
        </motion.button>

        {!hasFile && (
          <motion.div
            className="fixed bottom-24 right-4 bg-card border border-border rounded-xl px-3 py-2 text-xs font-body text-muted-foreground w-44 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            🎵 Drop <strong>music.mp3</strong> in<br /><code>public/priyanka/</code>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
