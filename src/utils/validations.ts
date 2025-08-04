import { Cleaner, CleaningService, CheckinService } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const validateCleaner = (cleaner: Cleaner): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!cleaner.name.trim()) {
    errors.push('Cleaner name is required');
  }

  if (!cleaner.startDate) {
    errors.push('Start date is required');
  }

  if (!cleaner.endDate) {
    errors.push('End date is required');
  }

  // Date logic
  if (cleaner.startDate && cleaner.endDate) {
    const startDate = new Date(cleaner.startDate);
    const endDate = new Date(cleaner.endDate);
    
    if (startDate > endDate) {
      errors.push('Start date cannot be after end date');
    }

    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff > 31) {
      warnings.push('Period is longer than 31 days - consider breaking into smaller periods');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const validateCleaningService = (service: CleaningService, buildings: any[], units: any[]): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!service.building) {
    errors.push('Building selection is required');
  }

  if (!service.unit) {
    errors.push('Unit selection is required');
  }

  if (service.amount <= 0) {
    errors.push('Service amount must be greater than 0');
  }

  // Business logic validations
  if (service.cleaningWithPartner && !service.partnerName.trim()) {
    errors.push('Partner name is required when cleaning with partner');
  }

  if (service.extraTime !== 'No extra time' && !service.extrasDescription.trim()) {
    warnings.push('Consider adding description for extra time work');
  }

  if (service.itemsCost > 0 && !service.purchasedItems.trim()) {
    warnings.push('Consider listing purchased items when there is a cost');
  }

  // Date validation
  if (service.date) {
    const serviceDate = new Date(service.date);
    const today = new Date();
    if (serviceDate > today) {
      warnings.push('Service date is in the future');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const validateCheckinService = (service: CheckinService, buildings: any[], units: any[]): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!service.building) {
    errors.push('Building selection is required');
  }

  if (!service.unit) {
    errors.push('Unit selection is required');
  }

  if (service.amount <= 0) {
    errors.push('Check-in amount must be greater than 0');
  }

  // Date validation
  if (service.date) {
    const serviceDate = new Date(service.date);
    const today = new Date();
    if (serviceDate > today) {
      warnings.push('Check-in date is in the future');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const validateInvoiceGeneration = (
  cleaner: Cleaner,
  services: CleaningService[],
  checkinServices: CheckinService[],
  buildings: any[],
  units: any[]
): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate cleaner
  const cleanerValidation = validateCleaner(cleaner);
  errors.push(...cleanerValidation.errors);
  warnings.push(...cleanerValidation.warnings);

  // Validate services
  if (services.length === 0 && checkinServices.length === 0) {
    errors.push('At least one service (cleaning or check-in) is required');
  }

  services.forEach((service, index) => {
    const serviceValidation = validateCleaningService(service, buildings, units);
    serviceValidation.errors.forEach(error => {
      errors.push(`Service ${index + 1}: ${error}`);
    });
    serviceValidation.warnings.forEach(warning => {
      warnings.push(`Service ${index + 1}: ${warning}`);
    });
  });

  checkinServices.forEach((service, index) => {
    const serviceValidation = validateCheckinService(service, buildings, units);
    serviceValidation.errors.forEach(error => {
      errors.push(`Check-in ${index + 1}: ${error}`);
    });
    serviceValidation.warnings.forEach(warning => {
      warnings.push(`Check-in ${index + 1}: ${warning}`);
    });
  });

  // Business logic validations
  const totalAmount = services.reduce((sum, service) => {
    const extraTimeCost = calculateExtraTimeCost(service.extraTime);
    return sum + service.amount + extraTimeCost + service.itemsCost;
  }, 0) + checkinServices.reduce((sum, service) => sum + service.amount, 0);

  if (totalAmount > 10000) {
    warnings.push('Total amount is very high - please verify all entries');
  }

  const uniqueBuildings = new Set([
    ...services.map(s => s.building).filter(b => b),
    ...checkinServices.map(s => s.building).filter(b => b)
  ]);

  if (uniqueBuildings.size > 20) {
    warnings.push('Many different buildings - consider grouping by location');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const calculateExtraTimeCost = (extraTime: string): number => {
  if (extraTime === 'No extra time') return 0;
  
  const timeMap: { [key: string]: number } = {
    '30 minutes': 30,
    '1 hour': 60,
    '1.5 hours': 90,
    '2 hours': 120
  };
  
  const minutes = timeMap[extraTime] || 0;
  const quarterHours = Math.ceil(minutes / 15);
  return quarterHours * 4.5; // $4.50 per 15 minutes
};

export const calculateServiceTotal = (service: CleaningService): number => {
  const extraTimeCost = calculateExtraTimeCost(service.extraTime);
  return service.amount + extraTimeCost + service.itemsCost;
};

export const calculateInvoiceTotal = (
  services: CleaningService[],
  checkinServices: CheckinService[]
): number => {
  const servicesTotal = services.reduce((sum, service) => {
    return sum + calculateServiceTotal(service);
  }, 0);

  const checkinTotal = checkinServices.reduce((sum, service) => {
    return sum + service.amount;
  }, 0);

  return servicesTotal + checkinTotal;
}; 