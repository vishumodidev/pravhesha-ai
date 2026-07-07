import { useLeadActivities } from '../hooks/useLeadActivities';
import {
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  RefreshCw,
  FileText,
  UserPlus,
  AlertCircle,
  Clock,
} from 'lucide-react';

interface ActivityTimelineProps {
  leadId: string;
}

export default function ActivityTimeline({ leadId }: ActivityTimelineProps) {
  const { activities, loading, error } = useLeadActivities(leadId);

  // Helper to get corresponding icon for each activity type
  const getActivityIcon = (type: string) => {
    const classes = 'w-3.5 h-3.5';
    switch (type) {
      case 'Lead Created':
        return <UserPlus className={`${classes} text-blue-600`} />;
      case 'Call Made':
        return <Phone className={`${classes} text-indigo-600`} />;
      case 'Email Sent':
        return <Mail className={`${classes} text-amber-600`} />;
      case 'WhatsApp Sent':
        return <MessageSquare className={`${classes} text-emerald-600`} />;
      case 'Meeting Scheduled':
        return <Calendar className={`${classes} text-purple-600`} />;
      case 'Status Changed':
        return <RefreshCw className={`${classes} text-pink-600`} />;
      case 'Note Added':
        return <FileText className={`${classes} text-slate-600`} />;
      default:
        return <Clock className={`${classes} text-slate-400`} />;
    }
  };

  // Helper to get matching border/bg classes for the icon container
  const getIconContainerClasses = (type: string) => {
    switch (type) {
      case 'Lead Created':
        return 'bg-blue-50 border-blue-200';
      case 'Call Made':
        return 'bg-indigo-50 border-indigo-200';
      case 'Email Sent':
        return 'bg-amber-50 border-amber-200';
      case 'WhatsApp Sent':
        return 'bg-emerald-50 border-emerald-200';
      case 'Meeting Scheduled':
        return 'bg-purple-50 border-purple-200';
      case 'Status Changed':
        return 'bg-pink-50 border-pink-200';
      case 'Note Added':
        return 'bg-slate-50 border-slate-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  // Date formatter
  const formatDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center py-10 space-y-2">
        <RefreshCw className="w-6 h-6 text-indigo-500 animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Loading timeline activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center py-10 text-center space-y-2">
        <AlertCircle className="w-8 h-8 text-rose-500" />
        <p className="text-xs font-bold text-slate-800">Failed to load timeline</p>
      </div>
    );
  }

  // Sort activities newest first for display
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime()
  );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6 text-left">
        Activity Timeline
      </h3>

      {sortedActivities.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">No activity recorded for this lead yet.</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-slate-100 ml-4 pl-6 space-y-8 text-left">
          {sortedActivities.map((activity) => (
            <div key={activity.id} className="relative">
              {/* Timeline Bullet Node Icon */}
              <span
                className={`absolute -left-[37px] top-0.5 flex items-center justify-center w-7 h-7 rounded-full border shadow-sm ${getIconContainerClasses(
                  activity.activityType
                )}`}
              >
                {getActivityIcon(activity.activityType)}
              </span>

              {/* Activity Info */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">
                    {activity.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {formatDate(activity.performedAt)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                  {activity.description}
                </p>
                <div className="text-[10px] text-slate-450 font-bold uppercase tracking-wider mt-1">
                  By {activity.performedBy}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
