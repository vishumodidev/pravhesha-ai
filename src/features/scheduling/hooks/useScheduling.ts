import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { schedulingService } from '../services/schedulingService';
import type { MeetingCardData, FollowUpRecord } from '../types';

export function useScheduling() {
  const queryClient = useQueryClient();

  const schedulingQuery = useQuery({
    queryKey: ['schedulingData'],
    queryFn: () => schedulingService.fetchSchedulingData(),
  });

  const addMeetingMutation = useMutation({
    mutationFn: ({ day, meeting }: { day: string; meeting: Partial<MeetingCardData> }) =>
      schedulingService.addMeeting(day, meeting),
    onSuccess: (newData) => {
      queryClient.setQueryData(['schedulingData'], newData);
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  const addFollowUpMutation = useMutation({
    mutationFn: (followUp: Partial<FollowUpRecord>) =>
      schedulingService.addFollowUp(followUp),
    onSuccess: (newData) => {
      queryClient.setQueryData(['schedulingData'], newData);
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  return {
    scheduling: schedulingQuery.data,
    isLoading: schedulingQuery.isLoading,
    error: schedulingQuery.error,
    addMeeting: addMeetingMutation.mutateAsync,
    isAddingMeeting: addMeetingMutation.isPending,
    addFollowUp: addFollowUpMutation.mutateAsync,
    isAddingFollowUp: addFollowUpMutation.isPending,
  };
}
