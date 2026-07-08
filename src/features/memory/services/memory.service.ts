import { memoryApi } from '../api/memory.api';
import type { Memory } from '../types';

export const memoryService = {
  getMemories: async (): Promise<Memory[]> => {
    return await memoryApi.getMemory();
  },

  saveMemory: async (key: string, value: string, category: string, importance: number): Promise<Memory> => {
    return await memoryApi.saveMemory(key, value, category, importance);
  },

  deleteMemory: async (id: string): Promise<boolean> => {
    return await memoryApi.deleteMemory(id);
  },
};
