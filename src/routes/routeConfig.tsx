import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import VisitorIntelligencePage from '../features/leads/pages/VisitorIntelligencePage';
import SocialLeadsPage from '../features/social-leads/pages/SocialLeadsPage';
import AiTrainingPage from '../features/ai-agents/pages/AiTrainingPage';
import LeadListPage from '../features/leads/pages/LeadListPage';
import CustomersPage from '../features/customers/pages/CustomersPage';
import TicketsPage from '../features/tickets/pages/TicketsPage';
import CallLogsPage from '../features/calling/pages/CallLogsPage';
import WhatsAppPage from '../features/whatsapp/pages/WhatsAppPage';
import FollowUpsPage from '../features/scheduling/pages/FollowUpsPage';
import SchedulingPage from '../features/scheduling/pages/SchedulingPage';
import AnalyticsPage from '../features/analytics/pages/AnalyticsPage';
import NotificationsPage from '../features/notifications/pages/NotificationsPage';
import UserManagementPage from '../features/settings/pages/UserManagementPage';

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
            element: <DashboardPage />,
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
            path: 'leads',
            element: <LeadListPage />,
          },
          {
            path: 'customers',
            element: <CustomersPage />,
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
