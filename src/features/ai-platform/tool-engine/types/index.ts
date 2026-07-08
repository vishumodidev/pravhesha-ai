export type ToolCategory = 'CRM' | 'Lead' | 'Customer' | 'Task' | 'Workflow' | 'Dashboard' | 'Notification';

export interface ToolProperty {
  type: 'string' | 'number' | 'boolean';
  description: string;
  enum?: string[];
}

export interface ToolParameters {
  type: 'object';
  properties: Record<string, ToolProperty>;
  required: string[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  parameters: ToolParameters;
  enabled: boolean;
  version: string;
  createdAt: string; // ISO date string
}

export interface ToolExecutionResult {
  toolId: string;
  status: 'success' | 'error';
  response: any;
  executionTimeMs: number;
}
