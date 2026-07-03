import { useState } from 'react';
import {
  Users,
  Eye,
  Brain,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Sliders,
  Plus,
  Calendar,
  TrendingDown,
  Upload,
  Sparkles,
  ChevronRight,
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import MetricCard from '../components/MetricCard';

const leadCallData = [
  { name: 'May 15', Leads: 60, Calls: 25 },
  { name: 'May 16', Leads: 90, Calls: 70 },
  { name: 'May 17', Leads: 80, Calls: 50 },
  { name: 'May 18', Leads: 110, Calls: 95 },
  { name: 'May 19', Leads: 130, Calls: 75 },
  { name: 'May 20', Leads: 115, Calls: 60 },
  { name: 'May 21', Leads: 154, Calls: 120 }
];

const ticketPriorityData = [
  { name: 'High', value: 12, color: '#f43f5e' },
  { name: 'Medium', value: 20, color: '#f59e0b' },
  { name: 'Low', value: 22, color: '#10b981' }
];

export default function Overview({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [activeActivityTab, setActiveActivityTab] = useState('all');

  return (
    <div className="space-y-6">
      {/* Top Banner Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0">
            Good Morning, Admin! 👋
          </h2>
          <p className="text-sm text-slate-500 mt-1">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <MetricCard
          title="Total Leads"
          value="1,245"
          change="18.6%"
          isPositive={true}
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          sparklineData={[40, 55, 45, 70, 65, 80, 95]}
          sparklineColor="#2563eb"
        />
        <MetricCard
          title="Visitors"
          value="5,432"
          change="24.5%"
          isPositive={true}
          icon={Eye}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          sparklineData={[30, 42, 60, 52, 70, 85, 98]}
          sparklineColor="#9333ea"
        />
        <MetricCard
          title="AI Qualified Leads"
          value="312"
          change="22.4%"
          isPositive={true}
          icon={Brain}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          sparklineData={[20, 28, 35, 42, 39, 58, 64]}
          sparklineColor="#059669"
        />
        <MetricCard
          title="Conversions"
          value="89"
          change="15.3%"
          isPositive={true}
          icon={CheckCircle2}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          sparklineData={[12, 18, 15, 24, 21, 28, 33]}
          sparklineColor="#d97706"
        />
        <MetricCard
          title="Revenue (Expected)"
          value="₹18.4L"
          change="20.8%"
          isPositive={true}
          icon={DollarSign}
          iconColor="text-rose-600"
          iconBg="bg-rose-50"
          sparklineData={[30, 45, 40, 65, 75, 90, 110]}
          sparklineColor="#e11d48"
        />
        <MetricCard
          title="Customers"
          value="132"
          change="17.2%"
          isPositive={true}
          icon={Users}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          sparklineData={[20, 25, 22, 34, 30, 39, 44]}
          sparklineColor="#4f46e5"
        />
      </div>

      {/* Sales Insights, Activity Chart, and Funnel Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Insights Box */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 m-0">
                <Sparkles size={16} className="text-indigo-600" />
                AI Sales Assistant Insights
              </h3>
              <span className="text-[10px] bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-full">
                Today
              </span>
            </div>
            <div className="space-y-3.5">
              <div className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <p className="text-xs text-slate-600 leading-normal">
                  <strong className="text-slate-800">12 leads</strong> were contacted today by WhatsApp automation.
                </p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <p className="text-xs text-slate-600 leading-normal">
                  <strong className="text-slate-800">4 hot leads</strong> detected displaying high qualification signals.
                </p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <p className="text-xs text-slate-600 leading-normal">
                  <strong className="text-slate-800">3 follow-ups</strong> are overdue. Immediate action suggested.
                </p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <p className="text-xs text-slate-600 leading-normal">
                  <strong className="text-slate-800">2 demos</strong> scheduled today. Product catalog is updated.
                </p>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mt-4">
            <span className="text-slate-400 font-medium">Total Opportunity</span>
            <span className="font-extrabold text-indigo-600 text-sm">₹2.4 Lakhs</span>
          </div>
        </div>

        {/* Lead & Call Activity Chart */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0">Lead & Call Activity</h3>
              <p className="text-[11px] text-slate-400">Leads generated vs calls handled</p>
            </div>
            <select className="text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadCallData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    fontSize: '11px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                  }}
                />
                <Line type="monotone" dataKey="Leads" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="Calls" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="text-slate-500 font-medium">Leads</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-500 font-medium">Calls</span>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-800 text-sm m-0">Conversion Funnel</h3>
              <select className="text-[10px] font-bold text-slate-400 focus:outline-none">
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <div className="space-y-2 mt-4">
              {/* Funnel Rows */}
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>Visitors</span>
                  <span className="font-bold text-slate-700">10,000</span>
                </div>
                <div className="w-full h-4 bg-indigo-50 rounded-md overflow-hidden relative">
                  <div className="h-full bg-indigo-600/10 rounded-md" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>Leads Captured</span>
                  <span className="font-bold text-slate-700">3,200</span>
                </div>
                <div className="w-full h-4 bg-indigo-50 rounded-md overflow-hidden relative">
                  <div className="h-full bg-indigo-600/30 rounded-md" style={{ width: '70%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>AI Qualified Leads</span>
                  <span className="font-bold text-slate-700">1,450</span>
                </div>
                <div className="w-full h-4 bg-indigo-50 rounded-md overflow-hidden relative">
                  <div className="h-full bg-indigo-600/60 rounded-md" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>Demo Scheduled</span>
                  <span className="font-bold text-slate-700">420</span>
                </div>
                <div className="w-full h-4 bg-indigo-50 rounded-md overflow-hidden relative">
                  <div className="h-full bg-indigo-600/80 rounded-md" style={{ width: '25%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>Converted Customers</span>
                  <span className="font-bold text-slate-700">132</span>
                </div>
                <div className="w-full h-4 bg-indigo-50 rounded-md overflow-hidden relative">
                  <div className="h-full bg-indigo-600 rounded-md" style={{ width: '13%' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] mt-4">
            <span className="text-slate-400 font-medium">Conversion Rate</span>
            <span className="font-extrabold text-emerald-600">2.64%</span>
          </div>
        </div>
      </div>

      {/* Customers, Recent Customers, Tickets Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Customers Grid */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm m-0">Customers Overview</h3>
            <button className="text-xs text-indigo-600 font-bold hover:underline" onClick={() => setActiveTab('customers')}>
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
              <span className="text-lg font-bold text-slate-800 mt-1">132</span>
              <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                <TrendingUp size={10} /> +17.2%
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Active</span>
              <span className="text-lg font-bold text-slate-800 mt-1">98</span>
              <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                <TrendingUp size={10} /> +14.8%
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase">New Month</span>
              <span className="text-lg font-bold text-slate-800 mt-1">18</span>
              <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                <TrendingUp size={10} /> +20.0%
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Churn Risk</span>
              <span className="text-lg font-bold text-slate-800 mt-1">6</span>
              <span className="text-[9px] text-rose-500 font-bold flex items-center gap-0.5 mt-0.5">
                <TrendingDown size={10} /> +4.2%
              </span>
            </div>
          </div>
        </div>

        {/* Recent Customers Table */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm m-0">Recent Customers</h3>
            <button className="text-xs text-indigo-600 font-bold hover:underline" onClick={() => setActiveTab('customers')}>
              View All
            </button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-2 font-semibold">Customer</th>
                  <th className="pb-2 font-semibold">Company</th>
                  <th className="pb-2 font-semibold">Plan</th>
                  <th className="pb-2 font-semibold">Joined On</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 font-semibold text-slate-800">Rahul Sharma</td>
                  <td className="py-2.5 text-slate-500">TechNova Pvt Ltd</td>
                  <td className="py-2.5 text-slate-500">Premium</td>
                  <td className="py-2.5 text-slate-400">May 20, 2024</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-50 text-emerald-600 rounded-md font-bold">Active</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 font-semibold text-slate-800">Priya Mehta</td>
                  <td className="py-2.5 text-slate-500">BrightByte Solutions</td>
                  <td className="py-2.5 text-slate-500">Standard</td>
                  <td className="py-2.5 text-slate-400">May 18, 2024</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-50 text-emerald-600 rounded-md font-bold">Active</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 font-semibold text-slate-800">Amit Verma</td>
                  <td className="py-2.5 text-slate-500">Verma Enterprises</td>
                  <td className="py-2.5 text-slate-500">Premium</td>
                  <td className="py-2.5 text-slate-400">May 17, 2024</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-50 text-emerald-600 rounded-md font-bold">Active</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 font-semibold text-slate-800">Sneha Iyer</td>
                  <td className="py-2.5 text-slate-500">CloudScale Tech</td>
                  <td className="py-2.5 text-slate-500">Standard</td>
                  <td className="py-2.5 text-slate-400">May 16, 2024</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-50 text-emerald-600 rounded-md font-bold">Active</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Tickets Overview */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm m-0">Customer Tickets Overview</h3>
            <button className="text-xs text-indigo-600 font-bold hover:underline" onClick={() => setActiveTab('customer-tickets')}>
              View All
            </button>
          </div>
          <div className="flex gap-1.5 justify-between">
            <div className="bg-slate-50 text-center p-2 rounded-xl flex-1">
              <span className="text-[9px] text-slate-400 font-bold block uppercase">Total</span>
              <span className="text-sm font-bold text-slate-800 mt-0.5 block">54</span>
            </div>
            <div className="bg-amber-50/50 text-center p-2 rounded-xl flex-1">
              <span className="text-[9px] text-amber-500 font-bold block uppercase">Open</span>
              <span className="text-sm font-bold text-amber-600 mt-0.5 block">12</span>
            </div>
            <div className="bg-blue-50/50 text-center p-2 rounded-xl flex-1">
              <span className="text-[9px] text-blue-500 font-bold block uppercase">In Progress</span>
              <span className="text-sm font-bold text-blue-600 mt-0.5 block">8</span>
            </div>
            <div className="bg-emerald-50/50 text-center p-2 rounded-xl flex-1">
              <span className="text-[9px] text-emerald-500 font-bold block uppercase">Resolved</span>
              <span className="text-sm font-bold text-emerald-600 mt-0.5 block">34</span>
            </div>
            <div className="bg-rose-50/50 text-center p-2 rounded-xl flex-1">
              <span className="text-[9px] text-rose-500 font-bold block uppercase">Breached</span>
              <span className="text-sm font-bold text-rose-600 mt-0.5 block">2</span>
            </div>
          </div>

          {/* Ticket Donut & Recent Tickets */}
          <div className="flex gap-4 mt-4 items-center">
            {/* Donut Chart */}
            <div className="relative w-20 h-20 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketPriorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={24}
                    outerRadius={36}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {ticketPriorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-extrabold text-slate-800 leading-none">54</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 space-y-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span className="text-slate-600 font-semibold truncate max-w-[120px]">Login issue (#TKT-1256)</span>
                </div>
                <span className="text-[9px] text-rose-500 font-bold bg-rose-50 px-1 py-0.2 rounded">High</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-slate-600 font-semibold truncate max-w-[120px]">Data sync error (#TKT-1255)</span>
                </div>
                <span className="text-[9px] text-amber-500 font-bold bg-amber-50 px-1 py-0.2 rounded">Medium</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-600 font-semibold truncate max-w-[120px]">Feature request (#TKT-1254)</span>
                </div>
                <span className="text-[9px] text-emerald-500 font-bold bg-emerald-50 px-1 py-0.2 rounded">Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Training Module Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module Controls and Gauge */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0">AI Training Module</h3>
              <p className="text-[11px] text-slate-400">Train PRAVESHA AI with your business knowledge base</p>
            </div>
            <button className="text-xs text-indigo-600 font-bold hover:underline" onClick={() => setActiveTab('ai-training')}>
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Quick Actions */}
            <div className="space-y-2.5">
              <button
                className="w-full flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 hover:border-indigo-200 rounded-xl transition-all group"
                onClick={() => setActiveTab('ai-training')}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                    <Upload size={14} />
                  </div>
                  <div className="text-left">
                    <span className="text-[11px] font-bold text-slate-700 block">Upload Documents</span>
                    <span className="text-[9px] text-slate-400 block">Upload PDFs, FAQs, SOPs</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>

              <button
                className="w-full flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 hover:border-indigo-200 rounded-xl transition-all group"
                onClick={() => setActiveTab('ai-training')}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                    <Brain size={14} />
                  </div>
                  <div className="text-left">
                    <span className="text-[11px] font-bold text-slate-700 block">Train AI Model</span>
                    <span className="text-[9px] text-slate-400 block">Analyze and optimize models</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>
            </div>

            {/* Gauge Accuracy */}
            <div className="flex flex-col items-center justify-center relative">
              <div className="w-32 h-20 overflow-hidden relative flex items-end justify-center">
                <svg width="128" height="64" className="overflow-visible">
                  {/* Gauge background path */}
                  <path
                    d="M 10 64 A 54 54 0 0 1 118 64"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  {/* Gauge active value path (72% of semicircle) */}
                  <path
                    d="M 10 64 A 54 54 0 0 1 106 28"
                    fill="none"
                    stroke="url(#gauge-gradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="169.6"
                    strokeDashoffset="47.5"
                  />
                  <defs>
                    <linearGradient id="gauge-gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute bottom-0 flex flex-col items-center">
                  <span className="text-xl font-extrabold text-slate-800 leading-none">72%</span>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase mt-0.5">Model Accuracy</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3.5 border-l border-slate-100 pl-6 md:pl-8">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Documents</span>
                <span className="text-base font-bold text-slate-800">48 Docs</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Questions Trained</span>
                <span className="text-base font-bold text-slate-800">1,248 QAs</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Last Trained On</span>
                <span className="text-xs font-semibold text-indigo-600 block">May 20, 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Training Activity */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm m-0">Recent Training Activity</h3>
            <button className="text-xs text-indigo-600 font-bold hover:underline" onClick={() => setActiveTab('ai-training')}>
              View All
            </button>
          </div>
          <div className="space-y-3.5 flex-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <Upload size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-slate-700 block truncate">Product Catalog.pdf</span>
                <span className="text-[10px] text-slate-400">Uploaded • May 20, 2024</span>
              </div>
              <span className="px-2 py-0.5 text-[9px] bg-emerald-50 text-emerald-600 rounded font-bold">Trained</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <Upload size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-slate-700 block truncate">SOP - Sales Process.pdf</span>
                <span className="text-[10px] text-slate-400">Uploaded • May 19, 2024</span>
              </div>
              <span className="px-2 py-0.5 text-[9px] bg-emerald-50 text-emerald-600 rounded font-bold">Trained</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <Upload size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-slate-700 block truncate">FAQs - Services.pdf</span>
                <span className="text-[10px] text-slate-400">Uploaded • May 18, 2024</span>
              </div>
              <span className="px-2 py-0.5 text-[9px] bg-emerald-50 text-emerald-600 rounded font-bold">Trained</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Activities and Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activities Feed */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="font-bold text-slate-800 text-sm m-0">Recent Activities</h3>
            <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl">
              {['all', 'leads', 'calls', 'whatsapp', 'emails'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveActivityTab(tab)}
                  className={`text-[10.5px] font-bold px-2.5 py-1 rounded-lg transition-all capitalize ${
                    activeActivityTab === tab
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-2.5 border-b border-slate-50 hover:bg-slate-50 rounded-xl transition-colors">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-extrabold flex items-center justify-center text-xs shrink-0">
                MS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-600">
                  New lead registered from <strong className="text-slate-800">Instagram Ad</strong>: <strong className="text-indigo-600">Manish Singh</strong> (Silver Plan Interest)
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="px-1.5 py-0.2 text-[9px] bg-indigo-50 text-indigo-600 rounded font-bold">New Lead</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock size={10} /> 2 mins ago
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 border-b border-slate-50 hover:bg-slate-50 rounded-xl transition-colors">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 font-extrabold flex items-center justify-center text-xs shrink-0">
                RS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-600">
                  WhatsApp automation call completed with <strong className="text-slate-800">Rahul Sharma</strong>. AI flagged intent: <strong className="text-emerald-600">Hot Lead</strong>.
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="px-1.5 py-0.2 text-[9px] bg-emerald-50 text-emerald-600 rounded font-bold">WhatsApp call</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock size={10} /> 1 hour ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quick Mini-metrics */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hot Leads</span>
            <div className="flex items-baseline justify-between mt-3">
              <span className="text-2xl font-bold text-slate-800">24</span>
              <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
                <TrendingUp size={10} /> +26%
              </span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Follow-Ups Due</span>
            <div className="flex items-baseline justify-between mt-3">
              <span className="text-2xl font-bold text-slate-800">8</span>
              <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
                <TrendingUp size={10} /> +14%
              </span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Demos Today</span>
            <div className="flex items-baseline justify-between mt-3">
              <span className="text-2xl font-bold text-slate-800">3</span>
              <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
                <TrendingUp size={10} /> +20%
              </span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasks Pending</span>
            <div className="flex items-baseline justify-between mt-3">
              <span className="text-2xl font-bold text-slate-800">12</span>
              <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
                <TrendingUp size={10} /> +10%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
