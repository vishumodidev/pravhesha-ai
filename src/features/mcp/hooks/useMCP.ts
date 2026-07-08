import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mcpService } from '../services/mcp.service';
import type { MCPServer } from '../types';

export function useMCP() {
  const queryClient = useQueryClient();

  const { data: servers = [], isLoading, error, refetch } = useQuery<MCPServer[]>({
    queryKey: ['mcpServersList'],
    queryFn: () => mcpService.getServers(),
  });

  const toggleServerMutation = useMutation({
    mutationFn: async ({ id, enabled }: { id: string; enabled: boolean }) => {
      console.log(`[useMCP] Toggling server ${id} state: ${enabled}`);
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { id, enabled };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mcpServersList'] });
    },
  });

  return {
    servers,
    loading: isLoading,
    error,
    refetch,
    toggleServer: toggleServerMutation.mutateAsync,
    toggling: toggleServerMutation.isPending,
  };
}
