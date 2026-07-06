import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../services/analyticsService';

export function useAnalytics() {
  const query = useQuery({
    queryKey: ['analyticsData'],
    queryFn: () => analyticsService.fetchAnalytics(),
  });

  return {
    analytics: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
