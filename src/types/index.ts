export interface Cleaner {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface CleaningService {
  id: string;
  serviceType: ServiceType;
  date: string;
  building: string;
  unit: string;
  amount: number;
  cleaningWithPartner: boolean;
  partnerName: string;
  extraTime: string;
  extrasDescription: string;
  purchasedItems: string;
  itemsCost: number;
  isValid: boolean;
}

export interface CheckinService {
  id: string;
  serviceType: ServiceType;
  date: string;
  building: string;
  unit: string;
  amount: number;
  isValid: boolean;
}

export interface InvoiceData {
  cleaner: Cleaner;
  services: CleaningService[];
  checkinServices: CheckinService[];
  totalAmount: number;
}

export type ServiceType = 'normal' | 'deep' | 'minor';

export interface Building {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Unit {
  id: string;
  name: string;
  buildingId: string;
  servicePrice: number;
  type: 'apartment' | 'condo' | 'loft' | 'house';
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
}

export interface DateGroup {
  id: string;
  date: string;
  cleaningServices: CleaningService[];
  checkinServices: CheckinService[];
} 