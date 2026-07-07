export interface LeadActivity {
  id: string;
  leadId: string;
  activityType:
    | 'Lead Created'
    | 'Call Made'
    | 'Email Sent'
    | 'WhatsApp Sent'
    | 'Meeting Scheduled'
    | 'Status Changed'
    | 'Note Added';
  title: string;
  description: string;
  performedBy: string;
  performedAt: string;
}
