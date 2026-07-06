export interface ChatMessage {
  id: string;
  sender: 'customer' | 'agent';
  text: string;
  time: string;
  fileName?: string;
  fileSize?: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface ChatSession {
  id: string;
  name: string;
  phone: string;
  location: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  email: string;
  clientSince: string;
  status: 'Open' | 'Closed';
  aiScore: number;
  aiInsights: {
    intent: string;
    suggestedReply: string;
  };
  messages: ChatMessage[];
}
