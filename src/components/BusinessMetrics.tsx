import React from 'react';
import { TrendingUp, DollarSign, Calendar, Users, Clock, AlertTriangle } from 'lucide-react';
import { Cleaner, CleaningService, CheckinService } from '../types';
import { pricingService } from '../services/pricingService';

interface BusinessMetricsProps {
  cleaner: Cleaner;
  services: CleaningService[];
  checkinServices: CheckinService[];
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color, trend, subtitle }) => (
  <div className={`glass-card rounded-xl p-4 border border-gray-700/50 animate-fade-in-up hover:shadow-card-hover transition-all duration-300 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-text-light font-medium">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        {subtitle && <p className="text-xs text-text-light mt-1">{subtitle}</p>}
      </div>
      <div className="p-3 bg-gradient-glass rounded-lg">
        {icon}
      </div>
    </div>
    {trend && (
      <div className="flex items-center gap-1 mt-2">
        <TrendingUp className={`w-4 h-4 ${trend === 'up' ? 'text-success-green' : trend === 'down' ? 'text-danger-red' : 'text-text-light'}`} />
        <span className={`text-xs ${trend === 'up' ? 'text-success-green' : trend === 'down' ? 'text-danger-red' : 'text-text-light'}`}>
          {trend === 'up' ? 'Increasing' : trend === 'down' ? 'Decreasing' : 'Stable'}
        </span>
      </div>
    )}
  </div>
);

const BusinessMetrics: React.FC<BusinessMetricsProps> = ({
  cleaner,
  services,
  checkinServices
}) => {
  // Calculate metrics
  const totalRevenue = pricingService.calculateInvoiceTotal(services, checkinServices);
  const totalServices = services.length + checkinServices.length;
  const uniqueBuildings = new Set([
    ...services.map(s => s.building).filter(b => b),
    ...checkinServices.map(s => s.building).filter(b => b)
  ]).size;
  
  const averageServiceValue = totalServices > 0 ? totalRevenue / totalServices : 0;
  const partnerServices = services.filter(s => s.cleaningWithPartner).length;
  const extraTimeServices = services.filter(s => s.extraTime !== 'No extra time').length;
  
  // Calculate period duration
  const startDate = new Date(cleaner.startDate);
  const endDate = new Date(cleaner.endDate);
  const periodDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate efficiency metrics
  const servicesPerDay = periodDays > 0 ? totalServices / periodDays : 0;
  const revenuePerDay = periodDays > 0 ? totalRevenue / periodDays : 0;
  
  // Calculate partner efficiency
  const partnerEfficiency = totalServices > 0 ? (partnerServices / totalServices) * 100 : 0;
  
  // Calculate extra time impact
  const extraTimeRevenue = services.reduce((sum, service) => {
    const extraTimeCost = pricingService.calculateExtraTimeCost(service.extraTime);
    return sum + extraTimeCost;
  }, 0);
  const extraTimePercentage = totalRevenue > 0 ? (extraTimeRevenue / totalRevenue) * 100 : 0;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-primary rounded-lg shadow-glow-blue">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Business Metrics</h3>
          <p className="text-sm text-text-light">Real-time performance indicators</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Revenue */}
        <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<DollarSign className="w-6 h-6 text-white" />}
          color="hover:shadow-glow-green"
          trend={totalRevenue > 0 ? 'up' : 'neutral'}
          subtitle={`${totalServices} services`}
        />

        {/* Average Service Value */}
        <MetricCard
          title="Average Service Value"
          value={`$${averageServiceValue.toFixed(2)}`}
          icon={<DollarSign className="w-6 h-6 text-white" />}
          color="hover:shadow-glow-blue"
          trend={averageServiceValue > 100 ? 'up' : 'neutral'}
          subtitle="Per service"
        />

        {/* Services per Day */}
        <MetricCard
          title="Services per Day"
          value={servicesPerDay.toFixed(1)}
          icon={<Calendar className="w-6 h-6 text-white" />}
          color="hover:shadow-glow-purple"
          trend={servicesPerDay > 2 ? 'up' : 'neutral'}
          subtitle={`${periodDays} day period`}
        />

        {/* Revenue per Day */}
        <MetricCard
          title="Revenue per Day"
          value={`$${revenuePerDay.toFixed(2)}`}
          icon={<TrendingUp className="w-6 h-6 text-white" />}
          color="hover:shadow-glow-pink"
          trend={revenuePerDay > 200 ? 'up' : 'neutral'}
          subtitle="Daily average"
        />

        {/* Partner Efficiency */}
        <MetricCard
          title="Partner Efficiency"
          value={`${partnerEfficiency.toFixed(1)}%`}
          icon={<Users className="w-6 h-6 text-white" />}
          color="hover:shadow-glow-yellow"
          trend={partnerEfficiency > 50 ? 'up' : 'neutral'}
          subtitle={`${partnerServices} partner services`}
        />

        {/* Extra Time Impact */}
        <MetricCard
          title="Extra Time Revenue"
          value={`${extraTimePercentage.toFixed(1)}%`}
          icon={<Clock className="w-6 h-6 text-white" />}
          color="hover:shadow-glow-orange"
          trend={extraTimePercentage > 10 ? 'up' : 'neutral'}
          subtitle={`$${extraTimeRevenue.toFixed(2)} total`}
        />
      </div>

      {/* Performance Alerts */}
      {(totalRevenue > 10000 || servicesPerDay > 5 || extraTimePercentage > 20) && (
        <div className="glass-card rounded-xl p-4 border border-warning-yellow/30 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-warning rounded-lg">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Performance Alerts</h4>
              <div className="text-sm text-text-light mt-1">
                {totalRevenue > 10000 && <p>• High revenue period detected</p>}
                {servicesPerDay > 5 && <p>• High service volume - consider capacity</p>}
                {extraTimePercentage > 20 && <p>• High extra time usage - review efficiency</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-gradient-glass rounded-lg">
          <p className="text-2xl font-bold text-white">{totalServices}</p>
          <p className="text-xs text-text-light">Total Services</p>
        </div>
        <div className="text-center p-3 bg-gradient-glass rounded-lg">
          <p className="text-2xl font-bold text-white">{uniqueBuildings}</p>
          <p className="text-xs text-text-light">Buildings</p>
        </div>
        <div className="text-center p-3 bg-gradient-glass rounded-lg">
          <p className="text-2xl font-bold text-white">{extraTimeServices}</p>
          <p className="text-xs text-text-light">Extra Time</p>
        </div>
        <div className="text-center p-3 bg-gradient-glass rounded-lg">
          <p className="text-2xl font-bold text-white">{periodDays}</p>
          <p className="text-xs text-text-light">Period Days</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessMetrics; 