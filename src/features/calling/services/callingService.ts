import { callingApi } from '../api/callingApi';
import type { CallRecord } from '../types';

export const callingService = {
  fetchCalls: async (): Promise<CallRecord[]> => {
    return await callingApi.getCalls();
  },
  placeCall: async (phone: string): Promise<CallRecord> => {
    return await callingApi.triggerCall(phone);
  },
};
