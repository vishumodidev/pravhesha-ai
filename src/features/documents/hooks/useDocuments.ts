import { useQuery } from '@tanstack/react-query';
import { documentService } from '../services/document.service';
import type { Document } from '../types/Document';

export function useDocuments(entityType: string, entityId: string) {
  const { data, isLoading, error, refetch } = useQuery<Document[]>({
    queryKey: ['crmDocuments', entityType, entityId],
    queryFn: () => documentService.getDocumentsByEntity(entityType, entityId),
  });

  return {
    data: data || [],
    loading: isLoading,
    error,
    refetch,
  };
}
