import React from 'react';
import { Plus, Building } from 'lucide-react';
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
    <div className="bg-dark-card rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-dark-input px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building className="w-5 h-5 text-primary-blue" />
            <h3 className="text-lg font-semibold text-white">Check-in Services</h3>
            <p className="text-sm text-gray-400">
              {checkinServices.length} check-in{checkinServices.length !== 1 ? 's' : ''} • Total: ${totalCheckinAmount.toFixed(2)}
            </p>
          </div>
          <button
            onClick={onAddCheckinService}
            className="flex items-center gap-2 px-3 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Check-in
          </button>
        </div>
      </div>

      {/* Check-in Services */}
      <div className="p-6 space-y-4">
        {checkinServices.map((service) => (
          <div key={service.id} className="relative">
                                    <CheckinServiceForm
                          service={service}
                          onServiceChange={(updatedService) => onCheckinServiceChange(service.id, updatedService)}
                          onRemove={() => onRemoveCheckinService(service.id)}
                        />
          </div>
        ))}

        {checkinServices.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Building className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No check-in services added yet.</p>
            <p className="text-sm">Click "Add Check-in" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckinServicesSection; 