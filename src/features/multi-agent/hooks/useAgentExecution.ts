import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orchestratorService } from '../services/orchestrator.service';
import type { AgentExecution } from '../types';

export function useAgentExecution() {
  const queryClient = useQueryClient();

  const executeMutation = useMutation<AgentExecution, Error, string>({
    mutationFn: (goal) => orchestratorService.triggerOrchestration(goal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orchestrationExecutions'] });
    },
  });

  return {
    triggerOrchestration: executeMutation.mutateAsync,
    orchestrating: executeMutation.isPending,
    result: executeMutation.data,
    error: executeMutation.error,
  };
}
