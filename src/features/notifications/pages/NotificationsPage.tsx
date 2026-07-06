import { useState } from 'react';
import {
  Search,
  Filter,
  Check,
  Settings,
  MessageSquare,
  Calendar,
  Ticket,
  Phone,
  User,
  AlertTriangle,
  Mail
} from 'lucide-react';

interface NotificationItem {
  id: string;
  type: 'whatsapp' | 'schedule' | 'ticket' | 'call' | 'lead' | 'followup' | 'email' | 'system';
  title: string;
  desc: string;
  time: string;
  senderAvatar?: string;
  senderName?: string;
  isRead: boolean;
  actionLabel: string;
}

const initialNotifications: NotificationItem[] = [
  { id: '1', type: 'whatsapp', title: 'New WhatsApp Message', desc: 'Rahul Sharma sent you a new message', time: '2m ago', senderAvatar: 'RS', senderName: 'Rahul Sharma', isRead: false, actionLabel: 'View Conversation' },
  { id: '2', type: 'schedule', title: 'Meeting Scheduled', desc: 'Demo Call scheduled with Amit Verma', time: '15m ago', senderAvatar: 'AV', senderName: 'Amit Verma', isRead: false, actionLabel: 'View Schedule' },
  { id: '3', type: 'ticket', title: 'New Customer Ticket', desc: 'Ticket #TK-1256 created by Priya Mehta', time: '35m ago', senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150', senderName: 'Priya Mehta', isRead: false, actionLabel: 'View Ticket' },
  { id: '4', type: 'call', title: 'Missed Call', desc: 'You missed a call from +91 98765 43210', time: '1h ago', senderAvatar: 'RS', senderName: 'Rahul Sharma', isRead: false, actionLabel: 'View Call Log' },
  { id: '5', type: 'lead', title: 'New Lead Assigned', desc: 'Neha Patel has been assigned to you', time: '2h ago', senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150', senderName: 'Priya Mehta', isRead: false, actionLabel: 'View Lead' },
  { id: '6', type: 'followup', title: 'Follow-Up Reminder', desc: 'You have 5 follow-ups due today', time: '3h ago', senderAvatar: '5', isRead: false, actionLabel: 'View Follow-Ups' },
  { id: '7', type: 'email', title: 'Email Opened', desc: 'Your email was opened by Dinesh Kumar', time: '5h ago', senderAvatar: 'DK', senderName: 'Dinesh Kumar', isRead: false, actionLabel: 'View Email Activity' },
  { id: '8', type: 'system', title: 'Weekly Report Ready', desc: 'Your weekly performance report is ready', time: '1d ago', isRead: false, actionLabel: 'View Report' }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleMarkSingleRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const filteredNotifications = notifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.desc.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'unread') return matchesSearch && !n.isRead;
    if (activeTab === 'mentions') return matchesSearch && n.type === 'ticket'; // Dummy mention logic
    if (activeTab === 'system') return matchesSearch && n.type === 'system';
    return matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'whatsapp':
        return <MessageSquare size={14} className="text-emerald-600" />;
      case 'schedule':
        return <Calendar size={14} className="text-amber-500" />;
      case 'ticket':
        return <Ticket size={14} className="text-purple-600" />;
      case 'call':
        return <Phone size={14} className="text-blue-500" />;
      case 'lead':
        return <User size={14} className="text-indigo-600" />;
      case 'email':
        return <Mail size={14} className="text-slate-505" />;
      default:
        return <AlertTriangle size={14} className="text-rose-500" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'whatsapp': return 'bg-emerald-50';
      case 'schedule': return 'bg-amber-50';
      case 'ticket': return 'bg-purple-50';
      case 'call': return 'bg-blue-50';
      case 'lead': return 'bg-indigo-50';
      case 'email': return 'bg-slate-50';
      default: return 'bg-rose-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0 text-left">
            Notifications
          </h2>
          <p className="text-sm text-slate-505 mt-1 text-left">
            Stay updated with real-time alerts and important updates.
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
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold transition-all shadow-indigo-100 cursor-pointer"
          >
            <Check size={14} />
            <span>Mark all as read</span>
          </button>
        </div>
      </div>

      {/* Main split */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Side: Feed */}
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All', count: notifications.length },
                { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.isRead).length },
                { id: 'mentions', label: 'Mentions', count: notifications.filter(n => n.type === 'ticket').length },
                { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
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
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/20 placeholder:text-slate-400 w-36 sm:w-44 focus:w-56 transition-all"
                />
              </div>
              <button className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 rounded-xl transition-all">
                <Settings size={14} />
              </button>
            </div>
          </div>

          {/* List items */}
          <div className="space-y-3">
            {filteredNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleMarkSingleRead(n.id)}
                className={`flex gap-3.5 p-3 rounded-2xl border transition-all cursor-pointer items-start ${
                  !n.isRead ? 'bg-indigo-50/20 border-indigo-100/50' : 'bg-white border-slate-100'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${getBg(n.type)} shrink-0`}>
                  {getIcon(n.type)}
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-baseline leading-none">
                    <h4 className="text-xs font-bold text-slate-808 m-0">{n.title}</h4>
                    <span className="text-[10px] text-slate-404">{n.time}</span>
                  </div>
                  <p className="text-slate-505 mt-1 text-[11px] font-medium leading-relaxed">{n.desc}</p>
                  <button className="text-[10.5px] font-bold text-indigo-600 hover:underline mt-2 text-left block">
                    {n.actionLabel} →
                  </button>
                </div>

                <div className="flex flex-col items-center shrink-0 ml-2">
                  {!n.isRead && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 mb-2" />
                  )}
                  {n.senderAvatar && (
                    n.senderAvatar.startsWith('http') ? (
                      <img src={n.senderAvatar} alt={n.senderName} className="w-6 h-6 rounded-full object-cover border" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-[10px]">
                        {n.senderAvatar}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: details and preferences */}
        <div className="w-full lg:w-80 space-y-6 shrink-0 text-left">
          {/* Notification Summary */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-808 text-sm m-0">Notification Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { title: 'Total Alerts', val: '128', change: '▲ 18.6%' },
                { title: 'Unread', val: String(notifications.filter(n => !n.isRead).length), change: '▼ 11.5%', negative: true },
                { title: 'Mentions', val: '2', change: '▲ 33.3%' },
                { title: 'System Alerts', val: '3', change: '▼ 25.0%', negative: true }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{item.title}</span>
                  <span className="text-lg font-bold text-slate-808 mt-2 block">{item.val}</span>
                  <span className={`text-[9px] font-bold block mt-1 ${
                    item.negative ? 'text-rose-500' : 'text-emerald-600'
                  }`}>{item.change}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-808 text-sm m-0">Preferences</h3>
              <button className="text-[10px] text-indigo-606 font-bold hover:underline flex items-center gap-0.5">
                <Settings size={10} /> Manage
              </button>
            </div>
            <div className="space-y-3.5 text-xs">
              {[
                { label: 'WhatsApp Messages', freq: 'Instant', check: true },
                { label: 'Email Notifications', freq: 'Digest', check: true },
                { label: 'Call Alerts', freq: 'Instant', check: true },
                { label: 'Follow-Up Reminders', freq: 'Daily at 9 AM', check: true },
                { label: 'System Updates', freq: 'Instant', check: false }
              ].map((pref, i) => (
                <div key={i} className="flex justify-between items-center pb-2 border-b border-slate-50 last:border-none">
                  <div>
                    <span className="font-bold text-slate-707 block leading-tight">{pref.label}</span>
                    <span className="text-[9.5px] text-slate-404 block mt-0.5">{pref.freq}</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors duration-250 ${
                    pref.check ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}>
                    <div className={`w-3 h-3 bg-white rounded-full shadow transition-transform duration-250 ${
                      pref.check ? 'translate-x-4' : 'translate-x-0'
                    }`} />
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
