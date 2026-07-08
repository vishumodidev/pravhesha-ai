export type AgentState = 'Idle' | 'Thinking' | 'Planning' | 'Executing' | 'Completed' | 'Failed';
export type StepStatus = 'pending' | 'executing' | 'completed' | 'failed';

export interface Agent {
  id: string;
  name: string;
  description: string;
  role: string;
  status: AgentState;
  provider: string;
  version: string;
  createdAt: string; // ISO date string
}

export interface AgentPlanStep {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
  toolId?: string;
  result?: any;
}

export interface AgentPlan {
  goal: string;
  steps: AgentPlanStep[];
}

export interface AgentExecutionResult {
  agentId: string;
  goal: string;
  status: 'success' | 'error';
  steps: AgentPlanStep[];
  response: string;
  executionTimeMs: number;
}
