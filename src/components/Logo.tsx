import React from 'react';
import { Sparkles } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center justify-center w-16 h-16 bg-primary-blue rounded-full mb-2">
        <Sparkles className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-white mb-1">CLEAN MY BNB</h1>
      <p className="text-lg font-medium text-text-gray">EAST INVOICING PLATFORM</p>
      <p className="text-sm text-text-gray">New Cleaners</p>
    </div>
  );
};

export default Logo; 