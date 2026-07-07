export interface Lead {
  id: string;
  leadNumber: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost';
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
}
