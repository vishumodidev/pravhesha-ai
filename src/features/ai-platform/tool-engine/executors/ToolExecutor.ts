import { ToolRegistry } from '../registry/ToolRegistry';
import type { ToolExecutionResult } from '../types';

export class ToolExecutor {
  static async execute(toolId: string, parameters: Record<string, any>): Promise<ToolExecutionResult> {
    const startTime = Date.now();
    const tool = ToolRegistry.findTool(toolId);

    if (!tool) {
      return {
        toolId,
        status: 'error',
        response: `Execution error: Tool ${toolId} not found in registry.`,
        executionTimeMs: Date.now() - startTime,
      };
    }

    const validation = ToolRegistry.validateTool(toolId, parameters);
    if (!validation.isValid) {
      return {
        toolId,
        status: 'error',
        response: `Validation error: ${validation.error}`,
        executionTimeMs: Date.now() - startTime,
      };
    }

    // Simulate delays
    await new Promise((resolve) => setTimeout(resolve, 300));
    const executionTimeMs = Date.now() - startTime;

    let responsePayload: any;

    switch (tool.name) {
      case 'GetLeads':
        responsePayload = {
          success: true,
          count: 2,
          leads: [
            { id: 'lead-1', name: 'Rahul Sharma', email: 'rahul@gmail.com', program: parameters.program || 'Data Science', status: parameters.status || 'Qualified' },
            { id: 'lead-2', name: 'Dinesh Kumar', email: 'dinesh@gmail.com', program: parameters.program || 'Data Science', status: parameters.status || 'Contacted' },
          ],
        };
        break;

      case 'GetCustomers':
        responsePayload = {
          success: true,
          count: 3,
          customers: [
            { id: 'cust-1', name: 'Vikram Patel', course: 'Full Stack Development', status: 'Active', billingCycle: 'Monthly' },
            { id: 'cust-2', name: 'Neha Patel', course: 'Data Science & AI', status: 'Active', billingCycle: 'Quarterly' },
            { id: 'cust-3', name: 'Aarav Mehta', course: 'Data Science & AI', status: 'Active', billingCycle: 'Monthly' },
          ].slice(0, parameters.limit || 3),
        };
        break;

      case 'GetTasks':
        responsePayload = {
          success: true,
          counselorName: parameters.counselor,
          tasks: [
            { id: 'task-1', title: 'Objection call with Dinesh', dueDate: '2026-07-08', completed: false, overdue: true },
            { id: 'task-2', title: 'Send fee details brochure to Neha', dueDate: '2026-07-07', completed: false, overdue: true },
          ],
        };
        break;

      case 'CreateTask':
        responsePayload = {
          success: true,
          message: 'Task created successfully in CRM.',
          task: {
            id: `task-${Math.floor(Math.random() * 1000)}`,
            leadId: parameters.leadId,
            title: parameters.title,
            dueDate: parameters.dueDate,
            counselor: parameters.counselor,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
        break;

      case 'GetDashboardSummary':
        responsePayload = {
          success: true,
          visitors: 12450,
          socialLeads: 240,
          crmLeads: 85,
          customers: 156,
          revenueForecast: '₹12,45,000',
          pendingTasks: 8,
          overdueTasks: 2,
        };
        break;

      case 'GetNotifications':
        responsePayload = {
          success: true,
          notifications: [
            { id: 'notif-1', title: 'New Lead Assigned', message: 'Rahul Sharma assigned to Priya Mehta', read: false },
            { id: 'notif-2', title: 'WhatsApp Message Failed', message: 'Delivery failed to Neha Patel', read: false },
          ],
        };
        break;

      case 'GetWorkflowStatus':
        responsePayload = {
          success: true,
          workflowId: parameters.workflowId,
          activeRuns: 1,
          completedRuns: 12,
          failedRuns: 0,
        };
        break;

      default:
        responsePayload = {
          success: true,
          message: `Simulated execution payload for ${tool.name}`,
          parameters,
        };
    }

    return {
      toolId,
      status: 'success',
      response: responsePayload,
      executionTimeMs,
    };
  }
}
