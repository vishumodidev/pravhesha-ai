import { useState } from 'react';
import { Search, Phone, MessageSquare, Bell, HelpCircle, Command, Sparkles, Menu } from 'lucide-react';
import { useSidebarStore } from '../store/sidebar.store';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openCopilot: () => void;
}

export default function Header({ searchQuery, setSearchQuery, openCopilot }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const { setSidebarOpen } = useSidebarStore();

  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 select-none">
      {/* Search Input Bar & Mobile Menu Trigger */}
      <div className="flex items-center gap-2.5 flex-1 max-w-xs sm:max-w-md">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100 lg:hidden shrink-0 cursor-pointer"
          title="Open Menu"
        >
          <Menu size={18} />
        </button>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search leads, tickets, calls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-slate-200/50 text-[10px] text-slate-500 font-semibold rounded-md border border-slate-200">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="flex items-center gap-2 sm:gap-4 ml-4">
        {/* Quick Dial/Call Icon */}
        <button
          onClick={() => alert('Quick dialer opened')}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100 relative group cursor-pointer"
          title="Start Call"
        >
          <Phone size={18} />
          <span className="absolute top-full right-0 mt-2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
            Start Call
          </span>
        </button>

        {/* WhatsApp Icon */}
        <button
          onClick={() => alert('WhatsApp broadcast panel')}
          className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all border border-transparent hover:border-emerald-100 relative group cursor-pointer"
          title="WhatsApp Campaigns"
        >
          <MessageSquare size={18} />
          <span className="absolute top-full right-0 mt-2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
            WhatsApp Broadcast
          </span>
        </button>

        {/* Copilot Sparkles shortcut */}
        <button
          onClick={openCopilot}
          className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl transition-all active:scale-95 shadow-sm cursor-pointer"
        >
          <Sparkles size={14} className="text-indigo-600 animate-float" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100 relative cursor-pointer"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-white" />
          </button>

          {/* Quick Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-808 text-sm">Notifications</span>
                <button
                  className="text-xs text-indigo-600 font-semibold hover:underline cursor-pointer"
                  onClick={() => setShowNotifications(false)}
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 border-b border-slate-50 hover:bg-slate-50 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-800 font-medium">New lead qualified by AI: Rahul Sharma</p>
                    <span className="text-[10px] text-slate-404">2 mins ago</span>
                  </div>
                </div>
                <div className="p-3 border-b border-slate-50 hover:bg-slate-50 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-800 font-medium">SOP training updated successfully</p>
                    <span className="text-[10px] text-slate-404">1 hour ago</span>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-800 font-medium">Missed call from +91 90012 34567</p>
                    <span className="text-[10px] text-slate-404">4 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Center */}
        <button
          onClick={() => alert('Opening Help Center...')}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100 cursor-pointer"
          title="Help & Support"
        >
          <HelpCircle size={18} />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 hidden xs:block" />

        {/* User Account */}
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
            alt="User profile avatar"
            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
          />
          <div className="text-left hidden md:block">
            <p className="text-xs font-semibold text-slate-808 leading-tight">Admin User</p>
            <span className="text-[10px] text-slate-400">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
