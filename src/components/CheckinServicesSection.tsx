import React from 'react';
import { Plus, Building, DollarSign, Key } from 'lucide-react';
import { CheckinService } from '../types';
import CheckinServiceForm from './CheckinServiceForm';

interface CheckinServicesSectionProps {
  checkinServices: CheckinService[];
  onCheckinServiceChange: (serviceId: string, updatedService: CheckinService) => void;
  onRemoveCheckinService: (serviceId: string) => void;
  onAddCheckinService: () => void;
}

const CheckinServicesSection: React.FC<CheckinServicesSectionProps> = ({
  checkinServices,
  onCheckinServiceChange,
  onRemoveCheckinService,
  onAddCheckinService
}) => {
  const totalCheckinAmount = checkinServices.reduce((sum, service) => sum + service.amount, 0);

  return (
    <div className="glass-card rounded-xl border border-gray-700/50 overflow-hidden mb-6 animate-fade-in-up hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-glass px-6 py-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-secondary rounded-xl shadow-glow-pink">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white transition-colors duration-300 hover:text-text-light">Check-in Services</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>{checkinServices.length} check-in{checkinServices.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold text-white">${totalCheckinAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onAddCheckinService}
            className="group flex items-center gap-2 px-4 py-2 bg-gradient-secondary text-white rounded-lg transition-all duration-300 hover:shadow-glow-pink hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
            <span className="hidden sm:inline">Add Check-in</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Check-in Services */}
      <div className="p-6 space-y-4">
        {checkinServices.map((service, index) => (
          <div key={service.id} className="relative animate-stagger" style={{ animationDelay: `${index * 50}ms` }}>
            <CheckinServiceForm
              service={service}
              onServiceChange={(updatedService) => onCheckinServiceChange(service.id, updatedService)}
              onRemove={() => onRemoveCheckinService(service.id)}
            />
          </div>
        ))}

        {checkinServices.length === 0 && (
          <div className="text-center py-12 text-gray-400 animate-fade-in-up">
            <div className="p-4 bg-gradient-glass rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Key className="w-8 h-8 opacity-50 animate-pulse-soft" />
            </div>
            <p className="text-lg font-medium mb-2">No check-in services added yet.</p>
            <p className="text-sm">Click "Add Check-in" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckinServicesSection; 