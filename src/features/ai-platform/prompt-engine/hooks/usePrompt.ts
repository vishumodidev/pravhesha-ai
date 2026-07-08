import { useQuery } from '@tanstack/react-query';
import { promptService } from '../services/prompt.service';
import type { Prompt } from '../types';

export function usePrompt(id?: string) {
  const { data: prompts = [], isLoading: listLoading, error: listError } = useQuery<Prompt[]>({
    queryKey: ['promptsList'],
    queryFn: () => promptService.getPrompts(),
  });

  const { data: prompt, isLoading: detailLoading, error: detailError } = useQuery<Prompt>({
    queryKey: ['promptDetails', id],
    queryFn: () => promptService.getPrompt(id || ''),
    enabled: !!id,
  });

  return {
    prompts,
    prompt,
    loading: listLoading || detailLoading,
    error: listError || detailError,
  };
}
