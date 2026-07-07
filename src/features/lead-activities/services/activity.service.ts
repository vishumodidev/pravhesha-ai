import { activityApi } from '../api/activity.api';
import type { LeadActivity } from '../types/LeadActivity';

export const activityService = {
  getLeadActivities: async (leadId: string): Promise<LeadActivity[]> => {
    return await activityApi.getActivitiesByLeadId(leadId);
  },
  getActivityById: async (id: string): Promise<LeadActivity> => {
    return await activityApi.getActivityById(id);
  },
};
