import { useState } from 'react';
import {
  Search,
  Filter,
  Columns,
  Calendar,
  Sparkles,
  ChevronDown
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

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: 'Enterprise' | 'Professional' | 'Standard' | 'Basic';
  status: 'Active' | 'At Risk' | 'Inactive';
  healthScore: number;
  ltv: number;
  lastActivity: string;
  ownerName: string;
  ownerAvatar: string;
}

const initialCustomers: CustomerRecord[] = [
  { id: '1', name: 'TechNova Solutions', email: 'contact@technova.com', company: 'TechNova Solutions', plan: 'Enterprise', status: 'Active', healthScore: 92, ltv: 345000, lastActivity: 'May 21, 10:30 AM', ownerName: 'Priya Mehta', ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150' },
  { id: '2', name: 'BrightCo Enterprises', email: 'info@brightco.com', company: 'BrightCo Enterprises', plan: 'Professional', status: 'Active', healthScore: 88, ltv: 280000, lastActivity: 'May 21, 09:15 AM', ownerName: 'Anjali Singh', ownerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150' },
  { id: '3', name: 'Innovax Tech', email: 'hello@innovax.com', company: 'Innovax Tech', plan: 'Enterprise', status: 'Active', healthScore: 85, ltv: 210000, lastActivity: 'May 21, 08:45 AM', ownerName: 'Priya Mehta', ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150' },
  { id: '4', name: 'FutureX Solutions', email: 'sales@futurex.com', company: 'FutureX Solutions', plan: 'Professional', status: 'Active', healthScore: 78, ltv: 195000, lastActivity: 'May 20, 07:30 PM', ownerName: 'Anjali Singh', ownerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150' },
  { id: '5', name: 'DesignHub Studio', email: 'studio@designhub.com', company: 'DesignHub Studio', plan: 'Standard', status: 'Active', healthScore: 72, ltv: 120000, lastActivity: 'May 20, 06:20 PM', ownerName: 'Vikram Patel', ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150' },
  { id: '6', name: 'Alpha Infotech', email: 'contact@alphainfo.com', company: 'Alpha Infotech', plan: 'Basic', status: 'Active', healthScore: 65, ltv: 85000, lastActivity: 'May 20, 05:10 PM', ownerName: 'Rahul Desai', ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150' },
  { id: '7', name: 'GlobalSoft Systems', email: 'hello@globalsoft.com', company: 'GlobalSoft Systems', plan: 'Professional', status: 'At Risk', healthScore: 45, ltv: 60000, lastActivity: 'May 18, 11:20 AM', ownerName: 'Vikram Patel', ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150' },
  { id: '8', name: 'NextGen Labs', email: 'info@nextgenlabs.com', company: 'NextGen Labs', plan: 'Standard', status: 'Inactive', healthScore: 32, ltv: 25000, lastActivity: 'May 10, 09:00 AM', ownerName: 'Anjali Singh', ownerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150' }
];

const plansData = [
  { name: 'Enterprise', value: 500, color: '#4f46e5' },
  { name: 'Professional', value: 375, color: '#06b6d4' },
  { name: 'Standard', value: 250, color: '#10b981' },
  { name: 'Basic', value: 125, color: '#f59e0b' }
];

const customerTrendData = [
  { name: 'May 15', New: 12, Active: 980 },
  { name: 'May 16', New: 18, Active: 990 },
  { name: 'May 17', New: 15, Active: 995 },
  { name: 'May 18', New: 22, Active: 1005 },
  { name: 'May 19', New: 25, Active: 1010 },
  { name: 'May 20', New: 30, Active: 1020 },
  { name: 'May 21', New: 28, Active: 1024 }
];

const sourceData = [
  { name: 'Website', value: 500, color: '#3b82f6' },
  { name: 'Social Media', value: 312, color: '#ec4899' },
  { name: 'Referral', value: 188, color: '#f59e0b' },
  { name: 'Walk-in', value: 125, color: '#10b981' },
  { name: 'Others', value: 125, color: '#64748b' }
];

const healthScoreDistribution = [
  { name: 'Excellent (80-100)', value: 437, color: '#10b981' },
  { name: 'Good (60-79)', value: 500, color: '#3b82f6' },
  { name: 'Average (40-59)', value: 187, color: '#f59e0b' },
  { name: 'Poor (0-39)', value: 126, color: '#ef4444' }
];

export default function Customers() {
  const [customers] = useState<CustomerRecord[]>(initialCustomers);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && c.status === 'Active';
    if (activeTab === 'at-risk') return matchesSearch && c.status === 'At Risk';
    if (activeTab === 'inactive') return matchesSearch && c.status === 'Inactive';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0">
            Customers
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your customers and build lasting relationships.
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
          <div className="relative group">
            <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold transition-all">
              <span>+ Add Customer</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { title: 'Total Customers', val: '1,250', pct: '+18.5%' },
          { title: 'New Customers', val: '128', pct: '+22.6%' },
          { title: 'Active Customers', val: '1,024', pct: '+12.8%' },
          { title: 'Revenue (This Week)', val: '₹28,45,000', pct: '+16.3%' },
          { title: 'Avg. Lifetime Value', val: '₹22,760', pct: '+14.7%' },
          { title: 'Churn Risk Customers', val: '32', pct: '+8.3%', negative: true }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{item.title}</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-sm font-bold text-slate-800">{item.val}</span>
              <span className={`text-[9px] font-bold flex items-center gap-0.5 ${
                item.negative ? 'text-rose-500' : 'text-emerald-600'
              }`}>
                {item.negative ? '▼' : '▲'} {item.pct}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Plan distributions & Trend row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Plan Share Donut */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm m-0">Customers by Plan</h3>
            <p className="text-[11px] text-slate-400">User plans segment splits</p>
          </div>
          <div className="flex gap-4 items-center justify-center my-2">
            <div className="relative w-28 h-28 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={plansData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={44}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {plansData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-extrabold text-slate-800 leading-none">1,250</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
              </div>
            </div>
            <div className="space-y-1 text-[9px] font-medium">
              {plansData.map((entry, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600 truncate max-w-[80px]">{entry.name}</span>
                  <span className="text-slate-400">({Math.round((entry.value / 1250) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Trend Line Chart */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0">Customers Trend</h3>
              <p className="text-[11px] text-slate-400">Active vs new splits</p>
            </div>
            <select className="text-[10px] font-bold text-slate-400 focus:outline-none">
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerTrendData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="New" stroke="#a855f7" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Active" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customers by Source Donut */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm m-0">Customers by Source</h3>
            <p className="text-[11px] text-slate-400">Acquisition channels</p>
          </div>
          <div className="flex gap-4 items-center justify-center my-2">
            <div className="relative w-28 h-28 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={44}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-extrabold text-slate-800 leading-none">1,250</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
              </div>
            </div>
            <div className="space-y-1 text-[9px] font-medium">
              {sourceData.slice(0, 4).map((entry, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600 truncate max-w-[80px]">{entry.name}</span>
                  <span className="text-slate-400">({Math.round((entry.value / 1250) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Customers Leaderboard */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between text-xs">
          <h3 className="font-bold text-slate-800 text-sm mb-3 m-0">Top Customers</h3>
          <div className="space-y-3 flex-1">
            {[
              { name: 'TechNova Solutions', amount: '₹3,45,000' },
              { name: 'BrightCo Enterprises', amount: '₹2,80,000' },
              { name: 'Innovax Tech', amount: '₹2,10,000' },
              { name: 'FutureX Solutions', amount: '₹1,95,000' }
            ].map((cust, i) => (
              <div key={i} className="flex justify-between items-center pb-1.5 border-b border-slate-50 last:border-none">
                <span className="text-slate-600 truncate max-w-[90px] font-medium">{cust.name}</span>
                <span className="font-bold text-slate-800">{cust.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Customers table list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table list */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Customers', count: 1250 },
                { id: 'active', label: 'Active', count: 1024 },
                { id: 'at-risk', label: 'At Risk', count: 32 },
                { id: 'inactive', label: 'Inactive', count: 66 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-[10.5px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label} <span className="opacity-60 text-[9px]">({tab.count})</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/20 placeholder:text-slate-400 w-36 sm:w-44 focus:w-56 transition-all"
                />
              </div>
              <button className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl transition-all">
                <Columns size={14} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-2 font-semibold">Customer</th>
                  <th className="pb-2 font-semibold">Company</th>
                  <th className="pb-2 font-semibold">Plan</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">Health Score</th>
                  <th className="pb-2 font-semibold">Lifetime Value</th>
                  <th className="pb-2 font-semibold">Last Activity</th>
                  <th className="pb-2 font-semibold">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="py-3">
                      <span className="text-slate-800 font-bold block">{c.name}</span>
                      <span className="text-[10px] text-slate-400 block">{c.email}</span>
                    </td>
                    <td className="py-3 text-slate-500 font-medium">{c.company}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                        c.plan === 'Enterprise' ? 'bg-indigo-550/10 text-indigo-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {c.plan}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                        c.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-600'
                          : c.status === 'At Risk'
                          ? 'bg-rose-50 text-rose-500 font-bold'
                          : 'bg-slate-50 text-slate-500'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <span className={`font-bold ${
                          c.healthScore >= 80 ? 'text-emerald-600' : c.healthScore >= 50 ? 'text-amber-500' : 'text-rose-500'
                        }`}>{c.healthScore}</span>
                        <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${
                            c.healthScore >= 80 ? 'bg-emerald-600' : c.healthScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                          }`} style={{ width: `${c.healthScore}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 font-bold text-indigo-650">₹{c.ltv.toLocaleString()}</td>
                    <td className="py-3 text-slate-400">{c.lastActivity}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <img src={c.ownerAvatar} alt={c.ownerName} className="w-5 h-5 rounded-full object-cover" />
                        <span className="text-slate-600">{c.ownerName}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right side health donuts and AI */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Insights */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-sm m-0 flex items-center gap-1.5">
                <Sparkles size={16} className="text-indigo-600" />
                AI Insights
              </h3>
            </div>
            <div className="space-y-3 text-xs">
              {[
                { title: '32 customers are at risk of churn', text: 'Health score below 50' },
                { title: '12 customers are inactive for >30 days', text: 'No recorded interactions' },
                { title: 'Upgrade opportunity in 18 customers', text: 'Approaching plan thresholds' }
              ].map((ins, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                  <span className="font-bold text-slate-700 block leading-tight">{ins.title}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{ins.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Health score distribution */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-slate-800 text-sm mb-4 m-0">Customer Health Score</h3>
            <div className="flex gap-4 items-center justify-center my-2">
              <div className="relative w-28 h-28 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthScoreDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={44}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {healthScoreDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-extrabold text-slate-800 leading-none">75%</span>
                  <span className="text-[7px] text-slate-400 font-bold uppercase mt-0.5">Avg Score</span>
                </div>
              </div>
              <div className="space-y-1.5 text-[9px] font-medium">
                {healthScoreDistribution.map((entry, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                    <span className="text-slate-650 truncate max-w-[80px]">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
