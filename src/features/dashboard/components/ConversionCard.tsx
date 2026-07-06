import { CheckCircle2 } from 'lucide-react';
import MetricCard from '../../../components/MetricCard';
import type { Metric } from '../types';

interface ConversionCardProps {
  metric: Metric;
}

export default function ConversionCard({ metric }: ConversionCardProps) {
  return (
    <MetricCard
      title="Conversions"
      value={metric.value}
      change={metric.change}
      isPositive={metric.isPositive}
      icon={CheckCircle2}
      iconColor="text-amber-600"
      iconBg="bg-amber-50"
      sparklineData={metric.sparkline}
      sparklineColor="#d97706"
    />
  );
}
