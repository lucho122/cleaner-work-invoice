import React, { useState } from 'react';
import { Calendar, Plus, X, Sparkles, Edit2, Check, AlertCircle } from 'lucide-react';
import { CleaningService, ServiceType } from '../types';
import CleaningServiceForm from './CleaningServiceForm';

interface DateServiceGroupProps {
  date: string;
  services: CleaningService[];
  onServiceChange: (serviceId: string, updatedService: CleaningService) => void;
  onRemoveService: (serviceId: string) => void;
  onAddService: (date: string) => void;
  onRemoveDate: (date: string) => void;
  onUpdateDate: (oldDate: string, newDate: string) => void;
  selectedServiceType: ServiceType;
  startDate: string;
  endDate: string;
}

const DateServiceGroup: React.FC<DateServiceGroupProps> = ({
  date,
  services,
  onServiceChange,
  onRemoveService,
  onAddService,
  onRemoveDate,
  onUpdateDate,
  selectedServiceType,
  startDate,
  endDate
}) => {
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [editedDate, setEditedDate] = useState(date);
  const [dateError, setDateError] = useState('');

  const formatDate = (dateString: string) => {
    // Parse the date string properly to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateExtraTimeCost = (extraTime: string) => {
    if (extraTime === 'No extra time') return 0;
    
    const timeMap: { [key: string]: number } = {
      '30 minutes': 30,
      '1 hour': 60,
      '1.5 hours': 90,
      '2 hours': 120
    };
    
    const minutes = timeMap[extraTime] || 0;
    const quarterHours = Math.ceil(minutes / 15);
    return quarterHours * 4.5;
  };

  const totalForDate = services.reduce((sum, service) => {
    const extraTimeCost = calculateExtraTimeCost(service.extraTime);
    return sum + service.serviceAmount + extraTimeCost + service.itemsCost;
  }, 0);

  const validateDate = (newDate: string) => {
    // Parse dates properly to avoid timezone issues
    const parseDate = (dateString: string) => {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    };
    
    const dateObj = parseDate(newDate);
    const startObj = parseDate(startDate);
    const endObj = parseDate(endDate);

    if (dateObj < startObj) {
      return 'Date cannot be before the start date';
    }
    if (dateObj > endObj) {
      return 'Date cannot be after the end date';
    }
    return '';
  };

  const handleDateSave = () => {
    const error = validateDate(editedDate);
    if (error) {
      setDateError(error);
      return;
    }

    if (editedDate !== date) {
      onUpdateDate(date, editedDate);
    }
    setIsEditingDate(false);
    setDateError('');
  };

  const handleDateCancel = () => {
    setEditedDate(date);
    setIsEditingDate(false);
    setDateError('');
  };

  return (
    <div className="bg-dark-card rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Date Header */}
      <div className="bg-dark-input px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary-blue" />
            <div className="flex items-center gap-2">
              {isEditingDate ? (
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={editedDate}
                    onChange={(e) => {
                      setEditedDate(e.target.value);
                      setDateError(validateDate(e.target.value));
                    }}
                    min={startDate}
                    max={endDate}
                    className="px-2 py-1 bg-dark-input border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <button
                    onClick={handleDateSave}
                    className="p-1 text-success-green hover:text-green-400 transition-colors"
                    title="Save date"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDateCancel}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Cancel edit"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">
                    {formatDate(date)}
                  </h3>
                  <button
                    onClick={() => setIsEditingDate(true)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Edit date"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-400">
              {services.length} service{services.length !== 1 ? 's' : ''} • Total: ${totalForDate.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddService(date)}
              className="flex items-center gap-2 px-3 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </button>
            <button
              onClick={() => onRemoveDate(date)}
              className="flex items-center gap-2 px-3 py-2 bg-danger-red text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              <X className="w-4 h-4" />
              Remove Date
            </button>
          </div>
        </div>
        
        {/* Date Error Message */}
        {dateError && (
          <div className="flex items-center gap-2 mt-2 p-2 bg-red-900/20 border border-red-500/30 rounded">
            <AlertCircle className="w-4 h-4 text-danger-red" />
            <span className="text-sm text-danger-red">{dateError}</span>
          </div>
        )}
      </div>

      {/* Services for this date */}
      <div className="p-6 space-y-4">
        {services.map((service) => (
          <div key={service.id} className="relative">
            <CleaningServiceForm
              service={service}
              onServiceChange={(updatedService) => onServiceChange(service.id, updatedService)}
              onRemove={() => onRemoveService(service.id)}
            />
          </div>
        ))}
        
        {services.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No services added for this date yet.</p>
            <p className="text-sm">Click "Add Service" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateServiceGroup; 