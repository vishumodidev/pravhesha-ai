import { documentApi } from '../api/document.api';
import type { Document } from '../types/Document';

export const documentService = {
  getDocuments: async (): Promise<Document[]> => {
    return await documentApi.getDocuments();
  },
  getDocumentsByEntity: async (entityType: string, entityId: string): Promise<Document[]> => {
    return await documentApi.getDocumentsByEntity(entityType, entityId);
  },
  getDocumentById: async (id: string): Promise<Document> => {
    return await documentApi.getDocumentById(id);
  },
};
