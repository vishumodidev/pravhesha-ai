import { aiApi } from '../api/ai.api';
import type { AIConversation, AIMessage, AIResponse } from '../types';

export const aiService = {
  getConversations: async (): Promise<AIConversation[]> => {
    return await aiApi.getConversations();
  },
  getConversation: async (id: string): Promise<AIConversation> => {
    return await aiApi.getConversation(id);
  },
  getMessages: async (conversationId: string): Promise<AIMessage[]> => {
    return await aiApi.getMessages(conversationId);
  },
  sendMessage: async (conversationId: string, content: string, provider: string): Promise<AIResponse> => {
    return await aiApi.sendMessage(conversationId, content, provider);
  },
};
