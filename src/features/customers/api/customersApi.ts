import api from '../../../api/axios';
import type { CustomersResponse } from '../types';

export const customersApi = {
  getCustomers: async (): Promise<CustomersResponse> => {
    const response = await api.get<CustomersResponse>('/customers');
    return response.data;
  },
};
