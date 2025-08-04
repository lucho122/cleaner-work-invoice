import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, Plus, FileText, RotateCcw, X } from 'lucide-react';

interface MobileNavigationProps {
  onAddDate: () => void;
  onGenerateInvoice: () => void;
  onResetForm: () => void;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  onAddDate,
  onGenerateInvoice,
  onResetForm,
  currentSection,
  onSectionChange
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const sections = [
    { id: 'cleaner', label: 'Cleaner', icon: Home },
    { id: 'services', label: 'Services', icon: Plus },
    { id: 'checkin', label: 'Check-in', icon: FileText },
    { id: 'summary', label: 'Summary', icon: FileText }
  ];

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;

        // Only handle horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            setSwipeDirection('right');
          } else {
            setSwipeDirection('left');
          }
        }
      };

      const handleTouchEnd = () => {
        if (swipeDirection === 'left') {
          // Swipe left - next section
          const currentIndex = sections.findIndex(s => s.id === currentSection);
          if (currentIndex < sections.length - 1) {
            onSectionChange(sections[currentIndex + 1].id);
          }
        } else if (swipeDirection === 'right') {
          // Swipe right - previous section
          const currentIndex = sections.findIndex(s => s.id === currentSection);
          if (currentIndex > 0) {
            onSectionChange(sections[currentIndex - 1].id);
          }
        }
        setSwipeDirection(null);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchstart', handleTouchStart);
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, [currentSection, swipeDirection, onSectionChange]);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-6 z-40 lg:hidden">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="p-4 bg-gradient-primary text-white rounded-full shadow-glow-blue hover:shadow-glow-purple transition-all duration-300 hover:scale-110"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Quick Actions Menu */}
      {isVisible && (
        <div className="fixed bottom-20 left-6 z-40 lg:hidden animate-fade-in-up">
          <div className="space-y-3">
            <button
              onClick={() => {
                onAddDate();
                setIsVisible(false);
              }}
              className="p-3 bg-gradient-primary text-white rounded-full shadow-glow-blue hover:shadow-glow-purple transition-all duration-300 hover:scale-110"
              title="Add New Date"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                onGenerateInvoice();
                setIsVisible(false);
              }}
              className="p-3 bg-gradient-success text-white rounded-full shadow-glow-green hover:shadow-glow-green transition-all duration-300 hover:scale-110"
              title="Generate Invoice"
            >
              <FileText className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                onResetForm();
                setIsVisible(false);
              }}
              className="p-3 bg-gradient-danger text-white rounded-full shadow-glow-red hover:shadow-glow-red transition-all duration-300 hover:scale-110"
              title="Reset Form"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Section Navigation */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <div className="flex items-center gap-2 bg-dark-card/95 backdrop-blur-sm rounded-full p-2 border border-gray-700/50">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = currentSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-primary text-white shadow-glow-blue'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                title={section.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Swipe Indicator */}
      {swipeDirection && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 lg:hidden">
          <div className={`p-4 bg-dark-card/95 backdrop-blur-sm rounded-lg border border-gray-700/50 animate-fade-in-up ${
            swipeDirection === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'
          }`}>
            <div className="flex items-center gap-2 text-white">
              {swipeDirection === 'left' ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">
                {swipeDirection === 'left' ? 'Next' : 'Previous'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavigation; 