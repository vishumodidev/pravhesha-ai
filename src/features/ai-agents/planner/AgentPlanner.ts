import type { AgentPlan, AgentPlanStep } from '../types/agent';

export class AgentPlanner {
  static async generatePlan(agentId: string, goal: string): Promise<AgentPlan> {
    console.log(`[AgentPlanner] Generating plan for agent: ${agentId}, goal: "${goal}"`);

    let steps: AgentPlanStep[] = [];
    const key = agentId.toLowerCase();

    if (key.includes('sales')) {
      steps = [
        { id: 'step-1', title: 'Query active leads', description: 'Fetch CRM leads list filtered by new status', status: 'pending', toolId: 'tool-get-leads' },
        { id: 'step-2', title: 'Compile sales coaching script', description: 'Construct contextual counselor advice template', status: 'pending' },
        { id: 'step-3', title: 'Schedule counselor follow-up task', description: 'Insert a new CRM follow-up activity record', status: 'pending', toolId: 'tool-create-task' },
      ];
    } else if (key.includes('support')) {
      steps = [
        { id: 'step-1', title: 'Fetch unread support tickets', description: 'Query tickets catalogue in CRM', status: 'pending' },
        { id: 'step-2', title: 'Generate FAQ auto-reply', description: 'Build troubleshooting email draft from FAQ document resources', status: 'pending' },
      ];
    } else if (key.includes('hr')) {
      steps = [
        { id: 'step-1', title: 'Search Employee Handbook', description: 'Fetch policy documents content from Knowledge Base', status: 'pending' },
        { id: 'step-2', title: 'Summarize leave policies', description: 'Extract leave calculations parameters', status: 'pending' },
      ];
    } else {
      steps = [
        { id: 'step-1', title: 'Analyze business goal request', description: 'Parse target parameters logs', status: 'pending' },
        { id: 'step-2', title: 'Execute default operations sequence', description: 'Fetch stats summary indicators', status: 'pending', toolId: 'tool-get-dashboard-summary' },
      ];
    }

    return {
      goal,
      steps,
    };
  }
}
