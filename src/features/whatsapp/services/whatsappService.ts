import { whatsappApi } from '../api/whatsappApi';
import type { ChatSession } from '../types';

export const whatsappService = {
  fetchChats: async (): Promise<ChatSession[]> => {
    return await whatsappApi.getChats();
  },
  postMessage: async (chatId: string, text: string): Promise<ChatSession> => {
    return await whatsappApi.sendMessage(chatId, text);
  },
};
