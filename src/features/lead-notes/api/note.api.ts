import api from '../../../api/axios';
import type { LeadNote } from '../types/LeadNote';

export const noteApi = {
  getNotesByLead: async (leadId: string): Promise<LeadNote[]> => {
    try {
      const response = await api.get<LeadNote[]>('/crm-lead-notes', {
        params: { leadId },
      });
      return response.data;
    } catch (error) {
      console.warn(`[Lead Notes API] Request for lead ${leadId} notes failed, returning local mock fallback.`, error);
      const mockData = await import('../mocks/notes.json');
      return mockData.default.filter((n) => n.leadId === leadId) as LeadNote[];
    }
  },
  getNoteById: async (id: string): Promise<LeadNote> => {
    try {
      const response = await api.get<LeadNote>(`/crm-lead-notes/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[Lead Notes API] Request for note ${id} failed, returning local mock fallback.`, error);
      const mockData = await import('../mocks/notes.json');
      const note = mockData.default.find((n) => n.id === id);
      if (!note) {
        throw new Error(`Note with id ${id} not found in mock data.`);
      }
      return note as LeadNote;
    }
  },
};
