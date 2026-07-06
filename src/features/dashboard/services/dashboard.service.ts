import { dashboardApi } from '../api/dashboard.api';
import type { DashboardData } from '../types';

export const dashboardService = {
  fetchDashboardData: async (): Promise<DashboardData> => {
    const rawData = await dashboardApi.getDashboardData();
    
    // Format / Map API Response fields here if needed.
    // Currently, rawData properties align directly with DashboardData.
    return {
      metrics: rawData.metrics,
      aiInsights: rawData.aiInsights,
      totalOpportunity: rawData.totalOpportunity,
      leadCallActivity: rawData.leadCallActivity,
      funnel: rawData.funnel,
      conversionRate: rawData.conversionRate,
      customersOverview: rawData.customersOverview,
      recentCustomers: rawData.recentCustomers,
      ticketsOverview: rawData.ticketsOverview,
      recentActivities: rawData.recentActivities,
      miniMetrics: rawData.miniMetrics,
      aiTrainingAccuracy: rawData.aiTrainingAccuracy
    };
  },
};
