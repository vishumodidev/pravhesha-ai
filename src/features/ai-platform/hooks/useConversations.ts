import { useQuery } from '@tanstack/react-query';
import { aiService } from '../services/ai.service';
import { useAIStore } from '../store/ai.store';
import type { AIConversation } from '../types';

export function useConversations() {
  const { currentConversation, setCurrentConversation, selectedProvider, setSelectedProvider } = useAIStore();

  const { data: conversations = [], isLoading, error, refetch } = useQuery<AIConversation[]>({
    queryKey: ['aiConversations'],
    queryFn: () => aiService.getConversations(),
  });

  return {
    conversations,
    loading: isLoading,
    error,
    currentConversation,
    setCurrentConversation,
    selectedProvider,
    setSelectedProvider,
    refetch,
  };
}
