import { useQuery, useMutation } from '@tanstack/react-query';
import { mcpService } from '../services/mcp.service';
import type { MCPTool, MCPExecutionResult } from '../types';

export function useMCPTools(serverId?: string) {
  const { data: tools = [], isLoading, error } = useQuery<MCPTool[]>({
    queryKey: ['mcpToolsList', serverId],
    queryFn: () => mcpService.getTools(serverId || ''),
    enabled: !!serverId,
  });

  const executeMutation = useMutation<MCPExecutionResult, Error, { serverId: string; toolName: string; args: any }>({
    mutationFn: ({ serverId: sid, toolName, args }) => mcpService.executeTool(sid, toolName, args),
  });

  return {
    tools,
    loading: isLoading,
    error,
    executeTool: executeMutation.mutateAsync,
    executing: executeMutation.isPending,
    result: executeMutation.data,
  };
}
