import api from '../../../api/axios';
import type { Communication } from '../types/Communication';

export const communicationApi = {
  getCommunicationsByLeadId: async (leadId: string): Promise<Communication[]> => {
    try {
      const response = await api.get<Communication[]>('/crm-communications', {
        params: { leadId },
      });
      return response.data;
    } catch (error) {
      console.warn(`[Lead Communications API] Request for lead ${leadId} communications failed, returning local mock fallback.`, error);
      const mockData = await import('../mocks/communications.json');
      return mockData.default.filter((c) => c.leadId === leadId) as Communication[];
    }
  },
  getCommunicationById: async (id: string): Promise<Communication> => {
    try {
      const response = await api.get<Communication>(`/crm-communications/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[Lead Communications API] Request for communication ${id} failed, returning local mock fallback.`, error);
      const mockData = await import('../mocks/communications.json');
      const com = mockData.default.find((c) => c.id === id);
      if (!com) {
        throw new Error(`Communication with id ${id} not found in mock data.`);
      }
      return com as Communication;
    }
  },
};
