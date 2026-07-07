interface LeadSummaryProps {
  name: string;
  company: string;
  assignedTo: string;
}

export default function LeadSummary({ name, company, assignedTo }: LeadSummaryProps) {
  const initials = assignedTo
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between">
      <div className="space-y-1 text-left">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lead Name</span>
        <h3 className="text-xl font-bold text-slate-800">{name}</h3>
      </div>
      <div className="space-y-1 text-left">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Company</span>
        <p className="text-base font-semibold text-slate-700">{company}</p>
      </div>
      <div className="space-y-1 text-left">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Owner</span>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
            {initials}
          </div>
          <span className="text-sm font-semibold text-slate-700">{assignedTo}</span>
        </div>
      </div>
    </div>
  );
}
