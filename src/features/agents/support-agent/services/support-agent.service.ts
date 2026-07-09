import { supportAgentApi } from '../api/support-agent.api';
import type { SupportTicket, SupportMessage } from '../types';

export const supportAgentService = {
  answerCustomer: async (
    query: string,
    customerId: string,
    history: SupportMessage[]
  ): Promise<{ response: string; thoughts: string[] }> => {
    return await supportAgentApi.answerCustomer(query, customerId, history);
  },

  searchKnowledge: async (query: string, sources?: string[]): Promise<any[]> => {
    return await supportAgentApi.searchKnowledge(query, sources);
  },

  createTicket: async (ticketData: any): Promise<SupportTicket> => {
    return await supportAgentApi.createTicket(ticketData);
  },

  summarizeCustomer: async (customerId: string): Promise<string> => {
    return await supportAgentApi.summarizeCustomer(customerId);
  },

  generateReply: async (ticketId: string, context: string): Promise<string> => {
    return await supportAgentApi.generateReply(ticketId, context);
  }
};
