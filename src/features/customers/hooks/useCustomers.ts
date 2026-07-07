import { useQuery } from '@tanstack/react-query';
import { customerService } from '../services/customer.service';
import type { Customer } from '../types/Customer';

export function useCustomers() {
  const { data, isLoading, error } = useQuery<Customer[]>({
    queryKey: ['crmCustomersList'],
    queryFn: () => customerService.getCustomers(),
  });

  return {
    data: data || [],
    loading: isLoading,
    error,
  };
}
