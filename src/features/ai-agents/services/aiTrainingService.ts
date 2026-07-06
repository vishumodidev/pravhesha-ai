import { aiTrainingApi } from '../api/aiTrainingApi';
import type { TrainingData, TrainingRecord } from '../types';

export const aiTrainingService = {
  fetchTrainingData: async (): Promise<TrainingData> => {
    return await aiTrainingApi.getTrainingData();
  },
  uploadDoc: async (title: string): Promise<TrainingRecord> => {
    return await aiTrainingApi.uploadDocument(title);
  },
  runTraining: async (): Promise<{ accuracy: number }> => {
    return await aiTrainingApi.triggerTraining();
  },
  removeDocument: async (id: string): Promise<{ success: boolean }> => {
    return await aiTrainingApi.deleteDocument(id);
  },
};
