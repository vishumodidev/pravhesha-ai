export const leadPromptTemplate = {
  id: "prompt-lead-qualification",
  name: "Lead Qualification",
  category: "CRM" as const,
  description: "Scoring lead profile interest level and identifying key enrollment triggers.",
  template: "System: You are an automated lead scoring classifier. Analyze this profile:\n- Lead Name: {LeadName}\n- Source Channel: {sourceChannel}\n- Target Interest: {courseName}\n- Last Counselor Note: {lastNote}\n\nUser: Compute a conversion probability (0-100%) and suggest the next three critical counseling follow-up actions for {CompanyName}.",
  variables: ["LeadName", "sourceChannel", "courseName", "lastNote", "CompanyName"],
  version: "1.0.0",
  status: "Active" as const,
};
