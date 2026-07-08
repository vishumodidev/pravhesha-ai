import { useQuery } from '@tanstack/react-query';
import { notificationService } from '../services/notification.service';
import type { Notification } from '../types/Notification';

export function useNotifications() {
  const { data, isLoading, error, refetch } = useQuery<Notification[]>({
    queryKey: ['crmNotifications'],
    queryFn: () => notificationService.getNotifications(),
  });

  return {
    data: data || [],
    loading: isLoading,
    error,
    refetch,
  };
}
