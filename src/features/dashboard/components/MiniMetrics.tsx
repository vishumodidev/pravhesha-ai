import { TrendingUp } from 'lucide-react';
import type { MiniMetrics as MiniMetricsType } from '../types';

interface MiniMetricsProps {
  metrics: MiniMetricsType;
}

export default function MiniMetrics({ metrics }: MiniMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {/* Hot Leads */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-left">Hot Leads</span>
        <div className="flex items-baseline justify-between mt-3">
          <span className="text-2xl font-bold text-slate-800">{metrics.hotLeads.value}</span>
          <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp size={10} /> {metrics.hotLeads.change}
          </span>
        </div>
      </div>

      {/* Follow-Ups Due */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-left">Follow-Ups Due</span>
        <div className="flex items-baseline justify-between mt-3">
          <span className="text-2xl font-bold text-slate-800">{metrics.followUps.value}</span>
          <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp size={10} /> {metrics.followUps.change}
          </span>
        </div>
      </div>

      {/* Demos Today */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-left">Demos Today</span>
        <div className="flex items-baseline justify-between mt-3">
          <span className="text-2xl font-bold text-slate-800">{metrics.demos.value}</span>
          <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp size={10} /> {metrics.demos.change}
          </span>
        </div>
      </div>

      {/* Tasks Pending */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-left">Tasks Pending</span>
        <div className="flex items-baseline justify-between mt-3">
          <span className="text-2xl font-bold text-slate-800">{metrics.pendingTasks.value}</span>
          <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp size={10} /> {metrics.pendingTasks.change}
          </span>
        </div>
      </div>
    </div>
  );
}
