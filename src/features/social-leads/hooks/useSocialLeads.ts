import { useQuery } from '@tanstack/react-query';
import { socialLeadService } from '../services/socialLead.service';
import type { SocialLead } from '../types/SocialLead';

export function useSocialLeads() {
  const { data, isLoading, error } = useQuery<SocialLead[]>({
    queryKey: ['socialLeadsData'],
    queryFn: () => socialLeadService.getSocialLeads(),
  });

  return {
    data: data || [],
    loading: isLoading,
    error,
  };
}
