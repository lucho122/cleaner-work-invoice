import React, { useState, useEffect } from 'react';
import { Database, Wifi } from 'lucide-react';
import { googleSheetsService } from '../services/googleSheetsService';

interface GoogleSheetsStatusProps {
  onStatusChange?: (isConnected: boolean) => void;
}

const GoogleSheetsStatus: React.FC<GoogleSheetsStatusProps> = ({
  onStatusChange
}) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const connected = await googleSheetsService.isServiceAvailable();
      setIsConnected(connected);
      setLastCheck(new Date());
      onStatusChange?.(connected);
    } catch (error) {
      console.error('Error checking Google Sheets connection:', error);
      setIsConnected(false);
      onStatusChange?.(false);
    }
  };

  const getStatusText = () => {
    if (isConnected === null) return 'Checking connection...';
    return isConnected ? 'Connected to Google Sheets' : 'Using test data';
  };

  const getStatusColor = () => {
    if (isConnected === null) return 'text-text-light';
    return isConnected ? 'text-success-green' : 'text-warning-yellow';
  };

  if (isConnected === null) {
    return (
      <div className="glass-card rounded-xl p-4 border border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-info rounded-xl shadow-glow-blue">
            <Database className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Google Sheets Status</h3>
            <p className="text-sm text-text-light">Checking connection...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-4 border border-gray-700/50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-info rounded-xl shadow-glow-blue">
          <Database className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">Google Sheets Status</h3>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
            {isConnected && (
              <div className="w-2 h-2 bg-success-green rounded-full animate-pulse-soft"></div>
            )}
          </div>
          {lastCheck && (
            <p className="text-xs text-text-light">
              Last check: {lastCheck.toLocaleTimeString()}
            </p>
          )}
        </div>
        
        {isConnected && (
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-success-green" />
            <span className="text-xs text-success-green">Active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleSheetsStatus; 