import { useState, useMemo } from 'react';
import { useSocialLeads } from '../hooks/useSocialLeads';
import type { SocialLead } from '../types/SocialLead';
import { Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';

// Custom icons for lead sources
const FacebookIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const WhatsAppIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.74.002-2.602-1.01-5.05-2.85-6.892-1.84-1.842-4.29-2.855-6.897-2.856-5.438 0-9.863 4.37-9.867 9.742-.001 1.796.493 3.55 1.429 5.1l-.988 3.606 3.73-.977zm11.332-6.52c-.287-.144-1.702-.84-1.965-.936-.264-.096-.456-.144-.648.144-.192.288-.744.936-.912 1.128-.168.192-.336.216-.624.072-1.359-.68-2.335-1.183-3.134-2.556-.21-.36.21-.334.6-.112.35.2.072.162.24.288.168.126.192.36.096.552-.096.192-.456 1.152-.576 1.392-.12.24-.24.264-.528.12-.288-.144-1.217-.447-2.316-1.428-.857-.764-1.435-1.708-1.603-1.996-.168-.288-.018-.444.126-.587.13-.13.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.56-.888-2.136-.233-.56-.47-.482-.648-.491-.168-.008-.36-.01-.552-.01-.192 0-.504.072-.768.36-.264.288-1.008.984-1.008 2.4 0 1.416 1.032 2.784 1.176 2.976.144.192 2.032 3.104 4.92 4.352.686.296 1.222.473 1.639.605.69.219 1.318.188 1.815.114.553-.083 1.702-.696 1.942-1.368.24-.672.24-1.248.168-1.368-.072-.12-.264-.192-.552-.336z" />
  </svg>
);

const GoogleAdsIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.09-5.142 4.09-3.3 0-5.99-2.7-5.99-6s2.69-6 5.99-6c1.5 0 2.85.55 3.9 1.5l3.15-3.15C19.065 2.825 15.84.5 12.24.5c-6.49 0-11.75 5.26-11.75 11.75s5.26 11.75 11.75 11.75c6.26 0 11.45-4.49 11.45-11.75 0-.74-.06-1.46-.17-2.17l-11.28-.045z" />
  </svg>
);

const WebsiteIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function SocialLeadsPage() {
  const { data: leads, loading, error } = useSocialLeads();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Available filters based on specification & data
  const sources = ['All', 'Facebook', 'Instagram', 'LinkedIn', 'Website', 'WhatsApp', 'Google Ads'];
  const statuses = ['All', 'New', 'Contacted', 'Qualified', 'Unqualified'];

  // Client-side filtering logic for better UX
  const filteredLeads = useMemo(() => {
    return leads.filter((lead: SocialLead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSource = selectedSource === 'All' || lead.source === selectedSource;
      const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;

      return matchesSearch && matchesSource && matchesStatus;
    });
  }, [leads, searchQuery, selectedSource, selectedStatus]);

  // Source Badge renderer
  const renderSourceBadge = (source: string) => {
    let badgeClasses = '';
    let icon = null;

    switch (source) {
      case 'Facebook':
        badgeClasses = 'bg-blue-50 text-blue-600 border-blue-200';
        icon = <FacebookIcon />;
        break;
      case 'Instagram':
        badgeClasses = 'bg-rose-50 text-rose-600 border-rose-200';
        icon = <InstagramIcon />;
        break;
      case 'LinkedIn':
        badgeClasses = 'bg-sky-50 text-sky-700 border-sky-200';
        icon = <LinkedInIcon />;
        break;
      case 'WhatsApp':
        badgeClasses = 'bg-emerald-50 text-emerald-600 border-emerald-200';
        icon = <WhatsAppIcon />;
        break;
      case 'Google Ads':
        badgeClasses = 'bg-amber-50 text-amber-700 border-amber-200';
        icon = <GoogleAdsIcon />;
        break;
      case 'Website':
      default:
        badgeClasses = 'bg-purple-50 text-purple-700 border-purple-200';
        icon = <WebsiteIcon />;
        break;
    }

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClasses}`}>
        {icon}
        <span>{source}</span>
      </span>
    );
  };

  // Status Badge renderer
  const renderStatusBadge = (status: string) => {
    let badgeClasses = '';

    switch (status) {
      case 'New':
        badgeClasses = 'bg-blue-50 text-blue-700 border-blue-200';
        break;
      case 'Contacted':
        badgeClasses = 'bg-indigo-50 text-indigo-700 border-indigo-200';
        break;
      case 'Qualified':
        badgeClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        break;
      case 'Unqualified':
        badgeClasses = 'bg-rose-50 text-rose-700 border-rose-200';
        break;
      default:
        badgeClasses = 'bg-slate-50 text-slate-700 border-slate-200';
        break;
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${badgeClasses}`}>
        {status}
      </span>
    );
  };

  // Created Date formatter
  const formatDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0 text-left">
            Social Leads Inbox
          </h2>
          <p className="text-sm text-slate-500 mt-1 text-left">
            Collect and monitor all incoming leads generated across your social and marketing channels.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-sm text-xs font-semibold text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time Lead Inbox</span>
        </div>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, name, email or campaign..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400 transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Source Dropdown Filter */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 w-full sm:w-auto">
            <Filter size={14} className="text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Source:</span>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              {sources.map((src) => (
                <option key={src} value={src}>
                  {src}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown Filter */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 w-full sm:w-auto">
            <Filter size={14} className="text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              {statuses.map((stat) => (
                <option key={stat} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Inbox Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-sm font-medium text-slate-500">Loading social leads...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-500" />
            <p className="text-sm font-bold text-slate-800">Failed to load leads</p>
            <p className="text-xs text-slate-500 max-w-md">
              There was an error communicating with the mock data store. Please check the mock adapter configuration.
            </p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
            <Search className="w-10 h-10 text-slate-300" />
            <p className="text-sm font-bold text-slate-800">No leads found</p>
            <p className="text-xs text-slate-500 max-w-sm">
              We couldn't find any leads matching your search query or filter selection. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200/80 text-slate-500 font-semibold">
                  <th className="py-3.5 px-6 font-semibold">Lead ID</th>
                  <th className="py-3.5 px-4 font-semibold">Name & Email</th>
                  <th className="py-3.5 px-4 font-semibold">Phone</th>
                  <th className="py-3.5 px-4 font-semibold">Source</th>
                  <th className="py-3.5 px-4 font-semibold">Campaign</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-6 font-semibold">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-500">
                      {lead.id}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                          {lead.name}
                        </span>
                        <span className="text-xs text-slate-400 mt-0.5">
                          {lead.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-650 font-medium text-xs">
                      {lead.phone}
                    </td>
                    <td className="py-4 px-4">
                      {renderSourceBadge(lead.source)}
                    </td>
                    <td className="py-4 px-4 text-slate-600 text-xs font-medium max-w-xs truncate">
                      {lead.campaign}
                    </td>
                    <td className="py-4 px-4">
                      {renderStatusBadge(lead.status)}
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs font-medium">
                      {formatDate(lead.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Metrics */}
        <div className="bg-slate-50/50 border-t border-slate-200/80 px-6 py-3.5 flex justify-between items-center text-xs text-slate-500 font-semibold">
          <div>
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
          <div>
            Last updated: Just Now
          </div>
        </div>
      </div>
    </div>
  );
}
