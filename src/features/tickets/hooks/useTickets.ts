import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketsService } from '../services/ticketsService';
import type { TicketRecord } from '../types';

export function useTickets() {
  const queryClient = useQueryClient();

  const ticketsQuery = useQuery({
    queryKey: ['ticketsData'],
    queryFn: () => ticketsService.fetchTickets(),
  });

  const sendReplyMutation = useMutation({
    mutationFn: ({ id, text }: { id: string; text: string }) =>
      ticketsService.sendTicketReply(id, text),
    onSuccess: (updatedTicket) => {
      queryClient.setQueryData(['ticketsData'], (oldData: TicketRecord[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((t) => (t.id === updatedTicket.id ? updatedTicket : t));
      });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  const addTicketMutation = useMutation({
    mutationFn: (ticket: Partial<TicketRecord>) => ticketsService.addTicket(ticket),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticketsData'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  return {
    tickets: ticketsQuery.data || [],
    isLoading: ticketsQuery.isLoading,
    error: ticketsQuery.error,
    sendReply: sendReplyMutation.mutateAsync,
    isReplying: sendReplyMutation.isPending,
    addTicket: addTicketMutation.mutateAsync,
    isAdding: addTicketMutation.isPending,
  };
}
