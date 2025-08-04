import React, { useState, useEffect } from 'react';
import { Sparkles, Building, Home, DollarSign, Users, Clock, Package, Trash2, AlertCircle } from 'lucide-react';
import { CleaningService } from '../types';
import { pricingService } from '../services/pricingService';
import { googleSheetsService } from '../services/googleSheetsService';

interface CleaningServiceFormProps {
  service: CleaningService;
  onServiceChange: (updatedService: CleaningService) => void;
  onRemove: () => void;
}

const CleaningServiceForm: React.FC<CleaningServiceFormProps> = ({
  service,
  onServiceChange,
  onRemove
}) => {
  const [buildings, setBuildings] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [buildingsData, unitsData] = await Promise.all([
          googleSheetsService.getBuildings(),
          googleSheetsService.getUnits()
        ]);
        
        console.log('🏢 Buildings loaded:', buildingsData);
        console.log('🏠 Units loaded:', unitsData);
        
        setBuildings(buildingsData);
        setUnits(unitsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Auto-calculate service amount when unit changes
    if (service.unit) {
      const unit = units.find(u => u.id === service.unit);
      if (unit) {
        let basePrice = unit.servicePrice;
        
        // Apply partner discount if applicable
        if (service.cleaningWithPartner) {
          basePrice = basePrice * 0.5; // 50% discount
        }
        
        onServiceChange({
          ...service,
          amount: basePrice
        });
      }
    }
  }, [service.unit, service.cleaningWithPartner]);

  const loadBuildingsAndUnits = async () => {
    try {
      setIsLoading(true);
      const [buildingsData, unitsData] = await Promise.all([
        googleSheetsService.getBuildings(),
        googleSheetsService.getUnits()
      ]);
      setBuildings(buildingsData);
      setUnits(unitsData);
    } catch (error) {
      console.error('Error loading buildings and units:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof CleaningService, value: any) => {
    const updatedService = {
      ...service,
      [field]: value
    };
    
    // Update amount based on service type and partner
    const newAmount = pricingService.calculateServicePrice(updatedService);
    
    updatedService.amount = newAmount;
    
    onServiceChange(updatedService);
    validateService(updatedService);
  };

  const validateService = (serviceToValidate: CleaningService) => {
    const validation = pricingService.validateServicePricing(serviceToValidate);
    setValidationErrors(validation.errors);
    setValidationWarnings(validation.warnings);
  };

  const getUnitsForBuilding = (buildingId: string) => {
    return units.filter(unit => unit.buildingId === buildingId);
  };

  const handleBuildingChange = (buildingId: string) => {
    console.log('🏢 Building selected:', buildingId);
    console.log('🏢 Available buildings:', buildings);
    console.log('🏢 Current service state:', service);
    
    const updatedService = {
      ...service,
      building: buildingId,
      unit: '' // Reset unit when building changes
    };
    
    console.log('🏢 Updated service:', updatedService);
    
    onServiceChange(updatedService);
    validateService(updatedService);
  };

  const handleUnitChange = (unitId: string) => {
    console.log('🏠 Unit selected:', unitId);
    console.log('🏠 Current service state:', service);
    
    const updatedService = {
      ...service,
      unit: unitId
    };
    
    console.log('🏠 Updated service:', updatedService);
    
    onServiceChange(updatedService);
    validateService(updatedService);
  };

  const handlePartnerToggle = () => {
    const updatedService = {
      ...service,
      cleaningWithPartner: !service.cleaningWithPartner,
      partnerName: !service.cleaningWithPartner ? '' : service.partnerName
    };
    
    // Recalculate amount
    const newAmount = pricingService.calculateServicePrice(updatedService);
    updatedService.amount = newAmount;
    
    onServiceChange(updatedService);
    validateService(updatedService);
  };

  const calculateAmount = () => {
    return pricingService.calculateServicePrice(service);
  };

  if (isLoading) {
    return (
      <div className="glass-card rounded-xl p-4 sm:p-6 border border-gray-700/50 animate-fade-in-up hover:shadow-card-hover transition-all duration-300">
        <div className="h-32 bg-dark-input rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-4 sm:p-6 border border-gray-700/50 animate-fade-in-up hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-xl shadow-glow-blue">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Cleaning Service</h3>
            <p className="text-sm text-text-light">Service #{service.id}</p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="group p-2 text-danger-red hover:text-white bg-danger-red/10 hover:bg-danger-red/20 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
          title="Remove service"
        >
          <Trash2 className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
        </button>
      </div>

      {/* Validation Messages */}
      {validationErrors.length > 0 && (
        <div className="mb-4 p-3 bg-danger-red/10 border border-danger-red/30 rounded-lg animate-shake">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-danger-red animate-pulse-soft" />
            <span className="text-sm text-danger-red font-medium">Validation Errors:</span>
          </div>
          <ul className="mt-2 space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index} className="text-xs text-danger-red">• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {validationWarnings.length > 0 && (
        <div className="mb-4 p-3 bg-warning-yellow/10 border border-warning-yellow/30 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-warning-yellow" />
            <span className="text-sm text-warning-yellow font-medium">Warnings:</span>
          </div>
          <ul className="mt-2 space-y-1">
            {validationWarnings.map((warning, index) => (
              <li key={index} className="text-xs text-warning-yellow">• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Building Selection */}
          <div className="group">
            <label className="block text-sm font-medium text-white mb-2 transition-colors duration-300 group-hover:text-text-light">
              <Building className="inline w-4 h-4 mr-2" />
              Building <span className="text-danger-red animate-pulse-soft">*</span>
            </label>
            <select
              value={service.building}
              onChange={(e) => handleBuildingChange(e.target.value)}
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50 focus:scale-[1.02] input-focus"
            >
              <option value="">Select Building</option>
              {buildings.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.name}
                </option>
              ))}
            </select>
          </div>

          {/* Unit Selection */}
          <div className="group">
            <label className="block text-sm font-medium text-white mb-2 transition-colors duration-300 group-hover:text-text-light">
              <Home className="inline w-4 h-4 mr-2" />
              Unit <span className="text-danger-red animate-pulse-soft">*</span>
            </label>
            <select
              value={service.unit}
              onChange={(e) => handleUnitChange(e.target.value)}
              disabled={!service.building}
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50 focus:scale-[1.02] input-focus disabled:opacity-50"
            >
              <option value="">Select Unit</option>
              {service.building && getUnitsForBuilding(service.building).map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name} - ${unit.servicePrice}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Service Amount */}
          <div className="group">
            <label className="block text-sm font-medium text-white mb-2 transition-colors duration-300 group-hover:text-text-light">
              <DollarSign className="inline w-4 h-4 mr-2" />
              Service Amount <span className="text-danger-red animate-pulse-soft">*</span>
            </label>
            <input
              type="number"
              value={service.amount}
              readOnly
              placeholder="0.00"
              className="w-full px-3 py-2 bg-dark-input/50 border border-gray-600 rounded-md text-white focus:outline-none transition-all duration-300 cursor-not-allowed opacity-75"
            />
            <p className="text-xs text-text-light mt-1">Calculated automatically from unit price</p>
          </div>

          {/* Partner Selection */}
          <div className="group">
            <label className="block text-sm font-medium text-white mb-2 transition-colors duration-300 group-hover:text-text-light">
              <Users className="inline w-4 h-4 mr-2" />
              Cleaning with Partner
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePartnerToggle}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                  service.cleaningWithPartner
                    ? 'bg-primary-blue text-white shadow-glow-blue'
                    : 'bg-dark-input text-text-light border border-gray-600 hover:border-primary-blue/50'
                }`}
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                  service.cleaningWithPartner
                    ? 'bg-white border-white'
                    : 'border-gray-400'
                }`}>
                  {service.cleaningWithPartner && (
                    <svg className="w-3 h-3 text-primary-blue" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm">Yes</span>
              </button>
              {service.cleaningWithPartner && (
                <span className="text-xs text-success-green animate-pulse-soft">
                  (50% discount applied)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Partner Name */}
        {service.cleaningWithPartner && (
          <div className="group animate-fade-in-up">
            <label className="block text-sm font-medium text-white mb-2 transition-colors duration-300 group-hover:text-text-light">
              <Users className="inline w-4 h-4 mr-2" />
              Partner Name <span className="text-danger-red animate-pulse-soft">*</span>
            </label>
            <input
              type="text"
              value={service.partnerName}
              onChange={(e) => handleChange('partnerName', e.target.value)}
              placeholder="Enter partner name"
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50 focus:scale-[1.02] input-focus"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Extra Time */}
          <div className="group">
            <label className="block text-sm font-medium text-white mb-2 transition-colors duration-300 group-hover:text-text-light">
              <Clock className="inline w-4 h-4 mr-2" />
              Extra Time
            </label>
            <select
              value={service.extraTime}
              onChange={(e) => handleChange('extraTime', e.target.value)}
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50 focus:scale-[1.02] input-focus"
            >
              <option value="No extra time">No extra time</option>
              <option value="30 minutes">30 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="1.5 hours">1.5 hours</option>
              <option value="2 hours">2 hours</option>
            </select>
          </div>

          {/* Items Cost */}
          <div className="group">
            <label className="block text-sm font-medium text-white mb-2 transition-colors duration-300 group-hover:text-text-light">
              <Package className="inline w-4 h-4 mr-2" />
              Items Cost
            </label>
            <input
              type="number"
              value={service.itemsCost}
              onChange={(e) => handleChange('itemsCost', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50 focus:scale-[1.02] input-focus"
            />
          </div>
        </div>

        {/* Purchased Items */}
        <div className="group">
          <label className="block text-sm font-medium text-white mb-2 transition-colors duration-300 group-hover:text-text-light">
            <Package className="inline w-4 h-4 mr-2" />
            Purchased Items
          </label>
          <textarea
            value={service.purchasedItems}
            onChange={(e) => handleChange('purchasedItems', e.target.value)}
            placeholder="List any purchased items..."
            rows={2}
            className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50 focus:scale-[1.02] input-focus resize-none"
          />
        </div>

        {/* Extras Description */}
        <div className="group">
          <label className="block text-sm font-medium text-white mb-2 transition-colors duration-300 group-hover:text-text-light">
            <Package className="inline w-4 h-4 mr-2" />
            Extras Description
          </label>
          <textarea
            value={service.extrasDescription}
            onChange={(e) => handleChange('extrasDescription', e.target.value)}
            placeholder="Describe any extra work or special requests..."
            rows={2}
            className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50 focus:scale-[1.02] input-focus resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default CleaningServiceForm; 