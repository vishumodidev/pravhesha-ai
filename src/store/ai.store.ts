import { create } from 'zustand';

export interface CopilotMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface AIState {
  copilotOpen: boolean;
  copilotMessages: CopilotMessage[];
  copilotTyping: boolean;
  currentPrompt: string;
  setCopilotOpen: (open: boolean) => void;
  setCurrentPrompt: (prompt: string) => void;
  setCopilotTyping: (typing: boolean) => void;
  addMessage: (message: CopilotMessage) => void;
  clearMessages: () => void;
}

export const useAIStore = create<AIState>((set) => ({
  copilotOpen: false,
  copilotMessages: [
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am **PRAVESHA™ AI**, your business automation companion. I\'ve finished training on your uploaded SOPs and FAQs. \n\nHow can I help you optimize your CRM workflow today?',
      timestamp: 'Just now',
    },
  ],
  copilotTyping: false,
  currentPrompt: '',
  setCopilotOpen: (open) => set({ copilotOpen: open }),
  setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),
  setCopilotTyping: (typing) => set({ copilotTyping: typing }),
  addMessage: (message) => set((state) => ({ copilotMessages: [...state.copilotMessages, message] })),
  clearMessages: () => set({ copilotMessages: [] }),
}));
