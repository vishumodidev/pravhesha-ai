import api from '../../../api/axios';
import type { ChatSession } from '../types';

export const whatsappApi = {
  getChats: async (): Promise<ChatSession[]> => {
    const response = await api.get<ChatSession[]>('/whatsapp/chats');
    return response.data;
  },
  sendMessage: async (chatId: string, text: string): Promise<ChatSession> => {
    const response = await api.post<ChatSession>(`/whatsapp/chats/${chatId}/message`, { text });
    return response.data;
  },
};
