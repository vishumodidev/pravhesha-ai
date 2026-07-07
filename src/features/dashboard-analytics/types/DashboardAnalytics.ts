export interface ChartItem {
  name: string;
  [key: string]: string | number;
}

export interface DashboardAnalytics {
  totalVisitors: number;
  totalSocialLeads: number;
  totalLeads: number;
  qualifiedLeads: number;
  customers: number;
  activePipeline: number;
  wonDeals: number;
  lostDeals: number;
  monthlyRevenue: number;
  pendingTasks: number;
  overdueTasks: number;
  leadGrowth: ChartItem[];
  revenueTrend: ChartItem[];
  pipelineDistribution: ChartItem[];
  leadSources: ChartItem[];
}
