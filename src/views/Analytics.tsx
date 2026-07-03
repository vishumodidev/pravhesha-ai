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

// Data Mockups
const leadsOverviewData = [
  { name: 'May 15', Current: 220, Last: 190 },
  { name: 'May 16', Current: 290, Last: 210 },
  { name: 'May 17', Current: 260, Last: 230 },
  { name: 'May 18', Current: 380, Last: 250 },
  { name: 'May 19', Current: 410, Last: 290 },
  { name: 'May 20', Current: 360, Last: 310 },
  { name: 'May 21', Current: 450, Last: 330 }
];

const leadsSourceData = [
  { name: 'Website', value: 428, color: '#2563eb' },
  { name: 'Facebook', value: 248, color: '#3b82f6' },
  { name: 'Instagram', value: 196, color: '#a855f7' },
  { name: 'WhatsApp', value: 156, color: '#10b981' },
  { name: 'Referral', value: 120, color: '#f59e0b' },
  { name: 'Others', value: 100, color: '#64748b' }
];

const conversationTrendData = [
  { name: 'May 15', Calls: 180, WhatsApp: 220, Email: 90, Chats: 120 },
  { name: 'May 16', Calls: 220, WhatsApp: 280, Email: 110, Chats: 150 },
  { name: 'May 17', Calls: 200, WhatsApp: 250, Email: 95, Chats: 130 },
  { name: 'May 18', Calls: 250, WhatsApp: 310, Email: 130, Chats: 180 },
  { name: 'May 19', Calls: 290, WhatsApp: 360, Email: 150, Chats: 210 },
  { name: 'May 20', Calls: 260, WhatsApp: 320, Email: 140, Chats: 190 },
  { name: 'May 21', Calls: 320, WhatsApp: 410, Email: 170, Chats: 240 }
];

const ticketsOverviewData = [
  { name: 'May 15', Open: 10, Progress: 15, Resolved: 25 },
  { name: 'May 16', Open: 15, Progress: 18, Resolved: 30 },
  { name: 'May 17', Open: 12, Progress: 14, Resolved: 28 },
  { name: 'May 18', Open: 22, Progress: 25, Resolved: 35 },
  { name: 'May 19', Open: 28, Progress: 30, Resolved: 42 },
  { name: 'May 20', Open: 20, Progress: 22, Resolved: 38 },
  { name: 'May 21', Open: 25, Progress: 28, Resolved: 48 }
];

const teamData = [
  { name: 'Priya Mehta', role: 'Sales Lead', leads: 156, customers: 32, conversion: 20.5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150' },
  { name: 'Vikram Patel', role: 'Support Specialist', leads: 132, customers: 28, conversion: 21.2, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150' },
  { name: 'Anjali Singh', role: 'Solutions Agent', leads: 118, customers: 25, conversion: 21.2, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150' },
  { name: 'Rahul Desai', role: 'Account Exec', leads: 104, customers: 21, conversion: 20.2, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150' }
];

const sourcePerformanceData = [
  { source: 'Website', leads: 428, customers: 128, conv: '29.9%', percentage: 80 },
  { source: 'Facebook', leads: 248, customers: 68, conv: '27.4%', percentage: 65 },
  { source: 'Instagram', leads: 196, customers: 46, conv: '23.5%', percentage: 50 },
  { source: 'WhatsApp', leads: 156, customers: 42, conv: '26.9%', percentage: 60 },
  { source: 'Referral', leads: 120, customers: 26, conv: '21.7%', percentage: 40 },
  { source: 'Others', leads: 100, customers: 10, conv: '10.0%', percentage: 20 }
];

export default function Analytics() {
  return (
    <div className="space-y-6 select-none">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0">
            Analytics & Reports
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Track performance, analyze trends and make data-driven decisions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm text-xs font-semibold text-slate-600">
            <Calendar size={14} className="text-slate-400" />
            <span>May 15, 2024 - May 21, 2024</span>
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-1.5 rounded-xl shadow-sm text-xs font-bold text-slate-700 transition-colors">
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
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Leads</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">1,248</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +18.6%
            </span>
          </div>
        </div>

        {/* New Customers */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">New Customers</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">320</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +16.3%
            </span>
          </div>
        </div>

        {/* Total Tickets */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Tickets</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">1,248</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +14.2%
            </span>
          </div>
        </div>

        {/* Total Calls */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Calls</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">1,892</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +20.7%
            </span>
          </div>
        </div>

        {/* WhatsApp Conversations */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">WhatsApp Chats</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">894</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +12.8%
            </span>
          </div>
        </div>

        {/* Avg Response Time */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
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
              <h3 className="font-bold text-slate-800 text-sm m-0">Leads Overview</h3>
              <p className="text-[11px] text-slate-400">Leads generated compared to last week</p>
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
              <span className="text-slate-500 font-medium font-semibold">This Period (1,248)</span>
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
            <h3 className="font-bold text-slate-800 text-sm m-0">Leads by Source</h3>
            <p className="text-[11px] text-slate-400">Where our lead acquisition channels originate</p>
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
                <span className="text-sm font-extrabold text-slate-800 leading-none">1,248</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
              </div>
            </div>
            <div className="space-y-1 text-[10px]">
              {leadsSourceData.slice(0, 4).map((entry, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600 truncate max-w-[80px] font-semibold">{entry.name}</span>
                  <span className="text-slate-400">({Math.round((entry.value / 1248) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full text-center text-xs text-indigo-600 font-bold hover:underline">
            View Source Details →
          </button>
        </div>

        {/* Performance Summary Sparklines */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm m-0">Performance Summary</h3>
            <p className="text-[11px] text-slate-400">Key productivity ratios</p>
          </div>

          {[
            { label: 'Conversion Rate', val: '25.6%', color: 'text-emerald-600' },
            { label: 'Lead to Customer Rate', val: '25.6%', color: 'text-indigo-600' },
            { label: 'Response Rate', val: '72.4%', color: 'text-blue-600' },
            { label: 'Resolution Rate', val: '91.2%', color: 'text-purple-600' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-none">
              <span className="text-xs font-semibold text-slate-500">{item.label}</span>
              <div className="text-right">
                <span className={`text-sm font-bold ${item.color} block`}>{item.val}</span>
                <span className="text-[9px] text-slate-400 flex items-center justify-end gap-0.5">
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
              <h3 className="font-bold text-slate-800 text-sm m-0">Conversations Trend</h3>
              <p className="text-[11px] text-slate-400">Daily interactions across mediums</p>
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
              <h3 className="font-bold text-slate-800 text-sm m-0">Tickets Overview</h3>
              <p className="text-[11px] text-slate-400">Stacked ticket lifecycle status</p>
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
              <span className="text-slate-500">Open</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-slate-500">In Progress</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-500">Resolved</span>
            </div>
          </div>
        </div>

        {/* Top Performing Team Members */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm m-0">Top Team Members</h3>
            <button className="text-xs text-indigo-600 font-bold hover:underline">View Full</button>
          </div>

          <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[220px]">
            {teamData.map((agent, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img src={agent.avatar} alt={agent.name} className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <span className="font-bold text-slate-700 block leading-tight">{agent.name}</span>
                    <span className="text-[10px] text-slate-400 block">{agent.role}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-800 block">{agent.leads} Leads</span>
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
          <h3 className="font-bold text-slate-800 text-sm mb-4 m-0">Source Performance</h3>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-2 font-semibold">Source</th>
                  <th className="pb-2 font-semibold">Leads</th>
                  <th className="pb-2 font-semibold">Customers</th>
                  <th className="pb-2 font-semibold">Conversion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sourcePerformanceData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2 font-bold text-slate-800">{row.source}</td>
                    <td className="py-2 text-slate-500">{row.leads}</td>
                    <td className="py-2 text-slate-500">{row.customers}</td>
                    <td className="py-2 font-bold text-indigo-600 flex items-center gap-2">
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
          <h3 className="font-bold text-slate-800 text-sm mb-4 m-0">Activity Summary</h3>
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
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${act.color}`}>
                      <Icon size={14} />
                    </div>
                    <span className="text-slate-600 font-semibold">{act.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-800 block">{act.count}</span>
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
            <h3 className="font-bold text-slate-800 text-sm mb-4 m-0 flex items-center gap-1.5">
              <Sparkles size={16} className="text-indigo-600 animate-float" />
              AI Insights
            </h3>
            <div className="space-y-4">
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
          <button className="w-full text-center text-xs text-indigo-600 font-bold hover:underline mt-4">
            View All Insights →
          </button>
        </div>
      </div>
    </div>
  );
}
