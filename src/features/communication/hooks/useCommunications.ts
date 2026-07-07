import { useQuery } from '@tanstack/react-query';
import { communicationService } from '../services/communication.service';
import type { Communication } from '../types/Communication';

export function useCommunications(leadId: string) {
  const { data, isLoading, error } = useQuery<Communication[]>({
    queryKey: ['leadCommunications', leadId],
    queryFn: () => communicationService.getCommunicationsByLeadId(leadId),
    enabled: !!leadId,
  });

  return {
    communications: data || [],
    loading: isLoading,
    error,
  };
}
