import api from '../../../api/axios';
import type { MCPServer, MCPTool, MCPExecutionResult } from '../types';

export const mcpApi = {
  getServers: async (): Promise<MCPServer[]> => {
    try {
      const response = await api.get<MCPServer[]>('/crm-mcp/servers');
      return response.data;
    } catch (error) {
      console.warn('[MCP API] Request for servers failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/servers.json');
      return (mockData.default as unknown) as MCPServer[];
    }
  },

  getTools: async (serverId: string): Promise<MCPTool[]> => {
    try {
      const response = await api.get<MCPTool[]>(`/crm-mcp/servers/${serverId}/tools`);
      return response.data;
    } catch (error) {
      console.warn(`[MCP API] Request for server ${serverId} tools failed, returning local mock client resolver.`, error);
      const { MCPClient } = await import('../client/MCPClient');
      return await MCPClient.listTools(serverId);
    }
  },

  executeTool: async (serverId: string, toolName: string, args: any): Promise<MCPExecutionResult> => {
    try {
      const response = await api.post<MCPExecutionResult>('/crm-mcp/execute', {
        serverId,
        toolName,
        args,
      });
      return response.data;
    } catch (error) {
      console.warn(`[MCP API] Execution of tool ${toolName} failed, running locally in client mock adapter.`, error);
      const { MCPClient } = await import('../client/MCPClient');
      return await MCPClient.executeTool(serverId, toolName, args);
    }
  },
};
