import api from '../../../api/axios';
import type { CallRecord } from '../types';

export const callingApi = {
  getCalls: async (): Promise<CallRecord[]> => {
    const response = await api.get<CallRecord[]>('/calling/logs');
    return response.data;
  },
  triggerCall: async (phone: string): Promise<CallRecord> => {
    const response = await api.post<CallRecord>('/calling/trigger', { phone });
    return response.data;
  },
};
