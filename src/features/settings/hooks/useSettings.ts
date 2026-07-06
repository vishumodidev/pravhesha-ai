import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '../services/settingsService';
import type { UserRecord } from '../types';

export function useSettings() {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: ['settingsData'],
    queryFn: () => settingsService.fetchSettings(),
  });

  const addUserMutation = useMutation({
    mutationFn: (user: Partial<UserRecord>) => settingsService.createUser(user),
    onSuccess: (newData) => {
      queryClient.setQueryData(['settingsData'], newData);
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => settingsService.removeUser(id),
    onSuccess: (newData) => {
      queryClient.setQueryData(['settingsData'], newData);
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  return {
    settings: settingsQuery.data,
    isLoading: settingsQuery.isLoading,
    error: settingsQuery.error,
    addUser: addUserMutation.mutateAsync,
    isAddingUser: addUserMutation.isPending,
    deleteUser: deleteUserMutation.mutateAsync,
    isDeletingUser: deleteUserMutation.isPending,
  };
}
