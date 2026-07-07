import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface CustomerHeaderProps {
  name: string;
  customerCode: string;
}

export default function CustomerHeader({ name, customerCode }: CustomerHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <Link
        to="/dashboard/customers"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider self-start"
      >
        <ArrowLeft size={14} />
        <span>Back to Customers</span>
      </Link>
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 text-left">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight m-0">
          {name}
        </h2>
        <span className="font-mono text-sm font-semibold text-slate-400">
          ({customerCode})
        </span>
      </div>
    </div>
  );
}
