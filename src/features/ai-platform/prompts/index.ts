export interface AIPromptTemplate {
  name: string;
  template: string;
  variables: string[];
  format: (data: Record<string, string>) => string;
}

export const salesPrompt: AIPromptTemplate = {
  name: 'sales_coaching',
  template: 'You are an elite sales coach. Assist counselor {counselorName} in refining their pitch for {courseName}. Current stage: {opportunityStage}. Focus on handling objections related to {objection}.',
  variables: ['counselorName', 'courseName', 'opportunityStage', 'objection'],
  format: (data) => {
    return `You are an elite sales coach. Assist counselor ${data.counselorName || 'Agent'} in refining their pitch for ${data.courseName || 'Course'}. Current stage: ${data.opportunityStage || 'New'}. Focus on handling objections related to ${data.objection || 'Price'}.`;
  },
};

export const customerPrompt: AIPromptTemplate = {
  name: 'customer_summarization',
  template: 'Summarize the interaction history for customer {customerName} (ID: {customerId}). Focus on identifying key bottlenecks and potential upsell opportunities for {courseInterested}.',
  variables: ['customerName', 'customerId', 'courseInterested'],
  format: (data) => {
    return `Summarize the interaction history for customer ${data.customerName || 'Customer'} (ID: ${data.customerId || 'N/A'}). Focus on identifying key bottlenecks and potential upsell opportunities for ${data.courseInterested || 'General Courses'}.`;
  },
};

export const dashboardPrompt: AIPromptTemplate = {
  name: 'dashboard_insights',
  template: 'Analyze the dashboard performance metrics: Total Visitors={visitors}, CRM Leads={leads}, Monthly Revenue={revenue}. Generate a 3-point action plan to improve conversion.',
  variables: ['visitors', 'leads', 'revenue'],
  format: (data) => {
    return `Analyze the dashboard performance metrics: Total Visitors=${data.visitors || '0'}, CRM Leads=${data.leads || '0'}, Monthly Revenue=${data.revenue || '0'}. Generate a 3-point action plan to improve conversion.`;
  },
};

export const workflowPrompt: AIPromptTemplate = {
  name: 'workflow_generation',
  template: 'Create a workflow trigger-action sequence for event "{triggerEvent}". Condition rule: "{condition}". List step-by-step automated CRM tasks to execute.',
  variables: ['triggerEvent', 'condition'],
  format: (data) => {
    return `Create a workflow trigger-action sequence for event "${data.triggerEvent || 'New Lead'}". Condition rule: "${data.condition || 'None'}". List step-by-step automated CRM tasks to execute.`;
  },
};
