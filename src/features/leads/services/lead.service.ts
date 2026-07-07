import { leadApi } from '../api/lead.api';
import type { Lead } from '../types/Lead';

export const leadService = {
  getLeads: async (): Promise<Lead[]> => {
    return await leadApi.getLeads();
  },
  getLeadById: async (id: string): Promise<Lead> => {
    return await leadApi.getLeadById(id);
  },
};
