export const dashboardPromptTemplate = {
  id: "prompt-dashboard-summary",
  name: "Dashboard Summary",
  category: "Dashboard" as const,
  description: "Summarize dashboard metrics and compile a 3-point business action plan.",
  template: "System: You are a principal business analyst. Analyze these CRM performance statistics:\n- Total Visitors: {visitorsCount}\n- CRM Leads: {leadsCount}\n- Revenue Target: {monthlyRevenue}\n- Active Pipeline Status: {activePipeline}\n\nUser: Summarize today's business performance and provide a 3-point operational action plan to improve counselor conversions for Company {CompanyName}.",
  variables: ["visitorsCount", "leadsCount", "monthlyRevenue", "activePipeline", "CompanyName"],
  version: "1.0.0",
  status: "Active" as const,
};
