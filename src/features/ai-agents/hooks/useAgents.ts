import { useQuery } from '@tanstack/react-query';
import { agentService } from '../services/agent.service';
import type { Agent } from '../types/agent';

export function useAgents() {
  const { data: agents = [], isLoading, error, refetch } = useQuery<Agent[]>({
    queryKey: ['agentsList'],
    queryFn: () => agentService.getAgents(),
  });

  return {
    agents,
    loading: isLoading,
    error,
    refetch,
  };
}
