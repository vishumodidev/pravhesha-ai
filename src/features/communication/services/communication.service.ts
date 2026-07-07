import { communicationApi } from '../api/communication.api';
import type { Communication } from '../types/Communication';

export const communicationService = {
  getCommunicationsByLeadId: async (leadId: string): Promise<Communication[]> => {
    return await communicationApi.getCommunicationsByLeadId(leadId);
  },
  getCommunicationById: async (id: string): Promise<Communication> => {
    return await communicationApi.getCommunicationById(id);
  },
};
