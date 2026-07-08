export type MemoryCategory = 'Conversation' | 'User Preference' | 'CRM' | 'Customer' | 'Lead' | 'Task' | 'Workflow';

export interface Memory {
  id: string;
  userId: string;
  category: MemoryCategory;
  key: string;
  value: string;
  importance: number; // Rating scale (e.g. 1 to 5)
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ConversationMemory {
  conversationId: string;
  summary: string;
  keyPoints: string[];
  lastInteractionAt: string; // ISO date string
}

export interface UserMemory {
  userId: string;
  preferences: Record<string, string>;
  context: Record<string, string>;
}
