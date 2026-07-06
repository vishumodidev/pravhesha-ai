import { apiClient } from '../../../api/apiClient';
import type { DashboardData } from '../types';

export const dashboardApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    return await apiClient.get<DashboardData>('/dashboard');
  },
};
