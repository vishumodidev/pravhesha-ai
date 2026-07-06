import { TrendingUp, TrendingDown } from 'lucide-react';

interface OverviewItem {
  value: number;
  change: string;
  isPositive: boolean;
}

interface CustomersOverviewProps {
  overview: {
    total: OverviewItem;
    active: OverviewItem;
    newMonth: OverviewItem;
    churnRisk: OverviewItem;
  };
  onViewAllClick: () => void;
}

export default function CustomersOverview({ overview, onViewAllClick }: CustomersOverviewProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-sm m-0">Customers Overview</h3>
        <button
          className="text-xs text-indigo-600 font-bold hover:underline"
          onClick={onViewAllClick}
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Total */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
          <span className="text-lg font-bold text-slate-800 mt-1">{overview.total.value}</span>
          <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
            <TrendingUp size={10} /> {overview.total.change}
          </span>
        </div>

        {/* Active */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active</span>
          <span className="text-lg font-bold text-slate-800 mt-1">{overview.active.value}</span>
          <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
            <TrendingUp size={10} /> {overview.active.change}
          </span>
        </div>

        {/* New Month */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase">New Month</span>
          <span className="text-lg font-bold text-slate-800 mt-1">{overview.newMonth.value}</span>
          <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
            <TrendingUp size={10} /> {overview.newMonth.change}
          </span>
        </div>

        {/* Churn Risk */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Churn Risk</span>
          <span className="text-lg font-bold text-slate-800 mt-1">{overview.churnRisk.value}</span>
          <span className={`text-[9px] font-bold flex items-center gap-0.5 mt-0.5 ${
            overview.churnRisk.isPositive ? 'text-emerald-600' : 'text-rose-500'
          }`}>
            {overview.churnRisk.isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {overview.churnRisk.change}
          </span>
        </div>
      </div>
    </div>
  );
}
