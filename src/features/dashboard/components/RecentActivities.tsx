import { useState } from 'react';
import { Clock } from 'lucide-react';
import type { RecentActivity } from '../types';

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activities.filter((act) => {
    if (activeFilter === 'all') return true;
    return act.category === activeFilter;
  });

  const getBadgeClass = (category: string) => {
    switch (category) {
      case 'calls':
        return 'bg-emerald-50 text-emerald-605';
      case 'whatsapp':
        return 'bg-teal-50 text-teal-605';
      case 'emails':
        return 'bg-amber-50 text-amber-605';
      default:
        return 'bg-indigo-50 text-indigo-605';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'calls':
        return 'Call completed';
      case 'whatsapp':
        return 'WhatsApp campaign';
      case 'emails':
        return 'Email sent';
      case 'leads':
        return 'New Lead';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="font-bold text-slate-800 text-sm m-0">Recent Activities</h3>
        <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl">
          {['all', 'leads', 'calls', 'whatsapp', 'emails'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`text-[10.5px] font-bold px-2.5 py-1 rounded-lg transition-all capitalize ${
                activeFilter === tab
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">No activities found in this category.</div>
        ) : (
          filtered.map((act) => (
            <div
              key={act.id}
              className="flex items-start gap-3 p-2.5 border-b border-slate-50 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-extrabold flex items-center justify-center text-xs shrink-0">
                {act.userInitials}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs text-slate-655 leading-normal">
                  {act.action}: <strong className="text-indigo-606 font-bold">{act.detail}</strong>
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`px-1.5 py-0.2 text-[9px] rounded font-bold ${getBadgeClass(act.category)}`}>
                    {getCategoryLabel(act.category)}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock size={10} /> {act.time}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
