
import React from 'react';
import { motion } from 'framer-motion';

interface WobblyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'muted';
  type?: 'button' | 'submit';
}

const WobblyButton: React.FC<WobblyButtonProps> = ({ 
  children, 
  onClick, 
  className = "", 
  variant = 'primary',
  type = 'button'
}) => {
  const bgColor = {
    primary: 'bg-white',
    secondary: 'bg-[#2d5da1] text-white',
    accent: 'bg-[#ff4d4d] text-white',
    muted: 'bg-[#e5e0d8]'
  }[variant];

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95, rotate: -1, boxShadow: '1px 1px 0px 0px #2d2d2d' }}
      onClick={onClick}
      className={`
        relative px-6 py-2 border-2 border-[#2d2d2d] transition-colors
        wobbly-pill wobbly-shadow font-bold text-lg
        ${bgColor} ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default WobblyButton;
