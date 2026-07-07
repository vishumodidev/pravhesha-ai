import api from '../../../api/axios';
import type { LeadActivity } from '../types/LeadActivity';

export const activityApi = {
  getActivitiesByLeadId: async (leadId: string): Promise<LeadActivity[]> => {
    try {
      const response = await api.get<LeadActivity[]>('/crm-lead-activities', {
        params: { leadId },
      });
      return response.data;
    } catch (error) {
      console.warn(`[Lead Activities API] Request for lead ${leadId} activities failed, returning local mock fallback.`, error);
      const mockData = await import('../mocks/activities.json');
      return mockData.default.filter((a) => a.leadId === leadId) as LeadActivity[];
    }
  },
  getActivityById: async (id: string): Promise<LeadActivity> => {
    try {
      const response = await api.get<LeadActivity>(`/crm-lead-activities/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[Lead Activities API] Request for activity ${id} failed, returning local mock fallback.`, error);
      const mockData = await import('../mocks/activities.json');
      const act = mockData.default.find((a) => a.id === id);
      if (!act) {
        throw new Error(`Activity with id ${id} not found in mock data.`);
      }
      return act as LeadActivity;
    }
  },
};
