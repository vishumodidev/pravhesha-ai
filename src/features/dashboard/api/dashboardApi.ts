import api from '../../../api/axios';
import type { DashboardData } from '../types';

export const dashboardApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await api.get<DashboardData>('/dashboard');
    return response.data;
  },
};
