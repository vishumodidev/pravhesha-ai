import { useQuery } from '@tanstack/react-query';
import { knowledgeService } from '../services/knowledge.service';
import { useKnowledgeStore } from '../store/knowledge.store';
import type { KnowledgeDocument } from '../types';

export function useKnowledgeDocument(id?: string) {
  const { selectedDocument, setSelectedDocument } = useKnowledgeStore();

  const { data: document, isLoading, error } = useQuery<KnowledgeDocument>({
    queryKey: ['knowledgeDocumentDetails', id],
    queryFn: () => knowledgeService.getDocument(id || ''),
    enabled: !!id,
  });

  return {
    document: id ? document : selectedDocument,
    loading: isLoading,
    error,
    setSelectedDocument,
  };
}
