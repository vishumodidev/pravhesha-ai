import { useMemo } from 'react';
import { usePipeline } from '../hooks/usePipeline';
import type { Pipeline } from '../types/Pipeline';
import { RefreshCw, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';

const STAGES: Pipeline['stage'][] = [
  'New',
  'Qualified',
  'Contacted',
  'Meeting Scheduled',
  'Proposal Sent',
  'Negotiation',
  'Won',
  'Lost',
];

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export default function PipelineBoardPage() {
  const { pipeline, loading, error } = usePipeline();

  // Group opportunities by stage
  const groupedOpportunities = useMemo(() => {
    const groups: Record<Pipeline['stage'], Pipeline[]> = {
      'New': [],
      'Qualified': [],
      'Contacted': [],
      'Meeting Scheduled': [],
      'Proposal Sent': [],
      'Negotiation': [],
      'Won': [],
      'Lost': [],
    };

    pipeline.forEach((opp) => {
      if (groups[opp.stage]) {
        groups[opp.stage].push(opp);
      }
    });

    return groups;
  }, [pipeline]);

  // Calculate metrics
  const metrics = useMemo(() => {
    // Total Expected Revenue of active pipeline items (excluding Won/Lost)
    const activePipeline = pipeline.filter(
      (opp) => opp.stage !== 'Won' && opp.stage !== 'Lost'
    );
    const totalExpectedRevenue = activePipeline.reduce(
      (sum, opp) => sum + opp.expectedRevenue,
      0
    );

    // Total Closed Revenue (Won)
    const closedWonRevenue = pipeline
      .filter((opp) => opp.stage === 'Won')
      .reduce((sum, opp) => sum + opp.expectedRevenue, 0);

    return {
      totalExpectedRevenue,
      closedWonRevenue,
      totalDeals: pipeline.length,
      activeDealsCount: activePipeline.length,
    };
  }, [pipeline]);

  // Stage indicator border color styles
  const getStageHeaderStyles = (stage: Pipeline['stage']) => {
    switch (stage) {
      case 'New':
        return 'border-t-slate-400 bg-slate-50 text-slate-700';
      case 'Qualified':
        return 'border-t-blue-400 bg-blue-50 text-blue-700';
      case 'Contacted':
        return 'border-t-indigo-400 bg-indigo-50 text-indigo-700';
      case 'Meeting Scheduled':
        return 'border-t-purple-400 bg-purple-50 text-purple-700';
      case 'Proposal Sent':
        return 'border-t-amber-400 bg-amber-50 text-amber-700';
      case 'Negotiation':
        return 'border-t-orange-400 bg-orange-50 text-orange-700';
      case 'Won':
        return 'border-t-emerald-400 bg-emerald-50 text-emerald-700';
      case 'Lost':
        return 'border-t-rose-400 bg-rose-50 text-rose-700';
    }
  };

  // Render initials avatar for Owner
  const renderOwnerAvatar = (name: string) => {
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    return (
      <div className="flex items-center gap-1.5 mt-2">
        <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-655 shrink-0">
          {initials}
        </div>
        <span className="text-[10px] font-semibold text-slate-500">{name}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight m-0">
            Sales Pipeline
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Track and manage active opportunities across stages.
          </p>
        </div>

        {/* Pipeline Summary Metrics */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm text-left flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <TrendingUp size={18} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Active Pipeline
              </span>
              <span className="text-sm font-extrabold text-slate-800">
                {formatCurrency(metrics.totalExpectedRevenue)}
              </span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm text-left flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <DollarSign size={18} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Closed Won Revenue
              </span>
              <span className="text-sm font-extrabold text-slate-800">
                {formatCurrency(metrics.closedWonRevenue)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-3">
          <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-sm font-medium text-slate-500">Loading pipeline board...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-40 px-4 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-rose-500" />
          <p className="text-sm font-bold text-slate-800">Failed to load sales pipeline</p>
        </div>
      ) : (
        /* Kanban Columns Container */
        <div className="overflow-x-auto flex gap-4 pb-6 min-h-[65vh] select-none scrollbar-thin">
          {STAGES.map((stage) => {
            const opps = groupedOpportunities[stage] || [];
            const stageRevenue = opps.reduce((sum, o) => sum + o.expectedRevenue, 0);

            return (
              <div
                key={stage}
                className="w-72 bg-slate-50/50 border border-slate-200/60 rounded-2xl p-3 flex flex-col shrink-0"
              >
                {/* Column Header */}
                <div
                  className={`border-t-4 rounded-t-lg p-2.5 mb-3 flex items-center justify-between border ${getStageHeaderStyles(
                    stage
                  )}`}
                >
                  <div className="text-left">
                    <span className="text-xs font-bold block">{stage}</span>
                    <span className="text-[9px] font-semibold text-slate-400 block mt-0.5">
                      {formatCurrency(stageRevenue)}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-white/70 border border-current text-[10px] font-extrabold rounded-md shadow-sm">
                    {opps.length}
                  </span>
                </div>

                {/* Column Opportunity List Cards */}
                <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto max-h-[50vh] pr-1 scrollbar-thin">
                  {opps.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
                      No opportunities
                    </div>
                  ) : (
                    opps.map((opp) => (
                      <div
                        key={opp.id}
                        className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-shadow text-left flex flex-col justify-between border-l-2 border-l-indigo-500"
                      >
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-800 text-xs truncate">
                            {opp.leadName}
                          </h4>
                          <p className="text-[10px] text-slate-505 font-semibold truncate">
                            {opp.company}
                          </p>
                        </div>
                        <div className="mt-3.5 border-t border-slate-100 pt-2 flex items-center justify-between">
                          <div>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">
                              Revenue
                            </span>
                            <span className="text-[11px] font-extrabold text-indigo-700">
                              {formatCurrency(opp.expectedRevenue)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 self-end">
                            {renderOwnerAvatar(opp.owner)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
