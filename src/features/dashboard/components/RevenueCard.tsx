import { DollarSign } from 'lucide-react';
import MetricCard from '../../../components/MetricCard';
import type { Metric } from '../types';

interface RevenueCardProps {
  metric: Metric;
}

export default function RevenueCard({ metric }: RevenueCardProps) {
  return (
    <MetricCard
      title="Revenue (Expected)"
      value={metric.value}
      change={metric.change}
      isPositive={metric.isPositive}
      icon={DollarSign}
      iconColor="text-rose-600"
      iconBg="bg-rose-50"
      sparklineData={metric.sparkline}
      sparklineColor="#e11d48"
    />
  );
}
