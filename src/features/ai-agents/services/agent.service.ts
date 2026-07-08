import { agentApi } from '../api/agent.api';
import type { Agent, AgentExecutionResult } from '../types/agent';

export const agentService = {
  getAgents: async (): Promise<Agent[]> => {
    return await agentApi.getAgents();
  },

  getAgent: async (id: string): Promise<Agent> => {
    return await agentApi.getAgent(id);
  },

  executeAgent: async (id: string, goal: string): Promise<AgentExecutionResult> => {
    return await agentApi.executeAgent(id, goal);
  },
};
