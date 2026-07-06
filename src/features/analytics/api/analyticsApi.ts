import api from '../../../api/axios';
import type { AnalyticsData } from '../types';

export const analyticsApi = {
  getAnalytics: async (): Promise<AnalyticsData> => {
    const response = await api.get<AnalyticsData>('/analytics');
    return response.data;
  },
};
