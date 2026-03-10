
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { CuriosityTopic } from '../types';
import WobblyButton from './WobblyButton';

interface TopicCardProps {
  topic: CuriosityTopic;
  onGenerateAI: () => void;
  isLoadingAI: boolean;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onGenerateAI, isLoadingAI }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0, rotate: -2 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      className="max-w-2xl w-full bg-white border-2 border-[#2d2d2d] p-8 wobbly-shadow relative overflow-hidden"
    >
      <div className="absolute top-2 right-4 text-[#2d5da1] opacity-20 rotate-12">
        <Sparkles size={120} />
      </div>

      <div className="relative z-10">
        <span className="inline-block px-3 py-1 bg-[#e5e0d8] border border-[#2d2d2d] wobbly-pill text-sm font-bold mb-4">
          {topic.category}
        </span>

        <h2 className="text-4xl font-bold mb-6 leading-tight">
          {topic.question}
        </h2>

        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Lightbulb className="text-[#ff4d4d]" size={20} />
              Exploration Prompts
            </h3>
            <ul className="space-y-2">
              {topic.prompts.map((p, i) => (
                <li key={i} className="flex gap-2 items-start text-lg italic">
                  <span className="mt-1 text-[#2d5da1]">-</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-[#fdfbf7] border-2 border-dotted border-[#2d2d2d] wobbly-border">
            <h4 className="font-bold mb-1">Suggested Direction:</h4>
            <p className="opacity-80">{topic.direction}</p>
          </div>

          {topic.activity && (
            <div className="p-4 bg-[#ff4d4d]/10 border-2 border-[#ff4d4d] wobbly-border">
              <h4 className="font-bold text-[#ff4d4d] mb-1">Mini Activity:</h4>
              <p>{topic.activity}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center pt-4 border-t-2 border-dotted border-[#2d2d2d]">
          <p className="text-sm italic opacity-60">Want more ideas from the machine?</p>
          <WobblyButton 
            onClick={onGenerateAI} 
            variant="secondary" 
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            {isLoadingAI ? 'Consulting Brain...' : 'Generate AI Prompts'}
            <ArrowRight size={18} />
          </WobblyButton>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicCard;
