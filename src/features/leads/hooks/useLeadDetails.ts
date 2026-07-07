import { useQuery } from '@tanstack/react-query';
import { leadService } from '../services/lead.service';
import type { Lead } from '../types/Lead';

export function useLeadDetails(id: string) {
  const { data, isLoading, error } = useQuery<Lead>({
    queryKey: ['crmLeadDetails', id],
    queryFn: () => leadService.getLeadDetails(id),
    enabled: !!id,
  });

  return {
    data,
    loading: isLoading,
    error,
  };
}
