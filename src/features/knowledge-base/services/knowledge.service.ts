import { knowledgeApi } from '../api/knowledge.api';
import type { KnowledgeDocument, KnowledgeCategory } from '../types';

export const knowledgeService = {
  getDocuments: async (): Promise<KnowledgeDocument[]> => {
    return await knowledgeApi.getDocuments();
  },

  getDocument: async (id: string): Promise<KnowledgeDocument> => {
    return await knowledgeApi.getDocument(id);
  },

  getCategories: async (): Promise<KnowledgeCategory[]> => {
    return await knowledgeApi.getCategories();
  },
};
