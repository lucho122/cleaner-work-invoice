import React, { useState } from 'react';
import { Calendar, Plus, X, Sparkles, Edit2, Check, AlertCircle, DollarSign, Clock } from 'lucide-react';
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
    return sum + service.amount + extraTimeCost + service.itemsCost;
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
    <div className="glass-card rounded-xl border border-gray-700/50 overflow-hidden mb-6 animate-fade-in-up hover:shadow-card-hover transition-all duration-300">
      {/* Date Header */}
      <div className="bg-gradient-glass px-6 py-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-glow-blue">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              {isEditingDate ? (
                <div className="flex items-center gap-2 animate-fade-in-up">
                  <input
                    type="date"
                    value={editedDate}
                    onChange={(e) => {
                      setEditedDate(e.target.value);
                      setDateError(validateDate(e.target.value));
                    }}
                    min={startDate}
                    max={endDate}
                    className="px-3 py-2 bg-dark-input border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-300 hover:border-primary-blue/50 focus:scale-[1.02] input-focus"
                  />
                  <button
                    onClick={handleDateSave}
                    className="group p-2 text-success-green hover:text-white bg-success-green/10 hover:bg-success-green/20 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                    title="Save date"
                  >
                    <Check className="w-4 h-4 transition-transform duration-300 group-hover:animate-bounce-gentle" />
                  </button>
                  <button
                    onClick={handleDateCancel}
                    className="group p-2 text-gray-400 hover:text-white bg-gray-400/10 hover:bg-gray-400/20 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                    title="Cancel edit"
                  >
                    <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white transition-colors duration-300 hover:text-text-light">
                    {formatDate(date)}
                  </h3>
                  <button
                    onClick={() => setIsEditingDate(true)}
                    className="group p-1 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                    title="Edit date"
                  >
                    <Edit2 className="w-4 h-4 transition-transform duration-300 group-hover:animate-wiggle" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span>{services.length} service{services.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span className="font-semibold text-white">${totalForDate.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddService(date)}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white rounded-lg transition-all duration-300 hover:shadow-glow-blue hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
              <span className="hidden sm:inline">Add Service</span>
              <span className="sm:hidden">Add</span>
            </button>
            <button
              onClick={() => onRemoveDate(date)}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-danger text-white rounded-lg transition-all duration-300 hover:shadow-glow-red hover:scale-105 active:scale-95"
            >
              <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
              <span className="hidden sm:inline">Remove Date</span>
              <span className="sm:hidden">Remove</span>
            </button>
          </div>
        </div>
        
        {/* Date Error Message */}
        {dateError && (
          <div className="flex items-center gap-2 mt-3 p-3 bg-danger-red/10 border border-danger-red/30 rounded-lg animate-shake">
            <AlertCircle className="w-4 h-4 text-danger-red animate-pulse-soft" />
            <span className="text-sm text-danger-red">{dateError}</span>
          </div>
        )}
      </div>

      {/* Services for this date */}
      <div className="p-6 space-y-4">
        {services.map((service, index) => (
          <div key={service.id} className="relative animate-stagger" style={{ animationDelay: `${index * 50}ms` }}>
            <CleaningServiceForm
              service={service}
              onServiceChange={(updatedService) => onServiceChange(service.id, updatedService)}
              onRemove={() => onRemoveService(service.id)}
            />
          </div>
        ))}
        
        {services.length === 0 && (
          <div className="text-center py-12 text-gray-400 animate-fade-in-up">
            <div className="p-4 bg-gradient-glass rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-8 h-8 opacity-50 animate-pulse-soft" />
            </div>
            <p className="text-lg font-medium mb-2">No services added for this date yet.</p>
            <p className="text-sm">Click "Add Service" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateServiceGroup; 