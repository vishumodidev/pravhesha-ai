export interface Customer {
  id: string;
  customerCode: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  address: string;
  status: 'Active' | 'Inactive' | 'At Risk';
  accountManager: string;
  createdAt: string;
}
