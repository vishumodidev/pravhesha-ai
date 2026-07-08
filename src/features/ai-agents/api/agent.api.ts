import api from '../../../api/axios';
import type { Agent, AgentExecutionResult } from '../types/agent';

export const agentApi = {
  getAgents: async (): Promise<Agent[]> => {
    try {
      const response = await api.get<Agent[]>('/crm-agents/list');
      return response.data;
    } catch (error) {
      console.warn('[Agent API] Request for agents list failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/agents.json');
      return (mockData.default as unknown) as Agent[];
    }
  },

  getAgent: async (id: string): Promise<Agent> => {
    try {
      const response = await api.get<Agent>(`/crm-agents/list/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[Agent API] Request for agent ${id} failed, returning mock fallback.`, error);
      const mockData = await import('../mocks/agents.json');
      const found = ((mockData.default as unknown) as Agent[]).find((a) => a.id === id);
      if (!found) throw new Error(`Agent not found: ${id}`);
      return found;
    }
  },

  executeAgent: async (id: string, goal: string): Promise<AgentExecutionResult> => {
    try {
      const response = await api.post<AgentExecutionResult>(`/crm-agents/${id}/execute`, {
        goal,
      });
      return response.data;
    } catch (error) {
      console.warn(`[Agent API] Execution run for agent ${id} failed, running locally in mock framework sandbox.`, error);
      const { AgentRegistry } = await import('../registry/AgentRegistry');
      const { AgentPlanner } = await import('../planner/AgentPlanner');
      const { AgentExecutor } = await import('../executor/AgentExecutor');

      if (AgentRegistry.getAgents().length === 0) {
        const mockData = await import('../mocks/agents.json');
        ((mockData.default as unknown) as Agent[]).forEach((a) => AgentRegistry.registerAgent(a));
      }

      const agent = AgentRegistry.findAgent(id);
      if (!agent) {
        throw new Error(`Agent not registered: ${id}`);
      }

      const startTime = Date.now();
      const plan = await AgentPlanner.generatePlan(id, goal);
      const steps = await AgentExecutor.executePlan(id, plan);
      const hasFailures = steps.some((s) => s.status === 'failed');
      const executionTimeMs = Date.now() - startTime;

      return {
        agentId: id,
        goal,
        status: hasFailures ? 'error' : 'success',
        steps,
        response: hasFailures
          ? `Agent [${agent.name}] failed to achieve the goal: "${goal}". Underlyling step execution failed.`
          : `Agent [${agent.name}] successfully completed the goal: "${goal}". All plan steps executed.`,
        executionTimeMs,
      };
    }
  },
};
