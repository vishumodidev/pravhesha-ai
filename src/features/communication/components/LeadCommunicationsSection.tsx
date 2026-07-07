import { useCommunications } from '../hooks/useCommunications';
import {
  Phone,
  Mail,
  MessageSquare,
  Smartphone,
  RefreshCw,
  AlertCircle,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
} from 'lucide-react';

interface LeadCommunicationsSectionProps {
  leadId: string;
}

export default function LeadCommunicationsSection({ leadId }: LeadCommunicationsSectionProps) {
  const { communications, loading, error } = useCommunications(leadId);

  // Icon mapping
  const getTypeIcon = (type: string) => {
    const classes = 'w-3.5 h-3.5';
    switch (type) {
      case 'Call':
        return <Phone className={`${classes} text-indigo-600`} />;
      case 'WhatsApp':
        return <MessageSquare className={`${classes} text-emerald-600`} />;
      case 'Email':
        return <Mail className={`${classes} text-amber-600`} />;
      case 'SMS':
      default:
        return <Smartphone className={`${classes} text-slate-600`} />;
    }
  };

  // Status styling
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Read':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Delivered':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Failed':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
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
        <p className="text-xs text-slate-500 font-medium">Loading communications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center py-10 text-center space-y-2">
        <AlertCircle className="w-8 h-8 text-rose-500" />
        <p className="text-xs font-bold text-slate-800">Failed to load communications</p>
      </div>
    );
  }

  // Sort: Newest first
  const sortedComms = [...communications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6 text-left">
        Communication History
      </h3>

      {sortedComms.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">No communication history found.</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-slate-100 ml-4 pl-6 space-y-8 text-left">
          {sortedComms.map((comm) => (
            <div key={comm.id} className="relative">
              {/* Type & Direction Node Icon */}
              <span
                className={`absolute -left-[37px] top-0.5 flex items-center justify-center w-7 h-7 rounded-full border shadow-sm bg-white border-slate-205`}
              >
                {getTypeIcon(comm.type)}
              </span>

              {/* Communication Card Info */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      {comm.direction === 'Incoming' ? (
                        <ArrowDownLeft size={13} className="text-emerald-500 shrink-0" />
                      ) : (
                        <ArrowUpRight size={13} className="text-indigo-500 shrink-0" />
                      )}
                      {comm.direction} {comm.type}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${getStatusClasses(
                        comm.status
                      )}`}
                    >
                      {comm.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {formatDate(comm.createdAt)}
                  </span>
                </div>

                <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-3 rounded-xl transition-colors space-y-1">
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">
                    {comm.subject}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                    {comm.message}
                  </p>
                </div>

                <div className="text-[9.5px] text-slate-450 font-bold uppercase tracking-wider pl-1">
                  Logged by {comm.createdBy}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
