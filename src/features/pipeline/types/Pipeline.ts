export interface Pipeline {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  stage: 'New' | 'Qualified' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Negotiation' | 'Won' | 'Lost';
  probability: number;
  expectedRevenue: number;
  expectedCloseDate: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}
