import { User, Shield, Mail, Phone, MapPin } from 'lucide-react';

interface CustomerContactsProps {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

export default function CustomerContacts({
  name,
  company,
  email,
  phone,
  address,
}: CustomerContactsProps) {
  const contactItems = [
    { label: 'Contact Person', value: name, icon: <User size={16} className="text-slate-400" /> },
    { label: 'Company Name', value: company, icon: <Shield size={16} className="text-slate-400" /> },
    { label: 'Email Address', value: email, icon: <Mail size={16} className="text-slate-400" /> },
    { label: 'Phone Number', value: phone, icon: <Phone size={16} className="text-slate-400" /> },
    { label: 'Registered Address', value: address, icon: <MapPin size={16} className="text-slate-400" /> },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4 text-left">
        Contact Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {contactItems.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-none md:border-b-0">
            <div className="mt-0.5 shrink-0">{item.icon}</div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
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
