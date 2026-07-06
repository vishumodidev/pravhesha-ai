import { Sparkles } from 'lucide-react';
import type { AIInsight } from '../types';

interface AIInsightCardProps {
  insights: AIInsight[];
  totalOpportunity: string;
}

export default function AIInsightCard({ insights, totalOpportunity }: AIInsightCardProps) {
  const getBulletBg = (type: string) => {
    switch (type) {
      case 'danger':
        return 'bg-rose-500';
      case 'warning':
        return 'bg-amber-500';
      case 'success':
        return 'bg-emerald-500';
      default:
        return 'bg-indigo-500';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 m-0">
            <Sparkles size={16} className="text-indigo-600 animate-float" />
            AI Sales Assistant Insights
          </h3>
          <span className="text-[10px] bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-full">
            Today
          </span>
        </div>

        <div className="space-y-3.5">
          {insights.map((insight, idx) => (
            <div key={idx} className="flex gap-2.5 items-start">
              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${getBulletBg(insight.type)}`} />
              <p
                className="text-xs text-slate-650 leading-normal"
                dangerouslySetInnerHTML={{
                  __html: insight.text
                    .replace(/(\d+ leads|\d+ hot leads|\d+ follow-ups|\d+ demos)/g, '<strong class="text-slate-800">$1</strong>')
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mt-4">
        <span className="text-slate-400 font-medium">Total Opportunity</span>
        <span className="font-extrabold text-indigo-600 text-sm">{totalOpportunity}</span>
      </div>
    </div>
  );
}
