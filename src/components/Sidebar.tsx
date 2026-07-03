import {
  LayoutDashboard,
  Globe,
  Share2,
  Brain,
  UserCheck,
  Users,
  Ticket,
  PhoneCall,
  MessageSquare,
  CheckSquare,
  Calendar,
  BarChart3,
  Bell,
  LogOut,
  Sparkles,
  ShieldCheck,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCopilot: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, openCopilot }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'visitor-intelligence', label: 'Visitor Intelligence', icon: Globe },
    { id: 'social-leads', label: 'Social Leads', icon: Share2 },
    { id: 'ai-training', label: 'AI Training', icon: Brain, badge: 'New' },
    { id: 'leads', label: 'Leads', icon: UserCheck },
    { id: 'customers', label: 'Customers', icon: Users, badge: 'New' },
    { id: 'customer-tickets', label: 'Customer Tickets', icon: Ticket, badge: 'New' },
    { id: 'call-logs', label: 'Call Logs', icon: PhoneCall },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'follow-ups', label: 'Follow-Ups', icon: CheckSquare },
    { id: 'scheduling', label: 'Scheduling', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell, alertCount: 8 },
    { id: 'user-management', label: 'User Management', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-indigo-100 animate-pulse-ring">
          P
        </div>
        <div>
          <h1 className="font-extrabold text-lg tracking-tight text-slate-800 flex items-center gap-1 leading-none m-0">
            PRAVESHA<span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">AI</span>
          </h1>
          <span className="text-[10px] text-slate-400 font-medium tracking-wider">AI Powered CRM</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? 'bg-indigo-50/70 text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-indigo-600" />
              )}
              <Icon
                size={18}
                className={`transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-600 rounded-md">
                  {item.badge}
                </span>
              )}
              {item.alertCount && (
                <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-rose-500 text-white rounded-full">
                  {item.alertCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* AI Copilot Promo Card */}
      <div className="p-3 mx-3 mb-2 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white shadow-lg relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-white/10 blur-xl group-hover:bg-white/20 transition-all duration-300" />
        <div className="flex items-center gap-1.5 mb-1">
          <Sparkles size={14} className="text-yellow-300 animate-float" />
          <span className="text-xs font-bold tracking-wide uppercase">PRAVESHA AI Copilot</span>
          <span className="text-[9px] bg-white/25 px-1 py-0.2 rounded font-medium">Beta</span>
        </div>
        <p className="text-[10.5px] text-indigo-100 mb-3 leading-relaxed">
          Ask anything about your leads, calls, and support tickets to get automated insights.
        </p>
        <button
          onClick={openCopilot}
          className="w-full py-1.5 bg-white text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-50 active:scale-95 transition-all shadow-sm"
        >
          Chat with AI ✨
        </button>
      </div>

      {/* Bottom Profile Footer */}
      <div className="p-3 border-t border-slate-100 flex items-center gap-3">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
            alt="User profile avatar"
            className="w-10 h-10 rounded-full object-cover border border-slate-200"
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-800 truncate leading-tight">Admin User</h4>
          <span className="text-[11px] text-slate-400 truncate block">Super Admin</span>
        </div>
        <button
          onClick={() => alert('Log out clicked')}
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
