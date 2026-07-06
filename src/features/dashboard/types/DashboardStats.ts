import type { AIInsight } from './Insight';

export interface Metric {
  value: string;
  change: string;
  isPositive: boolean;
  sparkline: number[];
}

export interface DashboardMetrics {
  totalLeads: Metric;
  visitors: Metric;
  aiQualifiedLeads: Metric;
  conversions: Metric;
  revenue: Metric;
  customers: Metric;
}

export interface LeadCallActivity {
  name: string;
  Leads: number;
  Calls: number;
}

export interface FunnelStage {
  stage: string;
  value: number;
  percentage: number;
}

export interface RecentCustomer {
  name: string;
  company: string;
  plan: string;
  joined: string;
  status: string;
}

export interface RecentTicket {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface TicketOverview {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  breached: number;
  priorityDistribution: { name: string; value: number; color: string }[];
  recentTickets: RecentTicket[];
}

export interface RecentActivity {
  id: string;
  userInitials: string;
  userName: string;
  action: string;
  detail: string;
  category: string;
  time: string;
}

export interface MiniMetrics {
  hotLeads: { value: number; change: string };
  followUps: { value: number; change: string };
  demos: { value: number; change: string };
  pendingTasks: { value: number; change: string };
}

export interface DashboardData {
  metrics: DashboardMetrics;
  aiInsights: AIInsight[];
  totalOpportunity: string;
  leadCallActivity: LeadCallActivity[];
  funnel: FunnelStage[];
  conversionRate: string;
  customersOverview: {
    total: { value: number; change: string; isPositive: boolean };
    active: { value: number; change: string; isPositive: boolean };
    newMonth: { value: number; change: string; isPositive: boolean };
    churnRisk: { value: number; change: string; isPositive: boolean };
  };
  recentCustomers: RecentCustomer[];
  ticketsOverview: TicketOverview;
  recentActivities: RecentActivity[];
  miniMetrics: MiniMetrics;
  aiTrainingAccuracy: number;
}
