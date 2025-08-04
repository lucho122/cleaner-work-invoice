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
    <div className="bg-dark-card rounded-lg border border-gray-700 overflow-hidden">
      <div 
        className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
          collapsible ? 'hover:bg-dark-input' : ''
        }`}
        onClick={collapsible ? onToggle : undefined}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">
            {title}
            {required && <span className="text-danger-red ml-1">*</span>}
          </h3>
        </div>
        {collapsible && (
          <div className="text-gray-400">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </div>
        )}
      </div>
      {(!collapsible || isExpanded) && (
        <div className="p-4 pt-0">
          {children}
        </div>
      )}
    </div>
  );
};

export default FormSection; 