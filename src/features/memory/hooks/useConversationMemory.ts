import { useState, useEffect } from 'react';
import { useMemoryStore } from '../store/memory.store';
import type { ConversationMemory } from '../types';

export function useConversationMemory(conversationId?: string) {
  const { currentConversationId, setCurrentConversationId } = useMemoryStore();
  const [convMemory, setConvMemory] = useState<ConversationMemory | null>(null);

  useEffect(() => {
    if (conversationId) {
      setCurrentConversationId(conversationId);
      setConvMemory({
        conversationId,
        summary: 'Discussion regarding advanced placement modules fee details and student eligibility triggers.',
        keyPoints: [
          'Lead expressed high interest in Data Science & AI',
          'Sought installment plan details (wants 6 months term)',
          'Requires certificate verification brochure',
        ],
        lastInteractionAt: new Date().toISOString(),
      });
    } else {
      setConvMemory(null);
    }
  }, [conversationId, setCurrentConversationId]);

  return {
    conversationId: conversationId || currentConversationId,
    conversationMemory: convMemory,
  };
}
