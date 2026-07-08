import type { Agent, AgentState, AgentPlan, AgentExecutionResult } from '../types/agent';
import { AgentPlanner } from '../planner/AgentPlanner';
import { AgentExecutor } from '../executor/AgentExecutor';

export abstract class BaseAgent {
  id: string;
  name: string;
  description: string;
  role: string;
  status: AgentState = 'Idle';
  provider: string;
  version: string;
  createdAt: string;

  protected currentGoal: string = '';
  protected currentPlan: AgentPlan | null = null;

  constructor(agentMeta: Agent) {
    this.id = agentMeta.id;
    this.name = agentMeta.name;
    this.description = agentMeta.description;
    this.role = agentMeta.role;
    this.status = agentMeta.status;
    this.provider = agentMeta.provider;
    this.version = agentMeta.version;
    this.createdAt = agentMeta.createdAt;
  }

  initialize(config: any): void {
    console.log(`[Agent: ${this.name}] Initialized with config:`, config);
    this.status = 'Idle';
  }

  async run(goal: string): Promise<AgentExecutionResult> {
    const startTime = Date.now();
    console.log(`[Agent: ${this.name}] Starting run for goal: "${goal}"`);
    this.currentGoal = goal;

    this.status = 'Thinking';
    await new Promise((resolve) => setTimeout(resolve, 400));

    this.status = 'Planning';
    this.currentPlan = await AgentPlanner.generatePlan(this.id, goal);
    await new Promise((resolve) => setTimeout(resolve, 400));

    this.status = 'Executing';
    const executedSteps = await AgentExecutor.executePlan(this.id, this.currentPlan);

    const hasFailures = executedSteps.some((s) => s.status === 'failed');
    this.status = hasFailures ? 'Failed' : 'Completed';

    const executionTimeMs = Date.now() - startTime;

    const summaryResponse = hasFailures
      ? `Agent [${this.name}] failed to achieve the goal: "${goal}". Underlyling step execution failed.`
      : `Agent [${this.name}] successfully completed the goal: "${goal}". All plan steps executed.`;

    return {
      agentId: this.id,
      goal,
      status: hasFailures ? 'error' : 'success',
      steps: executedSteps,
      response: summaryResponse,
      executionTimeMs,
    };
  }

  getStatus(): AgentState {
    return this.status;
  }
}
