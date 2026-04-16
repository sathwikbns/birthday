import { motion } from "framer-motion";

interface Props {
  dark: boolean;
  onToggle: () => void;
}

const DarkModeToggle = ({ dark, onToggle }: Props) => (
  <motion.button
    className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-xl shadow-lg"
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.9 }}
    onClick={onToggle}
    title={dark ? "Light mode" : "Dark mode"}
    style={{ backdropFilter: "blur(8px)" }}
  >
    <motion.span
      key={dark ? "sun" : "moon"}
      initial={{ rotate: -30, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {dark ? "☀️" : "🌙"}
    </motion.span>
  </motion.button>
);

export default DarkModeToggle;
