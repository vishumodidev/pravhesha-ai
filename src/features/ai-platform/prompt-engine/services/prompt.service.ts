import { promptApi } from '../api/prompt.api';
import type { Prompt } from '../types';

export const promptService = {
  getPrompts: async (): Promise<Prompt[]> => {
    return await promptApi.getPrompts();
  },

  getPrompt: async (id: string): Promise<Prompt> => {
    return await promptApi.getPrompt(id);
  },

  buildPromptText: (template: string, variables: Record<string, string>): string => {
    let compiled = template;
    Object.entries(variables).forEach(([key, val]) => {
      compiled = compiled.replace(new RegExp(`{${key}}`, 'g'), val);
    });
    return compiled;
  },

  buildPrompt: async (id: string, variables: Record<string, string>): Promise<string> => {
    return await promptApi.buildPrompt(id, variables);
  },
};
