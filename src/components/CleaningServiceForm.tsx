import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles, X } from 'lucide-react';
import { CleaningService, ServiceType, Building, Unit } from '../types';
import { GoogleSheetsService } from '../services/googleSheetsService';

interface CleaningServiceFormProps {
  service: CleaningService;
  onServiceChange: (service: CleaningService) => void;
  onRemove: () => void;
}

const CleaningServiceForm: React.FC<CleaningServiceFormProps> = ({
  service,
  onServiceChange,
  onRemove
}) => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
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

  const handleChange = (field: keyof CleaningService, value: any) => {
    const updatedService = {
      ...service,
      [field]: value
    };

    // If extra time changed, automatically calculate the cost
    if (field === 'extraTime') {
      updatedService.itemsCost = calculateExtraTimeCost(value);
    }

    onServiceChange(updatedService);
  };

  const getServiceTypeLabel = (type: ServiceType) => {
    switch (type) {
      case 'normal': return 'Normal Cleaning';
      case 'deep': return 'Deep Cleaning';
      case 'minor': return 'Minor Task';
      default: return 'Cleaning';
    }
  };

  // Load buildings and units from Google Sheets
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [buildingsData, unitsData] = await Promise.all([
          GoogleSheetsService.getBuildings(),
          GoogleSheetsService.getUnits()
        ]);
        setBuildings(buildingsData);
        setUnits(unitsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Get units for the selected building
  const getUnitsForBuilding = (buildingId: string) => {
    return units.filter(unit => unit.buildingId === buildingId);
  };

  // Handle building change
  const handleBuildingChange = (buildingId: string) => {
    const updatedService = {
      ...service,
      building: buildingId,
      unit: '', // Reset unit when building changes
      serviceAmount: 0 // Reset service amount when building changes
    };
    onServiceChange(updatedService);
  };

  // Handle unit change
  const handleUnitChange = (unitId: string) => {
    const unit = units.find(u => u.id === unitId);
    const serviceAmount = unit ? GoogleSheetsService.getUnitPrice(unitId, service.cleaningWithPartner) : 0;
    
    const updatedService = {
      ...service,
      unit: unitId,
      serviceAmount
    };
    onServiceChange(updatedService);
  };

  // Handle partner change
  const handlePartnerChange = (withPartner: boolean) => {
    let serviceAmount = service.serviceAmount;
    
    // If we have a unit selected, recalculate the price
    if (service.unit) {
      serviceAmount = GoogleSheetsService.getUnitPrice(service.unit, withPartner);
    }
    
    const updatedService = {
      ...service,
      cleaningWithPartner: withPartner,
      serviceAmount,
      partnerName: withPartner ? service.partnerName : ''
    };
    onServiceChange(updatedService);
  };

  if (loading) {
    return (
      <div className="bg-dark-card rounded-lg p-6 mb-4">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
          <span className="ml-3 text-gray-400">Loading data from Google Sheets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-card rounded-lg p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary-blue" />
          <h3 className="text-lg font-semibold text-white">
            {getServiceTypeLabel(service.type)}
          </h3>
        </div>
        <button
          onClick={onRemove}
          className="flex items-center gap-2 px-3 py-2 bg-danger-red text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
        >
          <X className="w-4 h-4" />
          Remove
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Building */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Building <span className="text-danger-red">*</span>
          </label>
          <select
            value={service.building}
            onChange={(e) => handleBuildingChange(e.target.value)}
            className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          >
            <option value="">Select Building</option>
            {buildings.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Unit
          </label>
          <select
            value={service.unit || ''}
            onChange={(e) => handleUnitChange(e.target.value)}
            className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            disabled={!service.building}
          >
            <option value="">Select Unit</option>
            {service.building && getUnitsForBuilding(service.building).map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name} - ${unit.servicePrice.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        {/* Service Amount */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Service Amount <span className="text-danger-red">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={service.serviceAmount || ''}
            onChange={(e) => handleChange('serviceAmount', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            readOnly
          />
          <p className="text-xs text-gray-400 mt-1">
            {service.cleaningWithPartner ? 'Price divided by 2 (Partner)' : 'Full price'}
          </p>
        </div>

        {/* Cleaning With Partner */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Cleaning With Partner?
          </label>
          <select
            value={service.cleaningWithPartner ? 'yes' : 'no'}
            onChange={(e) => handlePartnerChange(e.target.value === 'yes')}
            className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>

      {/* Partner Name */}
      {service.cleaningWithPartner && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-white mb-2">
            Partner Name
          </label>
          <input
            type="text"
            value={service.partnerName || ''}
            onChange={(e) => handleChange('partnerName', e.target.value)}
            placeholder="Enter partner name"
            className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />
        </div>
      )}

      {/* Extra Time */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-white mb-2">
          Extra Time
        </label>
        <select
          value={service.extraTime}
          onChange={(e) => handleChange('extraTime', e.target.value)}
          className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        >
          <option value="No extra time">No extra time</option>
          <option value="30 minutes">30 minutes</option>
          <option value="1 hour">1 hour</option>
          <option value="1.5 hours">1.5 hours</option>
          <option value="2 hours">2 hours</option>
        </select>
      </div>

      {/* Extras Description */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-white mb-2">
          Extras Description
        </label>
        <textarea
          value={service.extrasDescription}
          onChange={(e) => handleChange('extrasDescription', e.target.value)}
          placeholder="Enter description for extras (if any)"
          rows={3}
          className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
      </div>

      {/* Purchased Items */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-white mb-2">
          Purchased Items
        </label>
        <input
          type="text"
          value={service.purchasedItems}
          onChange={(e) => handleChange('purchasedItems', e.target.value)}
          placeholder="Enter purchased items (if any)"
          className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
      </div>

      {/* Items Cost */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-white mb-2">
          Items Cost
        </label>
        <input
          type="number"
          step="0.01"
          value={service.itemsCost || ''}
          onChange={(e) => handleChange('itemsCost', parseFloat(e.target.value) || 0)}
          placeholder="0.00"
          className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default CleaningServiceForm; 