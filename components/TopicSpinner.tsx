
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import WobblyButton from './WobblyButton';
import { CATEGORIES } from '../constants';

interface TopicSpinnerProps {
  isSpinning: boolean;
  onSpin: () => void;
}

const TopicSpinner: React.FC<TopicSpinnerProps> = ({ isSpinning, onSpin }) => {
  const [displayItem, setDisplayItem] = useState(CATEGORIES[0]);

  useEffect(() => {
    let interval: any;
    if (isSpinning) {
      interval = setInterval(() => {
        setDisplayItem(CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isSpinning]);

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <div className="relative w-64 h-64 flex items-center justify-center">
        <AnimatePresence mode='wait'>
          {isSpinning ? (
            <motion.div
              key="spinning"
              initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
              animate={{ 
                rotate: [0, 10, -10, 0], 
                scale: 1, 
                opacity: 1,
                transition: { repeat: Infinity, duration: 0.4 }
              }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="absolute inset-0 bg-[#e5e0d8] wobbly-border flex items-center justify-center p-4 text-center shadow-xl"
            >
              <p className="text-xl font-bold italic">"{displayItem}..."</p>
            </motion.div>
          ) : (
            <motion.div
              key="static"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 border-4 border-dashed border-[#2d2d2d] rounded-full flex items-center justify-center"
            >
              <div className="text-muted-foreground opacity-30 text-center px-4">
                READY TO<br/>EXPLORE?
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={isSpinning ? { rotate: 360 } : {}}
          transition={{ repeat: isSpinning ? Infinity : 0, duration: 2, ease: "linear" }}
          className="z-10"
        >
          <WobblyButton 
            onClick={onSpin} 
            variant="accent" 
            className="w-32 h-32 rounded-full flex items-center justify-center p-0"
          >
            <div className="flex flex-col items-center">
              <RefreshCw className={isSpinning ? 'animate-spin' : ''} size={32} />
              <span className="text-xs mt-1">SPIN!</span>
            </div>
          </WobblyButton>
        </motion.div>
      </div>
    </div>
  );
};

export default TopicSpinner;
