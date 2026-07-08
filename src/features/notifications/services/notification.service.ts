import { notificationApi } from '../api/notification.api';
import type { Notification } from '../types/Notification';

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    return await notificationApi.getNotifications();
  },
  getUnreadNotifications: async (): Promise<Notification[]> => {
    return await notificationApi.getUnreadNotifications();
  },
};
