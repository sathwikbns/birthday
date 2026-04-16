import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FRIEND_NAME } from "@/config/priyanka";

const questions = [
  {
    q: "When we haven't talked for a few days, how do you usually feel?",
    options: [
      { label: "Like an important piece of my day is missing 🥺", value: "a" },
      { label: "I immediately start scrolling through our old chats 📱", value: "b" },
      { label: "I spam you with reels until you finally reply 😤", value: "c" },
    ],
  },
  {
    q: "If I ever needed you for an emergency at 3 AM...",
    options: [
      { label: "I'd pick up the call immediately, no matter how tired I am 📞", value: "a" },
      { label: "I'd stay on call with you until everything is okay 💪", value: "b" },
      { label: "I'd literally drive over if you truly needed me 🚗", value: "c" },
    ],
  },
  {
    q: "When you think about our friendship, what is the first word that comes to mind?",
    options: [
      { label: "Irreplaceable 💎", value: "a" },
      { label: "Safe 🏠", value: "b" },
      { label: "Unconditional ✨", value: "c" },
    ],
  },
  {
    q: "If you had to honestly describe how much I mean to you...",
    options: [
      { label: "Way more than I can ever put into words 💙", value: "a" },
      { label: "You are one of my absolute favorite people 🌟", value: "b" },
      { label: "I genuinely can't imagine my life without you 🌌", value: "c" },
    ],
  },
  {
    q: "When we finally meet after a long time, your first reaction is...",
    options: [
      { label: "Giving you the biggest, tightest hug ever 🤗", value: "a" },
      { label: "Just feeling incredibly happy and at peace 🌸", value: "b" },
      { label: "Non-stop talking because I have so much to tell you 🗣️", value: "c" },
    ],
  },
];

const results: Record<string, { title: string; subtitle: string; emoji: string; gradient: string; traits: string }> = {
  a: {
    title: "Solar Bond ☀️",
    subtitle: "Loyal • Radiant • Unbreakable",
    emoji: "☀️",
    gradient: "linear-gradient(135deg, hsl(45 90% 65%), hsl(20 80% 70%))",
    traits: "Our friendship is like sunlight — constant, warm, and life-giving. I shine because you shine with me.",
  },
  b: {
    title: "Lunar Soul 🌙",
    subtitle: "Deep • Eternal • Rare",
    emoji: "🌙",
    gradient: "linear-gradient(135deg, hsl(260 60% 70%), hsl(200 70% 75%))",
    traits: "Our friendship is like the moon — quiet but powerful, beautiful in the dark, and always there even when unseen.",
  },
  c: {
    title: "Cosmic Chaos ✨",
    subtitle: "Vibrant • Joyful • Once in a Lifetime",
    emoji: "✨",
    gradient: "linear-gradient(135deg, hsl(200 70% 70%), hsl(260 60% 75%))",
    traits: "Our friendship is like a shooting star — unpredictable, brilliant, and impossible to look away from.",
  },
  mix: {
    title: "Aurora Friendship 🌈",
    subtitle: "Complex • Beautiful • Timeless",
    emoji: "🌈",
    gradient: "linear-gradient(135deg, hsl(260 60% 70%), hsl(200 70% 75%), hsl(45 90% 65%))",
    traits: "Our friendship is like the northern lights — rare, multi-layered, and something most people never get to witness.",
  },
};

const getResult = (answers: string[]) => {
  const counts = answers.reduce((acc, a) => ({ ...acc, [a]: (acc[a] || 0) + 1 }), {} as Record<string, number>);
  const max = Math.max(...Object.values(counts));
  const winners = Object.entries(counts).filter(([, v]) => v === max).map(([k]) => k);
  if (winners.length > 1) return results.mix;
  return results[winners[0]] || results.mix;
};

const FriendshipAura = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<(typeof results)[string] | null>(null);

  const answer = (val: string) => {
    const next = [...answers, val];
    if (step < questions.length - 1) {
      setAnswers(next);
      setStep((s) => s + 1);
    } else {
      setAnswers(next);
      setResult(getResult(next));
    }
  };

  const reset = () => { setStep(0); setAnswers([]); setResult(null); };

  return (
    <section className="section-lavender py-20 px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-display text-center text-lavender mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Friendship Aura 🔮
      </motion.h2>
      <p className="text-center text-muted-foreground font-body mb-12">
        5 questions to reveal the unique energy of our friendship! Play and share the result with me 😊
      </p>

      <div className="max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-8">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                    style={{ background: i <= step ? "hsl(var(--lavender))" : "hsl(var(--muted))", transform: i === step ? "scale(1.4)" : "scale(1)" }}
                  />
                ))}
              </div>

              <div className="bg-card rounded-3xl p-8 glow-lavender">
                <p className="text-xs font-body text-muted-foreground mb-4">Question {step + 1} of {questions.length}</p>
                <h3 className="text-xl font-display text-lavender mb-8 leading-relaxed">{questions[step].q}</h3>

                <div className="flex flex-col gap-3">
                  {questions[step].options.map((opt) => (
                    <motion.button
                      key={opt.value}
                      className="w-full text-left rounded-2xl px-5 py-4 font-body text-sm font-medium border border-border bg-background hover:border-lavender transition-all"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => answer(opt.value)}
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="text-center"
            >
              <motion.div
                className="rounded-3xl p-10 shadow-2xl"
                style={{ background: result.gradient }}
                animate={{ boxShadow: ["0 0 30px rgba(255,255,255,0.2)", "0 0 60px rgba(255,255,255,0.35)", "0 0 30px rgba(255,255,255,0.2)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.span
                  className="text-6xl block mb-4"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {result.emoji}
                </motion.span>
                <h3 className="text-3xl font-display text-white mb-2">{result.title}</h3>
                <p className="text-white/90 font-body font-semibold mb-6">{result.subtitle}</p>
                <p className="text-white/80 font-body leading-relaxed text-sm">{result.traits}</p>
              </motion.div>

              <motion.button
                className="mt-8 px-6 py-3 rounded-full bg-card border border-border font-body font-semibold text-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={reset}
              >
                Try Again ↩
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FriendshipAura;
