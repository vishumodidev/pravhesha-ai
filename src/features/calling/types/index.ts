export interface CallRecord {
  id: string;
  phone: string;
  location: string;
  contactName: string;
  company: string;
  type: 'Inbound' | 'Outbound';
  status: 'Answered' | 'Missed';
  duration: string;
  agentName: string;
  agentAvatar: string;
  dateTime: string;
  recordingLength: string;
  source: string;
  aiSummary: string;
  keyPoints: string[];
  nextAction: string;
}
