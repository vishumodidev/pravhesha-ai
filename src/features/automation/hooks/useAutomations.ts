import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { automationService } from '../services/automation.service';
import type { Automation } from '../types';

export function useAutomations() {
  const queryClient = useQueryClient();

  const {
    data: automations = [],
    isLoading: isLoadingAutomations,
    error: automationsError,
    refetch: refetchAutomations,
  } = useQuery<Automation[]>({
    queryKey: ['automationsList'],
    queryFn: () => automationService.getAutomations(),
  });

  const {
    data: templates = [],
    isLoading: isLoadingTemplates,
    error: templatesError,
  } = useQuery<any[]>({
    queryKey: ['automationTemplatesList'],
    queryFn: () => automationService.getTemplates(),
  });

  const createAutomationMutation = useMutation({
    mutationFn: async ({ name, description, trigger }: { name: string; description: string; trigger: string }) => {
      // In a real environment, we'd hit post. Our mockAdapter intercepts POST to '/crm-automation/automations'
      // Let's call axios to trigger interceptor
      const api = (await import('../../../api/axios')).default;
      const res = await api.post('/crm-automation/automations', { name, description, trigger });
      return res.data as Automation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automationsList'] });
    },
  });

  const deleteAutomationMutation = useMutation({
    mutationFn: async (id: string) => {
      const api = (await import('../../../api/axios')).default;
      await api.delete(`/crm-automation/automations/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automationsList'] });
    },
  });

  return {
    automations,
    templates,
    loading: isLoadingAutomations || isLoadingTemplates,
    error: automationsError || templatesError,
    refetch: refetchAutomations,
    createAutomation: createAutomationMutation.mutateAsync,
    creating: createAutomationMutation.isPending,
    deleteAutomation: deleteAutomationMutation.mutateAsync,
    deleting: deleteAutomationMutation.isPending,
  };
}
