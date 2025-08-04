import { Building, Unit } from '../types';

export interface GoogleSheetsConfig {
  apiKey: string;
  spreadsheetId: string;
  buildingsSheetName: string;
  unitsSheetName: string;
  cacheTimeout: number;
}

export interface SheetsData {
  buildings: Building[];
  units: Unit[];
}

export interface CacheData {
  data: SheetsData;
  lastUpdated: number;
  version: string;
  isPermanent: boolean;
}

export class GoogleSheetsService {
  private config: GoogleSheetsConfig;
  private cache: SheetsData | null = null;
  private cacheTimeout: number;
  private lastCacheTime: number = 0;
  private readonly CACHE_KEY = 'google_sheets_cache';
  private readonly CACHE_VERSION = '1.0.0';
  private isPermanentCache: boolean = true; // Cache permanente por defecto

  constructor(config: GoogleSheetsConfig) {
    this.config = config;
    this.cacheTimeout = config.cacheTimeout;
    this.loadPersistentCache();
  }

  /**
   * Helper function to make API requests with proper headers
   */
  private async makeApiRequest(url: string): Promise<Response> {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Load cache from localStorage
   */
  private loadPersistentCache(): void {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (cached) {
        const cacheData: CacheData = JSON.parse(cached);
        
        // Check if cache is valid and version matches
        if (cacheData.version === this.CACHE_VERSION) {
          this.cache = cacheData.data;
          this.lastCacheTime = cacheData.lastUpdated;
          this.isPermanentCache = cacheData.isPermanent ?? true;
        } else {
          this.clearPersistentCache();
        }
      }
    } catch (error) {
      console.error('Error loading cache from localStorage:', error);
      this.clearPersistentCache();
    }
  }

  /**
   * Save cache to localStorage
   */
  private savePersistentCache(data: SheetsData): void {
    try {
      const cacheData: CacheData = {
        data,
        lastUpdated: Date.now(),
        version: this.CACHE_VERSION,
        isPermanent: this.isPermanentCache
      };
      
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error saving cache to localStorage:', error);
    }
  }

  /**
   * Clear persistent cache
   */
  private clearPersistentCache(): void {
    try {
      localStorage.removeItem(this.CACHE_KEY);
      this.cache = null;
      this.lastCacheTime = 0;
    } catch (error) {
      console.error('Error clearing persistent cache:', error);
    }
  }

  /**
   * Check if cache is still valid
   */
  private isCacheValid(timestamp: number): boolean {
    if (this.isPermanentCache) {
      return true; // Cache permanente nunca expira automáticamente
    }
    
    const now = Date.now();
    return (now - timestamp) < this.cacheTimeout;
  }

  /**
   * Set cache mode (permanent or temporary)
   */
  setCacheMode(isPermanent: boolean): void {
    this.isPermanentCache = isPermanent;
  }

  /**
   * Get cache status information
   */
  getCacheStatus(): {
    hasCache: boolean;
    lastUpdated: Date | null;
    isExpired: boolean;
    isPermanent: boolean;
    timeUntilExpiry: number | null;
  } {
    if (!this.cache || this.lastCacheTime === 0) {
      return {
        hasCache: false,
        lastUpdated: null,
        isExpired: true,
        isPermanent: this.isPermanentCache,
        timeUntilExpiry: null
      };
    }

    const now = Date.now();
    const timeSinceUpdate = now - this.lastCacheTime;
    const isExpired = !this.isPermanentCache && timeSinceUpdate >= this.cacheTimeout;
    const timeUntilExpiry = this.isPermanentCache ? null : 
      (isExpired ? null : this.cacheTimeout - timeSinceUpdate);

    return {
      hasCache: true,
      lastUpdated: new Date(this.lastCacheTime),
      isExpired,
      isPermanent: this.isPermanentCache,
      timeUntilExpiry
    };
  }

  /**
   * Force refresh cache (ignores cache and fetches fresh data)
   */
  async forceRefresh(): Promise<SheetsData> {
    this.clearPersistentCache();
    return this.getAllData();
  }

  /**
   * Clear cache manually (admin function)
   */
  clearCacheManually(): void {
    this.clearPersistentCache();
  }

  /**
   * Check if the service is available and configured
   */
  async isServiceAvailable(): Promise<boolean> {
    try {
      // Check if API key is configured
      if (!this.config.apiKey || this.config.apiKey === 'mock-api-key') {
        return false;
      }

      // Test API connection with proper headers
      const response = await this.makeApiRequest(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}?key=${this.config.apiKey}`
      );

      if (!response.ok) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Google Sheets service not available:', error);
      return false;
    }
  }

  /**
   * Get all buildings from Google Sheets
   */
  async getBuildings(): Promise<Building[]> {
    try {
      // Check cache first
      if (this.cache && this.isCacheValid(this.lastCacheTime)) {
        return this.cache.buildings;
      }

      if (!(await this.isServiceAvailable())) {
        return this.getMockBuildings();
      }

      const response = await this.makeApiRequest(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.buildingsSheetName}?key=${this.config.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch buildings: ${response.status}`);
      }

      const data = await response.json();
      const rows = data.values || [];

      // Skip header row and parse data
      const buildings: Building[] = rows.slice(1).map((row: any[], index: number) => ({
        id: row[0] || `building-${index + 1}`,
        name: row[1] || `Building ${index + 1}`,
        address: row[2] || '',
        city: row[3] || '',
        state: row[4] || '',
        zipCode: row[5] || ''
      }));

      return buildings;
    } catch (error) {
      console.error('Error fetching buildings from Google Sheets:', error);
      return this.getMockBuildings();
    }
  }

  /**
   * Get all units from Google Sheets
   */
  async getUnits(): Promise<Unit[]> {
    try {
      // Check cache first
      if (this.cache && this.isCacheValid(this.lastCacheTime)) {
        return this.cache.units;
      }

      if (!(await this.isServiceAvailable())) {
        return this.getMockUnits();
      }

      const response = await this.makeApiRequest(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.unitsSheetName}?key=${this.config.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch units: ${response.status}`);
      }

      const data = await response.json();
      const rows = data.values || [];

      // Skip header row and parse data
      const units: Unit[] = rows.slice(1).map((row: any[], index: number) => ({
        id: row[0] || `unit-${index + 1}`,
        name: row[1] || `Unit ${index + 1}`,
        buildingId: row[2] || '',
        servicePrice: parseFloat(row[3]) || 0,
        type: row[4] || 'apartment',
        bedrooms: parseInt(row[5]) || 1,
        bathrooms: parseInt(row[6]) || 1,
        squareFootage: parseInt(row[7]) || 0
      }));

      return units;
    } catch (error) {
      console.error('Error fetching units from Google Sheets:', error);
      return this.getMockUnits();
    }
  }

  /**
   * Get a specific building by ID
   */
  async getBuilding(buildingId: string): Promise<Building | null> {
    const buildings = await this.getBuildings();
    return buildings.find(b => b.id === buildingId) || null;
  }

  /**
   * Get a specific unit by ID
   */
  async getUnit(unitId: string): Promise<Unit | null> {
    const units = await this.getUnits();
    return units.find(u => u.id === unitId) || null;
  }

  /**
   * Validate if a building-unit combination exists
   */
  async validateBuildingUnit(buildingId: string, unitId: string): Promise<boolean> {
    const building = await this.getBuilding(buildingId);
    const unit = await this.getUnit(unitId);
    
    return !!(building && unit && unit.buildingId === buildingId);
  }

  /**
   * Get all data (buildings and units) with persistent caching
   */
  async getAllData(): Promise<SheetsData> {
    // Check if cache is valid
    if (this.cache && this.isCacheValid(this.lastCacheTime)) {
      return this.cache;
    }

    try {
      const [buildings, units] = await Promise.all([
        this.getBuildings(),
        this.getUnits()
      ]);

      const data: SheetsData = { buildings, units };
      
      // Update cache and save to localStorage
      this.cache = data;
      this.lastCacheTime = Date.now();
      this.savePersistentCache(data);

      return data;
    } catch (error) {
      console.error('Error fetching all data:', error);
      return {
        buildings: this.getMockBuildings(),
        units: this.getMockUnits()
      };
    }
  }

  /**
   * Clear the cache (both memory and localStorage)
   */
  clearCache(): void {
    this.cache = null;
    this.lastCacheTime = 0;
    this.clearPersistentCache();
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<GoogleSheetsConfig>): void {
    this.config = { ...this.config, ...config };
    this.clearCache(); // Clear cache when config changes
  }

  /**
   * Get mock buildings for fallback
   */
  private getMockBuildings(): Building[] {
    return [
      {
        id: 'building-1',
        name: 'Sunset Apartments',
        address: '123 Sunset Blvd',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210'
      },
      {
        id: 'building-2',
        name: 'Ocean View Condos',
        address: '456 Ocean Drive',
        city: 'Miami Beach',
        state: 'FL',
        zipCode: '33139'
      },
      {
        id: 'building-3',
        name: 'Downtown Lofts',
        address: '789 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    ];
  }

  /**
   * Get mock units for fallback
   */
  private getMockUnits(): Unit[] {
    return [
      {
        id: 'unit-1',
        name: 'Unit 101',
        buildingId: 'building-1',
        servicePrice: 120,
        type: 'apartment',
        bedrooms: 2,
        bathrooms: 1,
        squareFootage: 850
      },
      {
        id: 'unit-2',
        name: 'Unit 102',
        buildingId: 'building-1',
        servicePrice: 140,
        type: 'apartment',
        bedrooms: 2,
        bathrooms: 2,
        squareFootage: 950
      },
      {
        id: 'unit-3',
        name: 'Unit 201',
        buildingId: 'building-2',
        servicePrice: 180,
        type: 'condo',
        bedrooms: 3,
        bathrooms: 2,
        squareFootage: 1200
      },
      {
        id: 'unit-4',
        name: 'Unit 202',
        buildingId: 'building-2',
        servicePrice: 200,
        type: 'condo',
        bedrooms: 3,
        bathrooms: 2.5,
        squareFootage: 1400
      },
      {
        id: 'unit-5',
        name: 'Loft A',
        buildingId: 'building-3',
        servicePrice: 160,
        type: 'loft',
        bedrooms: 1,
        bathrooms: 1,
        squareFootage: 1100
      }
    ];
  }
}

// Export default instance with configuration
export const googleSheetsService = new GoogleSheetsService({
  apiKey: process.env.REACT_APP_GOOGLE_SHEETS_API_KEY || 'AIzaSyCZAuPA0KRbK0DXrVtwvT291M-OhqPCq10',
  spreadsheetId: process.env.REACT_APP_GOOGLE_SHEETS_SPREADSHEET_ID || '1LKY_QRGT4CoWgfjb0VUeX1_2_MvwlG-u4MLfkw_exkQ',
  buildingsSheetName: process.env.REACT_APP_GOOGLE_SHEETS_BUILDINGS_SHEET || 'Buildings',
  unitsSheetName: process.env.REACT_APP_GOOGLE_SHEETS_UNITS_SHEET || 'Units',
  cacheTimeout: 24 * 60 * 60 * 1000 // 24 hours (for temporary mode)
}); 