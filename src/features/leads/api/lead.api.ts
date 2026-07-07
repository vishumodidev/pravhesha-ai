import api from '../../../api/axios';
import type { Lead } from '../types/Lead';

export const leadApi = {
  getLeads: async (): Promise<Lead[]> => {
    try {
      const response = await api.get<Lead[]>('/crm-leads');
      return response.data;
    } catch (error) {
      console.warn('[CRM Leads API] Request failed, returning fallback mock data.', error);
      const mockData = await import('../mocks/leads.json');
      return mockData.default as Lead[];
    }
  },
  getLeadById: async (id: string): Promise<Lead> => {
    try {
      const response = await api.get<Lead>(`/crm-leads/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[CRM Leads API] Request for lead ${id} failed, finding in fallback mock data.`, error);
      const mockData = await import('../mocks/leads.json');
      const lead = mockData.default.find((l) => l.id === id);
      if (!lead) {
        throw new Error(`Lead with id ${id} not found in mock data.`);
      }
      return lead as Lead;
    }
  },
};
