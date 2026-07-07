import { useQuery } from '@tanstack/react-query';
import { leadService } from '../services/lead.service';
import type { Lead } from '../types/Lead';

export function useLeads() {
  const { data, isLoading, error } = useQuery<Lead[]>({
    queryKey: ['crmLeadsData'],
    queryFn: () => leadService.getLeads(),
  });

  return {
    data: data || [],
    loading: isLoading,
    error,
  };
}
