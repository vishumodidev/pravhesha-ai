import { schedulingApi } from '../api/schedulingApi';
import type { SchedulingData, MeetingCardData, FollowUpRecord } from '../types';

export const schedulingService = {
  fetchSchedulingData: async (): Promise<SchedulingData> => {
    return await schedulingApi.getSchedulingData();
  },
  addMeeting: async (day: string, meeting: Partial<MeetingCardData>): Promise<SchedulingData> => {
    return await schedulingApi.createSchedule(day, meeting);
  },
  addFollowUp: async (followUp: Partial<FollowUpRecord>): Promise<SchedulingData> => {
    return await schedulingApi.createFollowUp(followUp);
  },
};
