import React, { useState } from 'react';
import { Calendar, Building, Home, DollarSign, Users, Clock, Package, Check, X } from 'lucide-react';

interface TouchOptimizedFormProps {
  service: any;
  onServiceChange: (updatedService: any) => void;
  buildings: any[];
  units: any[];
}

const TouchOptimizedForm: React.FC<TouchOptimizedFormProps> = ({
  service,
  onServiceChange,
  buildings,
  units
}) => {
  const [activeField, setActiveField] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (field: string, value: any) => {
    onServiceChange({ ...service, [field]: value });
  };

  const TouchField = ({ 
    label, 
    icon: Icon, 
    field, 
    type = 'text', 
    required = false,
    options = [],
    placeholder = ''
  }: {
    label: string;
    icon: any;
    field: string;
    type?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    placeholder?: string;
  }) => (
    <div className="group">
      <label className="block text-sm font-medium text-white mb-3 transition-colors duration-300 group-hover:text-text-light">
        <Icon className="inline w-4 h-4 mr-2" />
        {label} {required && <span className="text-danger-red animate-pulse-soft">*</span>}
      </label>
      
      {type === 'select' ? (
        <div className="relative">
          <select
            value={service[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            onFocus={() => setActiveField(field)}
            onBlur={() => setActiveField(null)}
            className="w-full px-4 py-4 bg-dark-input border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50 focus:scale-[1.02] input-focus text-lg"
            style={{ minHeight: '56px' }}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
          </div>
        </div>
      ) : type === 'date' ? (
        <div className="relative">
          <input
            type="date"
            value={service[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            onFocus={() => setActiveField(field)}
            onBlur={() => setActiveField(null)}
            className="w-full px-4 py-4 bg-dark-input border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50 focus:scale-[1.02] input-focus text-lg pr-12"
            style={{ minHeight: '56px' }}
          />
          <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 transition-all duration-300 group-hover:text-primary-blue group-hover:scale-110" />
        </div>
      ) : type === 'number' ? (
        <div className="relative">
          <input
            type="number"
            value={service[field] || ''}
            onChange={(e) => handleChange(field, parseFloat(e.target.value) || 0)}
            onFocus={() => setActiveField(field)}
            onBlur={() => setActiveField(null)}
            placeholder={placeholder}
            className="w-full px-4 py-4 bg-dark-input border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50 focus:scale-[1.02] input-focus text-lg"
            style={{ minHeight: '56px' }}
          />
          <DollarSign className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 transition-all duration-300 group-hover:text-primary-blue group-hover:scale-110" />
        </div>
      ) : (
        <input
          type={type}
          value={service[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          onFocus={() => setActiveField(field)}
          onBlur={() => setActiveField(null)}
          placeholder={placeholder}
          className="w-full px-4 py-4 bg-dark-input border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50 focus:scale-[1.02] input-focus text-lg"
          style={{ minHeight: '56px' }}
        />
      )}
      
      {activeField === field && (
        <div className="mt-2 p-2 bg-primary-blue/10 border border-primary-blue/20 rounded-lg animate-fade-in-up">
          <p className="text-xs text-primary-blue">
            {type === 'select' ? 'Tap to select an option' : 
             type === 'date' ? 'Tap to open date picker' :
             type === 'number' ? 'Enter amount in dollars' :
             'Type your information'}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TouchField
          label="Date"
          icon={Calendar}
          field="date"
          type="date"
          required
        />
        
        <TouchField
          label="Building"
          icon={Building}
          field="building"
          type="select"
          required
          placeholder="Select Building"
          options={buildings.map(b => ({ value: b.id, label: b.name }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TouchField
          label="Unit"
          icon={Home}
          field="unit"
          type="select"
          required
          placeholder="Select Unit"
          options={units.map(u => ({ value: u.id, label: u.name }))}
        />
        
        <TouchField
          label="Service Amount"
          icon={DollarSign}
          field="amount"
          type="number"
          required
          placeholder="0.00"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TouchField
          label="Extra Time"
          icon={Clock}
          field="extraTime"
          type="select"
          placeholder="Select extra time"
          options={[
            { value: 'No extra time', label: 'No extra time' },
            { value: '30 minutes', label: '30 minutes' },
            { value: '1 hour', label: '1 hour' },
            { value: '1.5 hours', label: '1.5 hours' },
            { value: '2 hours', label: '2 hours' }
          ]}
        />
        
        <TouchField
          label="Items Cost"
          icon={Package}
          field="itemsCost"
          type="number"
          placeholder="0.00"
        />
      </div>

      <TouchField
        label="Purchased Items"
        icon={Package}
        field="purchasedItems"
        placeholder="List purchased items..."
      />

      <TouchField
        label="Extras Description"
        icon={Package}
        field="extrasDescription"
        placeholder="Describe any extras..."
      />
    </div>
  );
};

export default TouchOptimizedForm; 