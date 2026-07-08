import { useMutation } from '@tanstack/react-query';
import { agentService } from '../services/agent.service';
import type { AgentExecutionResult } from '../types/agent';

export function useAgentExecution() {
  const executeMutation = useMutation<AgentExecutionResult, Error, { id: string; goal: string }>({
    mutationFn: ({ id, goal }) => agentService.executeAgent(id, goal),
  });

  return {
    executeAgent: executeMutation.mutateAsync,
    executing: executeMutation.isPending,
    result: executeMutation.data,
    error: executeMutation.error,
  };
}
