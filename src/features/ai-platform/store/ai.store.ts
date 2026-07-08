import { create } from 'zustand';
import type { AIConversation, AIMessage } from '../types';

interface AIState {
  currentConversation: AIConversation | null;
  selectedProvider: string;
  messages: AIMessage[];
  loading: boolean;
  setCurrentConversation: (conversation: AIConversation | null) => void;
  setSelectedProvider: (provider: string) => void;
  setMessages: (messages: AIMessage[]) => void;
  setLoading: (loading: boolean) => void;
  addMessage: (message: AIMessage) => void;
}

export const useAIStore = create<AIState>((set) => ({
  currentConversation: null,
  selectedProvider: 'openai',
  messages: [],
  loading: false,
  setCurrentConversation: (conversation) => set({ currentConversation: conversation }),
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
  setMessages: (messages) => set({ messages }),
  setLoading: (loading) => set({ loading }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
