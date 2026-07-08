import api from '../../../api/axios';
import type { Memory } from '../types';

export const memoryApi = {
  getMemory: async (): Promise<Memory[]> => {
    try {
      const response = await api.get<Memory[]>('/crm-memory');
      return response.data;
    } catch (error) {
      console.warn('[Memory API] Request for memory failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/memory.json');
      return (mockData.default as unknown) as Memory[];
    }
  },

  saveMemory: async (key: string, value: string, category: string, importance: number): Promise<Memory> => {
    try {
      const response = await api.post<Memory>('/crm-memory', {
        key,
        value,
        category,
        importance,
      });
      return response.data;
    } catch (error) {
      console.warn('[Memory API] Save memory failed, returning simulated mock response.', error);
      const newMemory: Memory = {
        id: `mem-${Date.now()}`,
        userId: 'user-admin',
        category: category as any,
        key,
        value,
        importance,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newMemory;
    }
  },

  deleteMemory: async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/crm-memory/${id}`);
      return true;
    } catch (error) {
      console.warn(`[Memory API] Delete memory ${id} failed, returning mock success.`, error);
      return true;
    }
  },
};
