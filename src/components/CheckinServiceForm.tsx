import React, { useState, useEffect } from 'react';
import { Package, Building, Home, DollarSign, Users, Clock, Sparkles, Trash2, AlertCircle } from 'lucide-react';
import { CheckinService } from '../types';
import { googleSheetsService } from '../services/googleSheetsService';

interface CheckinServiceFormProps {
  service: CheckinService;
  onServiceChange: (updatedService: CheckinService) => void;
  onRemove: () => void;
}

const CheckinServiceForm: React.FC<CheckinServiceFormProps> = ({
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
    loadBuildingsAndUnits();
  }, []);

  useEffect(() => {
    // Validate service when it changes
    validateService(service);
  }, [service]);

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

  const handleChange = (field: keyof CheckinService, value: any) => {
    const updatedService = {
      ...service,
      [field]: value
    };
    
    // Update amount based on unit selection
    if (field === 'unit' && value) {
      const unit = units.find(u => u.id === value);
      if (unit) {
        updatedService.amount = unit.servicePrice;
      }
    }
    
    onServiceChange(updatedService);
    validateService(updatedService);
  };

  const validateService = (serviceToValidate: CheckinService) => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields validation
    if (!serviceToValidate.building) {
      errors.push('Building selection is required');
    }

    if (!serviceToValidate.unit) {
      errors.push('Unit selection is required');
    }

    if (serviceToValidate.amount <= 0) {
      errors.push('Check-in amount must be greater than 0');
    }

    // Date validation
    if (serviceToValidate.date) {
      const serviceDate = new Date(serviceToValidate.date);
      const today = new Date();
      if (serviceDate > today) {
        warnings.push('Check-in date is in the future');
      }
    }

    // Amount validation
    if (serviceToValidate.amount > 1000) {
      warnings.push('Check-in amount is very high - please verify');
    }

    setValidationErrors(errors);
    setValidationWarnings(warnings);
  };

  const getUnitsForBuilding = (buildingId: string) => {
    return units.filter(unit => unit.buildingId === buildingId);
  };

  const handleBuildingChange = (buildingId: string) => {
    const updatedService = {
      ...service,
      building: buildingId,
      unit: '' // Reset unit when building changes
    };
    
    onServiceChange(updatedService);
    validateService(updatedService);
  };

  const handleUnitChange = (unitId: string) => {
    const updatedService = {
      ...service,
      unit: unitId
    };
    
    // Update amount based on unit selection
    if (unitId) {
      const unit = units.find(u => u.id === unitId);
      if (unit) {
        updatedService.amount = unit.servicePrice;
      }
    }
    
    onServiceChange(updatedService);
    validateService(updatedService);
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
          <div className="p-2 bg-gradient-secondary rounded-xl shadow-glow-pink">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Check-in Service</h3>
            <p className="text-sm text-text-light">Service #{service.id}</p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="group p-2 text-danger-red hover:text-white bg-danger-red/10 hover:bg-danger-red/20 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
          title="Remove check-in service"
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
          {/* Building */}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Unit */}
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
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div className="group">
            <label className="block text-sm font-medium text-white mb-2 transition-colors duration-300 group-hover:text-text-light">
              <DollarSign className="inline w-4 h-4 mr-2" />
              Amount <span className="text-danger-red animate-pulse-soft">*</span>
            </label>
            <input
              type="number"
              value={service.amount}
              onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50 focus:scale-[1.02] input-focus"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckinServiceForm; 