import { Building, Unit } from '../types';

// Mock data - In a real implementation, this would fetch from Google Sheets API
export const mockBuildings: Building[] = [
  { id: '1', name: '21 Iceboat', address: '21 Iceboat Dr, Miami, FL' },
  { id: '2', name: 'Building B', address: '123 Main St, Miami, FL' },
  { id: '3', name: 'Building C', address: '456 Oak Ave, Miami, FL' },
  { id: '4', name: 'Building D', address: '789 Pine Rd, Miami, FL' },
];

export const mockUnits: Unit[] = [
  // 21 Iceboat units
  { id: '1', buildingId: '1', name: '3209', servicePrice: 120.00 },
  { id: '2', buildingId: '1', name: '3208', servicePrice: 110.00 },
  { id: '3', buildingId: '1', name: '3207', servicePrice: 125.00 },
  { id: '4', buildingId: '1', name: '3206', servicePrice: 115.00 },
  { id: '5', buildingId: '1', name: '3205', servicePrice: 130.00 },
  { id: '6', buildingId: '1', name: '3204', servicePrice: 105.00 },
  
  // Building B units
  { id: '7', buildingId: '2', name: 'A1', servicePrice: 100.00 },
  { id: '8', buildingId: '2', name: 'A2', servicePrice: 95.00 },
  { id: '9', buildingId: '2', name: 'B1', servicePrice: 110.00 },
  { id: '10', buildingId: '2', name: 'B2', servicePrice: 105.00 },
  
  // Building C units
  { id: '11', buildingId: '3', name: 'C1', servicePrice: 90.00 },
  { id: '12', buildingId: '3', name: 'C2', servicePrice: 85.00 },
  
  // Building D units
  { id: '13', buildingId: '4', name: 'D1', servicePrice: 140.00 },
  { id: '14', buildingId: '4', name: 'D2', servicePrice: 135.00 },
];

export class GoogleSheetsService {
  // In a real implementation, this would use Google Sheets API
  static async getBuildings(): Promise<Building[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockBuildings;
  }

  static async getUnits(): Promise<Unit[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockUnits;
  }

  static async getUnitsByBuilding(buildingId: string): Promise<Unit[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockUnits.filter(unit => unit.buildingId === buildingId);
  }

  static getUnitPrice(unitId: string, withPartner: boolean): number {
    const unit = mockUnits.find(u => u.id === unitId);
    if (!unit) return 0;
    
    // If cleaning with partner, divide the price by 2
    return withPartner ? unit.servicePrice / 2 : unit.servicePrice;
  }
} 