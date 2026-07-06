import {
  Calendar,
  Filter,
  Download,
  Phone,
  MessageSquare,
  Mail,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAnalytics } from '../hooks/useAnalytics';

export default function AnalyticsPage() {
  const { analytics, isLoading } = useAnalytics();

  if (isLoading || !analytics) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-650 rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Loading analytics...</span>
      </div>
    );
  }

  const {
    leadsOverviewData,
    leadsSourceData,
    conversationTrendData,
    ticketsOverviewData,
    teamData,
    sourcePerformanceData
  } = analytics;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0 text-left">
            Analytics & Reports
          </h2>
          <p className="text-sm text-slate-500 mt-1 text-left">
            Track performance, analyze trends and make data-driven decisions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm text-xs font-semibold text-slate-600">
            <Calendar size={14} className="text-slate-400" />
            <span>May 15, 2024 - May 21, 2024</span>
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-1.5 rounded-xl shadow-sm text-xs font-bold text-slate-707 transition-colors">
            <Filter size={14} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold transition-all shadow-indigo-100">
            <Download size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Leads */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Leads</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">1,248</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +18.6%
            </span>
          </div>
        </div>

        {/* New Customers */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">New Customers</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">320</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +16.3%
            </span>
          </div>
        </div>

        {/* Total Tickets */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Tickets</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">1,248</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +14.2%
            </span>
          </div>
        </div>

        {/* Total Calls */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Calls</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">1,892</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +20.7%
            </span>
          </div>
        </div>

        {/* WhatsApp Conversations */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">WhatsApp Chats</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">894</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +12.8%
            </span>
          </div>
        </div>

        {/* Avg Response Time */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Response</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">02m 18s</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +12.6%
            </span>
          </div>
        </div>
      </div>

      {/* Leads Overview & Lead Sources Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Leads Overview Line Chart */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0 text-left">Leads Overview</h3>
              <p className="text-[11px] text-slate-400 text-left">Leads generated compared to last week</p>
            </div>
            <select className="text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none">
              <option>Leads Created</option>
              <option>Conversions</option>
            </select>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadsOverviewData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="Current" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Last" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="text-slate-500 font-semibold font-semibold">This Period (1,248)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-1 border-t-2 border-dashed border-slate-400" />
              <span className="text-slate-400 font-medium">Last Period (1,052)</span>
            </div>
          </div>
        </div>

        {/* Lead Source Pie Chart */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm m-0 text-left">Leads by Source</h3>
            <p className="text-[11px] text-slate-400 text-left">Where our lead acquisition channels originate</p>
          </div>
          <div className="flex gap-4 items-center justify-center my-2">
            <div className="relative w-28 h-28 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadsSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={45}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {leadsSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-extrabold text-slate-808 leading-none">1,248</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
              </div>
            </div>
            <div className="space-y-1 text-[10px] text-left">
              {leadsSourceData.slice(0, 4).map((entry, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600 truncate max-w-[80px] font-semibold">{entry.name}</span>
                  <span className="text-slate-400">({Math.round((entry.value / 1248) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full text-center text-xs text-indigo-606 font-bold hover:underline">
            View Source Details →
          </button>
        </div>

        {/* Performance Summary Sparklines */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm m-0 text-left">Performance Summary</h3>
            <p className="text-[11px] text-slate-400 text-left">Key productivity ratios</p>
          </div>

          {[
            { label: 'Conversion Rate', val: '25.6%', color: 'text-emerald-600' },
            { label: 'Lead to Customer Rate', val: '25.6%', color: 'text-indigo-600' },
            { label: 'Response Rate', val: '72.4%', color: 'text-blue-600' },
            { label: 'Resolution Rate', val: '91.2%', color: 'text-purple-600' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-none">
              <span className="text-xs font-semibold text-slate-505">{item.label}</span>
              <div className="text-right">
                <span className={`text-sm font-bold ${item.color} block`}>{item.val}</span>
                <span className="text-[9px] text-slate-404 flex items-center justify-end gap-0.5">
                  ▲ +1.4% vs last 7d
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversations Trend & Tickets Overview Stacked Bar Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Conversations Trend Multi-line Chart */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0 text-left">Conversations Trend</h3>
              <p className="text-[11px] text-slate-400 text-left">Daily interactions across mediums</p>
            </div>
            <select className="text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversationTrendData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="Calls" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="WhatsApp" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Email" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 text-[10px]">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-slate-500">Calls</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-500">WhatsApp</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-slate-500">Email</span>
            </div>
          </div>
        </div>

        {/* Tickets stacked Bar chart */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0 text-left">Tickets Overview</h3>
              <p className="text-[11px] text-slate-400 text-left">Stacked ticket lifecycle status</p>
            </div>
            <select className="text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none">
              <option>This Period</option>
              <option>Last Period</option>
            </select>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketsOverviewData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Bar dataKey="Open" stackId="a" fill="#ef4444" />
                <Bar dataKey="Progress" stackId="a" fill="#f59e0b" />
                <Bar dataKey="Resolved" stackId="a" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 text-[10px]">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-slate-555">Open</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-slate-555">In Progress</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-555">Resolved</span>
            </div>
          </div>
        </div>

        {/* Top Performing Team Members */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm m-0 text-left">Top Team Members</h3>
            <button className="text-xs text-indigo-606 font-bold hover:underline">View Full</button>
          </div>

          <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[220px] text-left">
            {teamData.map((agent: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img src={agent.avatar} alt={agent.name} className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <span className="font-bold text-slate-707 block leading-tight">{agent.name}</span>
                    <span className="text-[10px] text-slate-404 block">{agent.role}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-808 block">{agent.leads} Leads</span>
                  <span className="text-[9px] text-indigo-600 font-semibold">{agent.conversion}% Conv</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Source Performance & Activities Summary Lower Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Source Performance Table */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-slate-800 text-sm mb-4 m-0 text-left">Source Performance</h3>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-2 font-semibold text-left">Source</th>
                  <th className="pb-2 font-semibold text-left">Leads</th>
                  <th className="pb-2 font-semibold text-left">Customers</th>
                  <th className="pb-2 font-semibold text-left">Conversion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sourcePerformanceData.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2 font-bold text-slate-808 text-left">{row.source}</td>
                    <td className="py-2 text-slate-505 text-left">{row.leads}</td>
                    <td className="py-2 text-slate-505 text-left">{row.customers}</td>
                    <td className="py-2 font-bold text-indigo-606 flex items-center gap-2 text-left">
                      <span>{row.conv}</span>
                      <div className="w-16 h-1 bg-slate-100 rounded-full hidden sm:block overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${row.percentage}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Summary Stats */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-slate-800 text-sm mb-4 m-0 text-left">Activity Summary</h3>
          <div className="space-y-3.5 flex-1">
            {[
              { label: 'Calls completed', count: '1,892', change: '+20.7%', icon: Phone, color: 'bg-blue-50 text-blue-600' },
              { label: 'WhatsApp messages', count: '2,346', change: '+12.8%', icon: MessageSquare, color: 'bg-emerald-50 text-emerald-600' },
              { label: 'Emails sent', count: '892', change: '+10.3%', icon: Mail, color: 'bg-amber-50 text-amber-500' },
              { label: 'Meetings scheduled', count: '542', change: '+16.5%', icon: Calendar, color: 'bg-indigo-50 text-indigo-600' }
            ].map((act, i) => {
              const Icon = act.icon;
              return (
                <div key={i} className="flex items-center justify-between text-xs border-b border-slate-50 pb-2 last:border-none">
                  <div className="flex items-center gap-2 text-left">
                    <div className={`p-1.5 rounded-lg ${act.color}`}>
                      <Icon size={14} />
                    </div>
                    <span className="text-slate-600 font-semibold">{act.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-808 block">{act.count}</span>
                    <span className="text-[9px] text-emerald-600 font-bold block">{act.change}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-4 m-0 flex items-center gap-1.5 text-left">
              <Sparkles size={16} className="text-indigo-600 animate-float" />
              AI Insights
            </h3>
            <div className="space-y-4 text-left">
              <div className="text-xs bg-slate-50 border border-slate-100 p-3 rounded-xl">
                <p className="text-slate-600 leading-relaxed font-semibold">
                  💡 Leads show **high activity spike on Wednesdays and Thursdays**. Try targeting callbacks during these afternoon periods to maximize conversion rates.
                </p>
              </div>
              <div className="text-xs bg-slate-50 border border-slate-100 p-3 rounded-xl">
                <p className="text-slate-600 leading-relaxed font-semibold">
                  📈 **WhatsApp campaigns** are delivering the highest overall conversion efficiency (26.9%). Advise sales team to allocate additional efforts here.
                </p>
              </div>
            </div>
          </div>
          <button className="w-full text-center text-xs text-indigo-606 font-bold hover:underline mt-4">
            View All Insights →
          </button>
        </div>
      </div>
    </div>
  );
}
