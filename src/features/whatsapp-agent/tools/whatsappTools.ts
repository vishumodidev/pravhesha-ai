import type { WhatsAppMessage } from '../types';
import { whatsappKnowledge } from '../knowledge/whatsappKnowledge';
import type { WhatsAppKnowledgeDoc } from '../knowledge/whatsappKnowledge';

export interface MockLead {
  id: string;
  name: string;
  phone: string;
  company: string;
  budget: string;
  status: string;
  createdAt: string;
}

export interface MockCustomer {
  id: string;
  name: string;
  phone: string;
  company: string;
  plan: string;
  status: string;
}

export interface MockTask {
  id: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  assignedTo: string;
  dueDate: string;
  status: string;
}

export const whatsappTools = {
  getLead: async (phone: string, mockLeads: MockLead[]): Promise<MockLead | null> => {
    console.log(`[WhatsApp Tool] getLead called for phone: ${phone}`);
    return mockLeads.find(l => l.phone === phone) || null;
  },

  createLead: async (
    leadData: Omit<MockLead, 'id' | 'createdAt' | 'status'>,
    mockLeads: MockLead[]
  ): Promise<MockLead> => {
    console.log('[WhatsApp Tool] createLead called with data:', leadData);
    const newLead: MockLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    mockLeads.push(newLead);
    return newLead;
  },

  getCustomer: async (phone: string, mockCustomers: MockCustomer[]): Promise<MockCustomer | null> => {
    console.log(`[WhatsApp Tool] getCustomer called for phone: ${phone}`);
    return mockCustomers.find(c => c.phone === phone) || null;
  },

  createTask: async (
    taskData: Omit<MockTask, 'id' | 'status'>,
    mockTasks: MockTask[]
  ): Promise<MockTask> => {
    console.log('[WhatsApp Tool] createTask called with data:', taskData);
    const newTask: MockTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      status: 'Pending'
    };
    mockTasks.push(newTask);
    return newTask;
  },

  searchKnowledge: async (query: string): Promise<any[]> => {
    console.log(`[WhatsApp Tool] searchKnowledge called for query: "${query}"`);
    return whatsappKnowledge.search(query);
  },

  sendWhatsAppReply: async (phone: string, text: string): Promise<WhatsAppMessage> => {
    console.log(`[WhatsApp Tool] sendWhatsAppReply called for phone: ${phone}, text: "${text}"`);
    return {
      id: `msg-out-${Date.now()}`,
      phone,
      name: 'Pravesha AI Agent',
      message: text,
      direction: 'outbound',
      timestamp: new Date().toISOString(),
      status: 'delivered'
    };
  }
};
