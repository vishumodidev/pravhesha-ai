export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  source: string;
  company: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Converted' | 'Unqualified';
  aiScore: number;
  value: number;
  ownerName: string;
  ownerAvatar: string;
  addedOn: string;
  phone: string;
  aiInsights: string[];
}

export interface LeadsResponse {
  leads: LeadRecord[];
  leadsSourceData: { name: string; value: number; color: string }[];
}
