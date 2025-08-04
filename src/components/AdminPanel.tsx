import React, { useState, useEffect } from 'react';
import { Settings, Trash2, RefreshCw, Database, Shield, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { googleSheetsService } from '../services/googleSheetsService';

interface AdminPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isVisible, onClose }) => {
  const [cacheStatus, setCacheStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [cacheMode, setCacheMode] = useState<boolean>(true);

  useEffect(() => {
    if (isVisible) {
      updateCacheStatus();
    }
  }, [isVisible]);

  const updateCacheStatus = () => {
    const status = googleSheetsService.getCacheStatus();
    setCacheStatus(status);
    setCacheMode(status.isPermanent);
  };

  const handleClearCache = async () => {
    setIsLoading(true);
    try {
      googleSheetsService.clearCacheManually();
      updateCacheStatus();
    } catch (error) {
      console.error('Error clearing cache:', error);
    } finally {
      setIsLoading(false);
      setShowConfirmClear(false);
    }
  };

  const handleRefreshData = async () => {
    setIsLoading(true);
    try {
      await googleSheetsService.forceRefresh();
      updateCacheStatus();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCacheModeChange = (isPermanent: boolean) => {
    googleSheetsService.setCacheMode(isPermanent);
    setCacheMode(isPermanent);
    updateCacheStatus();
  };

  const formatTimeUntilExpiry = (milliseconds: number | null) => {
    if (!milliseconds) return null;
    
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-warning rounded-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Panel Administrativo</h3>
              <p className="text-sm text-text-light">Gestión de cache y datos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-light hover:text-white hover:bg-gray-600/50 rounded-lg transition-all duration-300"
          >
            ×
          </button>
        </div>

        {/* Cache Status */}
        {cacheStatus && (
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-dark-input rounded-lg border border-gray-600/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-info-blue" />
                  <span className="text-white font-medium">Estado del Cache</span>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  cacheStatus.hasCache 
                    ? 'bg-success-green/20 text-success-green' 
                    : 'bg-warning-yellow/20 text-warning-yellow'
                }`}>
                  {cacheStatus.hasCache ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  {cacheStatus.hasCache ? 'Activo' : 'Inactivo'}
                </div>
              </div>
              
              {cacheStatus.hasCache && (
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-text-light" />
                    <span className="text-text-light">Última actualización:</span>
                    <span className="text-white">
                      {cacheStatus.lastUpdated?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-text-light" />
                    <span className="text-text-light">Modo:</span>
                    <span className={`font-medium ${
                      cacheStatus.isPermanent ? 'text-success-green' : 'text-warning-yellow'
                    }`}>
                      {cacheStatus.isPermanent ? 'Permanente' : 'Temporal'}
                    </span>
                  </div>
                  
                  {!cacheStatus.isPermanent && cacheStatus.timeUntilExpiry && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-text-light" />
                      <span className="text-text-light">Expira en:</span>
                      <span className="text-white">
                        {formatTimeUntilExpiry(cacheStatus.timeUntilExpiry)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cache Mode Toggle */}
        <div className="mb-6">
          <h4 className="text-white font-medium mb-3">Modo de Cache</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="cacheMode"
                checked={cacheMode}
                onChange={() => handleCacheModeChange(true)}
                className="w-4 h-4 text-primary-blue bg-dark-input border-gray-600 focus:ring-primary-blue"
              />
              <div>
                <span className="text-white font-medium">Permanente</span>
                <p className="text-xs text-text-light">
                  Los datos permanecen en cache hasta limpieza manual
                </p>
              </div>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="cacheMode"
                checked={!cacheMode}
                onChange={() => handleCacheModeChange(false)}
                className="w-4 h-4 text-primary-blue bg-dark-input border-gray-600 focus:ring-primary-blue"
              />
              <div>
                <span className="text-white font-medium">Temporal (24h)</span>
                <p className="text-xs text-text-light">
                  Los datos expiran automáticamente después de 24 horas
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleRefreshData}
            disabled={isLoading}
            className="w-full group px-4 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-glow-blue transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
            {isLoading ? 'Actualizando...' : 'Actualizar Datos'}
          </button>
          
          <button
            onClick={() => setShowConfirmClear(true)}
            disabled={isLoading}
            className="w-full group px-4 py-3 bg-gradient-danger text-white rounded-lg hover:shadow-glow-red transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4 group-hover:rotate-12" />
            Limpiar Cache
          </button>
        </div>

        {/* Confirmation Modal */}
        {showConfirmClear && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
            <div className="glass-card rounded-xl p-6 max-w-sm w-full animate-fade-in-up">
              <div className="text-center">
                <div className="p-3 bg-gradient-danger rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-medium mb-2">¿Limpiar Cache?</h4>
                <p className="text-sm text-text-light mb-6">
                  Esta acción eliminará todos los datos cacheados. 
                  Los datos se volverán a cargar la próxima vez que se necesiten.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmClear(false)}
                    className="flex-1 px-4 py-2 bg-dark-input text-white rounded-lg hover:bg-gray-600/50 transition-all duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleClearCache}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-gradient-danger text-white rounded-lg hover:shadow-glow-red transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? 'Limpiando...' : 'Limpiar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 