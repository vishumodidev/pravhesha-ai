import { taskApi } from '../api/task.api';
import type { Task } from '../types/Task';

export const taskService = {
  getTasksByLeadId: async (leadId: string): Promise<Task[]> => {
    return await taskApi.getTasksByLeadId(leadId);
  },
  getTaskById: async (id: string): Promise<Task> => {
    return await taskApi.getTaskById(id);
  },
};
