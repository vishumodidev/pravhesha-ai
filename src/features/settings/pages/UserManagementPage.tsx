import { useState } from 'react';
import { Search, Columns, ChevronDown, Trash2, Edit } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useSettings } from '../hooks/useSettings';

export default function UserManagementPage() {
  const { settings, isLoading, addUser, deleteUser } = useSettings();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading || !settings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-650 rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Loading user accounts...</span>
      </div>
    );
  }

  const { users, roleDistributionData } = settings;

  const handleAddUserSim = async () => {
    const name = prompt('Enter user name:');
    if (!name) return;
    const email = prompt('Enter email address:');
    if (!email) return;

    try {
      await addUser({
        name,
        email,
        role: 'Sales Executive',
        department: 'Sales',
        status: 'Invited',
        lastLogin: '—',
        joinedOn: new Date().toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' }),
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150'
      });
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && u.status === 'Active';
    if (activeTab === 'inactive') return matchesSearch && u.status === 'Inactive';
    if (activeTab === 'invited') return matchesSearch && u.status === 'Invited';
    return matchesSearch;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Team Lead': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Support Manager': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Support Agent': return 'bg-cyan-50 text-cyan-700 border-cyan-100';
      case 'Sales Executive': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-rose-50 text-rose-700 border-rose-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0 text-left">
            User Management
          </h2>
          <p className="text-sm text-slate-500 mt-1 text-left">
            Manage users, roles, permissions and access across your organization.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-1.5 rounded-xl shadow-sm text-xs font-bold text-slate-707 transition-colors">
            <span>Export</span>
          </button>
          <div className="relative group">
            <button
              onClick={handleAddUserSim}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold transition-all shadow-indigo-100 cursor-pointer"
            >
              <span>+ Add User</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { title: 'Total Users', val: String(users.length), pct: '+12.5%' },
          { title: 'Active Users', val: String(users.filter(u => u.status === 'Active').length), pct: '+9.1%' },
          { title: 'Inactive Users', val: String(users.filter(u => u.status === 'Inactive').length), pct: '-20.0%', negative: true },
          { title: 'Pending Invites', val: String(users.filter(u => u.status === 'Invited').length), pct: '+50.0%' },
          { title: 'Roles', val: '6', pct: 'No change' },
          { title: 'Permission Sets', val: '12', pct: 'No change' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{item.title}</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-base font-bold text-slate-800">{item.val}</span>
              <span className={`text-[9px] font-bold block mt-1 ${
                item.negative ? 'text-rose-500' : 'text-emerald-600'
              }`}>{item.pct}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table split */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Side: Users list */}
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Users', count: users.length },
                { id: 'active', label: 'Active', count: users.filter(u => u.status === 'Active').length },
                { id: 'inactive', label: 'Inactive', count: users.filter(u => u.status === 'Inactive').length },
                { id: 'invited', label: 'Invited', count: users.filter(u => u.status === 'Invited').length }
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
                  placeholder="Search team..."
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-2 font-semibold w-4 border-b border-slate-100">
                    <input type="checkbox" className="rounded text-indigo-600" />
                  </th>
                  <th className="pb-2 font-semibold text-left">User</th>
                  <th className="pb-2 font-semibold text-left">Role</th>
                  <th className="pb-2 font-semibold text-left">Department</th>
                  <th className="pb-2 font-semibold text-left">Status</th>
                  <th className="pb-2 font-semibold text-left">Last Login</th>
                  <th className="pb-2 font-semibold text-left">Joined On</th>
                  <th className="pb-2 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 group">
                    <td className="py-3">
                      <input type="checkbox" className="rounded text-indigo-600" />
                    </td>
                    <td className="py-3 text-left">
                      <div className="flex items-center gap-2">
                        <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover border" />
                        <div>
                          <span className="font-bold text-slate-800 block leading-tight">{u.name}</span>
                          <span className="text-[10px] text-slate-404 block">{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-left">
                      <span className={`px-2.5 py-0.5 text-[9px] rounded border font-bold ${getRoleBadgeColor(u.role)}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 text-slate-505 font-medium text-left">{u.department}</td>
                    <td className="py-3 text-left">
                      <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                        u.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-600'
                          : u.status === 'Inactive'
                          ? 'bg-slate-50 text-slate-500'
                          : 'bg-indigo-50 text-indigo-606'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-404 text-left">{u.lastLogin}</td>
                    <td className="py-3 text-slate-404 text-left">{u.joinedOn}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-slate-404 hover:text-slate-700 hover:bg-slate-100 rounded">
                          <Edit size={12} />
                        </button>
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="p-1 text-slate-404 hover:text-rose-600 hover:bg-rose-50 rounded"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right side donut distribution and activity log */}
        <div className="w-full lg:w-80 space-y-6 shrink-0 text-left">
          {/* Role distribution */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-slate-808 text-sm mb-4 m-0">Role Distribution</h3>
            <div className="flex gap-4 items-center justify-center my-2">
              <div className="relative w-28 h-28 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={44}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {roleDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-extrabold text-slate-808 leading-none">{users.length}</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
                </div>
              </div>
              <div className="space-y-1 text-[8.5px] font-medium leading-tight">
                {roleDistributionData.slice(0, 4).map((entry, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                    <span className="text-slate-655 truncate max-w-[70px]">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Roles list */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-808 text-sm m-0">Roles & Permissions</h3>
              <button className="text-[10px] text-indigo-606 font-bold hover:underline">Manage</button>
            </div>
            <div className="space-y-3 text-[11px] text-slate-505">
              {[
                { role: 'Admin', desc: 'Full access to all modules', count: '2 Users' },
                { role: 'Team Lead', desc: 'Manage team and view reports', count: '3 Users' },
                { role: 'Support Manager', desc: 'Manage support team and tickets', count: '2 Users' },
                { role: 'Support Agent', desc: 'Handle customer tickets', count: '8 Users' }
              ].map((r, i) => (
                <div key={i} className="flex justify-between items-start pb-2 border-b border-slate-50 last:border-none">
                  <div>
                    <span className="font-bold text-slate-808 block leading-tight">{r.role}</span>
                    <span className="text-[10px] text-slate-404 block mt-0.5">{r.desc}</span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-650 shrink-0">{r.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Audit Activities */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-808 text-sm m-0">Recent Activity</h3>
              <button className="text-xs text-indigo-606 font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-3.5 text-xs">
              {[
                { name: 'Rahul Sharma', action: 'updated user role for Priya Mehta', time: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150' },
                { name: 'Amit Verma', action: 'invited new user Rohit Gupta', time: '5 hours ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150' },
                { name: 'Priya Mehta', action: 'deactivated user Neha Patel', time: '1 day ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150' }
              ].map((act, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <img src={act.avatar} alt={act.name} className="w-6 h-6 rounded-full object-cover border shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-655 leading-normal text-[11px]">
                      <strong className="text-slate-808">{act.name}</strong> {act.action}
                    </p>
                    <span className="text-[9.5px] text-slate-404 block mt-0.5">{act.time}</span>
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
