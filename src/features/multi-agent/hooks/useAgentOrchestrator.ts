import { useQuery } from '@tanstack/react-query';
import { orchestratorService } from '../services/orchestrator.service';
import type { AgentExecution } from '../types';

export function useAgentOrchestrator() {
  const { data: executions = [], isLoading: execsLoading, error: execsError, refetch } = useQuery<AgentExecution[]>({
    queryKey: ['orchestrationExecutions'],
    queryFn: () => orchestratorService.getExecutions(),
  });

  const { data: runningAgents = [], isLoading: agentsLoading } = useQuery<any[]>({
    queryKey: ['runningAgentsOrchestrator'],
    queryFn: () => orchestratorService.getRunningAgents(),
  });

  return {
    executions,
    runningAgents,
    loading: execsLoading || agentsLoading,
    error: execsError,
    refetch,
  };
}
