import React, { useState } from 'react';
import './App.css';
import Logo from './components/Logo';
import CleanerInfo from './components/CleanerInfo';
import ServiceTypeSelector from './components/ServiceTypeSelector';
import DateGroupAccordion from './components/DateGroupAccordion';
import GoogleSheetsStatus from './components/GoogleSheetsStatus';
import ActionButtons from './components/ActionButtons';
import { Cleaner, CleaningService, CheckinService, ServiceType, DateGroup } from './types';
import { Calendar, Plus } from 'lucide-react';

function App() {
  const [cleaner, setCleaner] = useState<Cleaner>({
    id: '',
    name: '',
    startDate: '',
    endDate: ''
  });
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType>('normal');
  const [dateGroups, setDateGroups] = useState<DateGroup[]>([]);
  const [isGoogleSheetsConnected, setIsGoogleSheetsConnected] = useState<boolean | null>(null);

  // Generate unique IDs
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Date Group Management
  const addDateGroup = () => {
    const today = new Date().toISOString().split('T')[0];
    const newGroup: DateGroup = {
      id: generateId(),
      date: today,
      cleaningServices: [],
      checkinServices: []
    };
    setDateGroups([...dateGroups, newGroup]);
  };

  const updateDateGroup = (groupId: string, updates: Partial<DateGroup>) => {
    setDateGroups(dateGroups.map(group => 
      group.id === groupId ? { ...group, ...updates } : group
    ));
  };

  const removeDateGroup = (groupId: string) => {
    setDateGroups(dateGroups.filter(group => group.id !== groupId));
  };

  // Service Management within Date Groups
  const addCleaningService = (groupId: string) => {
    const newService: CleaningService = {
      id: generateId(),
      date: '', // Will be set from the group
      building: '',
      unit: '',
      serviceType: selectedServiceType,
      cleaningWithPartner: false,
      partnerName: '',
      extraTime: 'No extra time',
      extrasDescription: '',
      purchasedItems: '',
      itemsCost: 0,
      amount: 0,
      isValid: false
    };

    setDateGroups(dateGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          cleaningServices: [...group.cleaningServices, newService]
        };
      }
      return group;
    }));
  };

  const addCheckinService = (groupId: string) => {
    const newService: CheckinService = {
      id: generateId(),
      date: '', // Will be set from the group
      building: '',
      unit: '',
      serviceType: selectedServiceType,
      amount: 0,
      isValid: false
    };

    setDateGroups(dateGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          checkinServices: [...group.checkinServices, newService]
        };
      }
      return group;
    }));
  };

  const updateCleaningService = (groupId: string, serviceIndex: number, updatedService: CleaningService) => {
    setDateGroups(dateGroups.map(group => {
      if (group.id === groupId) {
        const updatedServices = [...group.cleaningServices];
        updatedServices[serviceIndex] = {
          ...updatedService,
          date: group.date // Ensure service inherits group date
        };
        return {
          ...group,
          cleaningServices: updatedServices
        };
      }
      return group;
    }));
  };

  const updateCheckinService = (groupId: string, serviceIndex: number, updatedService: CheckinService) => {
    setDateGroups(dateGroups.map(group => {
      if (group.id === groupId) {
        const updatedServices = [...group.checkinServices];
        updatedServices[serviceIndex] = {
          ...updatedService,
          date: group.date // Ensure service inherits group date
        };
        return {
          ...group,
          checkinServices: updatedServices
        };
      }
      return group;
    }));
  };

  const removeCleaningService = (groupId: string, serviceIndex: number) => {
    setDateGroups(dateGroups.map(group => {
      if (group.id === groupId) {
        const updatedServices = group.cleaningServices.filter((_, index) => index !== serviceIndex);
        return {
          ...group,
          cleaningServices: updatedServices
        };
      }
      return group;
    }));
  };

  const removeCheckinService = (groupId: string, serviceIndex: number) => {
    setDateGroups(dateGroups.map(group => {
      if (group.id === groupId) {
        const updatedServices = group.checkinServices.filter((_, index) => index !== serviceIndex);
        return {
          ...group,
          checkinServices: updatedServices
        };
      }
      return group;
    }));
  };

  const handleDateChange = (groupId: string, newDate: string) => {
    setDateGroups(dateGroups.map(group => {
      if (group.id === groupId) {
        // Update all services in this group to use the new date
        const updatedCleaningServices = group.cleaningServices.map(service => ({
          ...service,
          date: newDate
        }));
        const updatedCheckinServices = group.checkinServices.map(service => ({
          ...service,
          date: newDate
        }));
        
        return {
          ...group,
          date: newDate,
          cleaningServices: updatedCleaningServices,
          checkinServices: updatedCheckinServices
        };
      }
      return group;
    }));
  };

  const calculateTotal = () => {
    return dateGroups.reduce((total, group) => {
      const cleaningTotal = group.cleaningServices.reduce((sum, service) => sum + service.amount, 0);
      const checkinTotal = group.checkinServices.reduce((sum, service) => sum + service.amount, 0);
      return total + cleaningTotal + checkinTotal;
    }, 0);
  };

  // Action Button Handlers
  const handleGenerateInvoice = () => {
    // TODO: Implement invoice generation
    alert('Invoice generation feature coming soon!');
  };

  const handleResetForm = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      setDateGroups([]);
      setCleaner({
        id: '',
        name: '',
        startDate: '',
        endDate: ''
      });
      setSelectedServiceType('normal');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Logo />
        </div>
        
        <div className="mb-6">
          <GoogleSheetsStatus 
            onStatusChange={setIsGoogleSheetsConnected}
          />
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Cleaner Info */}
          <CleanerInfo cleaner={cleaner} onCleanerChange={setCleaner} />
          
          {/* Service Type Selector */}
          <ServiceTypeSelector 
            selectedType={selectedServiceType}
            onTypeChange={setSelectedServiceType}
          />

          {/* Date Groups */}
          {dateGroups.length > 0 ? (
            <div className="space-y-6">
              {/* Add Work Day Button */}
              <div className="text-center">
                <button
                  onClick={addDateGroup}
                  className="group flex items-center gap-3 px-6 py-3 bg-gradient-primary text-white rounded-xl hover:shadow-glow-blue transition-all duration-300 hover:scale-105 active:scale-95 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <Calendar className="w-5 h-5" />
                  Add Work Day
                </button>
              </div>
              
              {dateGroups.map((dateGroup) => (
                <DateGroupAccordion
                  key={dateGroup.id}
                  dateGroup={dateGroup}
                  onDateChange={handleDateChange}
                  onAddCleaningService={addCleaningService}
                  onAddCheckinService={addCheckinService}
                  onUpdateCleaningService={updateCleaningService}
                  onUpdateCheckinService={updateCheckinService}
                  onRemoveCleaningService={removeCleaningService}
                  onRemoveCheckinService={removeCheckinService}
                  onRemoveDateGroup={removeDateGroup}
                />
              ))}
            </div>
          ) : (
            /* Compact Empty State */
            <div className="text-center py-8">
              <div className="p-3 bg-dark-input rounded-xl inline-block mb-3">
                <Calendar className="w-6 h-6 text-text-light" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No Work Days</h3>
              <p className="text-text-light mb-4">Start by adding a work day to organize your services</p>
              <button
                onClick={addDateGroup}
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl hover:shadow-glow-blue transition-all duration-300 hover:scale-105 active:scale-95 mx-auto"
              >
                <Plus className="w-5 h-5" />
                <Calendar className="w-5 h-5" />
                Add First Work Day
              </button>
            </div>
          )}

          {/* Total Summary */}
          {dateGroups.length > 0 && (
            <div className="glass-card rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Total Summary</h3>
                  <p className="text-text-light">
                    {dateGroups.reduce((total, group) => 
                      total + group.cleaningServices.length + group.checkinServices.length, 0
                    )} services in {dateGroups.length} {dateGroups.length === 1 ? 'day' : 'days'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    ${calculateTotal().toFixed(2)}
                  </div>
                  <div className="text-sm text-text-light">Total to charge</div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons - Only show when there are work days */}
          {dateGroups.length > 0 && (
            <ActionButtons
              onGenerateInvoice={handleGenerateInvoice}
              onResetForm={handleResetForm}
            />
          )}
        </div>
      </div>
      

    </div>
  );
}

export default App; 