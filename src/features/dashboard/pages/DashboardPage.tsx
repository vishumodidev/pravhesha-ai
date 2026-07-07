import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Sliders } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import DashboardCards from '../components/DashboardCards';
import AIInsightCard from '../components/AIInsightCard';
import LeadChart from '../components/LeadChart';
import ConversionFunnel from '../components/ConversionFunnel';
import CustomersOverview from '../components/CustomersOverview';
import RecentCustomers from '../components/RecentCustomers';
import RecentTickets from '../components/RecentTickets';
import AITrainingSection from '../components/AITrainingSection';
import RecentTrainingActivity from '../components/RecentTrainingActivity';
import RecentActivities from '../components/RecentActivities';
import MiniMetrics from '../components/MiniMetrics';

export default function DashboardPage() {
  const { data, loading } = useDashboard();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-650 rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">
          Loading Dashboard intelligence...
        </span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center max-w-xl mx-auto my-12 space-y-4">
        <h3 className="text-base font-bold text-rose-700">Failed to load dashboard</h3>
        <p className="text-xs text-rose-600">An error occurred while calling the API</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-rose-650 text-white rounded-xl text-xs font-bold shadow-md hover:bg-rose-700"
        >
          Retry request
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0 text-left">
            Good Morning, Admin! 👋
          </h2>
          <p className="text-sm text-slate-500 mt-1 text-left">
            Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm text-xs font-semibold text-slate-600">
            <Calendar size={14} className="text-slate-400" />
            <span>May 21, 2024</span>
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-xl shadow-sm text-xs font-bold text-slate-700 transition-colors">
            <Plus size={14} />
            <span>Add Widget</span>
          </button>
          <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-xl shadow-md text-xs font-bold transition-all shadow-indigo-100">
            <Sliders size={14} />
            <span>Customize</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <DashboardCards metrics={data.metrics} />

      {/* Sales Insights, Activity Chart, and Funnel Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <AIInsightCard
            insights={data.aiInsights}
            totalOpportunity={data.totalOpportunity}
          />
        </div>
        <div className="lg:col-span-6">
          <LeadChart data={data.leadCallActivity} />
        </div>
        <div className="lg:col-span-3">
          <ConversionFunnel
            funnel={data.funnel}
            conversionRate={data.conversionRate}
          />
        </div>
      </div>

      {/* Customers, Recent Customers, Tickets Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <CustomersOverview
            overview={data.customersOverview}
            onViewAllClick={() => navigate('/customers')}
          />
        </div>
        <div className="lg:col-span-5">
          <RecentCustomers
            customers={data.recentCustomers}
            onViewAllClick={() => navigate('/customers')}
          />
        </div>
        <div className="lg:col-span-4">
          <RecentTickets
            overview={data.ticketsOverview}
            onViewAllClick={() => navigate('/customer-tickets')}
          />
        </div>
      </div>

      {/* AI Training Module Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <AITrainingSection
            accuracy={data.ticketsOverview.priorityDistribution[0] ? data.aiTrainingAccuracy : 72}
            totalDocs={48}
            questionsTrained={1248}
            lastTrained="May 20, 2024"
            onNavigateToTraining={() => navigate('/ai-training')}
          />
        </div>
        <div className="lg:col-span-4">
          <RecentTrainingActivity
            activities={data.ticketsOverview.recentTickets.map((t, idx) => ({
              id: t.id,
              title: idx === 0 ? 'Product Catalog.pdf' : idx === 1 ? 'SOP - Sales Process.pdf' : 'FAQs - Services.pdf',
              lastUpdated: 'May 20, 2024',
              status: 'Trained'
            }))}
            onViewAllClick={() => navigate('/ai-training')}
          />
        </div>
      </div>

      {/* Bottom Activities and Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <RecentActivities activities={data.recentActivities} />
        </div>
        <div className="lg:col-span-4">
          <MiniMetrics metrics={data.miniMetrics} />
        </div>
      </div>
    </div>
  );
}
