export type NodeType = 'Trigger' | 'Condition' | 'Action' | 'AI' | 'Delay' | 'Notification';

export type TriggerType =
  | 'Lead Created'
  | 'Customer Created'
  | 'Task Due'
  | 'Workflow Completed'
  | 'Schedule'
  | 'Webhook';

export type ActionType =
  | 'Create Task'
  | 'Assign User'
  | 'Send Email'
  | 'Send WhatsApp'
  | 'Call AI'
  | 'Update CRM'
  | 'Notify User';

export interface AutomationNode {
  id: string;
  type: NodeType;
  name: string;
  position: { x: number; y: number };
  inputs: string[];
  outputs: string[];
  configuration: {
    // Specific configurations for triggers, actions, delays, conditions, AI nodes, etc.
    triggerType?: TriggerType;
    actionType?: ActionType;
    delayDuration?: number; // e.g., in minutes, hours, or days
    delayUnit?: 'minutes' | 'hours' | 'days';
    conditionExpression?: string; // e.g., "lead.value > 1000"
    aiPrompt?: string; // Prompt instruction for AI nodes
    aiModel?: string; // Model name
    emailTemplate?: string;
    whatsappTemplate?: string;
    assigneeId?: string;
    taskTitle?: string;
    taskPriority?: 'Low' | 'Medium' | 'High';
    webhookUrl?: string;
    cronExpression?: string; // for Schedule trigger
    [key: string]: any;
  };
}
