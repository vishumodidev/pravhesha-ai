import api from './axios';

// Import initial mock data
import dashboardData from '../mocks/dashboard/dashboard.json';
import revenueData from '../mocks/dashboard/revenue.json';
import visitorsData from '../mocks/dashboard/visitors.json';
import insightsData from '../mocks/dashboard/insights.json';
import customersData from '../mocks/customers.json';
import leadsData from '../mocks/leads.json';
import ticketsData from '../mocks/tickets.json';
import analyticsData from '../mocks/analytics.json';
import notificationsData from '../mocks/notifications.json';
import whatsappData from '../mocks/whatsapp.json';
import aiTrainingData from '../mocks/ai-training.json';
import callLogsData from '../mocks/call-logs.json';
import schedulingData from '../mocks/scheduling.json';
import usersData from '../mocks/users.json';
import socialLeadsData from '../features/social-leads/mocks/social-leads.json';
import crmLeadsData from '../features/leads/mocks/leads.json';
import leadActivitiesData from '../features/lead-activities/mocks/activities.json';
import leadNotesData from '../features/lead-notes/mocks/notes.json';
import crmTasksData from '../features/tasks/mocks/tasks.json';
import crmCommunicationsData from '../features/communication/mocks/communications.json';
import crmCustomersData from '../features/customers/mocks/customers.json';
import crmPipelineData from '../features/pipeline/mocks/pipeline.json';
import crmDashboardAnalyticsData from '../features/dashboard-analytics/mocks/dashboard-analytics.json';
import crmNotificationsData from '../features/notifications/mocks/notifications.json';
import crmDocumentsData from '../features/documents/mocks/documents.json';
import aiConversationsData from '../features/ai-platform/mocks/conversations.json';
import aiMessagesData from '../features/ai-platform/mocks/messages.json';
import crmProvidersData from '../features/ai-platform/mocks/providers.json';
import crmPromptsData from '../features/ai-platform/prompt-engine/mocks/prompts.json';
import crmToolsData from '../features/ai-platform/tool-engine/mocks/tools.json';
import knowledgeDocumentsData from '../features/knowledge-base/mocks/knowledge-documents.json';

// In-memory mock database
const db = {
  leads: [...leadsData.leads],
  customers: [...customersData.customers],
  tickets: [...ticketsData.tickets],
  chats: [...whatsappData],
  users: [...usersData],
  notifications: [...notificationsData],
  crmNotifications: [...crmNotificationsData],
  crmDocuments: [...crmDocumentsData],
  aiConversations: [...aiConversationsData],
  aiMessages: [...aiMessagesData],
  crmProviders: [...crmProvidersData],
  crmPrompts: [...crmPromptsData],
  crmTools: [...crmToolsData],
  knowledgeDocuments: [...knowledgeDocumentsData],
  socialLeads: [...socialLeadsData],
  crmLeads: [...crmLeadsData],
  leadActivities: [...leadActivitiesData],
  leadNotes: [...leadNotesData],
  crmTasks: [...crmTasksData],
  crmCommunications: [...crmCommunicationsData],
  crmCustomers: [...crmCustomersData],
  crmPipeline: [...crmPipelineData],
  crmDashboardAnalytics: { ...crmDashboardAnalyticsData },
  aiTraining: {
    trainingPerformanceData: [...aiTrainingData.performance],
    categoryData: [...aiTrainingData.categories],
    records: [...aiTrainingData.records],
    metrics: {
      totalDocs: '6',
      questionsTrained: '1,245',
      aiAccuracy: aiTrainingData.accuracy.toString(),
      responsesGenerated: '4,528',
      avgResponseTime: '1.42s',
      usefulResponses: '87.6%'
    }
  },
  scheduling: {
    schedule: { ...schedulingData.meetings } as Record<string, any>,
    followUps: [...schedulingData.followUps],
    metrics: {
      totalSchedules: '19',
      confirmed: '12',
      pending: '5',
      completed: '0',
      cancelled: '2',
      noShow: '0'
    }
  }
};

// Helper to delay response for realistic feel (300-800ms)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Setup Custom Axios Mock Adapter
export const setupMockAdapter = () => {
  if (import.meta.env.VITE_USE_MOCKS !== 'true') return;

  // Save the original adapter
  const originalAdapter = api.defaults.adapter as any;

  api.defaults.adapter = async (config: any): Promise<any> => {
    const url = config.url || '';
    const method = (config.method || 'get').toLowerCase();
    const data = config.data ? JSON.parse(config.data) : null;

    console.log(`[Mock API] Request: ${method.toUpperCase()} ${url}`, data);
    await delay(Math.floor(Math.random() * 500) + 300); // 300ms to 800ms lag

    // 1. Authentication Endpoints
    if (url.includes('/auth/login')) {
      const { email, password } = data || {};
      // Accept admin@pravesha.ai or admin/admin
      if (email === 'admin@pravesha.ai' || email === 'admin' || password === 'admin123') {
        const user = {
          id: 'admin-id-1',
          name: 'Admin User',
          email: 'admin@pravesha.ai',
          role: 'Admin',
          department: 'Management',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
        };
        return {
          data: {
            user,
            token: 'mock-jwt-token-super-secret-12345',
            refreshToken: 'mock-refresh-token-super-secret-67890',
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }
      return {
        data: { message: 'Invalid credentials. Use admin@pravesha.ai / admin123' },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config,
      };
    }

    if (url.includes('/auth/me')) {
      const authHeader = config.headers?.Authorization as string;
      if (authHeader && authHeader.includes('mock-jwt-token')) {
        return {
          data: {
            id: 'admin-id-1',
            name: 'Admin User',
            email: 'admin@pravesha.ai',
            role: 'Admin',
            department: 'Management',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }
      return {
        data: { message: 'Unauthorized session' },
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config,
      };
    }

    // 2. Dashboard Endpoints
    if (url.includes('/dashboard')) {
      // Calculate metrics based on current db counts
      const currentDashboard = {
        ...dashboardData,
        metrics: {
          ...dashboardData.metrics,
          revenue: revenueData,
          visitors: visitorsData,
          totalLeads: { ...dashboardData.metrics.totalLeads, value: db.leads.length.toLocaleString() },
          customers: { ...dashboardData.metrics.customers, value: db.customers.length.toLocaleString() },
        },
        aiInsights: insightsData,
        recentCustomers: db.customers.slice(0, 4).map(c => ({
          name: c.name,
          company: c.company,
          plan: c.plan,
          joined: c.lastActivity.split(',')[0],
          status: c.status
        })),
        ticketsOverview: {
          ...dashboardData.ticketsOverview,
          total: db.tickets.length,
          open: db.tickets.filter(t => t.status === 'Open').length,
          inProgress: db.tickets.filter(t => t.status === 'In Progress').length,
          resolved: db.tickets.filter(t => t.status === 'Resolved').length,
          recentTickets: db.tickets.slice(0, 3).map(t => ({
            id: t.id,
            title: t.subject,
            priority: t.priority
          }))
        },
        recentActivities: db.notifications.slice(0, 5).map((n) => ({
          id: n.id,
          userInitials: n.category === 'lead' ? 'MS' : 'SYS',
          userName: n.category === 'lead' ? 'New Lead' : 'System',
          action: n.text,
          detail: n.time,
          category: n.category,
          time: n.time
        }))
      };

      return {
        data: currentDashboard,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 3. Leads Endpoints
    if (url.includes('/leads')) {
      // DELETE a lead: `/leads/1`
      const leadIdMatch = url.match(/\/leads\/([^/]+)$/);
      if (method === 'delete' && leadIdMatch) {
        const leadId = leadIdMatch[1];
        db.leads = db.leads.filter(l => l.id !== leadId);
        return {
          data: { success: true },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }

      if (method === 'post') {
        const newLead = {
          id: Date.now().toString(),
          name: data.name,
          email: data.email || `${data.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
          source: data.source || 'Website - Pricing Page',
          company: data.company || 'New Company',
          status: data.status || 'New',
          aiScore: data.aiScore || Math.floor(Math.random() * 40) + 60,
          value: Number(data.value) || 120000,
          ownerName: 'Priya Mehta',
          ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
          addedOn: 'Just Now',
          phone: data.phone || '+91 99999 88888',
          aiInsights: data.aiInsights || ['Manually registered lead', 'Interested in CRM modules']
        };
        db.leads.unshift(newLead);
        // Create activity
        db.notifications.unshift({
          id: Date.now().toString(),
          unread: true,
          text: `New lead added: ${newLead.name} (${newLead.company})`,
          time: 'Just now',
          category: 'lead'
        });
        return {
          data: newLead,
          status: 201,
          statusText: 'Created',
          headers: {},
          config,
        };
      }

      return {
        data: {
          leads: db.leads,
          leadsSourceData: leadsData.leadsSourceData
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 3.5 Social Leads Endpoints
    if (url.includes('/social-leads')) {
      return {
        data: db.socialLeads,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 3.6 CRM Leads Endpoints
    if (url.includes('/crm-leads')) {
      const leadIdMatch = url.match(/\/crm-leads\/([^/]+)$/);
      if (leadIdMatch) {
        const lead = db.crmLeads.find(l => l.id === leadIdMatch[1]);
        return {
          data: lead,
          status: lead ? 200 : 404,
          statusText: lead ? 'OK' : 'Not Found',
          headers: {},
          config,
        };
      }
      return {
        data: db.crmLeads,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 3.7 CRM Lead Activities Endpoints
    if (url.includes('/crm-lead-activities')) {
      const urlObj = new URL(url, 'http://localhost');
      const leadId = urlObj.searchParams.get('leadId') || config.params?.leadId;
      
      const activityIdMatch = url.match(/\/crm-lead-activities\/([^/]+)$/);
      if (activityIdMatch) {
        const act = db.leadActivities.find(a => a.id === activityIdMatch[1]);
        return {
          data: act,
          status: act ? 200 : 404,
          statusText: act ? 'OK' : 'Not Found',
          headers: {},
          config,
        };
      }
      
      if (leadId) {
        const filtered = db.leadActivities.filter(a => a.leadId === leadId);
        return {
          data: filtered,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }
      
      return {
        data: db.leadActivities,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 3.8 CRM Lead Notes Endpoints
    if (url.includes('/crm-lead-notes')) {
      const urlObj = new URL(url, 'http://localhost');
      const leadId = urlObj.searchParams.get('leadId') || config.params?.leadId;
      
      const noteIdMatch = url.match(/\/crm-lead-notes\/([^/]+)$/);
      if (noteIdMatch) {
        const note = db.leadNotes.find(n => n.id === noteIdMatch[1]);
        return {
          data: note,
          status: note ? 200 : 404,
          statusText: note ? 'OK' : 'Not Found',
          headers: {},
          config,
        };
      }
      
      if (leadId) {
        const filtered = db.leadNotes.filter(n => n.leadId === leadId);
        return {
          data: filtered,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }
      
      return {
        data: db.leadNotes,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 3.9 CRM Tasks Endpoints
    if (url.includes('/crm-tasks')) {
      const urlObj = new URL(url, 'http://localhost');
      const leadId = urlObj.searchParams.get('leadId') || config.params?.leadId;
      
      const taskIdMatch = url.match(/\/crm-tasks\/([^/]+)$/);
      if (taskIdMatch) {
        const task = db.crmTasks.find(t => t.id === taskIdMatch[1]);
        return {
          data: task,
          status: task ? 200 : 404,
          statusText: task ? 'OK' : 'Not Found',
          headers: {},
          config,
        };
      }
      
      if (leadId) {
        const filtered = db.crmTasks.filter(t => t.leadId === leadId);
        return {
          data: filtered,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }
      
      return {
        data: db.crmTasks,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 3.10 CRM Communications Endpoints
    if (url.includes('/crm-communications')) {
      const urlObj = new URL(url, 'http://localhost');
      const leadId = urlObj.searchParams.get('leadId') || config.params?.leadId;
      
      const communicationIdMatch = url.match(/\/crm-communications\/([^/]+)$/);
      if (communicationIdMatch) {
        const com = db.crmCommunications.find(c => c.id === communicationIdMatch[1]);
        return {
          data: com,
          status: com ? 200 : 404,
          statusText: com ? 'OK' : 'Not Found',
          headers: {},
          config,
        };
      }
      
      if (leadId) {
        const filtered = db.crmCommunications.filter(c => c.leadId === leadId);
        return {
          data: filtered,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }
      
      return {
        data: db.crmCommunications,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 3.11 CRM Customers Endpoints
    if (url.includes('/crm-customers')) {
      const customerIdMatch = url.match(/\/crm-customers\/([^/]+)$/);
      if (customerIdMatch) {
        const cust = db.crmCustomers.find(c => c.id === customerIdMatch[1]);
        return {
          data: cust,
          status: cust ? 200 : 404,
          statusText: cust ? 'OK' : 'Not Found',
          headers: {},
          config,
        };
      }
      
      return {
        data: db.crmCustomers,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 3.12 CRM Pipeline Endpoints
    if (url.includes('/crm-pipeline')) {
      const opportunityIdMatch = url.match(/\/crm-pipeline\/([^/]+)$/);
      if (opportunityIdMatch) {
        const opp = db.crmPipeline.find(o => o.id === opportunityIdMatch[1]);
        return {
          data: opp,
          status: opp ? 200 : 404,
          statusText: opp ? 'OK' : 'Not Found',
          headers: {},
          config,
        };
      }

      // Filter by stage query param if available
      const stageParam = config.params?.stage;
      if (stageParam) {
        const filtered = db.crmPipeline.filter(o => o.stage === stageParam);
        return {
          data: filtered,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }
      
      return {
        data: db.crmPipeline,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 3.13 CRM Dashboard Analytics Endpoints
    if (url.includes('/crm-dashboard-analytics')) {
      return {
        data: db.crmDashboardAnalytics,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    if (url.includes('/crm-dashboard-cards')) {
      const {
        totalVisitors,
        totalSocialLeads,
        totalLeads,
        customers,
        activePipeline,
        monthlyRevenue,
        pendingTasks,
        wonDeals,
      } = db.crmDashboardAnalytics;
      return {
        data: {
          totalVisitors,
          totalSocialLeads,
          totalLeads,
          customers,
          activePipeline,
          monthlyRevenue,
          pendingTasks,
          wonDeals,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 3.14 CRM Notifications Endpoints
    if (url.includes('/crm-notifications/unread')) {
      return {
        data: db.crmNotifications.filter((n) => !n.isRead),
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    if (url.includes('/crm-notifications')) {
      return {
        data: db.crmNotifications,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 3.15 CRM Documents Endpoints
    if (url.includes('/crm-documents/entity')) {
      const entityType = config.params?.entityType;
      const entityId = config.params?.entityId;
      const filtered = db.crmDocuments.filter(
        (doc) => doc.entityType.toLowerCase() === entityType?.toLowerCase() && String(doc.entityId) === String(entityId)
      );
      return {
        data: filtered,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    const docMatch = url.match(/\/crm-documents\/([^/]+)$/);
    if (docMatch && !url.includes('/crm-documents/entity')) {
      const docId = docMatch[1];
      const doc = db.crmDocuments.find((d) => d.id === docId);
      return {
        data: doc,
        status: doc ? 200 : 404,
        statusText: doc ? 'OK' : 'Not Found',
        headers: {},
        config,
      };
    }

    if (url.includes('/crm-documents')) {
      return {
        data: db.crmDocuments,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 3.16 CRM AI Platform Endpoints
    if (url.includes('/crm-ai/conversations') && url.includes('/messages')) {
      const convMatch = url.match(/\/crm-ai\/conversations\/([^/]+)\/messages$/);
      if (convMatch) {
        const convId = convMatch[1];
        const messages = db.aiMessages.filter((m) => m.conversationId === convId);
        return {
          data: messages,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }
    }

    if (url.includes('/crm-ai/conversations/')) {
      const convMatch = url.match(/\/crm-ai\/conversations\/([^/]+)$/);
      if (convMatch) {
        const convId = convMatch[1];
        const conv = db.aiConversations.find((c) => c.id === convId);
        return {
          data: conv,
          status: conv ? 200 : 404,
          statusText: conv ? 'OK' : 'Not Found',
          headers: {},
          config,
        };
      }
    }

    if (url.includes('/crm-ai/conversations')) {
      return {
        data: db.aiConversations,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    if (url.includes('/crm-ai/providers')) {
      return {
        data: db.crmProviders,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    if (url.includes('/crm-ai/prompts') && url.includes('/build') && method === 'post') {
      const promptMatch = url.match(/\/crm-ai\/prompts\/([^/]+)\/build$/);
      if (promptMatch) {
        const promptId = promptMatch[1];
        const prompt = db.crmPrompts.find((p) => p.id === promptId);
        if (prompt) {
          const { variables } = JSON.parse(config.data || '{}');
          let compiled = prompt.template;
          Object.entries(variables || {}).forEach(([k, v]) => {
            compiled = compiled.replace(new RegExp(`{${k}}`, 'g'), String(v));
          });
          return {
            data: { builtPrompt: compiled },
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          };
        }
      }
    }

    if (url.includes('/crm-ai/prompts/')) {
      const promptMatch = url.match(/\/crm-ai\/prompts\/([^/]+)$/);
      if (promptMatch) {
        const promptId = promptMatch[1];
        const prompt = db.crmPrompts.find((p) => p.id === promptId);
        return {
          data: prompt,
          status: prompt ? 200 : 404,
          statusText: prompt ? 'OK' : 'Not Found',
          headers: {},
          config,
        };
      }
    }

    if (url.includes('/crm-ai/tools') && url.includes('/execute') && method === 'post') {
      const toolMatch = url.match(/\/crm-ai\/tools\/([^/]+)\/execute$/);
      if (toolMatch) {
        const toolId = toolMatch[1];
        const { parameters } = JSON.parse(config.data || '{}');
        const tool = db.crmTools.find((t) => t.id === toolId);
        if (!tool) {
          return {
            data: { toolId, status: 'error', response: 'Tool not found', executionTimeMs: 5 },
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          };
        }

        // Validate required params
        const reqFields = tool.parameters.required || [];
        for (const field of reqFields) {
          if (parameters[field] === undefined || parameters[field] === null || parameters[field] === '') {
            return {
              data: { toolId, status: 'error', response: `Validation error: Missing required parameter: ${field}`, executionTimeMs: 5 },
              status: 200,
              statusText: 'OK',
              headers: {},
              config,
            };
          }
        }

        let payload: any;
        switch (tool.name) {
          case 'GetLeads':
            payload = { success: true, count: 2, leads: [{ id: 'lead-1', name: 'Rahul Sharma', status: parameters.status || 'Qualified' }, { id: 'lead-2', name: 'Dinesh Kumar', status: parameters.status || 'Contacted' }] };
            break;
          case 'GetCustomers':
            payload = { success: true, count: 3, customers: [{ id: 'cust-1', name: 'Vikram Patel' }, { id: 'cust-2', name: 'Neha Patel' }].slice(0, parameters.limit || 2) };
            break;
          case 'GetTasks':
            payload = { success: true, tasks: [{ id: 'task-1', title: 'Call Rahul Sharma', counselor: parameters.counselor }] };
            break;
          case 'CreateTask':
            payload = { success: true, message: 'Task created.', task: { title: parameters.title, dueDate: parameters.dueDate, counselor: parameters.counselor } };
            break;
          case 'GetDashboardSummary':
            payload = { success: true, visitors: 12450, socialLeads: 240, crmLeads: 85 };
            break;
          case 'GetNotifications':
            payload = { success: true, notifications: [{ title: 'New Lead Assigned' }] };
            break;
          case 'GetWorkflowStatus':
            payload = { success: true, workflowId: parameters.workflowId, status: 'Active' };
            break;
          default:
            payload = { success: true, message: 'Mock response', parameters };
        }

        return {
          data: {
            toolId,
            status: 'success',
            response: payload,
            executionTimeMs: 150 + Math.floor(Math.random() * 100),
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }
    }

    if (url.includes('/crm-ai/tools/')) {
      const toolMatch = url.match(/\/crm-ai\/tools\/([^/]+)$/);
      if (toolMatch) {
        const toolId = toolMatch[1];
        const tool = db.crmTools.find((t) => t.id === toolId);
        return {
          data: tool,
          status: tool ? 200 : 404,
          statusText: tool ? 'OK' : 'Not Found',
          headers: {},
          config,
        };
      }
    }

    if (url.includes('/crm-ai/tools')) {
      return {
        data: db.crmTools,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    if (url.includes('/crm-knowledge/documents/')) {
      const docMatch = url.match(/\/crm-knowledge\/documents\/([^/]+)$/);
      if (docMatch) {
        const docId = docMatch[1];
        const doc = db.knowledgeDocuments.find((d) => d.id === docId);
        return {
          data: doc,
          status: doc ? 200 : 404,
          statusText: doc ? 'OK' : 'Not Found',
          headers: {},
          config,
        };
      }
    }

    if (url.includes('/crm-knowledge/documents')) {
      return {
        data: db.knowledgeDocuments,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    if (url.includes('/crm-ai/messages') && method === 'post') {
      const { conversationId, content, provider } = JSON.parse(config.data || '{}');
      
      const userMessage = {
        id: `msg-user-${Date.now()}`,
        conversationId,
        role: 'user',
        content,
        status: 'sent',
        timestamp: new Date().toISOString(),
      };
      
      const assistantMessage = {
        id: `msg-assistant-${Date.now()}`,
        conversationId,
        role: 'assistant',
        content: `This is a mock response from ${provider || 'default'} model provider. I have successfully received your query: "${content}"`,
        status: 'sent',
        timestamp: new Date().toISOString(),
      };

      db.aiMessages.push(userMessage);
      db.aiMessages.push(assistantMessage);

      return {
        data: {
          message: assistantMessage,
          tokens: 42 + Math.floor(content.length / 4),
          provider: provider || 'default',
          executionTime: 120 + Math.floor(Math.random() * 200),
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 4. Customers Endpoints
    if (url.includes('/customers')) {
      return {
        data: {
          customers: db.customers,
          plansData: customersData.plansData,
          customerTrendData: customersData.customerTrendData,
          sourceData: customersData.sourceData,
          healthScoreDistribution: customersData.healthScoreDistribution,
          metrics: customersData.metrics
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 5. Tickets Endpoints
    if (url.includes('/tickets')) {
      // POST response to ticket: `/tickets/:id/reply`
      const replyMatch = url.match(/\/tickets\/([^/]+)\/reply$/);
      if (method === 'post' && replyMatch) {
        const ticketId = replyMatch[1];
        const ticket = db.tickets.find(t => t.id === ticketId);
        if (ticket) {
          const newMsg = {
            sender: data.sender || 'agent',
            name: data.name || 'Priya Mehta',
            time: 'Just now',
            text: data.text
          };
          ticket.messages.push(newMsg);
          ticket.status = 'In Progress';
          ticket.updatedTime = 'Just Now';
          
          return {
            data: ticket,
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          };
        }
      }

      // POST create ticket
      if (method === 'post') {
        const newTicket = {
          id: 'TKT-' + (1248 + db.tickets.length),
          subject: data.subject,
          category: data.category || 'GeneralSupport',
          customerName: data.customerName || 'Rahul Sharma',
          customerEmail: data.customerEmail || 'rahul.sharma@email.com',
          source: data.source || 'Website',
          priority: data.priority || 'Medium',
          status: 'Open',
          assignedAgent: 'Priya Mehta',
          agentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
          updatedTime: 'Just Now',
          description: data.description,
          clientSince: 'Apr 2024',
          totalClientTickets: 1,
          messages: [
            { sender: 'customer', name: data.customerName || 'Rahul Sharma', time: 'Just now', text: data.description }
          ]
        };
        db.tickets.unshift(newTicket);
        return {
          data: newTicket,
          status: 201,
          statusText: 'Created',
          headers: {},
          config,
        };
      }

      return {
        data: db.tickets,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 6. WhatsApp Endpoints
    if (url.includes('/whatsapp')) {
      const messageMatch = url.match(/\/whatsapp\/([^/]+)\/message$/);
      if (method === 'post' && messageMatch) {
        const chatId = messageMatch[1];
        const chat = db.chats.find(c => c.id === chatId);
        if (chat) {
          const newMsg = {
            id: Date.now().toString(),
            sender: 'agent',
            text: data.text,
            time: 'Just now',
            status: 'sent' as const
          };
          chat.messages.push(newMsg);
          chat.lastMessage = data.text;
          chat.time = 'Just now';
          
          return {
            data: chat,
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          };
        }
      }

      return {
        data: db.chats,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 7. AI Training Endpoints
    if (url.includes('/ai-training')) {
      if (method === 'post') {
        if (url.includes('/ai-training/train')) {
          const currentAccuracy = parseFloat(db.aiTraining.metrics.aiAccuracy);
          const newAccuracy = Math.min(currentAccuracy + 4.2, 98.5).toFixed(1);
          db.aiTraining.metrics.aiAccuracy = newAccuracy;
          
          return {
            data: { accuracy: parseFloat(newAccuracy) },
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          };
        }
        
        if (url.includes('/ai-training/upload')) {
          const newDoc = {
            id: Date.now().toString(),
            title: data?.title || 'Untitled Document',
            type: 'Document',
            category: 'Product Information',
            records: Math.floor(Math.random() * 100) + 10,
            lastUpdated: 'Just Now',
            status: 'Syncing' as const
          };
          db.aiTraining.records.unshift(newDoc);
          db.aiTraining.metrics.totalDocs = (parseInt(db.aiTraining.metrics.totalDocs) + 1).toString();
          
          return {
            data: newDoc,
            status: 201,
            statusText: 'Created',
            headers: {},
            config,
          };
        }
      }
      
      if (method === 'delete') {
        const docIdMatch = url.match(/\/ai-training\/document\/([^/]+)$/);
        if (docIdMatch) {
          const docId = docIdMatch[1];
          db.aiTraining.records = db.aiTraining.records.filter(r => r.id !== docId);
          db.aiTraining.metrics.totalDocs = Math.max(0, parseInt(db.aiTraining.metrics.totalDocs) - 1).toString();
          return {
            data: { success: true },
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          };
        }
      }

      return {
        data: db.aiTraining,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 8. Analytics
    if (url.includes('/analytics')) {
      return {
        data: {
          leadsOverviewData: analyticsData.leadsOverview,
          leadsSourceData: analyticsData.leadsSource,
          conversationTrendData: analyticsData.conversationTrend,
          ticketsOverviewData: analyticsData.ticketsOverview,
          teamData: analyticsData.teamData,
          sourcePerformanceData: analyticsData.sourcePerformance,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 9. Call Logs
    if (url.includes('/call-logs')) {
      return {
        data: callLogsData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 10. Scheduling
    if (url.includes('/scheduling')) {
      if (method === 'post') {
        if (url.includes('/scheduling/meeting')) {
          const { day, meeting } = data || {};
          const newMeeting = {
            time: meeting?.time || '10:00 AM',
            title: meeting?.title || 'No Title',
            client: meeting?.client || 'Unknown',
            status: (meeting?.status || 'Confirmed') as any,
            color: meeting?.color || 'bg-indigo-50 text-indigo-700 border-indigo-200'
          };
          if (!db.scheduling.schedule[day]) {
            db.scheduling.schedule[day] = [];
          }
          db.scheduling.schedule[day].push(newMeeting);
          
          // Update metrics
          const currentTotal = parseInt(db.scheduling.metrics.totalSchedules) + 1;
          db.scheduling.metrics.totalSchedules = currentTotal.toString();
          if (newMeeting.status === 'Confirmed') {
            db.scheduling.metrics.confirmed = (parseInt(db.scheduling.metrics.confirmed) + 1).toString();
          } else if (newMeeting.status === 'Pending') {
            db.scheduling.metrics.pending = (parseInt(db.scheduling.metrics.pending) + 1).toString();
          }
          
          return {
            data: db.scheduling,
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          };
        }
        
        if (url.includes('/scheduling/followup')) {
          const newFollowUp = {
            id: Date.now().toString(),
            title: data.title || 'Follow Up',
            detail: data.detail || '',
            leadName: data.leadName || 'Unknown Lead',
            company: data.company || 'Unknown Company',
            type: data.type || 'Phone Call',
            dueDate: data.dueDate || 'Today',
            dueTime: data.dueTime || '12:00 PM',
            dueStatus: data.dueStatus || 'Due Today',
            priority: data.priority || 'Medium',
            agentName: data.agentName || 'Admin User',
            agentAvatar: data.agentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150',
            status: data.status || 'Pending',
            lastContact: data.lastContact || 'Just Now'
          };
          db.scheduling.followUps.unshift(newFollowUp);
          return {
            data: db.scheduling,
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          };
        }
      }

      return {
        data: db.scheduling,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 11. User Management
    if (url.includes('/users')) {
      const userIdMatch = url.match(/\/users\/([^/]+)$/);
      if (method === 'delete' && userIdMatch) {
        const userId = userIdMatch[1];
        db.users = db.users.filter(u => u.id !== userId);
        return {
          data: { success: true },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }

      if (method === 'post') {
        const newUser = {
          id: Date.now().toString(),
          name: data.name,
          email: data.email,
          role: data.role || 'Sales Executive',
          department: data.department || 'Sales',
          status: 'Active' as const,
          lastLogin: '—',
          joinedOn: 'Just Now',
          avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150'
        };
        db.users.push(newUser);
        return {
          data: newUser,
          status: 201,
          statusText: 'Created',
          headers: {},
          config,
        };
      }

      return {
        data: db.users,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // 12. Notifications
    if (url.includes('/notifications')) {
      if (method === 'post' && data.action === 'readAll') {
        db.notifications = db.notifications.map(n => ({ ...n, unread: false }));
        return {
          data: db.notifications,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }
      return {
        data: db.notifications,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    // Fallback to real endpoint
    if (originalAdapter) {
      return originalAdapter(config);
    }
    throw new Error('Default adapter not found');
  };
};

setupMockAdapter();

