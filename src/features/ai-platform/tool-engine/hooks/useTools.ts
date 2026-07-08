import { useQuery } from '@tanstack/react-query';
import { toolService } from '../services/tool.service';
import type { Tool } from '../types';

export function useTools() {
  const { data: tools = [], isLoading, error, refetch } = useQuery<Tool[]>({
    queryKey: ['toolsList'],
    queryFn: () => toolService.getTools(),
  });

  return {
    tools,
    loading: isLoading,
    error,
    refetch,
  };
}
