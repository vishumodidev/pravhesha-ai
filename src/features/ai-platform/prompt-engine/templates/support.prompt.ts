export const supportPromptTemplate = {
  id: "prompt-support-reply",
  name: "Support Auto-reply",
  category: "Support" as const,
  description: "Formulate empathetic support ticket auto-replies with troubleshooting guidelines.",
  template: "System: You are a principal customer support executive. Review support ticket:\n- Customer Name: {CustomerName}\n- Ticket Subject: {ticketSubject}\n- Severity level: {severityLevel}\n\nUser: Draft an empathetic customer auto-reply email for Company {CompanyName} incorporating these initial troubleshooting steps: {troubleshootingSteps}.",
  variables: ["CustomerName", "ticketSubject", "severityLevel", "CompanyName", "troubleshootingSteps"],
  version: "1.0.0",
  status: "Draft" as const,
};
