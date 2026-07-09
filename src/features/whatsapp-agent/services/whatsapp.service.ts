import { whatsappApi } from '../api/whatsapp.api';
import type { WhatsAppConversation, WhatsAppMessage } from '../types';

export const whatsappService = {
  receiveMessage: async (
    phone: string,
    messageText: string,
    name: string
  ): Promise<{ response: string; thoughts: string[] }> => {
    return await whatsappApi.receiveMessage(phone, messageText, name);
  },

  sendMessage: async (phone: string, text: string): Promise<WhatsAppMessage> => {
    return await whatsappApi.sendMessage(phone, text);
  },

  getConversation: async (conversationId: string): Promise<WhatsAppConversation> => {
    return await whatsappApi.getConversation(conversationId);
  },

  getConversations: async (): Promise<WhatsAppConversation[]> => {
    return await whatsappApi.getConversations();
  }
};
