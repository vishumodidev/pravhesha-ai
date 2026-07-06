import { create } from 'zustand';

export interface Notification {
  id: string;
  unread: boolean;
  text: string;
  time: string;
  category: 'lead' | 'system' | 'call';
}

interface NotificationState {
  notifications: Notification[];
  unreadNotificationsCount: number;
  setNotifications: (notifications: Notification[]) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadNotificationsCount: 0,
  setNotifications: (notifications) => set({
    notifications,
    unreadNotificationsCount: notifications.filter(n => n.unread).length
  }),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, unread: false })),
    unreadNotificationsCount: 0
  })),
}));
