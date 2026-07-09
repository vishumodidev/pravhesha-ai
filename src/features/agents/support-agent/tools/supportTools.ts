import type { SupportCustomer, SupportTicket } from '../types';
import { supportKnowledge } from '../knowledge/supportKnowledge';
import type { KnowledgeDoc } from '../knowledge/supportKnowledge';

export interface ToolLog {
  toolName: string;
  args: any;
  result: any;
  timestamp: string;
}

export const supportTools = {
  getCustomer: async (customerId: string, mockCustomers: SupportCustomer[]): Promise<SupportCustomer | null> => {
    console.log(`[Support Tool] getCustomer called for ID: ${customerId}`);
    const found = mockCustomers.find(c => c.id === customerId);
    return found || null;
  },

  getTickets: async (customerId: string, mockTickets: SupportTicket[]): Promise<SupportTicket[]> => {
    console.log(`[Support Tool] getTickets called for customer: ${customerId}`);
    return mockTickets.filter(t => t.customerId === customerId);
  },

  getKnowledge: async (query: string): Promise<KnowledgeDoc[]> => {
    console.log(`[Support Tool] getKnowledge called with query: "${query}"`);
    return supportKnowledge.search(query).map(r => r.doc);
  },

  createTicket: async (
    ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt'>,
    currentTickets: SupportTicket[]
  ): Promise<SupportTicket> => {
    console.log('[Support Tool] createTicket called with data:', ticketData);
    const newTicket: SupportTicket = {
      ...ticketData,
      id: `tick-${Date.now()}`,
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    currentTickets.push(newTicket);
    return newTicket;
  },

  updateTicket: async (
    ticketId: string,
    updates: Partial<SupportTicket>,
    currentTickets: SupportTicket[]
  ): Promise<SupportTicket | null> => {
    console.log(`[Support Tool] updateTicket called for ID: ${ticketId}`, updates);
    const idx = currentTickets.findIndex(t => t.id === ticketId);
    if (idx === -1) return null;
    
    const updated = {
      ...currentTickets[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    currentTickets[idx] = updated;
    return updated;
  },

  getCommunications: async (customerId: string): Promise<any[]> => {
    console.log(`[Support Tool] getCommunications called for customer: ${customerId}`);
    // Simulated communications history logs
    return [
      {
        id: 'comm-1',
        type: 'email',
        subject: 'API credentials inquiry',
        direction: 'inbound',
        timestamp: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(), // 3 days ago
        body: 'Can you tell me how to refresh OAuth token for sync?'
      },
      {
        id: 'comm-2',
        type: 'email',
        subject: 'Re: API credentials inquiry',
        direction: 'outbound',
        timestamp: new Date(Date.now() - 3 * 24 * 3600 * 1000 + 3600000).toISOString(), // 3 days ago + 1h
        body: 'You can refresh it via Settings > Integrations dashboard panel.'
      }
    ];
  }
};
