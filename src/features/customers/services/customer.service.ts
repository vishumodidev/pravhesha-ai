import { customerApi } from '../api/customer.api';
import type { Customer } from '../types/Customer';

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    return await customerApi.getCustomers();
  },
  getCustomerById: async (id: string): Promise<Customer> => {
    return await customerApi.getCustomerById(id);
  },
  getCustomerDetails: async (customerId: string): Promise<Customer> => {
    return await customerApi.getCustomerById(customerId);
  },
};
