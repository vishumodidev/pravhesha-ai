import { ticketsApi } from '../api/ticketsApi';
import type { TicketRecord } from '../types';

export const ticketsService = {
  fetchTickets: async (): Promise<TicketRecord[]> => {
    return await ticketsApi.getTickets();
  },
  sendTicketReply: async (id: string, text: string): Promise<TicketRecord> => {
    return await ticketsApi.replyToTicket(id, text);
  },
  addTicket: async (ticket: Partial<TicketRecord>): Promise<TicketRecord> => {
    return await ticketsApi.createTicket(ticket);
  },
};
