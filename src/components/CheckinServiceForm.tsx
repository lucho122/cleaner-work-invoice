import React, { useState, useEffect } from 'react';
import { Calendar, Building, DollarSign, X } from 'lucide-react';
import { Building as BuildingType, Unit } from '../types';
import { GoogleSheetsService } from '../services/googleSheetsService';

interface CheckinService {
  id: string;
  type: 'checkin';
  date: string;
  building: string;
  unit: string;
  amount: number;
}

interface CheckinServiceFormProps {
  service: CheckinService;
  onServiceChange: (service: CheckinService) => void;
  onRemove: () => void;
}

const CheckinServiceForm: React.FC<CheckinServiceFormProps> = ({
  service,
  onServiceChange,
  onRemove
}) => {
  const [buildings, setBuildings] = useState<BuildingType[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
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

  const handleChange = (field: keyof CheckinService, value: any) => {
    onServiceChange({
      ...service,
      [field]: value
    });
  };

  if (loading) {
    return (
      <div className="bg-dark-card rounded-lg p-6 mb-4 border border-gray-700">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
          <span className="ml-3 text-gray-400">Loading data from Google Sheets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-card rounded-lg p-6 mb-4 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5 text-primary-blue" />
          <h3 className="text-lg font-semibold text-white">
            Check-in Service
          </h3>
        </div>
        <button
          onClick={onRemove}
          className="text-danger-red hover:text-red-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Date <span className="text-danger-red">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={service.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent pr-10"
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Building */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Building <span className="text-danger-red">*</span>
          </label>
          <select
            value={service.building}
            onChange={(e) => handleChange('building', e.target.value)}
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
            value={service.unit}
            onChange={(e) => handleChange('unit', e.target.value)}
            className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            disabled={!service.building}
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
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Amount <span className="text-danger-red">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              value={service.amount || ''}
              onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent pr-8"
            />
            <DollarSign className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckinServiceForm; 