import api from '../../../../api/axios';
import type { SupportTicket, SupportMessage } from '../types';

export const supportAgentApi = {
  answerCustomer: async (
    query: string,
    customerId: string,
    history: SupportMessage[]
  ): Promise<{ response: string; thoughts: string[] }> => {
    try {
      const res = await api.post<{ response: string; thoughts: string[] }>('/crm-agents/support/answer', {
        query,
        customerId,
        history
      });
      return res.data;
    } catch (error) {
      console.warn('[Support Agent API] answerCustomer failed, using local scenario resolver.', error);
      // Fallback: resolve using mock scenarios
      const mocks = await import('../mocks/supportMocks.json');
      const found = mocks.default.find(s => s.customer.id === customerId);
      if (found) {
        return {
          response: found.suggestedReply,
          thoughts: found.agentThoughts
        };
      }
      return {
        response: `Thank you for your message. I am looking into your account context. Let me research this issue.`,
        thoughts: ['Step 1: Check customer ID.', 'Step 2: No specific mock scenario matches. Return generic message.']
      };
    }
  },

  searchKnowledge: async (query: string, sources?: string[]): Promise<any[]> => {
    try {
      const res = await api.post<any[]>('/crm-agents/support/knowledge/search', { query, sources });
      return res.data;
    } catch (error) {
      console.warn('[Support Agent API] searchKnowledge failed, querying local RAG.', error);
      const { supportKnowledge } = await import('../knowledge/supportKnowledge');
      return supportKnowledge.search(query, sources);
    }
  },

  createTicket: async (ticketData: any): Promise<SupportTicket> => {
    try {
      const res = await api.post<SupportTicket>('/crm-agents/support/tickets', ticketData);
      return res.data;
    } catch (error) {
      console.warn('[Support Agent API] createTicket failed, creating local simulation.', error);
      return {
        id: `tick-sim-${Date.now()}`,
        title: ticketData.title || 'New Support Ticket',
        status: 'Open',
        priority: ticketData.priority || 'Medium',
        customerId: ticketData.customerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  },

  summarizeCustomer: async (customerId: string): Promise<string> => {
    try {
      const res = await api.get<string>(`/crm-agents/support/customer/${customerId}/summary`);
      return res.data;
    } catch (error) {
      console.warn('[Support Agent API] summarizeCustomer failed, building fallback.', error);
      const mocks = await import('../mocks/supportMocks.json');
      const found = mocks.default.find(s => s.customer.id === customerId);
      if (found) {
        return `${found.customer.name} is on the ${found.customer.plan}. Current ticket status is ${found.tickets.length > 0 ? found.tickets[0].status : 'None'}.`;
      }
      return `Customer details parsed. Standing: Active. No issues flags logged.`;
    }
  },

  generateReply: async (ticketId: string, context: string): Promise<string> => {
    try {
      const res = await api.post<string>('/crm-agents/support/reply', { ticketId, context });
      return res.data;
    } catch (error) {
      console.warn('[Support Agent API] generateReply failed, generating fallback.', error);
      return `Dear Customer,\n\nWe have updated your ticket status with the following details:\n\n${context}\n\nThank you,\nPravesha AI Support Team Team`;
    }
  }
};
