import api from '../../../api/axios';
import type { AgentExecution, AgentTask } from '../types';

export const orchestratorApi = {
  getRunningAgents: async (): Promise<any[]> => {
    try {
      const response = await api.get<any[]>('/crm-orchestrator/agents');
      return response.data;
    } catch (error) {
      console.warn('[Orchestrator API] Request for active agents failed, returning fallback.');
      return [
        { agentId: 'agent-sales', name: 'Sales Agent', role: 'Sales Counselor Consultant', status: 'Running' },
        { agentId: 'agent-support', name: 'Support Agent', role: 'Customer Success Representative', status: 'Running' },
      ];
    }
  },

  assignTask: async (agentId: string, goal: string): Promise<AgentTask> => {
    try {
      const response = await api.post<AgentTask>('/crm-orchestrator/tasks', { agentId, goal });
      return response.data;
    } catch (error) {
      console.warn('[Orchestrator API] Task assignment failed, returning mock fallback.');
      return {
        id: `task-${Date.now()}`,
        agentId,
        goal,
        status: 'Assigned',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  },

  getExecutionStatus: async (): Promise<AgentExecution[]> => {
    try {
      const response = await api.get<AgentExecution[]>('/crm-orchestrator/executions');
      return response.data;
    } catch (error) {
      console.warn('[Orchestrator API] Request for executions failed, returning mock fallback.');
      const mockData = await import('../mocks/agent-executions.json');
      return (mockData.default as unknown) as AgentExecution[];
    }
  },

  triggerOrchestration: async (goal: string): Promise<AgentExecution> => {
    try {
      const response = await api.post<AgentExecution>('/crm-orchestrator/run', { goal });
      return response.data;
    } catch (error) {
      console.warn('[Orchestrator API] Trigger orchestration run failed, executing locally in sandbox.');
      const { AgentOrchestrator } = await import('../orchestrator/AgentOrchestrator');
      return await AgentOrchestrator.orchestrateGoal(goal);
    }
  },
};
