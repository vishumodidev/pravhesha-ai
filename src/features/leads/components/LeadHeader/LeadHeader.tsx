import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LeadHeaderProps {
  name: string;
  leadNumber: string;
}

export default function LeadHeader({ name, leadNumber }: LeadHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <Link
        to="/dashboard/leads"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider self-start"
      >
        <ArrowLeft size={14} />
        <span>Back to Leads</span>
      </Link>
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight m-0 text-left">
          {name}
        </h2>
        <span className="font-mono text-sm font-semibold text-slate-400">
          ({leadNumber})
        </span>
      </div>
    </div>
  );
}
