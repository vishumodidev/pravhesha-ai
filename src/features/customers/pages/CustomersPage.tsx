import { useState } from 'react';
import { Search, Filter, Columns, Calendar, Sparkles, ChevronDown } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { useCustomersLegacy } from '../hooks/useCustomersLegacy';

export default function CustomersPage() {
  const {
    customers,
    plansData,
    customerTrendData,
    sourceData,
    healthScoreDistribution,
    metrics,
    isLoading,
  } = useCustomersLegacy();

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

  if (isLoading || !metrics) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-650 rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Loading customers database...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0 text-left">
            Customers
          </h2>
          <p className="text-sm text-slate-500 mt-1 text-left">
            Manage your customers and build lasting relationships.
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
          { title: 'New Customers', val: metrics.active.val, pct: '+22.6%' },
          { title: 'Active Customers', val: '1,024', pct: '+12.8%' },
          { title: 'Revenue (This Week)', val: '₹28,45,000', pct: '+16.3%' },
          { title: 'Avg. Lifetime Value', val: '₹22,760', pct: '+14.7%' },
          { title: 'Churn Risk Customers', val: metrics.inactive.val, pct: '+8.3%', negative: true }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
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
            <h3 className="font-bold text-slate-800 text-sm m-0 text-left">Customers by Plan</h3>
            <p className="text-[11px] text-slate-400 text-left">User plans segment splits</p>
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
                    {plansData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-extrabold text-slate-808 leading-none">1,250</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
              </div>
            </div>
            <div className="space-y-1 text-[9px] font-medium text-left">
              {plansData.map((entry: any, i: number) => (
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
              <h3 className="font-bold text-slate-800 text-sm m-0 text-left">Customers Trend</h3>
              <p className="text-[11px] text-slate-400 text-left">Active vs new splits</p>
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
            <h3 className="font-bold text-slate-800 text-sm m-0 text-left">Customers by Source</h3>
            <p className="text-[11px] text-slate-400 text-left">Acquisition channels</p>
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
                    {sourceData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-extrabold text-slate-808 leading-none">1,250</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
              </div>
            </div>
            <div className="space-y-1 text-[9px] font-medium text-left">
              {sourceData.slice(0, 4).map((entry: any, i: number) => (
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
          <h3 className="font-bold text-slate-800 text-sm mb-3 m-0 text-left">Top Customers</h3>
          <div className="space-y-3 flex-1 text-left">
            {[
              { name: 'TechNova Solutions', amount: '₹3,45,000' },
              { name: 'BrightCo Enterprises', amount: '₹2,80,000' },
              { name: 'Innovax Tech', amount: '₹2,10,000' },
              { name: 'FutureX Solutions', amount: '₹1,95,000' }
            ].map((cust, i) => (
              <div key={i} className="flex justify-between items-center pb-1.5 border-b border-slate-50 last:border-none">
                <span className="text-slate-600 truncate max-w-[90px] font-medium">{cust.name}</span>
                <span className="font-bold text-slate-808">{cust.amount}</span>
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
                { id: 'all', label: 'All Customers', count: customers.length },
                { id: 'active', label: 'Active', count: customers.filter(c => c.status === 'Active').length },
                { id: 'at-risk', label: 'At Risk', count: customers.filter(c => c.status === 'At Risk').length },
                { id: 'inactive', label: 'Inactive', count: customers.filter(c => c.status === 'Inactive').length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-[10.5px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-indigo-650 shadow-sm'
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
              <button className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 rounded-xl transition-all">
                <Columns size={14} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-2 font-semibold text-left">Customer</th>
                  <th className="pb-2 font-semibold text-left">Company</th>
                  <th className="pb-2 font-semibold text-left">Plan</th>
                  <th className="pb-2 font-semibold text-left">Status</th>
                  <th className="pb-2 font-semibold text-left">Health Score</th>
                  <th className="pb-2 font-semibold text-left">Lifetime Value</th>
                  <th className="pb-2 font-semibold text-left">Last Activity</th>
                  <th className="pb-2 font-semibold text-left">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="py-3 text-left">
                      <span className="text-slate-800 font-bold block">{c.name}</span>
                      <span className="text-[10px] text-slate-404 block">{c.email}</span>
                    </td>
                    <td className="py-3 text-slate-500 font-medium text-left">{c.company}</td>
                    <td className="py-3 text-left">
                      <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                        c.plan === 'Enterprise' ? 'bg-indigo-500/10 text-indigo-700' : 'bg-slate-100 text-slate-606'
                      }`}>
                        {c.plan}
                      </span>
                    </td>
                    <td className="py-3 text-left">
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
                    <td className="py-3 text-left">
                      <div className="flex items-center gap-1">
                        <span className={`font-bold ${
                          c.healthScore >= 80 ? 'text-emerald-600' : c.healthScore >= 50 ? 'text-amber-505' : 'text-rose-505'
                        }`}>{c.healthScore}</span>
                        <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${
                            c.healthScore >= 80 ? 'bg-emerald-600' : c.healthScore >= 50 ? 'bg-amber-505' : 'bg-rose-505'
                          }`} style={{ width: `${c.healthScore}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 font-bold text-indigo-606 text-left">₹{c.ltv.toLocaleString()}</td>
                    <td className="py-3 text-slate-400 text-left">{c.lastActivity}</td>
                    <td className="py-3 text-left">
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
            <div className="space-y-3 text-xs text-left">
              {[
                { title: '32 customers are at risk of churn', text: 'Health score below 50' },
                { title: '12 customers are inactive for >30 days', text: 'No recorded interactions' },
                { title: 'Upgrade opportunity in 18 customers', text: 'Approaching plan thresholds' }
              ].map((ins, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                  <span className="font-bold text-slate-707 block leading-tight">{ins.title}</span>
                  <span className="text-[10px] text-slate-404 block mt-0.5">{ins.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Health score distribution */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-slate-800 text-sm mb-4 m-0 text-left">Customer Health Score</h3>
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
                      {healthScoreDistribution.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-extrabold text-slate-808 leading-none">75%</span>
                  <span className="text-[7px] text-slate-400 font-bold uppercase mt-0.5">Avg Score</span>
                </div>
              </div>
              <div className="space-y-1.5 text-[9px] font-medium text-left">
                {healthScoreDistribution.map((entry: any, i: number) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                    <span className="text-slate-655 truncate max-w-[80px]">{entry.name}</span>
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
