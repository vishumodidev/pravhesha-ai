import api from '../../../api/axios';
import type { KnowledgeDocument, KnowledgeCategory } from '../types';

export const knowledgeApi = {
  getDocuments: async (): Promise<KnowledgeDocument[]> => {
    try {
      const response = await api.get<KnowledgeDocument[]>('/crm-knowledge/documents');
      return response.data;
    } catch (error) {
      console.warn('[Knowledge API] Request for documents failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/knowledge-documents.json');
      return (mockData.default as unknown) as KnowledgeDocument[];
    }
  },

  getDocument: async (id: string): Promise<KnowledgeDocument> => {
    try {
      const response = await api.get<KnowledgeDocument>(`/crm-knowledge/documents/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[Knowledge API] Request for document ${id} failed, returning mock fallback.`, error);
      const mockData = await import('../mocks/knowledge-documents.json');
      const found = ((mockData.default as unknown) as KnowledgeDocument[]).find((d) => d.id === id);
      if (!found) throw new Error(`Document not found: ${id}`);
      return found;
    }
  },

  getCategories: async (): Promise<KnowledgeCategory[]> => {
    return ['Products', 'Policies', 'Training', 'FAQ', 'Sales', 'Support', 'HR', 'Finance'];
  },
};
