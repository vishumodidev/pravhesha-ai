import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardAnalyticsPage from '../features/dashboard-analytics/pages/DashboardAnalyticsPage';
import VisitorIntelligencePage from '../features/leads/pages/VisitorIntelligencePage';
import SocialLeadsPage from '../features/social-leads/pages/SocialLeadsPage';
import AiTrainingPage from '../features/ai-agents/pages/AiTrainingPage';
import AIPlatformPage from '../features/ai-platform/pages/AIPlatformPage';
import LeadListPage from '../features/leads/pages/LeadListPage';
import LeadDetailsPage from '../features/leads/pages/LeadDetailsPage';
import CustomerListPage from '../features/customers/pages/CustomerListPage';
import CustomerDetailsPage from '../features/customers/pages/CustomerDetailsPage';
import PipelineBoardPage from '../features/pipeline/pages/PipelineBoardPage';
import TicketsPage from '../features/tickets/pages/TicketsPage';
import CallLogsPage from '../features/calling/pages/CallLogsPage';
import WhatsAppPage from '../features/whatsapp/pages/WhatsAppPage';
import FollowUpsPage from '../features/scheduling/pages/FollowUpsPage';
import SchedulingPage from '../features/scheduling/pages/SchedulingPage';
import AnalyticsPage from '../features/analytics/pages/AnalyticsPage';
import NotificationsPage from '../features/notifications/pages/NotificationsPage';
import UserManagementPage from '../features/settings/pages/UserManagementPage';
import KnowledgeLibraryPage from '../features/knowledge-base/pages/KnowledgeLibraryPage';
import MemoryPage from '../features/memory/pages/MemoryPage';
import AgentOrchestratorPage from '../features/multi-agent/components/AgentOrchestratorPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <PublicRoute />,
    children: [
      {
        path: '',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <DashboardAnalyticsPage />,
          },
          {
            path: 'visitor-intelligence',
            element: <VisitorIntelligencePage />,
          },
          {
            path: 'social-leads',
            element: <SocialLeadsPage />,
          },
          {
            path: 'ai-training',
            element: <AiTrainingPage />,
          },
          {
            path: 'ai-platform',
            element: <AIPlatformPage />,
          },
          {
            path: 'knowledge-base',
            element: <KnowledgeLibraryPage />,
          },
          {
            path: 'memory',
            element: <MemoryPage />,
          },
          {
            path: 'orchestrator',
            element: <AgentOrchestratorPage />,
          },
          {
            path: 'leads',
            element: <LeadListPage />,
          },
          {
            path: 'leads/:leadId',
            element: <LeadDetailsPage />,
          },
          {
            path: 'customers',
            element: <CustomerListPage />,
          },
          {
            path: 'customers/:customerId',
            element: <CustomerDetailsPage />,
          },
          {
            path: 'pipeline',
            element: <PipelineBoardPage />,
          },
          {
            path: 'customer-tickets',
            element: <TicketsPage />,
          },
          {
            path: 'call-logs',
            element: <CallLogsPage />,
          },
          {
            path: 'whatsapp',
            element: <WhatsAppPage />,
          },
          {
            path: 'follow-ups',
            element: <FollowUpsPage />,
          },
          {
            path: 'scheduling',
            element: <SchedulingPage />,
          },
          {
            path: 'analytics',
            element: <AnalyticsPage />,
          },
          {
            path: 'notifications',
            element: <NotificationsPage />,
          },
          {
            path: 'user-management',
            element: <UserManagementPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
