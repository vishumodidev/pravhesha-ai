import api from '../../../api/axios';
import type { SchedulingData, MeetingCardData, FollowUpRecord } from '../types';

export const schedulingApi = {
  getSchedulingData: async (): Promise<SchedulingData> => {
    const response = await api.get<SchedulingData>('/scheduling');
    return response.data;
  },
  createSchedule: async (day: string, meeting: Partial<MeetingCardData>): Promise<SchedulingData> => {
    const response = await api.post<SchedulingData>('/scheduling/meeting', { day, meeting });
    return response.data;
  },
  createFollowUp: async (followUp: Partial<FollowUpRecord>): Promise<SchedulingData> => {
    const response = await api.post<SchedulingData>('/scheduling/followup', followUp);
    return response.data;
  },
};
