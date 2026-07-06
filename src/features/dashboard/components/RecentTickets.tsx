import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { TicketOverview } from '../types';

interface RecentTicketsProps {
  overview: TicketOverview;
  onViewAllClick: () => void;
}

export default function RecentTickets({ overview, onViewAllClick }: RecentTicketsProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-rose-500 bg-rose-50';
      case 'Medium':
        return 'text-amber-500 bg-amber-50';
      default:
        return 'text-emerald-500 bg-emerald-50';
    }
  };

  const getPriorityBullet = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-500';
      case 'Medium':
        return 'bg-amber-500';
      default:
        return 'bg-emerald-500';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-sm m-0">Customer Tickets Overview</h3>
        <button
          className="text-xs text-indigo-600 font-bold hover:underline"
          onClick={onViewAllClick}
        >
          View All
        </button>
      </div>

      {/* Ticket stats counters grid */}
      <div className="flex gap-1.5 justify-between">
        <div className="bg-slate-50 text-center p-2 rounded-xl flex-1">
          <span className="text-[9px] text-slate-400 font-bold block uppercase">Total</span>
          <span className="text-sm font-bold text-slate-808 mt-0.5 block">{overview.total}</span>
        </div>
        <div className="bg-amber-50/50 text-center p-2 rounded-xl flex-1">
          <span className="text-[9px] text-amber-505 font-bold block uppercase">Open</span>
          <span className="text-sm font-bold text-amber-600 mt-0.5 block">{overview.open}</span>
        </div>
        <div className="bg-blue-50/50 text-center p-2 rounded-xl flex-1">
          <span className="text-[9px] text-blue-505 font-bold block uppercase">In Progress</span>
          <span className="text-sm font-bold text-blue-600 mt-0.5 block">{overview.inProgress}</span>
        </div>
        <div className="bg-emerald-50/50 text-center p-2 rounded-xl flex-1">
          <span className="text-[9px] text-emerald-505 font-bold block uppercase">Resolved</span>
          <span className="text-sm font-bold text-emerald-600 mt-0.5 block">{overview.resolved}</span>
        </div>
        <div className="bg-rose-50/50 text-center p-2 rounded-xl flex-1">
          <span className="text-[9px] text-rose-550 font-bold block uppercase">Breached</span>
          <span className="text-sm font-bold text-rose-600 mt-0.5 block">{overview.breached}</span>
        </div>
      </div>

      {/* Ticket Donut & Recent Tickets */}
      <div className="flex gap-4 mt-4 items-center">
        {/* Donut Chart */}
        <div className="relative w-20 h-20 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={overview.priorityDistribution}
                cx="50%"
                cy="50%"
                innerRadius={24}
                outerRadius={36}
                paddingAngle={2}
                dataKey="value"
              >
                {overview.priorityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-extrabold text-slate-800 leading-none">{overview.total}</span>
            <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
          </div>
        </div>

        {/* List of recent tickets */}
        <div className="flex-1 space-y-2.5">
          {overview.recentTickets.map((t, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${getPriorityBullet(t.priority)}`} />
                <span className="text-slate-650 font-semibold truncate max-w-[110px]" title={`${t.title} (#${t.id})`}>
                  {t.title} (#{t.id})
                </span>
              </div>
              <span className={`text-[9px] font-bold px-1 py-0.2 rounded shrink-0 ${getPriorityColor(t.priority)}`}>
                {t.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
