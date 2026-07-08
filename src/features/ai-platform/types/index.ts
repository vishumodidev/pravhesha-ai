export interface AIConversation {
  id: string;
  title: string;
  createdBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type AIMessageRole = 'user' | 'assistant' | 'system';
export type AIMessageStatus = 'sending' | 'sent' | 'error';

export interface AIMessage {
  id: string;
  conversationId: string;
  role: AIMessageRole;
  content: string;
  status: AIMessageStatus;
  timestamp: string; // ISO date string
}

export type AIProviderType = 'openai' | 'gemini' | 'claude';

export interface AIProvider {
  id: string;
  name: string;
  type: AIProviderType;
  enabled: boolean;
}

export interface AIResponse {
  message: AIMessage;
  tokens?: number;
  provider: string;
  executionTime?: number; // in milliseconds
}
