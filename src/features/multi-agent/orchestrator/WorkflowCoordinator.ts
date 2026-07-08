import type { AgentExecution } from '../types';
import { AgentOrchestrator } from './AgentOrchestrator';

export class WorkflowCoordinator {
  static async executeWorkflow(goal: string): Promise<AgentExecution> {
    console.log(`[WorkflowCoordinator] Executing workflow matching goal: "${goal}"`);
    return await AgentOrchestrator.orchestrateGoal(goal);
  }
}
