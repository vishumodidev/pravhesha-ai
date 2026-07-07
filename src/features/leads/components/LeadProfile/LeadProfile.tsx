import { Calendar, User, Phone, Mail, FileText, Share2, Shield, Info, Tag } from 'lucide-react';

interface LeadProfileProps {
  leadNumber: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  priority: string;
  assignedTo: string;
  createdAt: string;
}

export default function LeadProfile({
  leadNumber,
  name,
  company,
  email,
  phone,
  source,
  status,
  priority,
  assignedTo,
  createdAt,
}: LeadProfileProps) {
  // Created Date formatter
  const formatDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  const profileItems = [
    { label: 'Lead Number', value: leadNumber, icon: <FileText size={16} className="text-slate-400" /> },
    { label: 'Full Name', value: name, icon: <User size={16} className="text-slate-400" /> },
    { label: 'Company', value: company, icon: <Shield size={16} className="text-slate-400" /> },
    { label: 'Email Address', value: email, icon: <Mail size={16} className="text-slate-400" /> },
    { label: 'Phone Number', value: phone, icon: <Phone size={16} className="text-slate-400" /> },
    { label: 'Source', value: source, icon: <Share2 size={16} className="text-slate-400" /> },
    { label: 'Status', value: status, icon: <Tag size={16} className="text-slate-400" /> },
    { label: 'Priority', value: priority, icon: <Info size={16} className="text-slate-400" /> },
    { label: 'Assigned To', value: assignedTo, icon: <User size={16} className="text-slate-400" /> },
    { label: 'Created Date', value: formatDate(createdAt), icon: <Calendar size={16} className="text-slate-400" /> },
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
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                {item.label}
              </span>
              <span className="text-sm font-semibold text-slate-700 mt-0.5 block">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
