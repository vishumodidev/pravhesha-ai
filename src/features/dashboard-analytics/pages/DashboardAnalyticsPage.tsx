import { useMemo, useState } from 'react';
import { useDashboardAnalytics } from '../hooks/useDashboardAnalytics';
import {
  Users,
  Target,
  Briefcase,
  IndianRupee,
  CheckSquare,
  Share2,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Award,
  ArrowUpRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

// Helper to format currency in INR
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

// Premium Color Palettes
const PIE_COLORS = [
  '#4f46e5', // Indigo
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#f43f5e', // Rose
  '#64748b', // Slate
];

const SOURCE_COLORS = {
  Facebook: '#1877F2',
  Instagram: '#E1306C',
  LinkedIn: '#0A66C2',
  Website: '#10B981',
  'Google Ads': '#F4B400',
};

export default function DashboardAnalyticsPage() {
  const { data, loading, error } = useDashboardAnalytics();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const kpis = useMemo(() => {
    if (!data) return [];
    return [
      {
        title: 'Total Visitors',
        value: data.totalVisitors.toLocaleString(),
        subtext: 'From all channels',
        icon: Users,
        colorClass: 'bg-blue-50 text-blue-600 border-blue-100',
        glowClass: 'group-hover:bg-blue-100/50',
      },
      {
        title: 'Social Leads',
        value: data.totalSocialLeads.toLocaleString(),
        subtext: 'From social ads',
        icon: Share2,
        colorClass: 'bg-cyan-50 text-cyan-600 border-cyan-100',
        glowClass: 'group-hover:bg-cyan-100/50',
      },
      {
        title: 'CRM Leads',
        value: data.totalLeads.toLocaleString(),
        subtext: `${data.qualifiedLeads} qualified leads`,
        icon: Target,
        colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        glowClass: 'group-hover:bg-indigo-100/50',
      },
      {
        title: 'Customers',
        value: data.customers.toLocaleString(),
        subtext: 'Active subscriptions',
        icon: Award,
        colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        glowClass: 'group-hover:bg-emerald-100/50',
      },
      {
        title: 'Active Pipeline',
        value: formatCurrency(data.activePipeline),
        subtext: 'Potential value',
        icon: Briefcase,
        colorClass: 'bg-purple-50 text-purple-600 border-purple-100',
        glowClass: 'group-hover:bg-purple-100/50',
      },
      {
        title: 'Monthly Revenue',
        value: formatCurrency(data.monthlyRevenue),
        subtext: 'Current month won',
        icon: IndianRupee,
        colorClass: 'bg-teal-50 text-teal-600 border-teal-100',
        glowClass: 'group-hover:bg-teal-100/50',
      },
      {
        title: 'Won Deals',
        value: data.wonDeals.toString(),
        subtext: `${data.lostDeals} lost deals`,
        icon: TrendingUp,
        colorClass: 'bg-amber-50 text-amber-600 border-amber-100',
        glowClass: 'group-hover:bg-amber-100/50',
      },
      {
        title: 'Pending Tasks',
        value: data.pendingTasks.toString(),
        subtext: `${data.overdueTasks} overdue tasks`,
        icon: CheckSquare,
        colorClass: 'bg-rose-50 text-rose-600 border-rose-100',
        glowClass: 'group-hover:bg-rose-100/50',
      },
    ];
  }, [data]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-3">
        <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Loading dashboard analytics...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-40 px-4 text-center space-y-3">
        <AlertCircle className="w-10 h-10 text-rose-500" />
        <p className="text-sm font-bold text-slate-800">Failed to load dashboard analytics</p>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
        >
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div key={refreshKey} className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight m-0">
            CRM Analytics Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time insights across visitor traffic, leads, customer metrics, and pipeline value.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:border-slate-300 rounded-xl shadow-sm hover:shadow transition-all duration-200"
        >
          <RefreshCw size={14} /> Refresh Data
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const IconComponent = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="group bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 text-left flex items-start gap-4 relative overflow-hidden"
            >
              <div
                className={`p-3 rounded-xl border ${kpi.colorClass} transition-colors duration-300 z-10 shrink-0`}
              >
                <IconComponent size={20} />
              </div>
              <div className="space-y-0.5 z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {kpi.title}
                </span>
                <span className="text-lg font-extrabold text-slate-800 block">
                  {kpi.value}
                </span>
                <span className="text-[11px] text-slate-400 font-medium block">
                  {kpi.subtext}
                </span>
              </div>
              {/* Subtle background glow effect on hover */}
              <div
                className={`absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${kpi.glowClass}`}
              />
            </div>
          );
        })}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Growth Trend */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between h-[340px]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0">Lead Growth Trend</h3>
              <p className="text-[11px] text-slate-400">Total CRM leads acquired by weekday</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50/50 text-indigo-700 border border-indigo-100 rounded-lg text-[10px] font-bold">
              <ArrowUpRight size={12} /> Weekday Summary
            </div>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.leadGrowth}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="leadGrowthColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    fontSize: '11px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="Leads"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#leadGrowthColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between h-[340px]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0">Revenue Trend</h3>
              <p className="text-[11px] text-slate-400">Monthly closed won revenue growth</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50/50 text-emerald-700 border border-emerald-100 rounded-lg text-[10px] font-bold">
              <ArrowUpRight size={12} /> YTD Won Revenue
            </div>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.revenueTrend}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueTrendColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.85} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val / 100000}L`}
                />
                <Tooltip
                  formatter={(value: any) => [formatCurrency(value), 'Revenue']}
                  contentStyle={{
                    fontSize: '11px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  }}
                />
                <Bar dataKey="Revenue" fill="url(#revenueTrendColor)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Stage Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between h-[340px]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0">Pipeline Stage Distribution</h3>
              <p className="text-[11px] text-slate-400">Total opportunities across sales stages</p>
            </div>
          </div>
          <div className="flex-1 w-full min-h-0 flex flex-col sm:flex-row items-center">
            <div className="flex-1 h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.pipelineDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.pipelineDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      fontSize: '11px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 px-4 w-full sm:w-auto shrink-0 text-left max-h-[160px] overflow-y-auto scrollbar-thin">
              {data.pipelineDistribution.map((item, index) => (
                <div key={item.name} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                  />
                  <span className="truncate max-w-[100px]">{item.name}</span>
                  <span className="font-bold text-slate-800 shrink-0">({item.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lead Sources Performance */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between h-[340px]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0">Lead Sources Performance</h3>
              <p className="text-[11px] text-slate-400">Distribution of leads across source channels</p>
            </div>
          </div>
          <div className="flex-1 w-full min-h-0 flex flex-col sm:flex-row items-center">
            <div className="flex-1 h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.leadSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={85}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {data.leadSources.map((entry) => {
                      const color =
                        SOURCE_COLORS[entry.name as keyof typeof SOURCE_COLORS] || '#64748b';
                      return <Cell key={`cell-${entry.name}`} fill={color} />;
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      fontSize: '11px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 px-4 w-full sm:w-auto shrink-0 text-left">
              {data.leadSources.map((item) => {
                const color = SOURCE_COLORS[item.name as keyof typeof SOURCE_COLORS] || '#64748b';
                return (
                  <div key={item.name} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="min-w-[70px]">{item.name}</span>
                    <span className="font-bold text-slate-800">({item.value})</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
