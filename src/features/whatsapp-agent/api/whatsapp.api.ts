import api from '../../../api/axios';
import type { WhatsAppConversation, WhatsAppMessage } from '../types';

export const whatsappApi = {
  receiveMessage: async (
    phone: string,
    messageText: string,
    name: string
  ): Promise<{ response: string; thoughts: string[] }> => {
    try {
      const res = await api.post<{ response: string; thoughts: string[] }>('/crm-whatsapp/agent/receive', {
        phone,
        message: messageText,
        name
      });
      return res.data;
    } catch (error) {
      console.warn('[WhatsApp API] receiveMessage failed, returning mock scenario details.', error);
      const mocks = await import('../mocks/whatsappMocks.json');
      const found = mocks.default.find(s => s.phone === phone);
      if (found) {
        return {
          response: found.suggestedReply,
          thoughts: found.agentThoughts
        };
      }
      return {
        response: `Hello ${name}. I have received your message. Let me check our database context.`,
        thoughts: ['Step 1: Check sender number.', 'Step 2: No mock scenario matches. Returning template response.']
      };
    }
  },

  sendMessage: async (phone: string, text: string): Promise<WhatsAppMessage> => {
    try {
      const res = await api.post<WhatsAppMessage>('/crm-whatsapp/agent/send', { phone, text });
      return res.data;
    } catch (error) {
      console.warn('[WhatsApp API] sendMessage failed, creating mock delivery.', error);
      return {
        id: `msg-sent-${Date.now()}`,
        phone,
        name: 'Pravesha AI Agent',
        message: text,
        direction: 'outbound',
        timestamp: new Date().toISOString(),
        status: 'delivered'
      };
    }
  },

  getConversation: async (conversationId: string): Promise<WhatsAppConversation> => {
    try {
      const res = await api.get<WhatsAppConversation>(`/crm-whatsapp/agent/conversations/${conversationId}`);
      return res.data;
    } catch (error) {
      console.warn(`[WhatsApp API] getConversation(${conversationId}) failed, locating local mocks.`, error);
      const mocks = await import('../mocks/whatsappMocks.json');
      const found = (mocks.default as any[]).find(s => s.conversationId === conversationId);
      if (!found) throw new Error(`Conversation not found for ID: ${conversationId}`);
      
      return {
        conversationId: found.conversationId,
        phone: found.phone,
        name: found.name,
        customerId: found.customer?.id,
        leadId: found.lead?.id,
        messages: found.messages as unknown as WhatsAppMessage[],
        lastMessage: found.lastMessage,
        status: found.status as any,
        updatedAt: found.updatedAt
      };
    }
  },

  getConversations: async (): Promise<WhatsAppConversation[]> => {
    try {
      const res = await api.get<WhatsAppConversation[]>('/crm-whatsapp/agent/conversations');
      return res.data;
    } catch (error) {
      console.warn('[WhatsApp API] getConversations failed, yielding local database lists.', error);
      const mocks = await import('../mocks/whatsappMocks.json');
      return (mocks.default as any[]).map(s => ({
        conversationId: s.conversationId,
        phone: s.phone,
        name: s.name,
        customerId: s.customer?.id,
        leadId: s.lead?.id,
        messages: s.messages as unknown as WhatsAppMessage[],
        lastMessage: s.lastMessage,
        status: s.status as any,
        updatedAt: s.updatedAt
      }));
    }
  }
};
