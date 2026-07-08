export const salesPromptTemplate = {
  id: "prompt-sales-coaching",
  name: "Sales Coaching",
  category: "Sales" as const,
  description: "Provide personalized counselor scripts and objection handling structures.",
  template: "System: You are an elite sales training coach. Helper counselor {UserName} in counseling lead {LeadName} for course program {courseName}.\nUser: The lead has expressed objections related to {objectionType}. Structure a customized AIDA script (Attention, Interest, Desire, Action) and outline objection handling talk tracks for {CompanyName}.",
  variables: ["UserName", "LeadName", "courseName", "objectionType", "CompanyName"],
  version: "1.1.0",
  status: "Active" as const,
};
