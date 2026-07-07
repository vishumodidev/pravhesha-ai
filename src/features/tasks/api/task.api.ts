import api from '../../../api/axios';
import type { Task } from '../types/Task';

export const taskApi = {
  getTasksByLeadId: async (leadId: string): Promise<Task[]> => {
    try {
      const response = await api.get<Task[]>('/crm-tasks', {
        params: { leadId },
      });
      return response.data;
    } catch (error) {
      console.warn(`[Lead Tasks API] Request for lead ${leadId} tasks failed, returning local mock fallback.`, error);
      const mockData = await import('../mocks/tasks.json');
      return mockData.default.filter((t) => t.leadId === leadId) as Task[];
    }
  },
  getTaskById: async (id: string): Promise<Task> => {
    try {
      const response = await api.get<Task>(`/crm-tasks/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[Lead Tasks API] Request for task ${id} failed, returning local mock fallback.`, error);
      const mockData = await import('../mocks/tasks.json');
      const task = mockData.default.find((t) => t.id === id);
      if (!task) {
        throw new Error(`Task with id ${id} not found in mock data.`);
      }
      return task as Task;
    }
  },
};
