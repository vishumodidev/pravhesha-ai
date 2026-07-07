import api from '../../../api/axios';
import type { Customer } from '../types/Customer';

export const customerApi = {
  getCustomers: async (): Promise<Customer[]> => {
    try {
      const response = await api.get<Customer[]>('/crm-customers');
      return response.data;
    } catch (error) {
      console.warn('[Customers API] Request for customers list failed, returning local mock fallback.', error);
      const mockData = await import('../mocks/customers.json');
      return mockData.default as Customer[];
    }
  },
  getCustomerById: async (id: string): Promise<Customer> => {
    try {
      const response = await api.get<Customer>(`/crm-customers/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`[Customers API] Request for customer ${id} failed, returning local mock fallback.`, error);
      const mockData = await import('../mocks/customers.json');
      const cust = mockData.default.find((c) => c.id === id);
      if (!cust) {
        throw new Error(`Customer with id ${id} not found in mock data.`);
      }
      return cust as Customer;
    }
  },
};
