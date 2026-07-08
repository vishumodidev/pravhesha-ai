import api from '../../../../api/axios';
import type { Prompt } from '../types';

export const promptApi = {
  getPrompts: async (): Promise<Prompt[]> => {
    try {
      const response = await api.get<Prompt[]>('/crm-ai/prompts');
      return response.data;
    } catch (error) {
      console.warn('[Prompt API] Request for prompts failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/prompts.json');
      return mockData.default as Prompt[];
    }
  },
  getPrompt: async (id: string): Promise<Prompt> => {
    try {
      const response = await api.get<Prompt>(`/crm-ai/prompts/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[Prompt API] Request for prompt ${id} failed, returning mock fallback.`, error);
      const mockData = await import('../mocks/prompts.json');
      const found = (mockData.default as Prompt[]).find((p) => p.id === id);
      if (!found) throw new Error(`Prompt not found: ${id}`);
      return found;
    }
  },
  buildPrompt: async (id: string, variables: Record<string, string>): Promise<string> => {
    try {
      const response = await api.post<{ builtPrompt: string }>(`/crm-ai/prompts/${id}/build`, {
        variables,
      });
      return response.data.builtPrompt;
    } catch (error) {
      console.warn(`[Prompt API] Request to build prompt ${id} failed, returning local mock build fallback.`, error);
      const prompt = await promptApi.getPrompt(id);
      let compiled = prompt.template;
      Object.entries(variables).forEach(([key, val]) => {
        compiled = compiled.replace(new RegExp(`{${key}}`, 'g'), val);
      });
      return compiled;
    }
  },
};
