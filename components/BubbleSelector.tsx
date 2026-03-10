
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface BubbleSelectorProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (option: any) => void;
  color: string;
}

const BubbleSelector: React.FC<BubbleSelectorProps> = ({ label, options, selected, onSelect, color }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <motion.button
        layout
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-6 py-3 border-2 border-[#2d2d2d] wobbly-pill wobbly-shadow-sm
          font-bold text-lg transition-colors z-20 relative
          ${color}
        `}
      >
        <span>{label}: <span className="underline">{selected}</span></span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-full left-0 w-64 bg-white border-2 border-[#2d2d2d] p-4 rounded-xl wobbly-shadow z-10 custom-scrollbar max-h-64 overflow-y-auto"
          >
            <div className="flex flex-wrap gap-2">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onSelect(opt);
                    setIsOpen(false);
                  }}
                  className={`
                    px-3 py-1 border border-[#2d2d2d] wobbly-pill text-sm font-medium
                    transition-all hover:bg-[#e5e0d8]
                    ${selected === opt ? 'bg-[#ff4d4d] text-white' : 'bg-white'}
                  `}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BubbleSelector;
