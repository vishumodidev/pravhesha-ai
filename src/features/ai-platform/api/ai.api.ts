import api from '../../../api/axios';
import type { AIConversation, AIMessage, AIResponse } from '../types';

export const aiApi = {
  getConversations: async (): Promise<AIConversation[]> => {
    try {
      const response = await api.get<AIConversation[]>('/crm-ai/conversations');
      return response.data;
    } catch (error) {
      console.warn('[AI API] Request for conversations failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/conversations.json');
      return mockData.default as AIConversation[];
    }
  },
  getConversation: async (id: string): Promise<AIConversation> => {
    try {
      const response = await api.get<AIConversation>(`/crm-ai/conversations/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[AI API] Request for conversation ${id} failed, returning mock fallback.`, error);
      const mockData = await import('../mocks/conversations.json');
      const found = (mockData.default as AIConversation[]).find((c) => c.id === id);
      if (!found) throw new Error(`Conversation not found: ${id}`);
      return found;
    }
  },
  getMessages: async (conversationId: string): Promise<AIMessage[]> => {
    try {
      const response = await api.get<AIMessage[]>(`/crm-ai/conversations/${conversationId}/messages`);
      return response.data;
    } catch (error) {
      console.warn(`[AI API] Request for messages of conversation ${conversationId} failed, returning mock fallback.`, error);
      const mockData = await import('../mocks/messages.json');
      return (mockData.default as AIMessage[]).filter((m) => m.conversationId === conversationId);
    }
  },
  sendMessage: async (conversationId: string, content: string, provider: string): Promise<AIResponse> => {
    try {
      const response = await api.post<AIResponse>('/crm-ai/messages', {
        conversationId,
        content,
        provider,
      });
      return response.data;
    } catch (error) {
      console.warn('[AI API] Request to send message failed, returning local mock fallback.', error);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const assistantMessage: AIMessage = {
        id: `msg-assistant-${Date.now()}`,
        conversationId,
        role: 'assistant',
        content: `This is a mock response from ${provider} model provider. I have successfully received your query: "${content}"`,
        status: 'sent',
        timestamp: new Date().toISOString(),
      };

      return {
        message: assistantMessage,
        tokens: 42 + Math.floor(content.length / 4),
        provider,
        executionTime: 120 + Math.floor(Math.random() * 200),
      };
    }
  },
};
