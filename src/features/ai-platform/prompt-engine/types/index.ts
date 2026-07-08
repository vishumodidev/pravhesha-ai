export type PromptCategory = 'CRM' | 'Dashboard' | 'Sales' | 'Customer' | 'Support' | 'Workflow';
export type PromptStatus = 'Active' | 'Draft' | 'Deprecated';

export interface Prompt {
  id: string;
  name: string;
  category: PromptCategory;
  description: string;
  template: string;
  variables: string[];
  version: string;
  status: PromptStatus;
  createdAt: string; // ISO date string
}
