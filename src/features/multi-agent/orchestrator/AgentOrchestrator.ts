import type { AgentExecution, AgentTask } from '../types';
import { TaskScheduler } from '../scheduler/TaskScheduler';
import { AgentCommunication } from '../communication/AgentCommunication';

export class AgentOrchestrator {
  static async orchestrateGoal(goal: string): Promise<AgentExecution> {
    const startTime = Date.now();
    console.log(`[AgentOrchestrator] Initiating multi-agent orchestration for goal: "${goal}"`);

    const tasks: AgentTask[] = [];
    const lowerGoal = goal.toLowerCase();

    if (lowerGoal.includes('audit') || lowerGoal.includes('report') || lowerGoal.includes('sync')) {
      tasks.push(
        { id: `task-${Date.now()}-1`, agentId: 'agent-sales', goal: 'Scan active lead pipelines status indicators', status: 'Waiting', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: `task-${Date.now()}-2`, agentId: 'agent-support', goal: 'Query support tickets backlog levels', status: 'Waiting', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: `task-${Date.now()}-3`, agentId: 'agent-finance', goal: 'Compile invoices collections forecasting analytics', status: 'Waiting', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      );
    } else {
      tasks.push(
        { id: `task-${Date.now()}-1`, agentId: 'agent-sales', goal: 'Gather primary target counseling leads criteria', status: 'Waiting', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: `task-${Date.now()}-2`, agentId: 'agent-support', goal: 'Cross check FAQs template responses matching lead queries', status: 'Waiting', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      );
    }

    TaskScheduler.clear();
    tasks.forEach((t) => TaskScheduler.queueTask(t));

    AgentCommunication.clear();
    if (tasks.some((t) => t.agentId === 'agent-sales') && tasks.some((t) => t.agentId === 'agent-support')) {
      AgentCommunication.sendMessage('agent-sales', 'agent-support', `Requesting FAQ syllabus document details for lead requirements matching goal "${goal}"`);
      await new Promise((resolve) => setTimeout(resolve, 300));
      AgentCommunication.sendMessage('agent-support', 'agent-sales', 'Retrieved FAQ curriculum items. Counselor scripts auto-response compiled.');
    }

    for (const task of tasks) {
      TaskScheduler.assignAgent(task.id, task.agentId);
      TaskScheduler.updateTaskStatus(task.id, 'Running');
      await new Promise((resolve) => setTimeout(resolve, 600));
      TaskScheduler.updateTaskStatus(task.id, 'Completed');
    }

    const elapsed = Date.now() - startTime;
    const finalResponse = `Multi-Agent Orchestrator successfully consolidated results across ${tasks.length} specialized agents to resolve goal: "${goal}".`;

    return {
      id: `exec-${Date.now()}`,
      goal,
      status: 'Completed',
      tasks: [...TaskScheduler.getQueue()],
      finalResponse,
      startedAt: new Date(startTime).toISOString(),
      endedAt: new Date().toISOString(),
      executionTimeMs: elapsed,
    };
  }
}
