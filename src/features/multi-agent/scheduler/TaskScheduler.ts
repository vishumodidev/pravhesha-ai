import type { AgentTask, AgentTaskStatus } from '../types';

export class TaskScheduler {
  private static taskQueue: AgentTask[] = [];

  static queueTask(task: AgentTask): void {
    this.taskQueue.push({
      ...task,
      status: 'Waiting',
      updatedAt: new Date().toISOString(),
    });
    console.log(`[TaskScheduler] Task ${task.id} queued.`);
  }

  static assignAgent(taskId: string, agentId: string): void {
    const task = this.taskQueue.find((t) => t.id === taskId);
    if (task) {
      task.agentId = agentId;
      task.status = 'Assigned';
      task.updatedAt = new Date().toISOString();
      console.log(`[TaskScheduler] Task ${taskId} assigned to agent: ${agentId}`);
    }
  }

  static updateTaskStatus(taskId: string, status: AgentTaskStatus): void {
    const task = this.taskQueue.find((t) => t.id === taskId);
    if (task) {
      task.status = status;
      task.updatedAt = new Date().toISOString();
      console.log(`[TaskScheduler] Task ${taskId} status updated to: ${status}`);
    }
  }

  static getQueue(): AgentTask[] {
    return this.taskQueue;
  }

  static clear(): void {
    this.taskQueue = [];
  }
}
