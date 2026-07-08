export type AgentTaskStatus = 'Waiting' | 'Assigned' | 'Running' | 'Completed' | 'Failed';

export interface AgentTask {
  id: string;
  agentId: string;
  goal: string;
  status: AgentTaskStatus;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface AgentExecution {
  id: string;
  goal: string;
  status: AgentTaskStatus;
  tasks: AgentTask[];
  finalResponse: string;
  startedAt: string; // ISO date string
  endedAt: string; // ISO date string
  executionTimeMs: number;
}

export interface AgentMessage {
  id: string;
  fromAgentId: string;
  toAgentId: string;
  content: string;
  timestamp: string; // ISO date string
}
