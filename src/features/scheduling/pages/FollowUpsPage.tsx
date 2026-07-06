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
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useScheduling } from '../hooks/useScheduling';

export default function FollowUpsPage() {
  const { scheduling, isLoading, addFollowUp } = useScheduling();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading || !scheduling) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-650 rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Loading follow-ups...</span>
      </div>
    );
  }

  const { followUps } = scheduling;

  const followUpOverviewData = [
    { name: 'Due Today', value: 156, color: '#f59e0b' },
    { name: 'Upcoming', value: 542, color: '#3b82f6' },
    { name: 'Overdue', value: 127, color: '#ef4444' },
    { name: 'Completed', value: 423, color: '#10b981' }
  ];

  const followUpTypes = [
    { type: 'Phone Call', count: 428, pct: 90 },
    { type: 'Email', count: 356, pct: 75 },
    { type: 'WhatsApp', count: 268, pct: 55 },
    { type: 'Meeting', count: 146, pct: 30 },
    { type: 'Task', count: 50, pct: 10 }
  ];

  const handleNewFollowUp = async () => {
    const title = prompt('Enter follow-up title:');
    if (!title) return;
    const leadName = prompt('Enter lead name:');
    if (!leadName) return;

    try {
      await addFollowUp({
        title,
        leadName,
        detail: 'Follow up on business requirement',
        company: 'New Business Corp',
        type: 'Phone Call',
        dueDate: 'May 21, 2024',
        dueTime: '11:00 AM',
        dueStatus: 'Due Today',
        priority: 'Medium',
        agentName: 'Priya Mehta',
        agentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
        status: 'Pending',
        lastContact: 'Just now'
      });
    } catch (err) {
      console.error(err);
    }
  };

  const filteredFollowUps = followUps.filter((f) => {
    const matchesSearch =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.company.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'due-today') return matchesSearch && f.dueStatus === 'Due Today';
    if (activeTab === 'overdue') return matchesSearch && f.priority === 'High'; // Dummy logic matching overdue
    return matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Phone Call':
        return <Phone size={13} className="text-blue-500" />;
      case 'Email':
        return <Mail size={13} className="text-amber-500" />;
      case 'WhatsApp':
        return <MessageSquare size={13} className="text-emerald-500" />;
      default:
        return <Calendar size={13} className="text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0 text-left">
            Follow-Ups
          </h2>
          <p className="text-sm text-slate-505 mt-1 text-left">
            Stay on top of all your follow-ups and never miss an opportunity.
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
          <button
            onClick={handleNewFollowUp}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold transition-all"
          >
            <Plus size={14} />
            <span>New Follow-Up</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { title: 'Total Follow-Ups', val: '1,248', change: '+18.6%' },
          { title: 'Due Today', val: '156', change: '+12.3%' },
          { title: 'Upcoming', val: '542', change: '+16.8%' },
          { title: 'Completed', val: '423', change: '+20.4%' },
          { title: 'Overdue', val: '127', change: '-8.7%', negative: true },
          { title: 'Follow-Up Rate', val: '68.3%', change: '+9.1%' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{item.title}</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-base font-bold text-slate-800">{item.val}</span>
              <span className={`text-[9px] font-bold flex items-center gap-0.5 ${
                item.negative ? 'text-rose-500' : 'text-emerald-600'
              }`}>
                {item.negative ? '▼' : '▲'} {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Table list and right panel */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Table List */}
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Follow-Ups', count: 1248 },
                { id: 'due-today', label: 'Due Today', count: 156 },
                { id: 'overdue', label: 'Overdue', count: 127 }
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
                  placeholder="Search follow-ups..."
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
                  <th className="pb-2 font-semibold text-left">Follow-Up</th>
                  <th className="pb-2 font-semibold text-left">Lead / Customer</th>
                  <th className="pb-2 font-semibold text-left">Type</th>
                  <th className="pb-2 font-semibold text-left">Due Date & Time</th>
                  <th className="pb-2 font-semibold text-left">Priority</th>
                  <th className="pb-2 font-semibold text-left">Assigned To</th>
                  <th className="pb-2 font-semibold text-left">Status</th>
                  <th className="pb-2 font-semibold text-left">Last Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredFollowUps.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50">
                    <td className="py-3 text-left">
                      <span className="text-slate-808 font-bold block">{f.title}</span>
                      <span className="text-[10px] text-slate-404 block">{f.detail}</span>
                    </td>
                    <td className="py-3 text-left">
                      <span className="text-slate-808 font-semibold block">{f.leadName}</span>
                      <span className="text-[10px] text-slate-404 block">{f.company}</span>
                    </td>
                    <td className="py-3 text-left">
                      <div className="flex items-center gap-1.5">
                        {getTypeIcon(f.type)}
                        <span>{f.type}</span>
                      </div>
                    </td>
                    <td className="py-3 text-left">
                      <span className="text-slate-808 block font-medium">{f.dueDate}</span>
                      <span className={`text-[10px] font-bold block ${
                        f.dueStatus === 'Due Today' ? 'text-amber-505' : 'text-slate-404'
                      }`}>{f.dueTime} • {f.dueStatus}</span>
                    </td>
                    <td className="py-3 text-left">
                      <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                        f.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-606'
                      }`}>
                        {f.priority}
                      </span>
                    </td>
                    <td className="py-3 text-left">
                      <div className="flex items-center gap-1.5">
                        <img src={f.agentAvatar} alt={f.agentName} className="w-5 h-5 rounded-full object-cover" />
                        <span>{f.agentName}</span>
                      </div>
                    </td>
                    <td className="py-3 text-left">
                      <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                        f.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-505'
                      }`}>
                        {f.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-404 text-left">{f.lastContact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right side analytics */}
        <div className="w-full lg:w-80 space-y-6 shrink-0 text-left">
          {/* Follow-up overview chart */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-slate-808 text-sm mb-4 m-0">Follow-Up Overview</h3>
            <div className="flex gap-4 items-center justify-center my-2">
              <div className="relative w-28 h-28 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={followUpOverviewData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={44}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {followUpOverviewData.map((entry, index) => (
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
              <div className="space-y-1.5 text-[9px] font-medium">
                {followUpOverviewData.map((entry, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                    <span className="text-slate-655 truncate max-w-[80px]">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overdue Follow-ups */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-808 text-sm m-0">Overdue Follow-Ups</h3>
              <button className="text-xs text-rose-500 font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-3 text-xs">
              {[
                { title: 'Payment follow up', client: 'Amit Verma', day: '2 days overdue' },
                { title: 'Contract renewal', client: 'Sneha Iyer', day: '3 days overdue' },
                { title: 'Demo reschedule', client: 'Dinesh Kumar', day: '3 days overdue' }
              ].map((over, i) => (
                <div key={i} className="flex gap-2.5 items-start p-2.5 bg-rose-50/30 border border-rose-100/50 rounded-xl">
                  <Clock size={14} className="text-rose-500 shrink-0 mt-0.5 animate-pulse" />
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-slate-808 block leading-tight">{over.title}</span>
                    <span className="text-[10px] text-slate-404 block mt-0.5">{over.client} • <strong className="text-rose-600 font-bold">{over.day}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-up Types */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-808 text-sm mb-4 m-0 text-left">Follow-Up Types</h3>
            <div className="space-y-3.5 text-xs text-left">
              {followUpTypes.map((type, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-baseline leading-none font-medium">
                    <span className="text-slate-655">{type.type}</span>
                    <span className="font-bold text-slate-808">{type.count} tasks</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-650 rounded-full" style={{ width: `${type.pct}%` }} />
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
