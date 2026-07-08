import { toolApi } from '../api/tool.api';
import type { Tool, ToolExecutionResult } from '../types';

export const toolService = {
  getTools: async (): Promise<Tool[]> => {
    return await toolApi.getTools();
  },

  getTool: async (id: string): Promise<Tool> => {
    return await toolApi.getTool(id);
  },

  executeTool: async (id: string, parameters: Record<string, any>): Promise<ToolExecutionResult> => {
    return await toolApi.executeTool(id, parameters);
  },
};
