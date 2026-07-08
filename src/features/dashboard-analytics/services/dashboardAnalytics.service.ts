import { dashboardAnalyticsApi } from '../api/dashboardAnalytics.api';
import type { DashboardAnalytics } from '../types/DashboardAnalytics';

export const dashboardAnalyticsService = {
  getDashboardAnalytics: async (): Promise<DashboardAnalytics> => {
    return await dashboardAnalyticsApi.getDashboardAnalytics();
  },
  getDashboardCards: async (): Promise<Partial<DashboardAnalytics>> => {
    return await dashboardAnalyticsApi.getDashboardCards();
  },
};
