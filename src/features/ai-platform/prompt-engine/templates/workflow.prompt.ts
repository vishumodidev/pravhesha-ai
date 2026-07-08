export const workflowPromptTemplate = {
  id: "prompt-workflow-suggestion",
  name: "Workflow Suggestion",
  category: "Workflow" as const,
  description: "Formulate event-based automation rules and action sequences.",
  template: "System: You are an expert CRM automation designer. We need to construct a new workflow.\n- Event Trigger: {triggerEvent}\n- Filter Criteria: {filterCondition}\n- Target Actions: {targetActions}\n\nUser: Suggest an optimized action timeline sequence and rule syntax structure for event {triggerEvent} in Company {CompanyName}.",
  variables: ["triggerEvent", "filterCondition", "targetActions", "CompanyName"],
  version: "1.0.0",
  status: "Active" as const,
};
