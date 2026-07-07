import api from '../../../api/axios';
import type { SocialLead } from '../types/SocialLead';

export const socialLeadApi = {
  getSocialLeads: async (): Promise<SocialLead[]> => {
    try {
      const response = await api.get<SocialLead[]>('/social-leads');
      return response.data;
    } catch (error) {
      console.warn('[Social Leads API] Request failed, returning fallback mock data.', error);
      const mockData = await import('../mocks/social-leads.json');
      return mockData.default as SocialLead[];
    }
  },
};
