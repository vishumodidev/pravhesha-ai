import { useQuery } from '@tanstack/react-query';
import { activityService } from '../services/activity.service';
import type { LeadActivity } from '../types/LeadActivity';

export function useLeadActivities(leadId: string) {
  const { data, isLoading, error } = useQuery<LeadActivity[]>({
    queryKey: ['leadActivities', leadId],
    queryFn: () => activityService.getLeadActivities(leadId),
    enabled: !!leadId,
  });

  return {
    activities: data || [],
    loading: isLoading,
    error,
  };
}
