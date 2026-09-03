import { motion } from 'framer-motion';

const SUGGESTIONS = [
  { label: "Today's trades", question: "Show today's trades" },
  { label: "Risky trades", question: "Any risky trades?" },
  { label: "Explain last trade", question: "Explain last trade" },
  { label: "Portfolio", question: "What's my portfolio value?" },
  { label: "Risk analysis", question: "What is my risk exposure right now?" },
];

const SuggestedQuestions = ({ onSelect }) => {
  return (
    <div
      role="group"
      aria-label="Suggested questions"
      className="flex gap-2 overflow-x-auto border-t border-base-border bg-base-light/50 px-4 py-2.5"
    >
      {SUGGESTIONS.map((s, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelect(s.question)}
          className="whitespace-nowrap rounded-pill border border-base-border bg-base px-3 py-1.5 text-micro text-text-secondary transition-colors duration-150 hover:border-accent/30 hover:bg-accent-muted hover:text-accent"
        >
          {s.label}
        </motion.button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;
