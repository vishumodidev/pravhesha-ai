import api from '../../../api/axios';
import type { BaseLLMProvider } from '../providers/base/BaseLLMProvider';
import { LLMProviderFactory } from '../providers/LLMProviderFactory';
import { providerConfigs } from '../providers/provider.config';
import type { LLMConfig } from '../providers/provider.config';

export interface ProviderMeta {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  status: string;
  health: string;
  latency: string;
}

export const providerService = {
  getAvailableProviders: async (): Promise<ProviderMeta[]> => {
    try {
      const response = await api.get<ProviderMeta[]>('/crm-ai/providers');
      return response.data;
    } catch (error) {
      console.warn('[Provider Service] Failed to fetch providers from API, using local fallback.', error);
      const mockData = await import('../mocks/providers.json');
      return mockData.default as ProviderMeta[];
    }
  },

  getProviderInstance: (id: string): BaseLLMProvider => {
    return LLMProviderFactory.getProvider(id);
  },

  getProviderConfig: (id: string): LLMConfig | undefined => {
    return providerConfigs[id.toLowerCase()];
  },

  validateProvider: async (id: string): Promise<boolean> => {
    try {
      const provider = LLMProviderFactory.getProvider(id);
      return await provider.healthCheck();
    } catch (error) {
      console.error(`[Provider Service] Validation failed for provider ${id}:`, error);
      return false;
    }
  },
};
