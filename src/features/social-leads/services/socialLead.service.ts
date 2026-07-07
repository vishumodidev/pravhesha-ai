import { socialLeadApi } from '../api/socialLead.api';
import type { SocialLead } from '../types/SocialLead';

export const socialLeadService = {
  getSocialLeads: async (): Promise<SocialLead[]> => {
    return await socialLeadApi.getSocialLeads();
  },
};
