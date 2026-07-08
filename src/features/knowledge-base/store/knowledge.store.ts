import { create } from 'zustand';
import type { KnowledgeDocument } from '../types';

interface KnowledgeState {
  selectedCategory: string;
  selectedDocument: KnowledgeDocument | null;
  searchKeyword: string;
  setSelectedCategory: (category: string) => void;
  setSelectedDocument: (doc: KnowledgeDocument | null) => void;
  setSearchKeyword: (keyword: string) => void;
  resetFilters: () => void;
}

export const useKnowledgeStore = create<KnowledgeState>((set) => ({
  selectedCategory: 'ALL',
  selectedDocument: null,
  searchKeyword: '',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedDocument: (doc) => set({ selectedDocument: doc }),
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  resetFilters: () => set({ selectedCategory: 'ALL', selectedDocument: null, searchKeyword: '' }),
}));
