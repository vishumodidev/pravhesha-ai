import { useQuery } from '@tanstack/react-query';
import { aiService } from '../services/ai.service';
import { useAIStore } from '../store/ai.store';
import type { AIMessage } from '../types';
import { useEffect } from 'react';

export function useAIChat(conversationId: string | null | undefined) {
  const { messages, setMessages, addMessage, selectedProvider, loading, setLoading } = useAIStore();

  const { data: fetchedMessages, isLoading, error } = useQuery<AIMessage[]>({
    queryKey: ['aiMessages', conversationId],
    queryFn: () => aiService.getMessages(conversationId || ''),
    enabled: !!conversationId,
  });

  // Sync React Query data to Zustand store
  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    } else {
      setMessages([]);
    }
  }, [fetchedMessages, setMessages]);

  const sendMessage = async (content: string) => {
    if (!conversationId || !content.trim()) return;

    setLoading(true);

    const userMessage: AIMessage = {
      id: `msg-user-${Date.now()}`,
      conversationId,
      role: 'user',
      content,
      status: 'sending',
      timestamp: new Date().toISOString(),
    };

    // Add user message to store instantly
    addMessage(userMessage);

    try {
      const response = await aiService.sendMessage(conversationId, content, selectedProvider);
      
      // Update user message status to 'sent'
      setMessages(
        useAIStore.getState().messages.map((m) =>
          m.id === userMessage.id ? { ...m, status: 'sent' as const } : m
        )
      );

      // Add assistant response to store
      addMessage(response.message);
    } catch (err) {
      console.error('[useAIChat] Failed to send message:', err);
      // Mark user message as errored
      setMessages(
        useAIStore.getState().messages.map((m) =>
          m.id === userMessage.id ? { ...m, status: 'error' as const } : m
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading: isLoading || loading,
    error,
    sendMessage,
  };
}
