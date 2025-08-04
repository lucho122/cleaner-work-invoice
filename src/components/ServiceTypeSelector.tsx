import React from 'react';
import { Sparkles, Wrench, Info } from 'lucide-react';
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
    {
      id: 'normal' as ServiceType,
      name: 'Normal Clean',
      description: 'Standard cleaning service for regular maintenance',
      icon: Sparkles,
      gradient: 'from-purple-500 to-blue-500',
      borderGradient: 'from-purple-400 to-blue-400'
    },
    {
      id: 'deep' as ServiceType,
      name: 'Deep Clean',
      description: 'Thorough cleaning service with detailed attention',
      icon: Sparkles,
      gradient: 'from-green-500 to-teal-500',
      borderGradient: 'from-green-400 to-teal-400'
    },
    {
      id: 'minor' as ServiceType,
      name: 'Minor Task',
      description: 'Quick tasks or specific cleaning requests',
      icon: Wrench,
      gradient: 'from-orange-500 to-red-500',
      borderGradient: 'from-orange-400 to-red-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Service Type Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serviceTypes.map((serviceType, index) => {
          const IconComponent = serviceType.icon;
          const isSelected = selectedType === serviceType.id;
          
          return (
            <button
              key={serviceType.id}
              onClick={() => onTypeChange(serviceType.id)}
              className={`group relative p-6 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 animate-stagger ${
                isSelected
                  ? `bg-gradient-to-r ${serviceType.gradient} text-white shadow-glow-blue hover:shadow-glow-purple`
                  : 'bg-dark-card text-text-light border border-gray-600 hover:border-gray-500'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              title={serviceType.description}
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`p-3 rounded-lg transition-all duration-300 ${
                  isSelected 
                    ? 'bg-white/20' 
                    : 'bg-dark-input group-hover:bg-gray-600/50'
                }`}>
                  <IconComponent className={`w-6 h-6 transition-all duration-300 ${
                    isSelected 
                      ? 'text-white animate-bounce-gentle' 
                      : 'group-hover:scale-110 group-hover:animate-wiggle'
                  }`} />
                </div>
                <div className="text-center">
                  <h3 className={`font-semibold transition-colors duration-300 ${
                    isSelected ? 'text-white' : 'group-hover:text-white'
                  }`}>
                    {serviceType.name}
                  </h3>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    isSelected ? 'text-white/80' : 'text-text-light group-hover:text-white/80'
                  }`}>
                    {serviceType.description}
                  </p>
                </div>
              </div>
              
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full animate-pulse-soft"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Service Type Guide */}
      <div className="glass-card rounded-xl p-4 border border-gray-700/50 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-info rounded-lg">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-white font-medium">Service Type Guide</h4>
            <p className="text-sm text-text-light">Choose the appropriate service type for your cleaning needs</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              <span className="text-white font-medium">Normal Clean</span>
            </div>
            <p className="text-text-light ml-5">
              Standard cleaning service for regular maintenance. Includes basic cleaning tasks like dusting, vacuuming, and surface cleaning.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
              <span className="text-white font-medium">Deep Clean</span>
            </div>
            <p className="text-text-light ml-5">
              Thorough cleaning service with detailed attention. Includes deep cleaning tasks, detailed dusting, and comprehensive surface treatment.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              <span className="text-white font-medium">Minor Task</span>
            </div>
            <p className="text-text-light ml-5">
              Quick tasks or specific cleaning requests. For small jobs, touch-ups, or specialized cleaning tasks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTypeSelector; 