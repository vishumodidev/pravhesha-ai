import { useState } from 'react';
import {
  Search,
  Filter,
  Columns,
  MessageSquare,
  Phone,
  Mail,
  Plus,
  Calendar,
  Sparkles,
  MoreHorizontal
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface LeadRecord {
  id: string;
  name: string;
  email: string;
  source: string;
  company: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Converted' | 'Unqualified';
  aiScore: number;
  value: number;
  ownerName: string;
  ownerAvatar: string;
  addedOn: string;
  phone: string;
  aiInsights: string[];
}

const initialLeads: LeadRecord[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@technova.com',
    source: 'Website - Pricing Page',
    company: 'TechNova Solutions',
    status: 'Qualified',
    aiScore: 95,
    value: 280000,
    ownerName: 'Priya Mehta',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
    addedOn: 'May 20, 10:30 AM',
    phone: '+91 98765 43210',
    aiInsights: ['High intent lead', 'Visited pricing page 3 times', 'Downloaded product brochure', 'Interested in Enterprise Plan']
  },
  {
    id: '2',
    name: 'Priya Mehta',
    email: 'priya.mehta@acme.com',
    source: 'Facebook - Ad Campaign',
    company: 'Acme Pvt Ltd',
    status: 'Contacted',
    aiScore: 78,
    value: 160000,
    ownerName: 'Vikram Patel',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    addedOn: 'May 20, 09:15 AM',
    phone: '+91 91234 56789',
    aiInsights: ['Positive response on call', 'Interested in CRM modules', 'Requests WhatsApp pricing']
  },
  {
    id: '3',
    name: 'Amit Verma',
    email: 'amit.verma@innovix.com',
    source: 'LinkedIn - Lead Gen Form',
    company: 'Innovix Tech',
    status: 'New',
    aiScore: 65,
    value: 120000,
    ownerName: 'Priya Mehta',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
    addedOn: 'May 20, 08:45 AM',
    phone: '+91 99876 54321',
    aiInsights: ['Downloaded whitepaper', 'Role: Product Manager']
  },
  {
    id: '4',
    name: 'Sneha Iyer',
    email: 'sneha.iyer@brightco.com',
    source: 'Instagram - Lead Form',
    company: 'BrightCo',
    status: 'Qualified',
    aiScore: 88,
    value: 220000,
    ownerName: 'Anjali Singh',
    ownerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150',
    addedOn: 'May 19, 07:50 PM',
    phone: '+91 90012 34567',
    aiInsights: ['Clicked calendar link', 'Interests: Scheduling Automation']
  },
  {
    id: '5',
    name: 'Dinesh Kumar',
    email: 'dinesh.kumar@globex.com',
    source: 'Referral - Partner',
    company: 'Globex Corporation',
    status: 'Proposal',
    aiScore: 70,
    value: 340000,
    ownerName: 'Rahul Desai',
    ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150',
    addedOn: 'May 19, 06:20 PM',
    phone: '+91 87654 32109',
    aiInsights: ['Under legal contract review', 'Requested custom SLA terms']
  },
  {
    id: '6',
    name: 'Neha Patel',
    email: 'neha.patel@futurex.com',
    source: 'Website - Contact Us',
    company: 'FutureX Solutions',
    status: 'New',
    aiScore: 52,
    value: 90000,
    ownerName: 'Priya Mehta',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
    addedOn: 'May 19, 05:10 PM',
    phone: '+91 78901 23456',
    aiInsights: ['Inquired about pricing tiers', 'Startup profile']
  },
  {
    id: '7',
    name: 'Vikram Singh',
    email: 'vikram.singh@infini.com',
    source: 'YouTube - Ad Campaign',
    company: 'Infini Systems',
    status: 'Unqualified',
    aiScore: 30,
    value: 0,
    ownerName: 'Vikram Patel',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    addedOn: 'May 19, 04:30 PM',
    phone: '+91 96432 10987',
    aiInsights: ['Wrong contact number', 'Competitor research pattern']
  }
];

const leadsSourceData = [
  { name: 'Website', value: 987, color: '#4f46e5' },
  { name: 'Facebook', value: 517, color: '#3b82f6' },
  { name: 'Instagram', value: 353, color: '#ec4899' },
  { name: 'LinkedIn', value: 235, color: '#06b6d4' },
  { name: 'Referral', value: 141, color: '#f59e0b' },
  { name: 'Others', value: 117, color: '#64748b' }
];

export default function Leads() {
  const [leads] = useState<LeadRecord[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<LeadRecord>(initialLeads[0]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarTab, setSidebarTab] = useState<'overview' | 'activity'>('overview');

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'new') return matchesSearch && l.status === 'New';
    if (activeTab === 'contacted') return matchesSearch && l.status === 'Contacted';
    if (activeTab === 'qualified') return matchesSearch && l.status === 'Qualified';
    if (activeTab === 'proposal') return matchesSearch && l.status === 'Proposal';
    if (activeTab === 'converted') return matchesSearch && l.status === 'Converted';
    if (activeTab === 'unqualified') return matchesSearch && l.status === 'Unqualified';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0">
            Leads
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage, track, and convert your leads into customers.
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
            <Plus size={14} />
            <span>+ Add Lead</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {['Total Leads', 'New Leads', 'Qualified Leads', 'Unqualified Leads', 'Converted Leads', 'Conversion Rate'].map((title, i) => {
          const values = ['2,350', '642', '812', '286', '126', '5.36%'];
          const percentages = ['+18.6%', '+22.4%', '+15.3%', '-8.5%', '+12.7%', '+1.2%'];
          const isPositive = [true, true, true, false, true, true];
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{title}</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-lg font-bold text-slate-800">{values[i]}</span>
                <span className={`text-[9px] font-bold flex items-center gap-0.5 ${
                  isPositive[i] ? 'text-emerald-600' : 'text-rose-500'
                }`}>
                  {isPositive[i] ? '▲' : '▼'} {percentages[i]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline & Source Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pipeline chart */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-4 m-0">Lead Pipeline</h3>
            <div className="grid grid-cols-5 gap-3 text-center">
              {[
                { stage: 'New', count: 642, pct: '27.3%', val: '₹12,84,000', color: 'bg-indigo-600' },
                { stage: 'Contacted', count: 512, pct: '21.8%', val: '₹18,65,000', color: 'bg-blue-600' },
                { stage: 'Qualified', count: 812, pct: '34.6%', val: '₹28,40,000', color: 'bg-emerald-600' },
                { stage: 'Proposal', count: 256, pct: '10.9%', val: '₹14,20,000', color: 'bg-amber-600' },
                { stage: 'Converted', count: 126, pct: '5.4%', val: '₹9,60,000', color: 'bg-indigo-700' }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between relative">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{item.stage}</span>
                  <div className="my-2">
                    <span className="text-sm font-bold text-slate-800 block">{item.count}</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">{item.pct}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                    <div className={`h-full ${item.color}`} style={{ width: item.pct }} />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lead Source distribution */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm m-0">Leads by Source</h3>
            <p className="text-[11px] text-slate-400">Visitor acquisition distribution</p>
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
                    outerRadius={44}
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
                <span className="text-sm font-extrabold text-slate-800 leading-none">2,350</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
              </div>
            </div>
            <div className="space-y-1 text-[9px] font-medium">
              {leadsSourceData.slice(0, 4).map((entry, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600 truncate max-w-[80px]">{entry.name}</span>
                  <span className="text-slate-400">({Math.round((entry.value / 2350) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table & detail sidebar Workspace */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Leads Table */}
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Leads', count: 2350 },
                { id: 'new', label: 'New', count: 642 },
                { id: 'qualified', label: 'Qualified', count: 812 },
                { id: 'converted', label: 'Converted', count: 126 }
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
                  placeholder="Search leads..."
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
                  <th className="pb-2 font-semibold">Company</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">AI Score</th>
                  <th className="pb-2 font-semibold">Lead Value</th>
                  <th className="pb-2 font-semibold">Owner</th>
                  <th className="pb-2 font-semibold">Added On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredLeads.map((l) => {
                  const isSelected = selectedLead?.id === l.id;
                  return (
                    <tr
                      key={l.id}
                      onClick={() => setSelectedLead(l)}
                      className={`hover:bg-indigo-50/20 cursor-pointer transition-colors ${
                        isSelected ? 'bg-indigo-50/40 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3">
                        <span className="text-slate-800 font-bold block">{l.name}</span>
                        <span className="text-[10px] text-slate-400 block">{l.email}</span>
                      </td>
                      <td className="py-3 text-slate-500 text-[10.5px]">{l.source}</td>
                      <td className="py-3 text-slate-600 font-bold">{l.company}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                          l.status === 'Qualified'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : l.status === 'Contacted'
                            ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                            : l.status === 'New'
                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                            : 'bg-slate-50 text-slate-500'
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="py-3 font-extrabold text-slate-800">{l.aiScore}</td>
                      <td className="py-3 font-bold text-indigo-600">₹{l.value.toLocaleString()}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-1.5">
                          <img src={l.ownerAvatar} alt={l.ownerName} className="w-5 h-5 rounded-full object-cover" />
                          <span>{l.ownerName}</span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-400">{l.addedOn}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Details Sidebar */}
        {selectedLead && (
          <div className="w-full lg:w-80 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col shrink-0 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lead Profile</span>
              <span className="px-2 py-0.5 text-[9px] bg-red-50 text-rose-600 rounded font-bold">Hot Lead</span>
            </div>

            {/* Profile Info */}
            <div className="p-4 border-b border-slate-50 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-extrabold text-base mb-2">
                {selectedLead.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <h3 className="font-bold text-slate-800 text-sm m-0">{selectedLead.name}</h3>
              <span className="text-[10px] text-slate-400 mt-1 block">{selectedLead.company} • {selectedLead.phone}</span>

              {/* Action buttons */}
              <div className="grid grid-cols-4 gap-1.5 w-full mt-4">
                <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-850 hover:bg-slate-100">
                  <Phone size={13} />
                </button>
                <button className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100">
                  <MessageSquare size={13} />
                </button>
                <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-850 hover:bg-slate-100">
                  <Mail size={13} />
                </button>
                <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-850 hover:bg-slate-100">
                  <MoreHorizontal size={13} />
                </button>
              </div>
            </div>

            {/* Tabs */}
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
                onClick={() => setSidebarTab('activity')}
                className={`flex-1 py-1.5 text-center text-xs font-bold border-b-2 ${
                  sidebarTab === 'activity' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'
                }`}
              >
                Activity
              </button>
            </div>

            {/* Sidebar content */}
            <div className="p-4 flex-1 space-y-4 max-h-[300px] overflow-y-auto">
              {sidebarTab === 'overview' && (
                <div className="space-y-4 text-xs">
                  {/* Lead Information details */}
                  <div className="space-y-2 text-[10.5px]">
                    <span className="font-bold text-slate-800 block text-xs">Lead Information</span>
                    <div className="grid grid-cols-2 gap-1.5 text-slate-500">
                      <span>Email:</span>
                      <span className="font-semibold text-slate-700 text-right truncate">{selectedLead.email}</span>
                      <span>Phone:</span>
                      <span className="font-semibold text-slate-700 text-right">{selectedLead.phone}</span>
                      <span>Company:</span>
                      <span className="font-semibold text-slate-700 text-right truncate">{selectedLead.company}</span>
                      <span>Source:</span>
                      <span className="font-semibold text-slate-700 text-right truncate">{selectedLead.source}</span>
                      <span>Lead Value:</span>
                      <span className="font-bold text-indigo-600 text-right">₹{selectedLead.value.toLocaleString()}</span>
                      <span>Created On:</span>
                      <span className="font-semibold text-slate-700 text-right truncate">{selectedLead.addedOn}</span>
                    </div>
                  </div>

                  {/* AI Insights block */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-xl border border-indigo-100">
                    <span className="font-bold text-indigo-800 flex items-center gap-1.5 mb-1.5">
                      <Sparkles size={12} className="text-indigo-600 animate-float" />
                      AI Insights
                    </span>
                    <ul className="space-y-1 pl-0">
                      {selectedLead.aiInsights.map((insight, idx) => (
                        <li key={idx} className="flex gap-1.5 items-start text-slate-650 text-[10.5px] leading-relaxed">
                          <span className="text-indigo-500 font-extrabold">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Next Best Action */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="font-bold text-slate-800 block">Next Best Action</span>
                    <p className="text-[10px] text-slate-400">Schedule a demo call within 24 hours (High chance of conversion - 82%)</p>
                    <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-emerald-50">
                      <Calendar size={13} />
                      <span>Schedule Call</span>
                    </button>
                  </div>
                </div>
              )}

              {sidebarTab === 'activity' && (
                <div className="space-y-3 pl-2">
                  <span className="font-bold text-slate-800 block -ml-2 mb-2 text-xs">Recent Activities</span>
                  {[
                    { title: 'Downloaded product brochure', time: 'May 20, 10:30 AM' },
                    { title: 'Visited Pricing Page', time: 'May 20, 10:28 AM' },
                    { title: 'Registered as new lead', time: 'May 20, 10:20 AM' }
                  ].map((act, i) => (
                    <div key={i} className="relative pl-5 border-l border-indigo-100 pb-3 last:pb-0 text-xs">
                      <div className="absolute -left-1 top-0.5 w-2 h-2 rounded-full bg-indigo-500" />
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 leading-tight text-[11px]">{act.title}</span>
                        <span className="text-[9.5px] text-slate-400 mt-1">{act.time}</span>
                      </div>
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
