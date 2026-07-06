import { create } from 'zustand';
import api from '../api/axios';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Team Lead' | 'Support Manager' | 'Support Agent' | 'Sales Executive' | 'Marketing Executive';
  department: string;
  avatar: string;
  permissions?: string[];
}

export interface Notification {
  id: string;
  unread: boolean;
  text: string;
  time: string;
  category: 'lead' | 'system' | 'call';
}

export interface CopilotMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface ClientStore {
  // Theme & UI
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  toggleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Auth State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  login: (credentials: { email: string; password?: string }) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;

  // AI Copilot State
  copilotOpen: boolean;
  copilotMessages: CopilotMessage[];
  copilotTyping: boolean;
  setCopilotOpen: (open: boolean) => void;
  sendCopilotMessage: (text: string) => Promise<void>;

  // Notifications State
  notifications: Notification[];
  unreadNotificationsCount: number;
  fetchNotifications: () => Promise<void>;
  markNotificationsAsRead: () => Promise<void>;
}

export const useClientStore = create<ClientStore>((set) => ({
  // Theme & UI Defaults
  theme: 'light',
  sidebarOpen: true,
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Auth Defaults
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  authLoading: false,
  login: async (credentials) => {
    set({ authLoading: true });
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, token, refreshToken } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      set({ user, token, isAuthenticated: true, authLoading: false });
      return true;
    } catch (error) {
      set({ authLoading: false });
      console.error('Login failed', error);
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    set({ user: null, token: null, isAuthenticated: false });
  },
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }
    set({ authLoading: true });
    try {
      const response = await api.post('/auth/me');
      set({ user: response.data, isAuthenticated: true, authLoading: false });
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      set({ user: null, token: null, isAuthenticated: false, authLoading: false });
    }
  },

  // AI Copilot Defaults
  copilotOpen: false,
  copilotMessages: [
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am **PRAVESHA™ AI**, your business automation companion. I\'ve finished training on your uploaded sales SOPs and FAQs. \n\nHow can I help you optimize your CRM workflow today?',
      timestamp: 'Just now',
    },
  ],
  copilotTyping: false,
  setCopilotOpen: (open) => set({ copilotOpen: open }),
  sendCopilotMessage: async (text) => {
    if (!text.trim()) return;

    const userMsg: CopilotMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    set((state) => ({
      copilotMessages: [...state.copilotMessages, userMsg],
      copilotTyping: true,
    }));

    // Simulating response matching current CRM metrics
    setTimeout(() => {
      let aiText = '';
      const query = text.toLowerCase();

      if (query.includes('lead') || query.includes('analysis')) {
        aiText = `Based on current CRM logs:\n\n* **Total Leads:** 1,245 (+18.6% week-on-week)\n* **AI Qualified Leads:** 312 (22.4% qualification rate)\n* **Recent Activity:** Manish Singh just converted via Instagram Ad 2 mins ago.\n\n*Recommendation:* Re-engage the 4 hot leads flagged as overdue in your dashboard.`;
      } else if (query.includes('training') || query.includes('accuracy') || query.includes('sop')) {
        aiText = `**AI Training Module Status:**\n\n* **Current Accuracy:** 92.4% (+6.2% improvement)\n* **Data Trained:** 1,248 total documents (Product Catalog 2024, SOP - Sales Process, FAQs).\n* **Status:** Stable. Ready for further PDF uploads to boost coverage in Billing questions.`;
      } else if (query.includes('hot') || query.includes('opportunity')) {
        aiText = `I have detected **4 Hot Leads** showing high conversion intent:\n\n1. **Rahul Sharma** (TechNova Pvt Ltd) - Interested in Enterprise Plan pricing. \n2. **Amit Verma** (Verma Enterprises) - Requested custom implementation.\n3. **Sneha Iyer** (BrightCo) - Clicked on WhatsApp scheduler twice.\n4. **Manish Singh** (Instagram Ad Lead) - Gold Plan candidate.\n\n*Suggested Action:* Tap "Schedule Follow-up" in the Call Logs page to lock in meetings.`;
      } else if (query.includes('rahul') || query.includes('draft') || query.includes('whatsapp')) {
        aiText = `Here is a custom WhatsApp reply template for **Rahul Sharma** (TechNova):\n\n\`\`\`\n"Hi Rahul, thanks for speaking with us today! I noticed you are interested in the enterprise pricing model for TechNova. I would love to schedule a quick 10-minute demo to outline our custom API limits and group discounts. Let me know what time works best for you tomorrow!"\n\`\`\`\n\n*Click "Copy to Clipboard" to paste directly into your WhatsApp interface.*`;
      } else {
        aiText = `I've analyzed your query. Currently, our business metrics look strong, with **Revenue forecasting at ₹18.4L (Expected)** and ticket resolution speeds averaging **2h 45m**.\n\nLet me know if you would like me to draft marketing copies, schedule reminders, or query sales statistics.`;
      }

      const aiMsg: CopilotMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      set((state) => ({
        copilotMessages: [...state.copilotMessages, aiMsg],
        copilotTyping: false,
      }));
    }, 1000);
  },

  // Notifications Defaults
  notifications: [],
  unreadNotificationsCount: 0,
  fetchNotifications: async () => {
    try {
      const res = await api.get('/notifications');
      const notifications = res.data;
      const unreadNotificationsCount = notifications.filter((n: Notification) => n.unread).length;
      set({ notifications, unreadNotificationsCount });
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    }
  },
  markNotificationsAsRead: async () => {
    try {
      await api.post('/notifications', { action: 'readAll' });
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, unread: false })),
        unreadNotificationsCount: 0,
      }));
    } catch (error) {
      console.error('Failed to mark notifications as read', error);
    }
  },
}));
