import api from '../../../api/axios';
import type { DashboardAnalytics } from '../types/DashboardAnalytics';

export const dashboardAnalyticsApi = {
  getDashboardAnalytics: async (): Promise<DashboardAnalytics> => {
    try {
      const response = await api.get<DashboardAnalytics>('/crm-dashboard-analytics');
      return response.data;
    } catch (error) {
      console.warn('[Dashboard Analytics API] Request for analytics failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/dashboard-analytics.json');
      return mockData.default as DashboardAnalytics;
    }
  },
  getDashboardCards: async (): Promise<Partial<DashboardAnalytics>> => {
    try {
      const response = await api.get<Partial<DashboardAnalytics>>('/crm-dashboard-cards');
      return response.data;
    } catch (error) {
      console.warn('[Dashboard Analytics API] Request for cards failed, returning cards subset from local mock fallback.', error);
      const mockData = await import('../mocks/dashboard-analytics.json');
      const {
        totalVisitors,
        totalSocialLeads,
        totalLeads,
        customers,
        activePipeline,
        monthlyRevenue,
        pendingTasks,
        wonDeals,
      } = mockData.default;
      return {
        totalVisitors,
        totalSocialLeads,
        totalLeads,
        customers,
        activePipeline,
        monthlyRevenue,
        pendingTasks,
        wonDeals,
      };
    }
  },
};
