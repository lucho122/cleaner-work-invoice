import React from 'react';
import { FileText, DollarSign, Calendar, User } from 'lucide-react';
import { InvoiceData } from '../types';

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
  onClose: () => void;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoiceData, onClose }) => {
  const { cleaner, services, checkinServices, totalAmount } = invoiceData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-card rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary-blue" />
            <h2 className="text-xl font-bold text-white">Invoice Preview</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Cleaner Information */}
        <div className="bg-dark-input rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-primary-blue" />
            <h3 className="text-lg font-semibold text-white">Cleaner Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-white font-medium">{cleaner.name || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Period</p>
              <p className="text-white font-medium">
                {cleaner.startDate} - {cleaner.endDate}
              </p>
            </div>
          </div>
        </div>

        {/* Cleaning Services Summary */}
        {services.length > 0 && (
          <div className="bg-dark-input rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-primary-blue" />
              <h3 className="text-lg font-semibold text-white">Cleaning Services ({services.length})</h3>
            </div>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={service.id} className="border-b border-gray-600 pb-3 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-white font-medium">
                        {service.type.charAt(0).toUpperCase() + service.type.slice(1)} Cleaning
                      </p>
                                             <p className="text-gray-400 text-sm">
                         {service.date} - {service.building || 'No building selected'}
                         {service.unit && ` - Unit ${service.unit}`}
                       </p>
                      {service.extrasDescription && (
                        <p className="text-gray-400 text-sm mt-1">
                          Extras: {service.extrasDescription}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">
                        ${service.serviceAmount.toFixed(2)}
                      </p>
                      {service.itemsCost > 0 && (
                        <p className="text-gray-400 text-sm">
                          Items: ${service.itemsCost.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Check-in Services Summary */}
        {checkinServices.length > 0 && (
          <div className="bg-dark-input rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-primary-blue" />
              <h3 className="text-lg font-semibold text-white">Check-in Services ({checkinServices.length})</h3>
            </div>
            <div className="space-y-3">
              {checkinServices.map((service, index) => (
                <div key={service.id} className="border-b border-gray-600 pb-3 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-white font-medium">
                        Check-in Service
                      </p>
                      <p className="text-gray-400 text-sm">
                        {service.date} - {service.building || 'No building selected'}
                        {service.unit && ` - Unit ${service.unit}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">
                        ${service.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="bg-primary-blue bg-opacity-10 rounded-lg p-4 border border-primary-blue">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-primary-blue" />
              <span className="text-lg font-bold text-white">Total Amount</span>
            </div>
            <span className="text-2xl font-bold text-primary-blue">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              // Here you would implement actual PDF generation
              alert('PDF generation would be implemented here');
            }}
            className="flex-1 px-4 py-2 bg-success-green text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview; 