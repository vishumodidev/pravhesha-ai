import { useQuery } from '@tanstack/react-query';
import { dashboardAnalyticsService } from '../services/dashboardAnalytics.service';
import type { DashboardAnalytics } from '../types/DashboardAnalytics';

export function useDashboardAnalytics() {
  const { data, isLoading, error } = useQuery<DashboardAnalytics>({
    queryKey: ['crmDashboardAnalytics'],
    queryFn: () => dashboardAnalyticsService.getDashboardAnalytics(),
  });

  return {
    data,
    loading: isLoading,
    error,
  };
}
