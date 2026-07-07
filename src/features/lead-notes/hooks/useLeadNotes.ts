import { useQuery } from '@tanstack/react-query';
import { noteService } from '../services/note.service';
import type { LeadNote } from '../types/LeadNote';

export function useLeadNotes(leadId: string) {
  const { data, isLoading, error } = useQuery<LeadNote[]>({
    queryKey: ['leadNotes', leadId],
    queryFn: () => noteService.getLeadNotes(leadId),
    enabled: !!leadId,
  });

  return {
    notes: data || [],
    loading: isLoading,
    error,
  };
}
