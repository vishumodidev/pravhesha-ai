import { FileText, Tag, User, Calendar } from 'lucide-react';

interface CustomerProfileProps {
  customerCode: string;
  industry: string;
  accountManager: string;
  createdAt: string;
}

export default function CustomerProfile({
  customerCode,
  industry,
  accountManager,
  createdAt,
}: CustomerProfileProps) {
  // Format customer since date
  const formatDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  const profileItems = [
    { label: 'Customer Code', value: customerCode, icon: <FileText size={16} className="text-slate-400" /> },
    { label: 'Industry', value: industry, icon: <Tag size={16} className="text-slate-400" /> },
    { label: 'Account Manager', value: accountManager, icon: <User size={16} className="text-slate-400" /> },
    { label: 'Customer Since', value: formatDate(createdAt), icon: <Calendar size={16} className="text-slate-400" /> },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4 text-left">
        Profile Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {profileItems.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-none md:border-b-0">
            <div className="mt-0.5 shrink-0">{item.icon}</div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {item.label}
              </span>
              <span className="text-sm font-semibold text-slate-707 mt-0.5 block">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
