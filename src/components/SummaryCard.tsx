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
    <div className="bg-dark-card rounded-lg p-6 mb-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Summary</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-blue/20 rounded-lg">
            <DollarSign className="w-5 h-5 text-primary-blue" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Amount</p>
            <p className="text-lg font-bold text-white">${totalAmount.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-success-green/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-success-green" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Services</p>
            <p className="text-lg font-bold text-white">{totalServices}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-pink/20 rounded-lg">
            <Building className="w-5 h-5 text-primary-pink" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Buildings</p>
            <p className="text-lg font-bold text-white">{totalBuildings}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Calendar className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Period</p>
            <p className="text-sm font-bold text-white">{dateRange}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard; 