import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsService } from '../services/leadsService';
import type { LeadRecord } from '../types';

export function useLeadsLegacy() {
  const queryClient = useQueryClient();

  const leadsQuery = useQuery({
    queryKey: ['leadsData'],
    queryFn: () => leadsService.fetchLeads(),
  });

  const addLeadMutation = useMutation({
    mutationFn: (lead: Partial<LeadRecord>) => leadsService.addLead(lead),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadsData'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  const removeLeadMutation = useMutation({
    mutationFn: (id: string) => leadsService.removeLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadsData'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  return {
    leads: leadsQuery.data?.leads || [],
    leadsSourceData: leadsQuery.data?.leadsSourceData || [],
    isLoading: leadsQuery.isLoading,
    error: leadsQuery.error,
    addLead: addLeadMutation.mutateAsync,
    isAdding: addLeadMutation.isPending,
    removeLead: removeLeadMutation.mutateAsync,
    isRemoving: removeLeadMutation.isPending,
  };
}
