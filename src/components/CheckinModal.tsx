import React, { useState } from 'react';
import { X, Clock, MapPin, Camera, Key, AlertCircle } from 'lucide-react';

interface CheckinData {
  arrivalTime: string;
  propertyAddress: string;
  accessMethod: string;
  initialConditions: string;
  photos: string[];
  notes: string;
}

interface CheckinModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (checkinData: CheckinData) => void;
  propertyName?: string;
}

const CheckinModal: React.FC<CheckinModalProps> = ({
  isVisible,
  onClose,
  onSave,
  propertyName = 'Property'
}) => {
  const [checkinData, setCheckinData] = useState<CheckinData>({
    arrivalTime: new Date().toLocaleTimeString(),
    propertyAddress: '',
    accessMethod: '',
    initialConditions: '',
    photos: [],
    notes: ''
  });

  const handleSave = () => {
    onSave(checkinData);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-card rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary-blue" />
            <h2 className="text-xl font-bold text-white">Check-in: {propertyName}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Arrival Time */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Arrival Time
            </label>
            <input
              type="time"
              value={checkinData.arrivalTime}
              onChange={(e) => setCheckinData(prev => ({ ...prev, arrivalTime: e.target.value }))}
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>

          {/* Property Address */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Property Address
            </label>
            <input
              type="text"
              value={checkinData.propertyAddress}
              onChange={(e) => setCheckinData(prev => ({ ...prev, propertyAddress: e.target.value }))}
              placeholder="Enter property address"
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>

          {/* Access Method */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <Key className="w-4 h-4 inline mr-2" />
              Access Method
            </label>
            <select
              value={checkinData.accessMethod}
              onChange={(e) => setCheckinData(prev => ({ ...prev, accessMethod: e.target.value }))}
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option value="">Select access method</option>
              <option value="key-box">Key Box</option>
              <option value="smart-lock">Smart Lock</option>
              <option value="concierge">Concierge</option>
              <option value="host-meeting">Host Meeting</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Initial Conditions */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              Initial Conditions
            </label>
            <textarea
              value={checkinData.initialConditions}
              onChange={(e) => setCheckinData(prev => ({ ...prev, initialConditions: e.target.value }))}
              placeholder="Describe the initial condition of the property..."
              rows={3}
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <Camera className="w-4 h-4 inline mr-2" />
              Photos (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">
                Click to upload photos of initial condition
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  // Handle photo upload
                  console.log('Photos uploaded:', e.target.files);
                }}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Additional Notes
            </label>
            <textarea
              value={checkinData.notes}
              onChange={(e) => setCheckinData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional notes about the check-in..."
              rows={2}
              className="w-full px-3 py-2 bg-dark-input border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-success-green text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Save Check-in
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckinModal; 