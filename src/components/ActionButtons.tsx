import React from 'react';
import { FileText, RotateCcw, Info } from 'lucide-react';

interface ActionButtonsProps {
  onGenerateInvoice: () => void;
  onResetForm: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onGenerateInvoice,
  onResetForm
}) => {
  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up">

        <button
          onClick={onGenerateInvoice}
          className="group relative bg-gradient-success text-white py-4 px-6 rounded-xl font-semibold hover-lift shadow-glow-green hover:shadow-glow-green transition-all duration-300 hover:scale-105 active:scale-95"
          title="Generate invoice with all services and check-ins"
        >
          <div className="flex items-center justify-center gap-3">
            <FileText className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            <span className="hidden sm:inline">Generate Invoice</span>
            <span className="sm:hidden">Invoice</span>
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-dark-card text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Generate invoice with all services and check-ins</span>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-card"></div>
          </div>
        </button>

        <button
          onClick={onResetForm}
          className="group relative bg-gradient-danger text-white py-4 px-6 rounded-xl font-semibold hover-lift shadow-glow-red hover:shadow-glow-red transition-all duration-300 hover:scale-105 active:scale-95"
          title="Clear all data and start over"
        >
          <div className="flex items-center justify-center gap-3">
            <RotateCcw className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
            <span className="hidden sm:inline">Reset Form</span>
            <span className="sm:hidden">Reset</span>
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-dark-card text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Clear all data and start over</span>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-card"></div>
          </div>
        </button>
      </div>

      {/* Help Section */}
      <div className="glass-card rounded-xl p-4 border border-gray-700/50 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-info rounded-lg">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-white font-medium">Quick Actions Guide</h4>
            <p className="text-sm text-text-light">Learn what each button does</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-success rounded-full"></div>
              <span className="text-white font-medium">Generate Invoice</span>
            </div>
            <p className="text-text-light ml-5">
              Creates a professional invoice with all your services, check-ins, and calculated totals.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-danger rounded-full"></div>
              <span className="text-white font-medium">Reset Form</span>
            </div>
            <p className="text-text-light ml-5">
              Clears all entered data and returns to the initial state. Use with caution!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons; 