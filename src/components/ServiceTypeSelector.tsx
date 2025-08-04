import React from 'react';
import { Sparkles, Wrench } from 'lucide-react';
import { ServiceType } from '../types';

interface ServiceTypeSelectorProps {
  selectedType: ServiceType;
  onTypeChange: (type: ServiceType) => void;
}

const ServiceTypeSelector: React.FC<ServiceTypeSelectorProps> = ({ 
  selectedType, 
  onTypeChange 
}) => {
  const serviceTypes = [
    { type: 'normal' as ServiceType, label: 'Normal Clean', icon: Sparkles },
    { type: 'deep' as ServiceType, label: 'Deep Clean', icon: Sparkles },
    { type: 'minor' as ServiceType, label: 'Minor Task', icon: Wrench },
  ];

  return (
    <div className="bg-dark-card rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serviceTypes.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedType === type
                ? 'border-primary-blue bg-primary-blue/10 text-primary-blue'
                : 'border-gray-600 bg-dark-input text-gray-300 hover:border-gray-500 hover:text-white'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceTypeSelector; 