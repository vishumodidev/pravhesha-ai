import { useState } from 'react';
import {
  Search,
  Filter,
  Columns,
  MessageSquare,
  Calendar,
  Sparkles,
  TrendingUp,
  Monitor,
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

interface VisitorLead {
  id: string;
  name: string;
  email: string;
  source: string;
  landingPage: string;
  firstSeen: string;
  lastSeen: string;
  aiScore: number;
  intent: 'High' | 'Medium' | 'Low';
  status: 'New Lead' | 'Engaged' | 'Converted';
  device: string;
  location: string;
  pagesVisited: number;
  timeOnSite: string;
  returningVisits: number;
  aiInsights: string[];
}

const initialVisitorLeads: VisitorLead[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@gmail.com',
    source: 'Google',
    landingPage: '/pricing',
    firstSeen: 'May 21, 09:24 AM',
    lastSeen: 'Just now',
    aiScore: 95,
    intent: 'High',
    status: 'New Lead',
    device: 'Mac OS, Chrome',
    location: 'Bengaluru, India',
    pagesVisited: 5,
    timeOnSite: '07:24',
    returningVisits: 3,
    aiInsights: ['High intent visitor', 'Visited pricing page 2 times', 'Spent 7m 24s on website', "Clicked on 'Book a Demo'", 'Most likely to convert']
  },
  {
    id: '2',
    name: 'Priya Mehta',
    email: 'priya@outlook.com',
    source: 'Facebook',
    landingPage: '/demo',
    firstSeen: 'May 21, 08:52 AM',
    lastSeen: '2 min ago',
    aiScore: 78,
    intent: 'High',
    status: 'Engaged',
    device: 'iOS, Safari',
    location: 'Mumbai, India',
    pagesVisited: 4,
    timeOnSite: '04:15',
    returningVisits: 2,
    aiInsights: ['High intent visitor', 'Clicked Demo form link', 'Visited from social campaign']
  },
  {
    id: '3',
    name: 'Amit Verma',
    email: 'amit@gmail.com',
    source: 'Direct',
    landingPage: '/features',
    firstSeen: 'May 21, 08:35 AM',
    lastSeen: '5 min ago',
    aiScore: 65,
    intent: 'Medium',
    status: 'New Lead',
    device: 'Windows, Firefox',
    location: 'Delhi, India',
    pagesVisited: 3,
    timeOnSite: '02:48',
    returningVisits: 1,
    aiInsights: ['Interested in key features list', 'First-time visitor']
  },
  {
    id: '4',
    name: 'Sneha Iyer',
    email: 'sneha@gmail.com',
    source: 'Instagram',
    landingPage: '/pricing',
    firstSeen: 'May 21, 07:44 AM',
    lastSeen: '15 min ago',
    aiScore: 88,
    intent: 'High',
    status: 'Engaged',
    device: 'Android, Chrome',
    location: 'Pune, India',
    pagesVisited: 6,
    timeOnSite: '05:30',
    returningVisits: 4,
    aiInsights: ['Multiple visits to pricing', 'High engagement on mobile app features page']
  },
  {
    id: '5',
    name: 'Dinesh Kumar',
    email: 'dkumar@gmail.com',
    source: 'LinkedIn',
    landingPage: '/demo',
    firstSeen: 'May 21, 07:12 AM',
    lastSeen: '23 min ago',
    aiScore: 52,
    intent: 'Medium',
    status: 'New Lead',
    device: 'Mac OS, Safari',
    location: 'Chennai, India',
    pagesVisited: 2,
    timeOnSite: '01:50',
    returningVisits: 1,
    aiInsights: ['Referred from professional networks', 'Visited landing demo page']
  },
  {
    id: '6',
    name: 'Neha Patel',
    email: 'neha123@gmail.com',
    source: 'Google',
    landingPage: '/blog',
    firstSeen: 'May 21, 06:45 AM',
    lastSeen: '1 hr ago',
    aiScore: 30,
    intent: 'Low',
    status: 'New Lead',
    device: 'Windows, Chrome',
    location: 'Ahmedabad, India',
    pagesVisited: 1,
    timeOnSite: '00:45',
    returningVisits: 1,
    aiInsights: ['Low dwell time', 'Bounced from blog post']
  }
];

const visitorTrendData = [
  { name: 'May 15', New: 40, Converted: 18 },
  { name: 'May 16', New: 55, Converted: 28 },
  { name: 'May 17', New: 45, Converted: 22 },
  { name: 'May 18', New: 60, Converted: 30 },
  { name: 'May 19', New: 72, Converted: 35 },
  { name: 'May 20', New: 85, Converted: 42 },
  { name: 'May 21', New: 78, Converted: 39 }
];

const sourceDistribution = [
  { name: 'Direct', value: 125, color: '#4f46e5' },
  { name: 'Google', value: 87, color: '#10b981' },
  { name: 'Facebook', value: 44, color: '#3b82f6' },
  { name: 'Instagram', value: 31, color: '#ec4899' },
  { name: 'LinkedIn', value: 16, color: '#06b6d4' },
  { name: 'Others', value: 9, color: '#64748b' }
];

export default function VisitorIntelligence() {
  const [visitorLeads] = useState<VisitorLead[]>(initialVisitorLeads);
  const [selectedLead, setSelectedLead] = useState<VisitorLead>(initialVisitorLeads[0]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarTab, setSidebarTab] = useState<'overview' | 'journey'>('overview');

  const filteredVisitorLeads = visitorLeads.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.landingPage.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'new') return matchesSearch && v.status === 'New Lead';
    if (activeTab === 'engaged') return matchesSearch && v.status === 'Engaged';
    if (activeTab === 'converted') return matchesSearch && v.status === 'Converted';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0">
            Visitor Intelligence
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Track, analyze and convert website visitors into leads and customers.
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
          <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold transition-all">
            <Monitor size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Visitors</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">12,845</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +24.6%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Unique Visitors</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">8,932</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +21.3%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Visitor Leads</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">312</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +32.7%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Hot Visitors</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">84</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +18.2%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Returning Visitors</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">2,156</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +26.8%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Visitor Lead Conv.</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">3.49%</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +1.24%
            </span>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visitors Lead Summary */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-4 m-0">Visitor Leads Summary</h3>
            <div className="space-y-3.5">
              {[
                { label: 'New Leads (Today)', val: '42' },
                { label: 'Leads (This Week)', val: '312' },
                { label: 'Engaged Leads', val: '128' },
                { label: 'Converted Leads', val: '89' }
              ].map((row, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs pb-2.5 border-b border-slate-50 last:border-none">
                  <span className="text-slate-500 font-medium">{row.label}</span>
                  <span className="font-bold text-slate-800">{row.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2 flex justify-between items-center text-xs border-t border-slate-100 mt-2">
            <span className="text-slate-400">Conversion Rate</span>
            <span className="font-extrabold text-emerald-600">3.49%</span>
          </div>
        </div>

        {/* Visitor Leads Trend Line Chart */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0">Visitor Leads Trend</h3>
              <p className="text-[11px] text-slate-400">Daily conversion rates</p>
            </div>
            <select className="text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none">
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-[170px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorTrendData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="New" stroke="#4f46e5" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Converted" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span className="text-slate-500 font-medium">New Leads</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-500 font-medium">Converted Leads</span>
            </div>
          </div>
        </div>

        {/* Leads by Source Donut */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm m-0">Leads by Source</h3>
            <p className="text-[11px] text-slate-400">Leads acquisition distribution</p>
          </div>
          <div className="flex gap-4 items-center justify-center my-1">
            <div className="relative w-24 h-24 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={26}
                    outerRadius={38}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sourceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-extrabold text-slate-800 leading-none">312</span>
                <span className="text-[7px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
              </div>
            </div>
            <div className="space-y-1 text-[9px]">
              {sourceDistribution.slice(0, 4).map((entry, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600 truncate max-w-[70px] font-semibold">{entry.name}</span>
                  <span className="text-slate-400">({Math.round((entry.value / 312) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full text-center text-xs text-indigo-600 font-bold hover:underline">
            View Source Report
          </button>
        </div>

        {/* Top Landing Pages Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-slate-800 text-sm mb-3 m-0">Top Pages</h3>
          <div className="space-y-2.5 flex-1 text-[11px]">
            {[
              { page: '/pricing', count: 86 },
              { page: '/demo', count: 62 },
              { page: '/features', count: 48 },
              { page: '/blog', count: 32 },
              { page: '/contact', count: 28 }
            ].map((p, i) => (
              <div key={i} className="flex justify-between items-center pb-1.5 border-b border-slate-50 last:border-none">
                <span className="text-slate-500 font-medium truncate max-w-[100px]">{p.page}</span>
                <span className="font-bold text-slate-700">{p.count}</span>
              </div>
            ))}
          </div>
          <button className="w-full text-center text-xs text-indigo-600 font-bold hover:underline mt-2">
            View All Pages
          </button>
        </div>
      </div>

      {/* Main Double Panel */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Visitor Leads table list */}
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Leads', count: 312 },
                { id: 'new', label: 'New', count: 42 },
                { id: 'engaged', label: 'Engaged', count: 128 },
                { id: 'converted', label: 'Converted', count: 89 }
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
                  placeholder="Search visitors..."
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
                  <th className="pb-2 font-semibold">Lead</th>
                  <th className="pb-2 font-semibold">Source</th>
                  <th className="pb-2 font-semibold">Landing Page</th>
                  <th className="pb-2 font-semibold">First Seen</th>
                  <th className="pb-2 font-semibold">Last Seen</th>
                  <th className="pb-2 font-semibold">AI Score</th>
                  <th className="pb-2 font-semibold">Intent</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredVisitorLeads.map((v) => {
                  const isSelected = selectedLead?.id === v.id;
                  return (
                    <tr
                      key={v.id}
                      onClick={() => setSelectedLead(v)}
                      className={`hover:bg-indigo-50/20 cursor-pointer transition-colors ${
                        isSelected ? 'bg-indigo-50/40 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3">
                        <span className="text-slate-800 font-bold block">{v.name}</span>
                        <span className="text-[10px] text-slate-400 block">{v.email}</span>
                      </td>
                      <td className="py-3 text-slate-600">{v.source}</td>
                      <td className="py-3 text-slate-600 font-mono text-[10.5px]">{v.landingPage}</td>
                      <td className="py-3 text-slate-400">{v.firstSeen}</td>
                      <td className="py-3 text-slate-500 font-medium">{v.lastSeen}</td>
                      <td className="py-3">
                        <span className="font-bold text-slate-800">{v.aiScore}</span>
                      </td>
                      <td className="py-3">
                        <span className={`px-1.5 py-0.5 text-[9px] rounded font-bold ${
                          v.intent === 'High'
                            ? 'bg-rose-50 text-rose-600'
                            : v.intent === 'Medium'
                            ? 'bg-amber-50 text-amber-500'
                            : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          🔥 {v.intent}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                          v.status === 'New Lead' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right side drawer details */}
        {selectedLead && (
          <div className="w-full lg:w-80 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col shrink-0 overflow-hidden">
            {/* Header info */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visitor Profile</span>
              <span className="px-2 py-0.5 text-[9px] bg-red-50 text-rose-600 rounded font-bold">Hot Lead</span>
            </div>

            {/* Profile Avatar Card */}
            <div className="p-4 border-b border-slate-50 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-extrabold text-base mb-2">
                {selectedLead.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <h3 className="font-bold text-slate-800 text-sm m-0">{selectedLead.name}</h3>
              <span className="text-[10px] text-slate-400 mt-1 block">{selectedLead.email} • {selectedLead.location}</span>
              <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400">
                <Clock size={12} />
                <span>First Seen: {selectedLead.firstSeen}</span>
              </div>
            </div>

            {/* Sidebar Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setSidebarTab('overview')}
                className={`flex-1 py-1.5 text-center text-xs font-bold border-b-2 ${
                  sidebarTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSidebarTab('journey')}
                className={`flex-1 py-1.5 text-center text-xs font-bold border-b-2 ${
                  sidebarTab === 'journey' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'
                }`}
              >
                Journey
              </button>
            </div>

            {/* Content list */}
            <div className="p-4 flex-1 space-y-4 max-h-[300px] overflow-y-auto">
              {sidebarTab === 'overview' && (
                <div className="space-y-4 text-xs">
                  {/* Lead Information */}
                  <div className="space-y-2">
                    <span className="font-bold text-slate-800 block">Lead Information</span>
                    <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                      <span className="text-slate-400">Source:</span>
                      <span className="font-semibold text-slate-700 text-right">{selectedLead.source}</span>
                      <span className="text-slate-400">Landing Page:</span>
                      <span className="font-semibold text-slate-700 text-right font-mono text-[9px] truncate">{selectedLead.landingPage}</span>
                      <span className="text-slate-400">Device:</span>
                      <span className="font-semibold text-slate-700 text-right truncate">{selectedLead.device}</span>
                      <span className="text-slate-400">Pages Visited:</span>
                      <span className="font-semibold text-slate-700 text-right">{selectedLead.pagesVisited}</span>
                      <span className="text-slate-400">Time on Site:</span>
                      <span className="font-semibold text-slate-700 text-right">{selectedLead.timeOnSite}</span>
                      <span className="text-slate-400">Returning Visitor:</span>
                      <span className="font-semibold text-slate-700 text-right">{selectedLead.returningVisits > 1 ? `Yes (${selectedLead.returningVisits} visits)` : 'No'}</span>
                    </div>
                  </div>

                  {/* AI Insights list */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-xl border border-indigo-100">
                    <span className="font-bold text-indigo-800 flex items-center gap-1 mb-1.5">
                      <Sparkles size={12} className="text-indigo-600" />
                      AI Insights
                    </span>
                    <ul className="space-y-1">
                      {selectedLead.aiInsights.map((insight, idx) => (
                        <li key={idx} className="flex gap-1.5 items-start text-slate-600 text-[10.5px] leading-relaxed">
                          <span className="text-indigo-500 font-extrabold">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Action */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="font-bold text-slate-800 block">Recommended Action</span>
                    <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-emerald-50">
                      <MessageSquare size={13} />
                      <span>Send WhatsApp Message</span>
                    </button>
                  </div>
                </div>
              )}

              {sidebarTab === 'journey' && (
                <div className="space-y-3 text-xs pl-2">
                  <span className="font-bold text-slate-800 block -ml-2 mb-2">Visitor Journey</span>
                  {[
                    { title: 'Landing on pricing page', page: '/pricing', time: '09:24 AM' },
                    { title: 'Viewed Features list', page: '/features', time: '09:25 AM' },
                    { title: 'Clicked book demo button', page: '/pricing#cta', time: '09:28 AM' },
                    { title: 'Abandoned signup screen', page: '/signup', time: '09:31 AM' }
                  ].map((j, i) => (
                    <div key={i} className="relative pl-5 border-l border-indigo-100 pb-3 last:pb-0">
                      <div className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-indigo-50 border border-indigo-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      </div>
                      <div className="flex justify-between leading-tight">
                        <span className="font-bold text-slate-700 block text-[11px]">{j.title}</span>
                        <span className="text-[9px] text-slate-400 shrink-0">{j.time}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{j.page}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
