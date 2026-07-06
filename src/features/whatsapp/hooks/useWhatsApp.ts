import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { whatsappService } from '../services/whatsappService';
import type { ChatSession } from '../types';

export function useWhatsApp() {
  const queryClient = useQueryClient();

  const chatsQuery = useQuery({
    queryKey: ['whatsappChats'],
    queryFn: () => whatsappService.fetchChats(),
  });

  const sendMessageMutation = useMutation({
    mutationFn: ({ chatId, text }: { chatId: string; text: string }) =>
      whatsappService.postMessage(chatId, text),
    onSuccess: (updatedChat) => {
      queryClient.setQueryData(['whatsappChats'], (oldChats: ChatSession[] | undefined) => {
        if (!oldChats) return [];
        return oldChats.map((c) => (c.id === updatedChat.id ? updatedChat : c));
      });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  return {
    chats: chatsQuery.data || [],
    isLoading: chatsQuery.isLoading,
    error: chatsQuery.error,
    sendMessage: sendMessageMutation.mutateAsync,
    isSending: sendMessageMutation.isPending,
  };
}
