import { Eye } from 'lucide-react';
import MetricCard from '../../../components/MetricCard';
import type { Metric } from '../types';

interface VisitorCardProps {
  metric: Metric;
}

export default function VisitorCard({ metric }: VisitorCardProps) {
  return (
    <MetricCard
      title="Visitors"
      value={metric.value}
      change={metric.change}
      isPositive={metric.isPositive}
      icon={Eye}
      iconColor="text-purple-600"
      iconBg="bg-purple-50"
      sparklineData={metric.sparkline}
      sparklineColor="#9333ea"
    />
  );
}
