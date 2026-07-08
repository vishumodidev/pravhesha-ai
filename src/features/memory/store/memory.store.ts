import { create } from 'zustand';
import type { Memory } from '../types';

interface MemoryStoreState {
  currentConversationId: string | null;
  recentMemories: Memory[];
  pinnedMemories: Memory[];
  setCurrentConversationId: (id: string | null) => void;
  setRecentMemories: (memories: Memory[]) => void;
  pinMemory: (memory: Memory) => void;
  unpinMemory: (id: string) => void;
}

export const useMemoryStore = create<MemoryStoreState>((set) => ({
  currentConversationId: null,
  recentMemories: [],
  pinnedMemories: [],
  setCurrentConversationId: (id) => set({ currentConversationId: id }),
  setRecentMemories: (memories) => set({ recentMemories: memories }),
  pinMemory: (memory) =>
    set((state) => {
      if (state.pinnedMemories.some((m) => m.id === memory.id)) return state;
      return { pinnedMemories: [...state.pinnedMemories, memory] };
    }),
  unpinMemory: (id) =>
    set((state) => ({
      pinnedMemories: state.pinnedMemories.filter((m) => m.id !== id),
    })),
}));
