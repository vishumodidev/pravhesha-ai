import { automationApi } from '../api/automation.api';
import type { Automation } from '../types';
import type { ValidationError } from '../validation/AutomationValidator';

export const automationService = {
  getAutomations: async (): Promise<Automation[]> => {
    return await automationApi.getAutomations();
  },

  getTemplates: async (): Promise<any[]> => {
    return await automationApi.getTemplates();
  },

  getAutomation: async (id: string): Promise<Automation> => {
    return await automationApi.getAutomation(id);
  },

  validateAutomation: async (automation: Automation): Promise<ValidationError[]> => {
    return await automationApi.validateAutomation(automation);
  },
};
