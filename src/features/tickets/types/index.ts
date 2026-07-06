export interface ChatMessage {
  sender: 'customer' | 'agent';
  name: string;
  avatar?: string;
  time: string;
  text: string;
}

export interface TicketRecord {
  id: string;
  subject: string;
  category: string;
  customerName: string;
  customerEmail: string;
  source: 'Website' | 'Mobile App' | 'Email' | 'WhatsApp';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Pending' | 'Resolved';
  assignedAgent: string;
  agentAvatar: string;
  updatedTime: string;
  description: string;
  clientSince: string;
  totalClientTickets: number;
  messages: ChatMessage[];
}
