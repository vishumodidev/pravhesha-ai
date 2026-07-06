import { Users, Brain } from 'lucide-react';
import MetricCard from '../../../components/MetricCard';
import RevenueCard from './RevenueCard';
import VisitorCard from './VisitorCard';
import ConversionCard from './ConversionCard';
import type { DashboardMetrics } from '../types';

interface DashboardCardsProps {
  metrics: DashboardMetrics;
}

export default function DashboardCards({ metrics }: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {/* Total Leads */}
      <MetricCard
        title="Total Leads"
        value={metrics.totalLeads.value}
        change={metrics.totalLeads.change}
        isPositive={metrics.totalLeads.isPositive}
        icon={Users}
        iconColor="text-blue-600"
        iconBg="bg-blue-50"
        sparklineData={metrics.totalLeads.sparkline}
        sparklineColor="#2563eb"
      />

      {/* Visitors */}
      <VisitorCard metric={metrics.visitors} />

      {/* AI Qualified Leads */}
      <MetricCard
        title="AI Qualified Leads"
        value={metrics.aiQualifiedLeads.value}
        change={metrics.aiQualifiedLeads.change}
        isPositive={metrics.aiQualifiedLeads.isPositive}
        icon={Brain}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-50"
        sparklineData={metrics.aiQualifiedLeads.sparkline}
        sparklineColor="#059669"
      />

      {/* Conversions */}
      <ConversionCard metric={metrics.conversions} />

      {/* Revenue */}
      <RevenueCard metric={metrics.revenue} />

      {/* Customers */}
      <MetricCard
        title="Customers"
        value={metrics.customers.value}
        change={metrics.customers.change}
        isPositive={metrics.customers.isPositive}
        icon={Users}
        iconColor="text-indigo-600"
        iconBg="bg-indigo-50"
        sparklineData={metrics.customers.sparkline}
        sparklineColor="#4f46e5"
      />
    </div>
  );
}
