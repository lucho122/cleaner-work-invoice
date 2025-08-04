import React from 'react';
import { Sparkles } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center mb-6 sm:mb-8 animate-fade-in-up">
      <div className="group flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-ocean rounded-full mb-3 sm:mb-4 shadow-glow-blue hover:shadow-glow-purple transition-all duration-500 hover:scale-110 animate-pulse-soft cursor-pointer">
        <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse-slow transition-transform duration-300 group-hover:animate-bounce-gentle group-hover:scale-110" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-1 sm:mb-2 text-center transition-all duration-300 hover:scale-105">SPARKLE PRO CLEANING</h1>
      <p className="text-base sm:text-lg font-medium text-text-light mb-1 text-center transition-colors duration-300 hover:text-white">PROFESSIONAL CLEANING SERVICES</p>
      <p className="text-xs sm:text-sm gradient-text-secondary font-medium text-center transition-all duration-300 hover:scale-105">Premium Quality • Reliable Service</p>
    </div>
  );
};

export default Logo; 