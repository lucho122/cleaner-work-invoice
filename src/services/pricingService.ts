import { CleaningService, CheckinService, Unit } from '../types';

export interface PricingConfig {
  basePrice: number;
  partnerDiscount: number; // Percentage (0.5 = 50%)
  extraTimeRate: number; // Per 15 minutes
  minimumServiceAmount: number;
  maximumServiceAmount: number;
}

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  basePrice: 0,
  partnerDiscount: 0.5, // 50% discount for partners
  extraTimeRate: 4.5, // $4.50 per 15 minutes
  minimumServiceAmount: 10,
  maximumServiceAmount: 1000
};

export class PricingService {
  private config: PricingConfig;
  private units: Unit[];

  constructor(config: PricingConfig = DEFAULT_PRICING_CONFIG, units: Unit[] = []) {
    this.config = config;
    this.units = units;
  }

  /**
   * Calculate the base price for a service based on unit
   */
  calculateBasePrice(unitId: string): number {
    const unit = this.units.find(u => u.id === unitId);
    return unit?.servicePrice || this.config.basePrice;
  }

  /**
   * Calculate the final price for a cleaning service
   */
  calculateServicePrice(service: CleaningService): number {
    let basePrice = this.calculateBasePrice(service.unit);

    // Apply partner discount if applicable
    if (service.cleaningWithPartner) {
      basePrice = basePrice * this.config.partnerDiscount;
    }

    // Add extra time cost
    const extraTimeCost = this.calculateExtraTimeCost(service.extraTime);

    // Add items cost
    const itemsCost = service.itemsCost || 0;

    const totalPrice = basePrice + extraTimeCost + itemsCost;

    // Validate against minimum and maximum
    if (totalPrice < this.config.minimumServiceAmount) {
      console.warn(`Service price ${totalPrice} is below minimum ${this.config.minimumServiceAmount}`);
    }

    if (totalPrice > this.config.maximumServiceAmount) {
      console.warn(`Service price ${totalPrice} is above maximum ${this.config.maximumServiceAmount}`);
    }

    return totalPrice;
  }

  /**
   * Calculate extra time cost based on time string
   */
  calculateExtraTimeCost(extraTime: string): number {
    if (extraTime === 'No extra time') return 0;
    
    const timeMap: { [key: string]: number } = {
      '30 minutes': 30,
      '1 hour': 60,
      '1.5 hours': 90,
      '2 hours': 120
    };
    
    const minutes = timeMap[extraTime] || 0;
    const quarterHours = Math.ceil(minutes / 15);
    return quarterHours * this.config.extraTimeRate;
  }

  /**
   * Calculate total for all cleaning services
   */
  calculateCleaningServicesTotal(services: CleaningService[]): number {
    return services.reduce((total, service) => {
      return total + this.calculateServicePrice(service);
    }, 0);
  }

  /**
   * Calculate total for all check-in services
   */
  calculateCheckinServicesTotal(checkinServices: CheckinService[]): number {
    return checkinServices.reduce((total, service) => {
      return total + (service.amount || 0);
    }, 0);
  }

  /**
   * Calculate invoice total
   */
  calculateInvoiceTotal(
    cleaningServices: CleaningService[],
    checkinServices: CheckinService[]
  ): number {
    const cleaningTotal = this.calculateCleaningServicesTotal(cleaningServices);
    const checkinTotal = this.calculateCheckinServicesTotal(checkinServices);
    
    return cleaningTotal + checkinTotal;
  }

  /**
   * Get pricing breakdown for a service
   */
  getServiceBreakdown(service: CleaningService): {
    basePrice: number;
    partnerDiscount: number;
    extraTimeCost: number;
    itemsCost: number;
    total: number;
  } {
    const basePrice = this.calculateBasePrice(service.unit);
    const partnerDiscount = service.cleaningWithPartner ? 
      basePrice * (1 - this.config.partnerDiscount) : 0;
    const extraTimeCost = this.calculateExtraTimeCost(service.extraTime);
    const itemsCost = service.itemsCost || 0;
    const total = this.calculateServicePrice(service);

    return {
      basePrice,
      partnerDiscount,
      extraTimeCost,
      itemsCost,
      total
    };
  }

  /**
   * Validate pricing for a service
   */
  validateServicePricing(service: CleaningService): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    const total = this.calculateServicePrice(service);

    if (total < this.config.minimumServiceAmount) {
      errors.push(`Service total ($${total}) is below minimum ($${this.config.minimumServiceAmount})`);
    }

    if (total > this.config.maximumServiceAmount) {
      warnings.push(`Service total ($${total}) is above maximum ($${this.config.maximumServiceAmount})`);
    }

    if (service.cleaningWithPartner && !service.partnerName) {
      errors.push('Partner name is required when cleaning with partner');
    }

    if (service.extraTime !== 'No extra time' && !service.extrasDescription) {
      warnings.push('Consider adding description for extra time work');
    }

    if (service.itemsCost > 0 && !service.purchasedItems) {
      warnings.push('Consider listing purchased items when there is a cost');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Update units data
   */
  updateUnits(units: Unit[]): void {
    this.units = units;
  }

  /**
   * Update pricing configuration
   */
  updateConfig(config: Partial<PricingConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// Export default instance
export const pricingService = new PricingService(); 