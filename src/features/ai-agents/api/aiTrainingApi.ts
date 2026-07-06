import api from '../../../api/axios';
import type { TrainingData, TrainingRecord } from '../types';

export const aiTrainingApi = {
  getTrainingData: async (): Promise<TrainingData> => {
    const response = await api.get<TrainingData>('/ai-training');
    return response.data;
  },
  uploadDocument: async (title: string): Promise<TrainingRecord> => {
    const response = await api.post<TrainingRecord>('/ai-training/upload', { title });
    return response.data;
  },
  triggerTraining: async (): Promise<{ accuracy: number }> => {
    const response = await api.post<{ accuracy: number }>('/ai-training/train');
    return response.data;
  },
  deleteDocument: async (id: string): Promise<{ success: boolean }> => {
    const response = await api.delete<{ success: boolean }>(`/ai-training/document/${id}`);
    return response.data;
  },
};
