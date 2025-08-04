import React from 'react';
import { Plus, FileText, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  onAddDate: () => void;
  onAddCheckin: () => void;
  onGenerateInvoice: () => void;
  onResetForm: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAddDate,
  onAddCheckin,
  onGenerateInvoice,
  onResetForm
}) => {
  return (
    <div className="bg-dark-card rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={onAddDate}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Date
        </button>

        <button
          onClick={onAddCheckin}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Check-in
        </button>

        

        <button
          onClick={onGenerateInvoice}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-success-green text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          <FileText className="w-5 h-5" />
          Generate Invoice
        </button>

        <button
          onClick={onResetForm}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-danger-red text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          <RotateCcw className="w-5 h-5" />
          Reset Form
        </button>
      </div>
    </div>
  );
};

export default ActionButtons; 