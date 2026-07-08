export type NotificationType = 'Info' | 'Success' | 'Warning' | 'Error' | 'System';
export type NotificationPriority = 'low' | 'medium' | 'high';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  userId: string;
  createdAt: string; // ISO format date string
}
