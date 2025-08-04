import React from 'react';
import { Calendar } from 'lucide-react';
import { Cleaner } from '../types';

interface CleanerInfoProps {
  cleaner: Cleaner;
  onCleanerChange: (cleaner: Cleaner) => void;
}

const CleanerInfo: React.FC<CleanerInfoProps> = ({ cleaner, onCleanerChange }) => {
  const handleChange = (field: keyof Cleaner, value: string) => {
    onCleanerChange({
      ...cleaner,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Cleaner Name *
          </label>
          <input
            type="text"
            value={cleaner.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter cleaner name"
            className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Start Date *
          </label>
          <div className="relative">
            <input
              type="date"
              value={cleaner.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent pr-10"
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            End Date *
          </label>
          <div className="relative">
            <input
              type="date"
              value={cleaner.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent pr-10"
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanerInfo; 