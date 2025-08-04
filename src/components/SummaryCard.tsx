import React from 'react';
import { DollarSign, Calendar, Building, Sparkles } from 'lucide-react';

interface SummaryCardProps {
  totalAmount: number;
  totalServices: number;
  totalBuildings: number;
  dateRange: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  totalAmount,
  totalServices,
  totalBuildings,
  dateRange
}) => {
  return (
    <div className="glass-card rounded-xl p-6 sm:p-8 mb-4 sm:mb-6 border border-gray-700/50 animate-zoom-in">
      <h3 className="text-xl sm:text-2xl font-bold gradient-text-secondary mb-4 sm:mb-6 text-center sm:text-left animate-fade-in-down">Quick Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-primary/10 border border-primary-blue/20 hover:border-primary-blue/40 transition-all duration-300 hover:scale-105 animate-stagger" style={{ animationDelay: '0ms' }}>
          <div className="p-2 sm:p-3 bg-gradient-primary rounded-xl shadow-glow-blue transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-blue">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 group-hover:animate-bounce-gentle" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-text-light font-medium">Total Amount</p>
            <p className="text-lg sm:text-xl font-bold gradient-text">${totalAmount.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-success/10 border border-success-green/20 hover:border-success-green/40 transition-all duration-300 hover:scale-105 animate-stagger" style={{ animationDelay: '100ms' }}>
          <div className="p-2 sm:p-3 bg-gradient-success rounded-xl shadow-glow-green transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-green">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 group-hover:animate-pulse-soft" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-text-light font-medium">Services</p>
            <p className="text-lg sm:text-xl font-bold text-white">{totalServices}</p>
          </div>
        </div>
        
        <div className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-secondary/10 border border-primary-pink/20 hover:border-primary-pink/40 transition-all duration-300 hover:scale-105 animate-stagger" style={{ animationDelay: '200ms' }}>
          <div className="p-2 sm:p-3 bg-gradient-secondary rounded-xl shadow-glow-pink transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-pink">
            <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 group-hover:animate-wiggle" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-text-light font-medium">Buildings</p>
            <p className="text-lg sm:text-xl font-bold text-white">{totalBuildings}</p>
          </div>
        </div>
        
        <div className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-warning/10 border border-warning-yellow/20 hover:border-warning-yellow/40 transition-all duration-300 hover:scale-105 animate-stagger" style={{ animationDelay: '300ms' }}>
          <div className="p-2 sm:p-3 bg-gradient-warning rounded-xl shadow-glow-yellow transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-yellow">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 group-hover:animate-bounce-gentle" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-text-light font-medium">Period</p>
            <p className="text-xs sm:text-sm font-bold text-white">{dateRange}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard; 