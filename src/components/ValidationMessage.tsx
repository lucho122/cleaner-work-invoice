import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ValidationMessageProps {
  type: 'error' | 'success' | 'warning';
  message: string;
  show?: boolean;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({ 
  type, 
  message, 
  show = true 
}) => {
  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-danger-red" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success-green" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'error':
        return 'text-danger-red bg-red-900/20 border-red-500/30';
      case 'success':
        return 'text-success-green bg-green-900/20 border-green-500/30';
      case 'warning':
        return 'text-yellow-500 bg-yellow-900/20 border-yellow-500/30';
      default:
        return '';
    }
  };

  return (
    <div className={`flex items-center gap-2 p-3 rounded-lg border ${getStyles()}`}>
      {getIcon()}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default ValidationMessage; 