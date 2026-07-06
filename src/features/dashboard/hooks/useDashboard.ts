import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { QUERY_KEYS } from '../../../query/queryKeys';

export function useDashboard() {
  return useQuery({
    queryKey: [QUERY_KEYS.dashboard],
    queryFn: () => dashboardService.fetchDashboardData(),
    refetchInterval: 15000, // Poll dashboard every 15s
  });
}
