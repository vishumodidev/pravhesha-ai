import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { callingService } from '../services/callingService';

export function useCalling() {
  const queryClient = useQueryClient();

  const callsQuery = useQuery({
    queryKey: ['callLogs'],
    queryFn: () => callingService.fetchCalls(),
  });

  const triggerCallMutation = useMutation({
    mutationFn: (phone: string) => callingService.placeCall(phone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callLogs'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  return {
    calls: callsQuery.data || [],
    isLoading: callsQuery.isLoading,
    error: callsQuery.error,
    placeCall: triggerCallMutation.mutateAsync,
    isCalling: triggerCallMutation.isPending,
  };
}
