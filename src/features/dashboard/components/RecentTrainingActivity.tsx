import { Upload } from 'lucide-react';

interface TrainingActivityItem {
  id: string;
  title: string;
  lastUpdated: string;
  status: string;
}

interface RecentTrainingActivityProps {
  activities: TrainingActivityItem[];
  onViewAllClick: () => void;
}

export default function RecentTrainingActivity({
  activities,
  onViewAllClick,
}: RecentTrainingActivityProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-sm m-0">Recent Training Activity</h3>
        <button
          className="text-xs text-indigo-600 font-bold hover:underline"
          onClick={onViewAllClick}
        >
          View All
        </button>
      </div>

      <div className="space-y-3.5 flex-1">
        {activities.slice(0, 3).map((act) => (
          <div key={act.id} className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
              <Upload size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-700 block truncate">{act.title}</span>
              <span className="text-[10px] text-slate-400">Uploaded • {act.lastUpdated.split(' ')[0]} {act.lastUpdated.split(' ')[1]} {act.lastUpdated.split(' ')[2]}</span>
            </div>
            <span className="px-2 py-0.5 text-[9px] bg-emerald-50 text-emerald-600 rounded font-bold">
              {act.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
