export type SupportAgentStatus = 'idle' | 'running' | 'paused' | 'error';

export interface SupportAgent {
  id: string;
  name: string;
  status: SupportAgentStatus;
  provider: string;
  knowledgeEnabled: boolean;
  memoryEnabled: boolean;
  toolsEnabled: boolean;
}

export interface SupportCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  plan: string;
  status: string;
  notes?: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  customerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportMessage {
  id: string;
  sender: 'customer' | 'agent' | 'system';
  text: string;
  timestamp: string;
  thoughts?: string; // AI reasoning/planning steps
}

export interface SupportSession {
  customerId: string;
  messages: SupportMessage[];
  activeTickets: SupportTicket[];
  recentLogs: any[];
}
