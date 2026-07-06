import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiTrainingService } from '../services/aiTrainingService';
import type { TrainingRecord } from '../types';

export function useAiTraining() {
  const queryClient = useQueryClient();

  const trainingQuery = useQuery({
    queryKey: ['aiTrainingData'],
    queryFn: () => aiTrainingService.fetchTrainingData(),
  });

  const uploadMutation = useMutation({
    mutationFn: (title: string) => aiTrainingService.uploadDoc(title),
    onSuccess: (newRec) => {
      queryClient.setQueryData(['aiTrainingData'], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          records: [newRec, ...oldData.records],
        };
      });
      // trigger a status change simulation
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['aiTrainingData'] });
      }, 4000);
    },
  });

  const runTrainingMutation = useMutation({
    mutationFn: () => aiTrainingService.runTraining(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiTrainingData'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => aiTrainingService.removeDocument(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['aiTrainingData'], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          records: oldData.records.filter((r: TrainingRecord) => r.id !== deletedId),
        };
      });
    },
  });

  return {
    trainingData: trainingQuery.data,
    isLoading: trainingQuery.isLoading,
    error: trainingQuery.error,
    uploadDocument: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    runTraining: runTrainingMutation.mutateAsync,
    isTraining: runTrainingMutation.isPending,
    deleteDocument: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
