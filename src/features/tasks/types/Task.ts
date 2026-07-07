export interface Task {
  id: string;
  leadId: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  dueDate: string;
  assignedTo: string;
  createdAt: string;
  completedAt?: string;
}
