import React, { useState } from 'react';
import Logo from './components/Logo';
import CleanerInfo from './components/CleanerInfo';
import ServiceTypeSelector from './components/ServiceTypeSelector';

import ActionButtons from './components/ActionButtons';
import InvoicePreview from './components/InvoicePreview';
import FormSection from './components/FormSection';
import Toast from './components/Toast';
import SummaryCard from './components/SummaryCard';
import CheckinModal from './components/CheckinModal';
import DateServiceGroup from './components/DateServiceGroup';
import CheckinServicesSection from './components/CheckinServicesSection';
import { Cleaner, CleaningService, CheckinService, ServiceType, InvoiceData } from './types';

const App: React.FC = () => {
  const [cleaner, setCleaner] = useState<Cleaner>({
    id: '1',
    name: '',
    startDate: '2025-08-03',
    endDate: '2025-08-17'
  });

  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType>('normal');
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);
  const [showCheckinModal, setShowCheckinModal] = useState(false);

  const [checkinServices, setCheckinServices] = useState<CheckinService[]>([]);
  const [toast, setToast] = useState<{
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    isVisible: boolean;
  }>({
    type: 'info',
    message: '',
    isVisible: false
  });
  const [services, setServices] = useState<CleaningService[]>([
    {
      id: '1',
      type: 'normal',
      date: '2025-08-03',
      building: '',
      unit: '',
      serviceAmount: 0,
      cleaningWithPartner: false,
      partnerName: '',
      extraTime: 'No extra time',
      extrasDescription: '',
      purchasedItems: '',
      itemsCost: 0
    }
  ]);



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

  const handleServiceChange = (serviceId: string, updatedService: CleaningService) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId ? updatedService : service
    ));
  };

  const handleRemoveService = (serviceId: string) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
  };



  const addNewDate = () => {
    // Get the latest date from existing services or use start date
    const existingDates = services.map(s => s.date).sort();
    const latestDate = existingDates.length > 0 ? existingDates[existingDates.length - 1] : cleaner.startDate;
    
    // Generate next date (add one day to the latest date)
    const nextDate = new Date(latestDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const newDateString = nextDate.toISOString().split('T')[0];
    
    // Validate that the new date is within the cleaner's period
    const newDateObj = new Date(newDateString);
    const endDateObj = new Date(cleaner.endDate);
    
    if (newDateObj > endDateObj) {
      showToast('error', 'Cannot add date beyond the end date of the period');
      return;
    }
    
    // Add a new date with one initial service
    const newService: CleaningService = {
      id: Date.now().toString(),
      type: selectedServiceType,
      date: newDateString,
      building: '',
      unit: '',
      serviceAmount: 0,
      cleaningWithPartner: false,
      partnerName: '',
      extraTime: 'No extra time',
      extrasDescription: '',
      purchasedItems: '',
      itemsCost: 0
    };
    setServices(prev => [...prev, newService]);
    showToast('success', `Added new date: ${newDateString}`);
  };

  const addServiceToDate = (date: string) => {
    const newService: CleaningService = {
      id: Date.now().toString(),
      type: selectedServiceType,
      date: date,
      building: '',
      unit: '',
      serviceAmount: 0,
      cleaningWithPartner: false,
      partnerName: '',
      extraTime: 'No extra time',
      extrasDescription: '',
      purchasedItems: '',
      itemsCost: 0
    };
    setServices(prev => [...prev, newService]);
  };

  const removeDate = (date: string) => {
    setServices(prev => prev.filter(service => service.date !== date));
    showToast('info', `Removed all services for ${new Date(date).toLocaleDateString()}`);
  };

  const updateDate = (oldDate: string, newDate: string) => {
    setServices(prev => prev.map(service => 
      service.date === oldDate ? { ...service, date: newDate } : service
    ));
    showToast('success', `Date updated from ${new Date(oldDate).toLocaleDateString()} to ${new Date(newDate).toLocaleDateString()}`);
  };

  // Check-in Services Management
  const handleCheckinServiceChange = (serviceId: string, updatedService: CheckinService) => {
    setCheckinServices(prev => prev.map(service => 
      service.id === serviceId ? updatedService : service
    ));
  };

  const handleRemoveCheckinService = (serviceId: string) => {
    setCheckinServices(prev => prev.filter(service => service.id !== serviceId));
    showToast('info', 'Check-in service removed');
  };

  const addCheckinService = () => {
    const newCheckinService: CheckinService = {
      id: Date.now().toString(),
      type: 'checkin',
      date: new Date().toISOString().split('T')[0],
      building: '',
      unit: '',
      amount: 0
    };
    setCheckinServices(prev => [...prev, newCheckinService]);
    showToast('success', 'Check-in service added');
  };

  const showToast = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    setToast({ type, message, isVisible: true });
  };

  const addCheckin = () => {
    addCheckinService();
  };

  const handleCheckinSave = (data: any) => {
    showToast('success', `Check-in saved for ${data.propertyAddress || 'property'}`);
    console.log('Check-in data:', data);
  };

  const generateInvoice = () => {
    // Validate required fields
    if (!cleaner.name.trim()) {
      showToast('error', 'Please enter the cleaner name');
      return;
    }

    if (services.some(service => !service.building)) {
      showToast('error', 'Please select a building for all services');
      return;
    }

    if (services.some(service => service.serviceAmount <= 0)) {
      showToast('error', 'Please enter service amounts for all services');
      return;
    }

         const totalAmount = services.reduce((sum, service) => {
       const extraTimeCost = calculateExtraTimeCost(service.extraTime);
       return sum + service.serviceAmount + extraTimeCost + service.itemsCost;
     }, 0) + checkinServices.reduce((sum, service) => sum + service.amount, 0);
     
     const invoiceData: InvoiceData = {
       cleaner,
       services,
       checkinServices,
       totalAmount
     };
    
    console.log('Invoice Data:', invoiceData);
    setShowInvoicePreview(true);
    showToast('success', `Invoice generated! Total: $${totalAmount.toFixed(2)}`);
  };

  const resetForm = () => {
    setCleaner({
      id: '1',
      name: '',
      startDate: '2025-08-03',
      endDate: '2025-08-17'
    });
    setSelectedServiceType('normal');
    setShowInvoicePreview(false);
               setServices([{
        id: '1',
        type: 'normal',
        date: '2025-08-03',
        building: '',
        unit: '',
        serviceAmount: 0,
        cleaningWithPartner: false,
        partnerName: '',
        extraTime: 'No extra time',
        extrasDescription: '',
        purchasedItems: '',
        itemsCost: 0
      }]);
     setCheckinServices([]);
    showToast('info', 'Form has been reset');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Logo />
        
        <FormSection title="Cleaner Information" required>
          <CleanerInfo 
            cleaner={cleaner} 
            onCleanerChange={setCleaner}
          />
        </FormSection>
        
                 <FormSection title="Service Type Selection" required>
           <ServiceTypeSelector 
             selectedType={selectedServiceType}
             onTypeChange={setSelectedServiceType}
           />
         </FormSection>
         
         <FormSection title="Check-in Services" required>
                       <CheckinServicesSection
              checkinServices={checkinServices}
              onCheckinServiceChange={handleCheckinServiceChange}
              onRemoveCheckinService={handleRemoveCheckinService}
              onAddCheckinService={addCheckinService}
            />
         </FormSection>
         
         <FormSection title="Cleaning Services by Date" required>
          {(() => {
            // Group services by date
            const servicesByDate = services.reduce((groups, service) => {
              const date = service.date;
              if (!groups[date]) {
                groups[date] = [];
              }
              groups[date].push(service);
              return groups;
            }, {} as Record<string, CleaningService[]>);

            // Sort dates
            const sortedDates = Object.keys(servicesByDate).sort();

                         return sortedDates.map(date => (
               <DateServiceGroup
                 key={date}
                 date={date}
                 services={servicesByDate[date]}
                 onServiceChange={handleServiceChange}
                 onRemoveService={handleRemoveService}
                 onAddService={addServiceToDate}
                 onRemoveDate={removeDate}
                 onUpdateDate={updateDate}
                                   selectedServiceType={selectedServiceType}
                  startDate={cleaner.startDate}
                  endDate={cleaner.endDate}
               />
             ));
          })()}
        </FormSection>

                 {(services.length > 0 || checkinServices.length > 0) && (
           <SummaryCard
             totalAmount={
               services.reduce((sum, service) => {
                 const extraTimeCost = calculateExtraTimeCost(service.extraTime);
                 return sum + service.serviceAmount + extraTimeCost + service.itemsCost;
               }, 0) +
               checkinServices.reduce((sum, service) => sum + service.amount, 0)
             }
             totalServices={services.length + checkinServices.length}
             totalBuildings={new Set([
               ...services.map(s => s.building).filter(b => b),
               ...checkinServices.map(s => s.building).filter(b => b)
             ]).size}
             dateRange={`${cleaner.startDate} - ${cleaner.endDate}`}
           />
         )}
        
                 <ActionButtons
           onAddDate={addNewDate}
           onAddCheckin={addCheckin}
           onGenerateInvoice={generateInvoice}
           onResetForm={resetForm}
         />
      </div>
      
             {showInvoicePreview && (
         <InvoicePreview
           invoiceData={{
             cleaner,
             services,
             checkinServices,
             totalAmount: services.reduce((sum, service) => {
               const extraTimeCost = calculateExtraTimeCost(service.extraTime);
               return sum + service.serviceAmount + extraTimeCost + service.itemsCost;
             }, 0) + checkinServices.reduce((sum, service) => sum + service.amount, 0)
           }}
           onClose={() => setShowInvoicePreview(false)}
         />
       )}

      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />

      <CheckinModal
        isVisible={showCheckinModal}
        onClose={() => setShowCheckinModal(false)}
        onSave={handleCheckinSave}
        propertyName="AirBNB Property"
      />
    </div>
  );
};

export default App; 