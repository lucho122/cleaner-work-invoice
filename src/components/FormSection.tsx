import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
  collapsible?: boolean;
  required?: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  isExpanded = true,
  onToggle,
  collapsible = false,
  required = false
}) => {
  return (
    <div className="glass-card rounded-xl border border-gray-700/50 overflow-hidden mb-4 sm:mb-6 animate-slide-up hover:shadow-card-hover transition-all duration-300">
      <div 
        className={`flex items-center justify-between p-4 sm:p-6 cursor-pointer transition-all duration-300 ${
          collapsible ? 'hover:bg-gradient-glass' : ''
        }`}
        onClick={collapsible ? onToggle : undefined}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <h3 className="text-lg sm:text-xl font-semibold text-white transition-colors duration-300 hover:text-text-light">
            {title}
            {required && <span className="text-danger-red ml-1 sm:ml-2 text-xl sm:text-2xl animate-pulse-soft">*</span>}
          </h3>
        </div>
        {collapsible && (
          <div className="text-gray-400 transition-all duration-300 hover:scale-110 hover:text-white">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" />
            ) : (
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" />
            )}
          </div>
        )}
      </div>
      {(!collapsible || isExpanded) && (
        <div className="p-4 sm:p-6 pt-0 animate-fade-in-up">
          {children}
        </div>
      )}
    </div>
  );
};

export default FormSection; 