import { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Columns,
  MessageSquare,
  Phone,
  Calendar,
  Sparkles,
  CheckSquare
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

const Facebook = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Linkedin = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Youtube = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Twitter = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

interface SocialLeadRecord {
  id: string;
  name: string;
  email: string;
  source: 'Facebook' | 'Instagram' | 'LinkedIn' | 'YouTube' | 'X';
  campaign: string;
  phone: string;
  location: string;
  aiScore: number;
  status: 'New' | 'Engaged' | 'Qualified' | 'Converted';
  addedOn: string;
}

const initialSocialLeads: SocialLeadRecord[] = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@gmail.com', source: 'Facebook', campaign: 'FB - Summer Offer Campaign', phone: '+91 98765 43210', location: 'Bengaluru, India', aiScore: 95, status: 'New', addedOn: 'May 21, 10:24 AM' },
  { id: '2', name: 'Priya Mehta', email: 'priya@outlook.com', source: 'Instagram', campaign: 'Insta - Demo Promotion', phone: '+91 91234 56789', location: 'Mumbai, India', aiScore: 78, status: 'Engaged', addedOn: 'May 21, 09:45 AM' },
  { id: '3', name: 'Amit Verma', email: 'amit@verma.com', source: 'LinkedIn', campaign: 'LinkedIn - Webinar Campaign', phone: '+91 99876 54321', location: 'Mumbai, India', aiScore: 65, status: 'Engaged', addedOn: 'May 21, 08:35 AM' },
  { id: '4', name: 'Sneha Iyer', email: 'sneha@gmail.com', source: 'Instagram', campaign: 'Insta Post - New Feature', phone: '+91 90012 34567', location: 'Pune, India', aiScore: 88, status: 'Qualified', addedOn: 'May 21, 07:44 AM' },
  { id: '5', name: 'Dinesh Kumar', email: 'dinesh@gmail.com', source: 'YouTube', campaign: 'YouTube - Product Demo', phone: '+91 87654 32109', location: 'Chennai, India', aiScore: 60, status: 'New', addedOn: 'May 21, 06:55 AM' },
  { id: '6', name: 'Neha Patel', email: 'neha@gmail.com', source: 'X', campaign: 'X Ad - Special Discount', phone: '+91 78901 23456', location: 'Ahmedabad, India', aiScore: 40, status: 'New', addedOn: 'May 20, 11:10 PM' },
  { id: '7', name: 'Manish Jain', email: 'manish@jain.com', source: 'Facebook', campaign: 'FB Post - Case Study', phone: '+91 96432 10987', location: 'Hyderabad, India', aiScore: 72, status: 'Engaged', addedOn: 'May 20, 09:15 PM' }
];

const leadsByPlatformData = [
  { name: 'Facebook', value: 324, color: '#1877f2' },
  { name: 'Instagram', value: 186, color: '#e1306c' },
  { name: 'LinkedIn', value: 92, color: '#0077b5' },
  { name: 'YouTube', value: 41, color: '#ff0000' },
  { name: 'X', value: 37, color: '#1da1f2' },
  { name: 'Others', value: 7, color: '#64748b' }
];

const leadsTrendData = [
  { name: 'May 15', Leads: 60, Converted: 20 },
  { name: 'May 16', Leads: 80, Converted: 35 },
  { name: 'May 17', Leads: 70, Converted: 30 },
  { name: 'May 18', Leads: 90, Converted: 45 },
  { name: 'May 19', Leads: 95, Converted: 50 },
  { name: 'May 20', Leads: 110, Converted: 60 },
  { name: 'May 21', Leads: 98, Converted: 54 }
];

const sourceAttributionData = [
  { name: 'Paid Ads', value: 286 },
  { name: 'Organic Posts', value: 163 },
  { name: 'Lead Forms', value: 122 },
  { name: 'DM / Inbox', value: 75 },
  { name: 'Comments', value: 34 }
];

const socialInboxItems = [
  { name: 'Rahul Sharma', text: "Hi, I'm interested in your product. Please share more details.", source: 'Facebook', time: '10:24 AM', isNew: true },
  { name: 'Priya Mehta', text: 'Can you share the pricing details?', source: 'Instagram', time: '09:45 AM', isNew: true },
  { name: 'Amit Verma', text: 'I want to book a demo for my team.', source: 'LinkedIn', time: 'Yesterday', isNew: true },
  { name: 'Sneha Iyer', text: 'Thanks! Please send the brochure.', source: 'Instagram', time: 'Yesterday', isNew: false },
  { name: 'Vikram Patel', text: 'Do you have any offers running?', source: 'Facebook', time: 'May 20', isNew: false }
];

export default function SocialLeadsPage() {
  const [socialLeads] = useState<SocialLeadRecord[]>(initialSocialLeads);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSocialLeads = socialLeads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'new') return matchesSearch && l.status === 'New';
    if (activeTab === 'engaged') return matchesSearch && l.status === 'Engaged';
    if (activeTab === 'qualified') return matchesSearch && l.status === 'Qualified';
    if (activeTab === 'converted') return matchesSearch && l.status === 'Converted';
    return matchesSearch;
  });

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Facebook':
        return <Facebook size={14} className="text-[#1877f2]" />;
      case 'Instagram':
        return <Instagram size={14} className="text-[#e1306c]" />;
      case 'LinkedIn':
        return <Linkedin size={14} className="text-[#0077b5]" />;
      case 'YouTube':
        return <Youtube size={14} className="text-[#ff0000]" />;
      default:
        return <Twitter size={14} className="text-[#1da1f2]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0 text-left">
            Social Leads
          </h2>
          <p className="text-sm text-slate-500 mt-1 text-left">
            Capture, engage and convert leads from all your social platforms.
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
          <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold transition-all">
            <CheckSquare size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Facebook size={18} />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Facebook Leads</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">324</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▲ +24.6%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <Instagram size={18} />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Instagram Leads</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">186</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▲ +18.3%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0077b5] flex items-center justify-center shrink-0">
            <Linkedin size={18} />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">LinkedIn Leads</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">92</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▲ +15.2%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <Youtube size={18} />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">YouTube Leads</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">41</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▲ +12.6%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center shrink-0">
            <Twitter size={18} />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">X Leads</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">37</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▲ +10.1%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Users size={18} />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Social</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">680</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▲ +21.4%</span>
          </div>
        </div>
      </div>

      {/* Middle section for graphs and inbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Platform Share Donut */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm m-0 text-left">Leads by Platform</h3>
            <p className="text-[11px] text-slate-400 text-left">Leads distribution by channel</p>
          </div>
          <div className="flex gap-4 items-center justify-center my-2">
            <div className="relative w-28 h-28 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadsByPlatformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={44}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {leadsByPlatformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-extrabold text-slate-808 leading-none">680</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
              </div>
            </div>
            <div className="space-y-1 text-[9px] font-medium text-left">
              {leadsByPlatformData.slice(0, 4).map((entry, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600 truncate max-w-[80px]">{entry.name}</span>
                  <span className="text-slate-400">({Math.round((entry.value / 680) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full text-center text-xs text-indigo-606 font-bold hover:underline">
            View Full Report →
          </button>
        </div>

        {/* Leads Trend Line Chart */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0 text-left">Leads Trend</h3>
              <p className="text-[11px] text-slate-400 text-left">Leads generated over 7 days</p>
            </div>
            <select className="text-[10px] font-bold text-slate-400 focus:outline-none">
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadsTrendData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="Leads" stroke="#4f46e5" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Converted" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Attribution Bar Chart */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm m-0 text-left">Lead Source Attribution</h3>
            <p className="text-[11px] text-slate-400 text-left">Which sources convert best</p>
          </div>
          <div className="h-[140px] w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceAttributionData} layout="vertical" margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={9} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={8} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <button className="w-full text-center text-xs text-indigo-606 font-bold hover:underline mt-2">
            View Attribution Report →
          </button>
        </div>

        {/* Social Inbox Sidebar */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800 text-sm m-0 text-left">Social Inbox</h3>
            <span className="text-[9px] bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded-full">All</span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[170px] flex-1 text-left">
            {socialInboxItems.map((item, idx) => (
              <div key={idx} className="flex gap-2 text-[10.5px] items-start pb-2 border-b border-slate-50 last:border-none">
                <div className="relative shrink-0">
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-605 text-xs">
                    {item.name[0]}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
                    {getSourceIcon(item.source)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline leading-none">
                    <span className="font-bold text-slate-700 truncate">{item.name}</span>
                    <span className="text-[9px] text-slate-404">{item.time}</span>
                  </div>
                  <p className="text-slate-400 truncate mt-1 leading-normal">{item.text}</p>
                </div>
                {item.isNew && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                )}
              </div>
            ))}
          </div>

          <button className="w-full text-center text-xs text-indigo-600 font-bold hover:underline mt-2">
            View All Messages →
          </button>
        </div>
      </div>

      {/* Social Leads Table & sidebar insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table list */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Leads', count: socialLeads.length },
                { id: 'new', label: 'New', count: socialLeads.filter(l => l.status === 'New').length },
                { id: 'engaged', label: 'Engaged', count: socialLeads.filter(l => l.status === 'Engaged').length },
                { id: 'qualified', label: 'Qualified', count: socialLeads.filter(l => l.status === 'Qualified').length }
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
                  placeholder="Search social leads..."
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
                  <th className="pb-2 font-semibold text-left">Lead</th>
                  <th className="pb-2 font-semibold text-left">Source</th>
                  <th className="pb-2 font-semibold text-left">Campaign / Post</th>
                  <th className="pb-2 font-semibold text-left">Lead Info</th>
                  <th className="pb-2 font-semibold text-left">AI Score</th>
                  <th className="pb-2 font-semibold text-left">Status</th>
                  <th className="pb-2 font-semibold text-left">Added On</th>
                  <th className="pb-2 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredSocialLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 group">
                    <td className="py-3">
                      <span className="text-slate-808 font-bold block text-left">{l.name}</span>
                      <span className="text-[10px] text-slate-404 block text-left">{l.email}</span>
                    </td>
                    <td className="py-3 text-left">
                      <div className="flex items-center gap-1.5">
                        {getSourceIcon(l.source)}
                        <span className="text-slate-605">{l.source}</span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-505 text-left">{l.campaign}</td>
                    <td className="py-3 text-left">
                      <span className="text-slate-808 font-bold block">{l.phone}</span>
                      <span className="text-[10px] text-slate-404 block">{l.location}</span>
                    </td>
                    <td className="py-3 text-left">
                      <span className={`font-bold ${l.aiScore >= 80 ? 'text-rose-500' : 'text-slate-707'}`}>{l.aiScore}</span>
                    </td>
                    <td className="py-3 text-left">
                      <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                        l.status === 'Qualified'
                          ? 'bg-emerald-50 text-emerald-600'
                          : l.status === 'Engaged'
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'bg-slate-50 text-slate-500'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 text-left">{l.addedOn}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100">
                          <MessageSquare size={13} />
                        </button>
                        <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100">
                          <Phone size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right side insights and campaigns */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Insights */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-sm m-0 flex items-center gap-1.5">
                <Sparkles size={16} className="text-indigo-600 animate-float" />
                AI Insights
              </h3>
              <button className="text-xs text-indigo-650 font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-3.5 text-left">
              <div className="flex gap-2 items-start text-xs bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <span className="text-indigo-600 font-bold">•</span>
                <p className="text-slate-600 leading-normal">
                  <strong className="text-slate-800">LinkedIn leads</strong> convert <strong className="text-emerald-600">2.3x better</strong> than other social networks.
                </p>
              </div>
              <div className="flex gap-2 items-start text-xs bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <span className="text-indigo-600 font-bold">•</span>
                <p className="text-slate-600 leading-normal">
                  <strong className="text-slate-800">Instagram DM leads</strong> are displaying exceptionally high intent signals this week.
                </p>
              </div>
              <div className="flex gap-2 items-start text-xs bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <span className="text-indigo-600 font-bold">•</span>
                <p className="text-slate-600 leading-normal">
                  The campaign <strong className="text-indigo-606">FB - Summer Offer Campaign</strong> leads in volume (142 leads).
                </p>
              </div>
            </div>
          </div>

          {/* Top campaigns */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm mb-4 m-0 text-left">Top Campaigns</h3>
            <div className="space-y-3.5 text-xs text-left">
              {[
                { name: 'FB - Summer Offer Campaign', count: 142, pct: 90, color: 'bg-blue-600' },
                { name: 'Insta - Demo Promotion', count: 98, pct: 70, color: 'bg-rose-500' },
                { name: 'LinkedIn - Webinar Campaign', count: 72, pct: 55, color: 'bg-sky-600' },
                { name: 'YouTube - Product Demo', count: 41, pct: 30, color: 'bg-red-600' }
              ].map((campaign, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-baseline leading-none font-medium">
                    <span className="text-slate-655 truncate max-w-[170px]">{campaign.name}</span>
                    <span className="font-bold text-slate-800">{campaign.count} leads</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${campaign.color} rounded-full`} style={{ width: `${campaign.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
