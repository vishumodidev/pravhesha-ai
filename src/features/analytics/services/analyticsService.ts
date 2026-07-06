import { analyticsApi } from '../api/analyticsApi';
import type { AnalyticsData } from '../types';

export const analyticsService = {
  fetchAnalytics: async (): Promise<AnalyticsData> => {
    return await analyticsApi.getAnalytics();
  },
};
