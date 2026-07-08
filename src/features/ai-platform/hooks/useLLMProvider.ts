import { useQuery } from '@tanstack/react-query';
import { providerService } from '../services/provider.service';
import type { ProviderMeta } from '../services/provider.service';
import { useAIStore } from '../store/ai.store';

export function useLLMProvider() {
  const { selectedProvider, setSelectedProvider } = useAIStore();

  const { data: providers = [], isLoading, error, refetch } = useQuery<ProviderMeta[]>({
    queryKey: ['llmProviders'],
    queryFn: () => providerService.getAvailableProviders(),
  });

  const activeProviderMeta = providers.find((p) => p.id === selectedProvider) || providers[0];
  const activeProviderConfig = providerService.getProviderConfig(selectedProvider);

  const switchProvider = (id: string) => {
    setSelectedProvider(id);
  };

  return {
    providers,
    loading: isLoading,
    error,
    currentProvider: selectedProvider,
    activeProviderMeta,
    activeProviderConfig,
    switchProvider,
    refetch,
  };
}
