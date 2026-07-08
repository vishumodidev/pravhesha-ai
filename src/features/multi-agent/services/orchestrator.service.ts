import { orchestratorApi } from '../api/orchestrator.api';
import type { AgentExecution, AgentTask } from '../types';

export const orchestratorService = {
  getRunningAgents: async (): Promise<any[]> => {
    return await orchestratorApi.getRunningAgents();
  },

  assignTask: async (agentId: string, goal: string): Promise<AgentTask> => {
    return await orchestratorApi.assignTask(agentId, goal);
  },

  getExecutions: async (): Promise<AgentExecution[]> => {
    return await orchestratorApi.getExecutionStatus();
  },

  triggerOrchestration: async (goal: string): Promise<AgentExecution> => {
    return await orchestratorApi.triggerOrchestration(goal);
  },
};
