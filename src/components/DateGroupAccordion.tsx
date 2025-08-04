import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Edit3, Trash2, Plus, Sparkles, Package } from 'lucide-react';
import { DateGroup, CleaningService, CheckinService } from '../types';
import CleaningServiceForm from './CleaningServiceForm';
import CheckinServiceForm from './CheckinServiceForm';

interface DateGroupAccordionProps {
  dateGroup: DateGroup;
  onDateChange: (groupId: string, newDate: string) => void;
  onAddCleaningService: (groupId: string) => void;
  onAddCheckinService: (groupId: string) => void;
  onUpdateCleaningService: (groupId: string, serviceIndex: number, service: CleaningService) => void;
  onUpdateCheckinService: (groupId: string, serviceIndex: number, service: CheckinService) => void;
  onRemoveCleaningService: (groupId: string, serviceIndex: number) => void;
  onRemoveCheckinService: (groupId: string, serviceIndex: number) => void;
  onRemoveDateGroup: (groupId: string) => void;
}

const DateGroupAccordion: React.FC<DateGroupAccordionProps> = ({
  dateGroup,
  onDateChange,
  onAddCleaningService,
  onAddCheckinService,
  onUpdateCleaningService,
  onUpdateCheckinService,
  onRemoveCleaningService,
  onRemoveCheckinService,
  onRemoveDateGroup
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [tempDate, setTempDate] = useState(dateGroup.date);

  const totalServices = dateGroup.cleaningServices.length + dateGroup.checkinServices.length;

  const handleDateSave = () => {
    if (tempDate !== dateGroup.date) {
      onDateChange(dateGroup.id, tempDate);
    }
    setIsEditingDate(false);
  };

  const handleDateCancel = () => {
    setTempDate(dateGroup.date);
    setIsEditingDate(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="glass-card rounded-xl border border-gray-700/50 overflow-hidden animate-fade-in-up hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div 
        className="p-4 sm:p-6 cursor-pointer bg-gradient-to-r from-dark-input/50 to-dark-input/30 hover:from-dark-input/70 hover:to-dark-input/50 transition-all duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 bg-gradient-info rounded-xl shadow-glow-blue">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1">
              {isEditingDate ? (
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={tempDate}
                    onChange={(e) => setTempDate(e.target.value)}
                    className="px-3 py-1 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 text-sm"
                    autoFocus
                  />
                  <button
                    onClick={handleDateSave}
                    className="p-1 text-success-green hover:text-green-300 transition-colors duration-200"
                    title="Save date"
                  >
                    ✓
                  </button>
                  <button
                    onClick={handleDateCancel}
                    className="p-1 text-danger-red hover:text-red-300 transition-colors duration-200"
                    title="Cancel"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">
                    {formatDate(dateGroup.date)}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingDate(true);
                    }}
                    className="p-1 text-text-light hover:text-white transition-colors duration-200"
                    title="Edit date"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
              <p className="text-sm text-text-light">
                {totalServices} {totalServices === 1 ? 'service' : 'services'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveDateGroup(dateGroup.id);
              }}
              className="p-2 text-danger-red hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
              title="Remove work day"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="p-1 text-text-light">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onAddCleaningService(dateGroup.id)}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-glow-blue transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <Sparkles className="w-4 h-4" />
              Add Cleaning
            </button>
            <button
              onClick={() => onAddCheckinService(dateGroup.id)}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-secondary text-white rounded-lg hover:shadow-glow-pink transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <Package className="w-4 h-4" />
              Add Check-in
            </button>
          </div>

          {/* Services */}
          {totalServices > 0 ? (
            <div className="space-y-6">
              {/* Cleaning Services */}
              {dateGroup.cleaningServices.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-md font-medium text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Cleaning Services ({dateGroup.cleaningServices.length})
                  </h4>
                  {dateGroup.cleaningServices.map((service, index) => (
                    <CleaningServiceForm
                      key={service.id}
                      service={service}
                      onServiceChange={(updatedService) => onUpdateCleaningService(dateGroup.id, index, updatedService)}
                      onRemove={() => onRemoveCleaningService(dateGroup.id, index)}
                    />
                  ))}
                </div>
              )}

              {/* Check-in Services */}
              {dateGroup.checkinServices.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-md font-medium text-white flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Check-in Services ({dateGroup.checkinServices.length})
                  </h4>
                  {dateGroup.checkinServices.map((service, index) => (
                    <CheckinServiceForm
                      key={service.id}
                      service={service}
                      onServiceChange={(updatedService) => onUpdateCheckinService(dateGroup.id, index, updatedService)}
                      onRemove={() => onRemoveCheckinService(dateGroup.id, index)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-8">
              <div className="p-4 bg-dark-input rounded-xl inline-block mb-4">
                <Calendar className="w-8 h-8 text-text-light" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No Services</h3>
              <p className="text-text-light">Add cleaning or check-in services for this day</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateGroupAccordion; 