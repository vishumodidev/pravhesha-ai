interface LeadStatusProps {
  status: string;
  priority: string;
}

export default function LeadStatus({ status, priority }: LeadStatusProps) {
  // Status Badge styles
  const getStatusClasses = (stat: string) => {
    switch (stat) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Contacted':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Qualified':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Proposal Sent':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Won':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Lost':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Priority Badge styles
  const getPriorityClasses = (prio: string) => {
    switch (prio) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
      default:
        return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 sm:items-center">
      <div className="flex items-center gap-3 text-left">
        <span className="text-sm font-semibold text-slate-500">Lead Status:</span>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusClasses(status)}`}>
          {status}
        </span>
      </div>
      <div className="flex items-center gap-3 text-left">
        <span className="text-sm font-semibold text-slate-500">Lead Priority:</span>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getPriorityClasses(priority)}`}>
          {priority}
        </span>
      </div>
    </div>
  );
}
