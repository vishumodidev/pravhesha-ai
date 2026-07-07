interface CustomerSummaryProps {
  name: string;
  company: string;
  accountManager: string;
}

export default function CustomerSummary({ name, company, accountManager }: CustomerSummaryProps) {
  const initials = accountManager
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between text-left">
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customer Name</span>
        <h3 className="text-xl font-bold text-slate-800">{name}</h3>
      </div>
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Company</span>
        <p className="text-base font-semibold text-slate-700">{company}</p>
      </div>
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Account Manager</span>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
            {initials}
          </div>
          <span className="text-sm font-semibold text-slate-700">{accountManager}</span>
        </div>
      </div>
    </div>
  );
}
