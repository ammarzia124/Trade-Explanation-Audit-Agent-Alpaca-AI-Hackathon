import { motion } from 'framer-motion';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start" role="status" aria-label="AI is typing">
      <div className="rounded-card border border-base-border bg-base-light px-4 py-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-accent"
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
