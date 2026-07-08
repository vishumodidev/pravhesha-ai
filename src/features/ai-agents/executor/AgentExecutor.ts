import type { AgentPlan, AgentPlanStep } from '../types/agent';

export class AgentExecutor {
  static async executePlan(agentId: string, plan: AgentPlan | null): Promise<AgentPlanStep[]> {
    if (!plan) return [];

    console.log(`[AgentExecutor] Executing plan for agent: ${agentId}, goal: "${plan.goal}"`);
    const executedSteps: AgentPlanStep[] = [];

    for (const step of plan.steps) {
      console.log(`[AgentExecutor] Starting step: ${step.title}`);

      await new Promise((resolve) => setTimeout(resolve, 500));

      let stepResult: any;
      if (step.toolId) {
        stepResult = {
          success: true,
          toolCalled: step.toolId,
          simulatedPayload: {
            message: `Mock tool response from ${step.toolId}`,
            timestamp: new Date().toISOString(),
          },
        };
      } else {
        stepResult = {
          success: true,
          outcome: `Completed: ${step.description}`,
        };
      }

      executedSteps.push({
        ...step,
        status: 'completed',
        result: stepResult,
      });

      console.log(`[AgentExecutor] Finished step: ${step.title}`);
    }

    return executedSteps;
  }
}
