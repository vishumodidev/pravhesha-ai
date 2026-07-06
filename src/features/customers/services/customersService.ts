import { customersApi } from '../api/customersApi';
import type { CustomersResponse } from '../types';

export const customersService = {
  fetchCustomers: async (): Promise<CustomersResponse> => {
    return await customersApi.getCustomers();
  },
};
