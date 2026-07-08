import { useEffect, useRef } from 'react';
import { X, Bell, CheckCircle, AlertTriangle, AlertCircle, Info, Settings, RefreshCw } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import type { NotificationType } from '../types/Notification';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const { data: notifications, loading, error, refetch } = useNotifications();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock background scroll
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'Success':
        return <CheckCircle size={16} className="text-emerald-600" />;
      case 'Warning':
        return <AlertTriangle size={16} className="text-amber-600" />;
      case 'Error':
        return <AlertCircle size={16} className="text-rose-600" />;
      case 'System':
        return <Settings size={16} className="text-purple-600" />;
      case 'Info':
      default:
        return <Info size={16} className="text-blue-600" />;
    }
  };

  const getColorClasses = (type: NotificationType) => {
    switch (type) {
      case 'Success':
        return {
          bg: 'bg-emerald-50 border-emerald-100',
          badge: 'bg-emerald-100 text-emerald-800',
        };
      case 'Warning':
        return {
          bg: 'bg-amber-50 border-amber-100',
          badge: 'bg-amber-100 text-amber-855',
        };
      case 'Error':
        return {
          bg: 'bg-rose-50 border-rose-100',
          badge: 'bg-rose-100 text-rose-800',
        };
      case 'System':
        return {
          bg: 'bg-purple-50 border-purple-100',
          badge: 'bg-purple-100 text-purple-800',
        };
      case 'Info':
      default:
        return {
          bg: 'bg-blue-50 border-blue-100',
          badge: 'bg-blue-100 text-blue-800',
        };
    }
  };

  const formatRelativeTime = (dateStr: string) => {
    try {
      const now = new Date();
      const date = new Date(dateStr);
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    } catch {
      return dateStr;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Bell size={18} />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-800 m-0">Notifications</h3>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                {unreadCount > 0 ? `${unreadCount} unread alerts` : 'All caught up'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => refetch()}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Refresh"
            >
              <RefreshCw size={14} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Close Drawer"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Drawer Body (Notifications List) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-2">
              <RefreshCw className="w-6 h-6 text-indigo-500 animate-spin" />
              <p className="text-xs font-semibold text-slate-400">Loading alerts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 space-y-2">
              <p className="text-xs font-bold text-rose-500">Failed to load notifications</p>
              <button
                onClick={() => refetch()}
                className="px-3 py-1.5 text-[10px] font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-20 space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-55 flex items-center justify-center mx-auto text-slate-400">
                <Bell size={20} />
              </div>
              <p className="text-xs font-bold text-slate-500">No Notifications</p>
              <p className="text-[10px] text-slate-400 max-w-[200px] mx-auto">
                Any important updates or actions will appear here.
              </p>
            </div>
          ) : (
            notifications.map((n) => {
              const { bg, badge } = getColorClasses(n.type);
              return (
                <div
                  key={n.id}
                  className={`p-3.5 rounded-2xl border transition-all flex gap-3.5 text-left relative overflow-hidden ${
                    !n.isRead ? 'bg-indigo-50/10 border-indigo-100/50 shadow-xs' : 'bg-white border-slate-100'
                  }`}
                >
                  {/* Read indicator dot */}
                  {!n.isRead && (
                    <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-600" />
                  )}

                  {/* Icon box */}
                  <div className={`p-2.5 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center ${bg} border`}>
                    {getIcon(n.type)}
                  </div>

                  {/* Message body */}
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-slate-800 leading-tight">
                        {n.title}
                      </span>
                      <span className={`text-[8.5px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wide shrink-0 ${badge}`}>
                        {n.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                      {n.message}
                    </p>
                    <span className="text-[9.5px] text-slate-400 font-semibold block pt-0.5">
                      {formatRelativeTime(n.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
