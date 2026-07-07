import { useQuery } from '@tanstack/react-query';
import { taskService } from '../services/task.service';
import type { Task } from '../types/Task';

export function useTasks(leadId: string) {
  const { data, isLoading, error } = useQuery<Task[]>({
    queryKey: ['leadTasks', leadId],
    queryFn: () => taskService.getTasksByLeadId(leadId),
    enabled: !!leadId,
  });

  return {
    tasks: data || [],
    loading: isLoading,
    error,
  };
}
