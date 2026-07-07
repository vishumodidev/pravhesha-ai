import { pipelineApi } from '../api/pipeline.api';
import type { Pipeline } from '../types/Pipeline';

export const pipelineService = {
  getPipeline: async (): Promise<Pipeline[]> => {
    return await pipelineApi.getPipeline();
  },
  getPipelineByStage: async (stage: string): Promise<Pipeline[]> => {
    return await pipelineApi.getPipelineByStage(stage);
  },
  getOpportunity: async (id: string): Promise<Pipeline> => {
    return await pipelineApi.getOpportunity(id);
  },
};
