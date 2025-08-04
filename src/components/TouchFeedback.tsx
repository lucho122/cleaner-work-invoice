import React, { useState, useEffect } from 'react';
import { Check, X, AlertCircle, Info, Star } from 'lucide-react';

interface TouchFeedbackProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const TouchFeedback: React.FC<TouchFeedbackProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 4000
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5" />;
      case 'error':
        return <X className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-success border-success-green/30 shadow-glow-green';
      case 'error':
        return 'bg-gradient-danger border-danger-red/30 shadow-glow-red';
      case 'warning':
        return 'bg-gradient-warning border-warning-yellow/30 shadow-glow-yellow';
      case 'info':
        return 'bg-gradient-primary border-primary-blue/30 shadow-glow-blue';
      default:
        return 'bg-gradient-primary border-primary-blue/30 shadow-glow-blue';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 lg:hidden">
      <div
        className={`${getStyles()} p-4 rounded-xl border backdrop-blur-sm animate-fade-in-up ${
          isAnimating ? 'animate-bounce-gentle' : ''
        }`}
        style={{
          minHeight: '60px',
          touchAction: 'manipulation'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1">
            <p className="text-white font-medium text-base leading-tight">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 text-white/70 hover:text-white transition-colors duration-200"
            style={{ minHeight: '32px', minWidth: '32px' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TouchFeedback; 