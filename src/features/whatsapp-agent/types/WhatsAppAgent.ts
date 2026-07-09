export type WhatsAppMessageStatus = 'sent' | 'delivered' | 'read' | 'received' | 'failed';
export type WhatsAppConversationStatus = 'active' | 'resolved' | 'pending_human' | 'closed';

export interface WhatsAppMessage {
  id: string;
  phone: string;
  name: string;
  message: string;
  direction: 'inbound' | 'outbound';
  timestamp: string;
  status: WhatsAppMessageStatus;
  thoughts?: string; // AI thoughts associated with generating this reply (if outbound)
}

export interface WhatsAppConversation {
  conversationId: string;
  phone: string;
  name: string;
  customerId?: string; // Mapped to Customer if existing
  leadId?: string;     // Mapped to Lead if existing
  messages: WhatsAppMessage[];
  lastMessage: string;
  status: WhatsAppConversationStatus;
  updatedAt: string;
}
