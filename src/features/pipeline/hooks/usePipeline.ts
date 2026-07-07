import { useQuery } from '@tanstack/react-query';
import { pipelineService } from '../services/pipeline.service';
import type { Pipeline } from '../types/Pipeline';

export function usePipeline() {
  const { data, isLoading, error } = useQuery<Pipeline[]>({
    queryKey: ['crmPipelineList'],
    queryFn: () => pipelineService.getPipeline(),
  });

  return {
    pipeline: data || [],
    loading: isLoading,
    error,
  };
}
