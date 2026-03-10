
import React from 'react';
import { motion } from 'framer-motion';
import { AIPromptResponse } from '../types';

interface AIResultListProps {
  data: AIPromptResponse;
}

const AIResultList: React.FC<AIResultListProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full max-w-5xl">
      {data.curiosityQuestions.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9, rotate: Math.random() * 4 - 2 }}
          animate={{ opacity: 1, scale: 1, rotate: Math.random() * 4 - 2 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-[#fdfbf7] border-2 border-[#2d2d2d] p-6 wobbly-shadow-sm hover:rotate-0 transition-transform"
        >
          <h4 className="text-xl font-bold mb-3 text-[#ff4d4d]">
            {item.question}
          </h4>
          <p className="text-sm opacity-80 mb-4 font-medium leading-relaxed">
            {item.explanation}
          </p>
          <div className="bg-white border border-[#2d2d2d] p-3 wobbly-pill text-sm italic border-dashed">
            <span className="font-bold block mb-1">Try this:</span>
            {item.explorationPrompt}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AIResultList;
