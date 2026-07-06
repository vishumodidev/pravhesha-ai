export interface LeadOverviewRecord {
  name: string;
  Current: number;
  Last: number;
}

export interface LeadSourceRecord {
  name: string;
  value: number;
  color: string;
}

export interface ConversationTrendRecord {
  name: string;
  Calls: number;
  WhatsApp: number;
  Email: number;
  Chats: number;
}

export interface TicketOverviewRecord {
  name: string;
  Open: number;
  Progress: number;
  Resolved: number;
}

export interface TeamMemberPerformance {
  name: string;
  role: string;
  leads: number;
  customers: number;
  conversion: number;
  avatar: string;
}

export interface SourcePerformanceRecord {
  source: string;
  leads: number;
  customers: number;
  conv: string;
  percentage: number;
}

export interface AnalyticsData {
  leadsOverviewData: LeadOverviewRecord[];
  leadsSourceData: LeadSourceRecord[];
  conversationTrendData: ConversationTrendRecord[];
  ticketsOverviewData: TicketOverviewRecord[];
  teamData: TeamMemberPerformance[];
  sourcePerformanceData: SourcePerformanceRecord[];
}
