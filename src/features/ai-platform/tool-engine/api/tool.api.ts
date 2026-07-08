import api from '../../../../api/axios';
import type { Tool, ToolExecutionResult } from '../types';

export const toolApi = {
  getTools: async (): Promise<Tool[]> => {
    try {
      const response = await api.get<Tool[]>('/crm-ai/tools');
      return response.data;
    } catch (error) {
      console.warn('[Tool API] Request for tools failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/tools.json');
      return (mockData.default as unknown) as Tool[];
    }
  },

  getTool: async (id: string): Promise<Tool> => {
    try {
      const response = await api.get<Tool>(`/crm-ai/tools/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[Tool API] Request for tool ${id} failed, returning mock fallback.`, error);
      const mockData = await import('../mocks/tools.json');
      const found = ((mockData.default as unknown) as Tool[]).find((t) => t.id === id);
      if (!found) throw new Error(`Tool not found: ${id}`);
      return found;
    }
  },

  executeTool: async (id: string, parameters: Record<string, any>): Promise<ToolExecutionResult> => {
    try {
      const response = await api.post<ToolExecutionResult>(`/crm-ai/tools/${id}/execute`, {
        parameters,
      });
      return response.data;
    } catch (error) {
      console.warn(`[Tool API] Simulated execution for tool ${id} failed, executing locally in mock sandbox.`, error);
      const { ToolRegistry } = await import('../registry/ToolRegistry');
      const { ToolExecutor } = await import('../executors/ToolExecutor');

      if (ToolRegistry.getTools().length === 0) {
        const mockData = await import('../mocks/tools.json');
        ((mockData.default as unknown) as Tool[]).forEach((t) => ToolRegistry.registerTool(t));
      }

      return await ToolExecutor.execute(id, parameters);
    }
  },
};
