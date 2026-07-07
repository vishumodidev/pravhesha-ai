import dashboardData from '../../../mocks/dashboard/dashboard.json';
import type { DashboardData } from '../types';

export const dashboardApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    return dashboardData as unknown as DashboardData;
  },
};
