import { dashboardApi } from '../api/dashboardApi';
import type { DashboardData } from '../types';

export const dashboardService = {
  fetchDashboardData: async (): Promise<DashboardData> => {
    return await dashboardApi.getDashboardData();
  },
};
