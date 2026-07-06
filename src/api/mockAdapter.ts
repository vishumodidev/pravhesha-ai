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

// In-memory mock database
const db = {
  leads: [...leadsData.leads],
  customers: [...customersData.customers],
  tickets: [...ticketsData.tickets],
  chats: [...whatsappData],
  users: [...usersData],
  notifications: [...notificationsData],
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

