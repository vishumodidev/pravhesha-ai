import { noteApi } from '../api/note.api';
import type { LeadNote } from '../types/LeadNote';

export const noteService = {
  getLeadNotes: async (leadId: string): Promise<LeadNote[]> => {
    return await noteApi.getNotesByLead(leadId);
  },
  getNoteById: async (id: string): Promise<LeadNote> => {
    return await noteApi.getNoteById(id);
  },
};
