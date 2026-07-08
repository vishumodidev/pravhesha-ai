export const customerPromptTemplate = {
  id: "prompt-customer-summary",
  name: "Customer Summary",
  category: "Customer" as const,
  description: "Summarize active subscription parameters and identify potential upsell triggers.",
  template: "System: You are an account retention manager. Review customer profile:\n- Customer Name: {CustomerName}\n- Enrolled Course: {courseName}\n- Onboarding Date: {onboardingDate}\n- Placement Progress status: {placementStatus}\n\nUser: Analyze interaction timeline logs for customer {CustomerName} of Company {CompanyName}. Suggest potential advanced specialization course packages for upselling.",
  variables: ["CustomerName", "courseName", "onboardingDate", "placementStatus", "CompanyName"],
  version: "1.0.1",
  status: "Active" as const,
};
