interface CustomerStatusProps {
  status: string;
}

export default function CustomerStatus({ status }: CustomerStatusProps) {
  // Status Badge styles
  const getStatusClasses = (stat: string) => {
    switch (stat) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'At Risk':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Inactive':
      default:
        return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 sm:items-center text-left">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-slate-500">Customer Status:</span>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusClasses(status)}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
