import api from '../../../api/axios';
import type { LeadRecord, LeadsResponse } from '../types';

export const leadsApi = {
  getLeads: async (): Promise<LeadsResponse> => {
    const response = await api.get<LeadsResponse>('/leads');
    return response.data;
  },
  createLead: async (lead: Partial<LeadRecord>): Promise<LeadRecord> => {
    const response = await api.post<LeadRecord>('/leads', lead);
    return response.data;
  },
  deleteLead: async (id: string): Promise<void> => {
    await api.delete(`/leads/${id}`);
  },
};
