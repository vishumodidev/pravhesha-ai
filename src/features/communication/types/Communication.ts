export interface Communication {
  id: string;
  leadId: string;
  type: 'Call' | 'WhatsApp' | 'Email' | 'SMS';
  direction: 'Incoming' | 'Outgoing';
  subject: string;
  message: string;
  status: 'Delivered' | 'Read' | 'Failed' | 'Completed';
  createdBy: string;
  createdAt: string;
}
