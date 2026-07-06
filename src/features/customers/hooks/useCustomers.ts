import { useQuery } from '@tanstack/react-query';
import { customersService } from '../services/customersService';

export function useCustomers() {
  const query = useQuery({
    queryKey: ['customersData'],
    queryFn: () => customersService.fetchCustomers(),
  });

  return {
    customers: query.data?.customers || [],
    plansData: query.data?.plansData || [],
    customerTrendData: query.data?.customerTrendData || [],
    sourceData: query.data?.sourceData || [],
    healthScoreDistribution: query.data?.healthScoreDistribution || [],
    metrics: query.data?.metrics,
    isLoading: query.isLoading,
    error: query.error,
  };
}
