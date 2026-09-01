import React from 'react';
import { motion } from 'framer-motion';
import { suggestedQuestions } from '../../data/mockData';

const SuggestedQuestions = ({ onSelect }) => {
  return (
    <div className="flex gap-2 px-4 py-2.5 border-t border-[#30363D]/50 bg-[#161B22]/50 overflow-x-auto">
      {suggestedQuestions.map((s, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelect(s.question)}
          className="text-xs bg-[#0D1117] hover:bg-[#30363D] text-[#8B949E] hover:text-white px-3 py-1.5 rounded-full transition-all duration-200 border border-[#30363D] hover:border-gray-500/50 whitespace-nowrap"
        >
          {s.label}
        </motion.button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;