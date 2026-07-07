import { useQuery } from '@tanstack/react-query';
import { customerService } from '../services/customer.service';
import type { Customer } from '../types/Customer';

export function useCustomerDetails(id: string) {
  const { data, isLoading, error } = useQuery<Customer>({
    queryKey: ['crmCustomerDetails', id],
    queryFn: () => customerService.getCustomerDetails(id),
    enabled: !!id,
  });

  return {
    data,
    loading: isLoading,
    error,
  };
}
