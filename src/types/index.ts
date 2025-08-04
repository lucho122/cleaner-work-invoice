export interface Cleaner {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface Building {
  id: string;
  name: string;
  address: string;
}

export interface Unit {
  id: string;
  buildingId: string;
  name: string;
  servicePrice: number;
}

export interface CleaningService {
  id: string;
  type: 'normal' | 'deep' | 'minor';
  date: string;
  building: string;
  unit: string;
  serviceAmount: number;
  cleaningWithPartner: boolean;
  partnerName: string;
  extraTime: string;
  extrasDescription: string;
  purchasedItems: string;
  itemsCost: number;
}

export interface CheckinService {
  id: string;
  type: 'checkin';
  date: string;
  building: string;
  unit: string;
  amount: number;
}

export interface InvoiceData {
  cleaner: Cleaner;
  services: CleaningService[];
  checkinServices: CheckinService[];
  totalAmount: number;
}

export type ServiceType = 'normal' | 'deep' | 'minor'; 