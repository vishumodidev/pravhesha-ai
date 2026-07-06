export interface MeetingCardData {
  time: string;
  title: string;
  client: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  color: string;
}

export interface FollowUpRecord {
  id: string;
  title: string;
  detail: string;
  leadName: string;
  company: string;
  type: 'Phone Call' | 'Email' | 'WhatsApp' | 'Meeting';
  dueDate: string;
  dueTime: string;
  dueStatus: 'Due Today' | 'In 1 day' | 'In 2 days' | 'In 3 days' | 'In 4 days' | 'In 5 days' | 'In 6 days';
  priority: 'High' | 'Medium' | 'Low';
  agentName: string;
  agentAvatar: string;
  status: 'Pending' | 'Confirmed';
  lastContact: string;
}

export interface SchedulingData {
  schedule: Record<string, MeetingCardData[]>;
  followUps: FollowUpRecord[];
  metrics: {
    totalSchedules: string;
    confirmed: string;
    pending: string;
    completed: string;
    cancelled: string;
    noShow: string;
  };
}
