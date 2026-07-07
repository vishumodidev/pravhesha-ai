import api from '../../../api/axios';
import type { Pipeline } from '../types/Pipeline';

export const pipelineApi = {
  getPipeline: async (): Promise<Pipeline[]> => {
    try {
      const response = await api.get<Pipeline[]>('/crm-pipeline');
      return response.data;
    } catch (error) {
      console.warn('[Pipeline API] Request for pipeline list failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/pipeline.json');
      return mockData.default as Pipeline[];
    }
  },
  getPipelineByStage: async (stage: string): Promise<Pipeline[]> => {
    try {
      const response = await api.get<Pipeline[]>('/crm-pipeline', { params: { stage } });
      return response.data;
    } catch (error) {
      console.warn(`[Pipeline API] Request for pipeline stage "${stage}" failed, returning filtered mock fallback.`, error);
      const mockData = await import('../mocks/pipeline.json');
      return mockData.default.filter((item) => item.stage === stage) as Pipeline[];
    }
  },
  getOpportunity: async (id: string): Promise<Pipeline> => {
    try {
      const response = await api.get<Pipeline>(`/crm-pipeline/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[Pipeline API] Request for opportunity "${id}" failed, returning local mock fallback.`, error);
      const mockData = await import('../mocks/pipeline.json');
      const opp = mockData.default.find((item) => item.id === id);
      if (!opp) {
        throw new Error(`Opportunity with ID "${id}" not found.`);
      }
      return opp as Pipeline;
    }
  },
};
