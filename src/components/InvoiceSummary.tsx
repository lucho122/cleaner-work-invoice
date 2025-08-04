import React from 'react';
import { FileText, DollarSign, Calendar, User, Building, Home } from 'lucide-react';
import { Cleaner, CleaningService, CheckinService } from '../types';

interface InvoiceSummaryProps {
  cleaner: Cleaner;
  cleaningServices: CleaningService[];
  checkinServices: CheckinService[];
  totalAmount: number;
}

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
  cleaner,
  cleaningServices,
  checkinServices,
  totalAmount
}) => {
  const totalServices = cleaningServices.length + checkinServices.length;
  const uniqueBuildings = new Set([
    ...cleaningServices.map(s => s.building).filter(b => b),
    ...checkinServices.map(s => s.building).filter(b => b)
  ]).size;

  const cleaningTotal = cleaningServices.reduce((sum, service) =>
    sum + service.amount + service.itemsCost, 0
  );
  
  const checkinTotal = checkinServices.reduce((sum, service) => 
    sum + service.amount, 0
  );

  return (
    <div className="glass-card rounded-xl p-6 border border-gray-700/50 animate-fade-in-up hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-success rounded-xl shadow-glow-green">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Invoice Summary</h3>
            <p className="text-sm text-text-light">Complete overview of your invoice</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold gradient-text">${totalAmount.toFixed(2)}</div>
          <div className="text-sm text-text-light">Total Amount</div>
        </div>
      </div>

      {/* Cleaner Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Cleaner</h4>
              <p className="text-text-light">{cleaner.name || 'Not specified'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-info rounded-lg">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Period</h4>
              <p className="text-text-light">
                {cleaner.startDate && cleaner.endDate 
                  ? `${cleaner.startDate} - ${cleaner.endDate}`
                  : 'Not specified'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-warning rounded-lg">
              <Building className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Buildings</h4>
              <p className="text-text-light">{uniqueBuildings} unique buildings</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-danger rounded-lg">
              <Home className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Services</h4>
              <p className="text-text-light">{totalServices} total services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Breakdown</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cleaning Services */}
          <div className="bg-dark-input rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-primary rounded-full"></div>
                <span className="text-white font-medium">Cleaning Services</span>
              </div>
              <span className="text-text-light text-sm">{cleaningServices.length} services</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-light">Service Amounts:</span>
                <span className="text-white">
                  ${cleaningServices.reduce((sum, s) => sum + s.amount, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-light">Items Cost:</span>
                <span className="text-white">
                  ${cleaningServices.reduce((sum, s) => sum + s.itemsCost, 0).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-600 pt-2">
                <div className="flex justify-between font-medium">
                  <span className="text-white">Subtotal:</span>
                  <span className="text-success-green">${cleaningTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Check-in Services */}
          <div className="bg-dark-input rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-success rounded-full"></div>
                <span className="text-white font-medium">Check-in Services</span>
              </div>
              <span className="text-text-light text-sm">{checkinServices.length} services</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-light">Total Amount:</span>
                <span className="text-white">${checkinTotal.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-600 pt-2">
                <div className="flex justify-between font-medium">
                  <span className="text-white">Subtotal:</span>
                  <span className="text-success-green">${checkinTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="mt-6 p-4 bg-gradient-primary rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-white" />
            <div>
              <h4 className="text-white font-medium">Total Invoice Amount</h4>
              <p className="text-white/80 text-sm">Final amount to be charged</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">${totalAmount.toFixed(2)}</div>
            <div className="text-white/80 text-sm">USD</div>
          </div>
        </div>
      </div>

      {/* Service Details */}
      {cleaningServices.length > 0 && (
        <div className="mt-6">
          <h4 className="text-white font-medium mb-3">Cleaning Service Details</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {cleaningServices.map((service, index) => (
              <div key={service.id} className="flex items-center justify-between p-3 bg-dark-input rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-text-light text-sm">#{index + 1}</span>
                  <div>
                    <div className="text-white text-sm font-medium">
                      {service.building && service.unit 
                        ? `${service.building} - ${service.unit}`
                        : 'Service not configured'
                      }
                    </div>
                    <div className="text-text-light text-xs">
                      {service.date || 'Date not set'} • {service.serviceType} service
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">
                    ${(service.amount + service.itemsCost).toFixed(2)}
                  </div>
                  <div className="text-text-light text-xs">
                    Service: ${service.amount} + Items: ${service.itemsCost}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {checkinServices.length > 0 && (
        <div className="mt-6">
          <h4 className="text-white font-medium mb-3">Check-in Service Details</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {checkinServices.map((service, index) => (
              <div key={service.id} className="flex items-center justify-between p-3 bg-dark-input rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-text-light text-sm">#{index + 1}</span>
                  <div>
                    <div className="text-white text-sm font-medium">
                      {service.building && service.unit 
                        ? `${service.building} - ${service.unit}`
                        : 'Service not configured'
                      }
                    </div>
                    <div className="text-text-light text-xs">
                      {service.date || 'Date not set'} • Check-in service
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">
                    ${service.amount.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceSummary; 