import api from '../../../api/axios';
import type { Automation } from '../types';
import { AutomationValidator } from '../validation/AutomationValidator';
import type { ValidationError } from '../validation/AutomationValidator';

export const automationApi = {
  getAutomations: async (): Promise<Automation[]> => {
    try {
      const response = await api.get<Automation[]>('/crm-automation/automations');
      return response.data;
    } catch (error) {
      console.warn('[Automation API] getAutomations failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/automations.json');
      return mockData.default as unknown as Automation[];
    }
  },

  getTemplates: async (): Promise<any[]> => {
    try {
      const response = await api.get<any[]>('/crm-automation/templates');
      return response.data;
    } catch (error) {
      console.warn('[Automation API] getTemplates failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/templates.json');
      return mockData.default as any[];
    }
  },

  getAutomation: async (id: string): Promise<Automation> => {
    try {
      const response = await api.get<Automation>(`/crm-automation/automations/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[Automation API] getAutomation(${id}) failed, seeking local mocks.`, error);
      const mockData = await import('../mocks/automations.json');
      const found = mockData.default.find((a) => a.id === id);
      if (!found) {
        // also check templates
        const templatesData = await import('../mocks/templates.json');
        const foundTpl = templatesData.default.find((t) => t.id === id);
        if (foundTpl) return foundTpl as unknown as Automation;
        throw new Error(`Automation flow with ID ${id} not found.`);
      }
      return found as unknown as Automation;
    }
  },

  validateAutomation: async (automation: Automation): Promise<ValidationError[]> => {
    try {
      const response = await api.post<ValidationError[]>('/crm-automation/validate', automation);
      return response.data;
    } catch (error) {
      console.warn('[Automation API] Remote validation failed, running validator locally.', error);
      return AutomationValidator.validate(automation);
    }
  },
};
