import { mcpApi } from '../api/mcp.api';
import type { MCPServer, MCPTool, MCPExecutionResult } from '../types';

export const mcpService = {
  getServers: async (): Promise<MCPServer[]> => {
    return await mcpApi.getServers();
  },

  getTools: async (serverId: string): Promise<MCPTool[]> => {
    return await mcpApi.getTools(serverId);
  },

  executeTool: async (serverId: string, toolName: string, args: any): Promise<MCPExecutionResult> => {
    return await mcpApi.executeTool(serverId, toolName, args);
  },
};
