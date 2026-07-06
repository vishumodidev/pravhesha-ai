import type { FunnelStage } from '../types';

interface ConversionFunnelProps {
  funnel: FunnelStage[];
  conversionRate: string;
}

export default function ConversionFunnel({ funnel, conversionRate }: ConversionFunnelProps) {
  const getProgressWidth = (percentage: number) => {
    return `${percentage}%`;
  };

  const getOpacityClass = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-indigo-650/10';
      case 1:
        return 'bg-indigo-650/30';
      case 2:
        return 'bg-indigo-650/60';
      case 3:
        return 'bg-indigo-650/80';
      default:
        return 'bg-indigo-650';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-slate-800 text-sm m-0">Conversion Funnel</h3>
          <select className="text-[10px] font-bold text-slate-400 focus:outline-none">
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>

        <div className="space-y-2 mt-4">
          {funnel.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>{item.stage}</span>
                <span className="font-bold text-slate-705">{item.value.toLocaleString()}</span>
              </div>
              <div className="w-full h-4 bg-indigo-50 rounded-md overflow-hidden relative">
                <div
                  className={`h-full rounded-md ${getOpacityClass(idx)}`}
                  style={{ width: getProgressWidth(item.percentage) }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] mt-4">
        <span className="text-slate-400 font-medium">Conversion Rate</span>
        <span className="font-extrabold text-emerald-600">{conversionRate}</span>
      </div>
    </div>
  );
}
