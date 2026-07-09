import type { AutomationNode } from './AutomationNode';

export type AutomationStatus = 'active' | 'draft' | 'inactive';

export interface AutomationConnection {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  sourceOutputPort?: string;
  targetInputPort?: string;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  status: AutomationStatus;
  trigger: string; // The trigger type (e.g., 'Lead Created') or starting trigger node type
  nodes: AutomationNode[];
  connections: AutomationConnection[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
