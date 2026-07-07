import { useTasks } from '../hooks/useTasks';
import { RefreshCw, AlertCircle, Calendar, ShieldAlert, CheckCircle2, Circle, XCircle } from 'lucide-react';

interface LeadTasksSectionProps {
  leadId: string;
}

export default function LeadTasksSection({ leadId }: LeadTasksSectionProps) {
  const { tasks, loading, error } = useTasks(leadId);

  // Helper to render checkbox visual based on status
  const renderCheckbox = (status: string) => {
    const classes = 'w-4 h-4 shrink-0 mt-0.5 transition-colors';
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className={`${classes} text-emerald-500`} />;
      case 'Cancelled':
        return <XCircle className={`${classes} text-slate-300`} />;
      case 'In Progress':
        return <Circle className={`${classes} text-indigo-400 animate-pulse`} />;
      case 'Pending':
      default:
        return <Circle className={`${classes} text-slate-300`} />;
    }
  };

  // Helper to get priority badge
  const renderPriorityBadge = (priority: string) => {
    let classes = '';
    switch (priority) {
      case 'Critical':
        classes = 'bg-red-50 text-red-700 border-red-200';
        break;
      case 'High':
        classes = 'bg-orange-50 text-orange-700 border-orange-200';
        break;
      case 'Medium':
        classes = 'bg-blue-50 text-blue-700 border-blue-200';
        break;
      case 'Low':
      default:
        classes = 'bg-slate-50 text-slate-500 border-slate-200';
        break;
    }
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${classes}`}>
        {priority}
      </span>
    );
  };

  // Helper to format due date labels
  const getDueLabel = (dateStr: string, status: string) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const dueDate = new Date(dateStr);
      dueDate.setHours(0, 0, 0, 0);

      if (dueDate.getTime() === today.getTime()) {
        return <span className="text-rose-600 font-bold">Today</span>;
      }
      if (dueDate.getTime() === tomorrow.getTime()) {
        return <span className="text-amber-600 font-bold">Tomorrow</span>;
      }

      const isPast =
        dueDate.getTime() < today.getTime() && status !== 'Completed' && status !== 'Cancelled';

      const formatted = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(new Date(dateStr));

      return (
        <span className={isPast ? 'text-rose-605 font-bold' : 'text-slate-500 font-medium'}>
          {formatted}
          {isPast ? ' (Overdue)' : ''}
        </span>
      );
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center py-10 space-y-2">
        <RefreshCw className="w-6 h-6 text-indigo-500 animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center py-10 text-center space-y-2">
        <AlertCircle className="w-8 h-8 text-rose-500" />
        <p className="text-xs font-bold text-slate-800">Failed to load tasks</p>
      </div>
    );
  }

  // Sort: In Progress, then Pending, then Completed, then Cancelled
  const sortedTasks = [...tasks].sort((a, b) => {
    const statusWeight = (s: string) => {
      if (s === 'In Progress') return 1;
      if (s === 'Pending') return 2;
      if (s === 'Completed') return 3;
      return 4;
    };
    const priorityWeight = (p: string) => {
      if (p === 'Critical') return 1;
      if (p === 'High') return 2;
      if (p === 'Medium') return 3;
      return 4;
    };

    const statusDiff = statusWeight(a.status) - statusWeight(b.status);
    if (statusDiff !== 0) return statusDiff;

    return priorityWeight(a.priority) - priorityWeight(b.priority);
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-4">
        <ShieldAlert size={18} className="text-indigo-600" />
        <h3 className="text-lg font-bold text-slate-800 m-0">
          Tasks & Follow-ups
        </h3>
        <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full ml-auto">
          {tasks.filter((t) => t.status !== 'Completed' && t.status !== 'Cancelled').length} Pending
        </span>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="text-center py-12 flex-1 flex flex-col justify-center">
          <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">All caught up! No tasks assigned.</p>
        </div>
      ) : (
        <div className="space-y-3 overflow-y-auto max-h-[450px] flex-1 pr-1 text-left">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 p-3 border rounded-xl shadow-sm transition-all ${
                task.status === 'Completed'
                  ? 'bg-slate-50/40 border-slate-200/50 opacity-60'
                  : task.status === 'Cancelled'
                  ? 'bg-slate-50/20 border-slate-200/30 opacity-40 line-through'
                  : 'bg-white border-slate-200/80 hover:border-slate-200'
              }`}
            >
              {renderCheckbox(task.status)}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-baseline justify-between gap-2 flex-wrap sm:flex-nowrap">
                  <h4
                    className={`text-xs font-bold text-slate-800 leading-tight ${
                      task.status === 'Completed' ? 'line-through text-slate-400' : ''
                    }`}
                  >
                    {task.title}
                  </h4>
                  {renderPriorityBadge(task.priority)}
                </div>
                {task.description && (
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {task.description}
                  </p>
                )}
                <div className="flex items-center gap-1.5 text-[9.5px] text-slate-450 font-bold pt-1 uppercase tracking-wider">
                  <Calendar size={10} className="text-slate-350" />
                  <span>Due:</span>
                  {getDueLabel(task.dueDate, task.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
