import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { memoryService } from '../services/memory.service';
import { useMemoryStore } from '../store/memory.store';
import type { Memory } from '../types';

export function useMemory() {
  const queryClient = useQueryClient();
  const { pinnedMemories, pinMemory, unpinMemory, setRecentMemories } = useMemoryStore();

  const { data: memories = [], isLoading, error } = useQuery<Memory[]>({
    queryKey: ['memoriesList'],
    queryFn: async () => {
      const list = await memoryService.getMemories();
      setRecentMemories(list);
      return list;
    },
  });

  const addMemoryMutation = useMutation({
    mutationFn: ({ key, value, category, importance }: { key: string; value: string; category: string; importance: number }) =>
      memoryService.saveMemory(key, value, category, importance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memoriesList'] });
    },
  });

  const deleteMemoryMutation = useMutation({
    mutationFn: (id: string) => memoryService.deleteMemory(id),
    onSuccess: (_, deletedId) => {
      unpinMemory(deletedId);
      queryClient.invalidateQueries({ queryKey: ['memoriesList'] });
    },
  });

  return {
    memories,
    pinnedMemories,
    loading: isLoading,
    error,
    addMemory: addMemoryMutation.mutateAsync,
    adding: addMemoryMutation.isPending,
    deleteMemory: deleteMemoryMutation.mutateAsync,
    deleting: deleteMemoryMutation.isPending,
    pinMemory,
    unpinMemory,
  };
}
