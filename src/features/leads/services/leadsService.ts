import { leadsApi } from '../api/leadsApi';
import type { LeadRecord, LeadsResponse } from '../types';

export const leadsService = {
  fetchLeads: async (): Promise<LeadsResponse> => {
    return await leadsApi.getLeads();
  },
  addLead: async (lead: Partial<LeadRecord>): Promise<LeadRecord> => {
    return await leadsApi.createLead(lead);
  },
  removeLead: async (id: string): Promise<void> => {
    return await leadsApi.deleteLead(id);
  },
};
