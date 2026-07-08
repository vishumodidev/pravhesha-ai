import api from '../../../api/axios';
import type { Notification } from '../types/Notification';

export const notificationApi = {
  getNotifications: async (): Promise<Notification[]> => {
    try {
      const response = await api.get<Notification[]>('/crm-notifications');
      return response.data;
    } catch (error) {
      console.warn('[Notification API] Request for notifications failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/notifications.json');
      return mockData.default as Notification[];
    }
  },
  getUnreadNotifications: async (): Promise<Notification[]> => {
    try {
      const response = await api.get<Notification[]>('/crm-notifications/unread');
      return response.data;
    } catch (error) {
      console.warn('[Notification API] Request for unread notifications failed, returning unread subset from local mock fallback.', error);
      const mockData = await import('../mocks/notifications.json');
      return (mockData.default as Notification[]).filter((n) => !n.isRead);
    }
  },
};
