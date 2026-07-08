export interface AIToolProperty {
  type: 'string' | 'number' | 'boolean' | 'array';
  description: string;
  enum?: string[];
}

export interface AITool {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, AIToolProperty>;
    required: string[];
  };
}

export const crmTool: AITool = {
  name: 'query_crm_database',
  description: 'Search CRM database records matching filters.',
  parameters: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'General keyword search' },
      entityType: { type: 'string', description: 'Type of entity to search', enum: ['Lead', 'Customer', 'Ticket'] },
    },
    required: ['entityType'],
  },
};

export const leadTool: AITool = {
  name: 'update_lead_status',
  description: 'Update the pipeline status of a specific lead.',
  parameters: {
    type: 'object',
    properties: {
      leadId: { type: 'string', description: 'Unique lead identifier' },
      status: { type: 'string', description: 'New pipeline status', enum: ['New', 'Contacted', 'Qualified', 'Lost'] },
    },
    required: ['leadId', 'status'],
  },
};

export const customerTool: AITool = {
  name: 'get_customer_metrics',
  description: 'Retrieve subscription billing metrics and account managers.',
  parameters: {
    type: 'object',
    properties: {
      customerId: { type: 'string', description: 'Unique customer identifier' },
    },
    required: ['customerId'],
  },
};

export const taskTool: AITool = {
  name: 'create_followup_task',
  description: 'Assign a new follow-up task to a counselor.',
  parameters: {
    type: 'object',
    properties: {
      leadId: { type: 'string', description: 'Associated lead ID' },
      title: { type: 'string', description: 'Task title / objective' },
      dueDate: { type: 'string', description: 'Scheduled ISO completion date' },
      counselorName: { type: 'string', description: 'Assigned counselor' },
    },
    required: ['leadId', 'title', 'dueDate', 'counselorName'],
  },
};

export const dashboardTool: AITool = {
  name: 'get_revenue_forecast',
  description: 'Compile monthly revenue trends and conversion statistics.',
  parameters: {
    type: 'object',
    properties: {
      months: { type: 'number', description: 'Number of past months to compute' },
    },
    required: ['months'],
  },
};
