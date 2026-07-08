import api from '../../../api/axios';
import type { Document } from '../types/Document';

export const documentApi = {
  getDocuments: async (): Promise<Document[]> => {
    try {
      const response = await api.get<Document[]>('/crm-documents');
      return response.data;
    } catch (error) {
      console.warn('[Document API] Request for all documents failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/documents.json');
      return mockData.default as Document[];
    }
  },
  getDocumentsByEntity: async (entityType: string, entityId: string): Promise<Document[]> => {
    try {
      const response = await api.get<Document[]>('/crm-documents/entity', {
        params: { entityType, entityId },
      });
      return response.data;
    } catch (error) {
      console.warn(`[Document API] Request for documents for entity ${entityType}:${entityId} failed, returning filtered mock fallback.`, error);
      const mockData = await import('../mocks/documents.json');
      return (mockData.default as Document[]).filter(
        (doc) => doc.entityType.toLowerCase() === entityType.toLowerCase() && String(doc.entityId) === String(entityId)
      );
    }
  },
  getDocumentById: async (id: string): Promise<Document> => {
    try {
      const response = await api.get<Document>(`/crm-documents/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[Document API] Request for document ID ${id} failed, returning mock fallback.`, error);
      const mockData = await import('../mocks/documents.json');
      const found = (mockData.default as Document[]).find((doc) => doc.id === id);
      if (!found) throw new Error(`Document not found: ${id}`);
      return found;
    }
  },
};
