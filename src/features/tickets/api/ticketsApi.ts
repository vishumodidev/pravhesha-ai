import api from '../../../api/axios';
import type { TicketRecord } from '../types';

export const ticketsApi = {
  getTickets: async (): Promise<TicketRecord[]> => {
    const response = await api.get<TicketRecord[]>('/tickets');
    return response.data;
  },
  replyToTicket: async (id: string, text: string, sender = 'agent', name = 'Priya Mehta'): Promise<TicketRecord> => {
    const response = await api.post<TicketRecord>(`/tickets/${id}/reply`, { text, sender, name });
    return response.data;
  },
  createTicket: async (ticket: Partial<TicketRecord>): Promise<TicketRecord> => {
    const response = await api.post<TicketRecord>('/tickets', ticket);
    return response.data;
  },
};
