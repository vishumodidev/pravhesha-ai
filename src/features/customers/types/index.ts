export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: 'Enterprise' | 'Professional' | 'Standard' | 'Basic';
  status: 'Active' | 'At Risk' | 'Inactive';
  healthScore: number;
  ltv: number;
  lastActivity: string;
  ownerName: string;
  ownerAvatar: string;
}

export interface CustomersResponse {
  customers: CustomerRecord[];
  plansData: { name: string; value: number; color: string }[];
  customerTrendData: { name: string; New: number; Active: number }[];
  sourceData: { name: string; value: number; color: string }[];
  healthScoreDistribution: { name: string; value: number; color: string }[];
  metrics: {
    total: { val: string; pct: string };
    active: { val: string; pct: string };
    inactive: { val: string; pct: string };
    invited: { val: string; pct: string };
  };
}
