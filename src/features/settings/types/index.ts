export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Team Lead' | 'Support Manager' | 'Support Agent' | 'Sales Executive' | 'Marketing Executive';
  department: 'Sales' | 'Support' | 'Marketing' | 'Management';
  status: 'Active' | 'Inactive' | 'Invited';
  lastLogin: string;
  joinedOn: string;
  avatar: string;
}

export interface UserRoleDistribution {
  name: string;
  value: number;
  color: string;
}

export interface SettingsData {
  users: UserRecord[];
  roleDistributionData: UserRoleDistribution[];
}
