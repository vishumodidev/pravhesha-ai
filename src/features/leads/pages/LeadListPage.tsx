import { useState, useMemo } from 'react';
import { useLeads } from '../hooks/useLeads';
import type { Lead } from '../types/Lead';
import { Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';

export default function LeadListPage() {
  const { data: leads, loading, error } = useLeads();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');

  // Filter options
  const sources = ['All', 'Website', 'LinkedIn', 'Facebook', 'Instagram', 'Google Ads', 'WhatsApp'];
  const statuses = ['All', 'New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];
  const priorities = ['All', 'Low', 'Medium', 'High'];

  // Client-side filtering logic
  const filteredLeads = useMemo(() => {
    return leads.filter((lead: Lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.leadNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSource = selectedSource === 'All' || lead.source === selectedSource;
      const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;
      const matchesPriority = selectedPriority === 'All' || lead.priority === selectedPriority;

      return matchesSearch && matchesSource && matchesStatus && matchesPriority;
    });
  }, [leads, searchQuery, selectedSource, selectedStatus, selectedPriority]);

  // Status Badge styles
  const renderStatusBadge = (status: string) => {
    let classes = '';
    switch (status) {
      case 'New':
        classes = 'bg-blue-50 text-blue-700 border-blue-200';
        break;
      case 'Contacted':
        classes = 'bg-purple-50 text-purple-700 border-purple-200';
        break;
      case 'Qualified':
        classes = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        break;
      case 'Proposal Sent':
        classes = 'bg-amber-50 text-amber-700 border-amber-200';
        break;
      case 'Won':
        classes = 'bg-teal-50 text-teal-700 border-teal-200';
        break;
      case 'Lost':
        classes = 'bg-rose-50 text-rose-700 border-rose-200';
        break;
      default:
        classes = 'bg-slate-50 text-slate-700 border-slate-200';
        break;
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${classes}`}>
        {status}
      </span>
    );
  };

  // Source Badge styles
  const renderSourceBadge = (source: string) => {
    let classes = '';
    switch (source) {
      case 'Facebook':
        classes = 'bg-blue-50 text-blue-600 border-blue-100';
        break;
      case 'Instagram':
        classes = 'bg-rose-50 text-rose-600 border-rose-100';
        break;
      case 'LinkedIn':
        classes = 'bg-sky-50 text-sky-700 border-sky-100';
        break;
      case 'WhatsApp':
        classes = 'bg-emerald-50 text-emerald-600 border-emerald-100';
        break;
      case 'Google Ads':
        classes = 'bg-amber-50 text-amber-700 border-amber-100';
        break;
      case 'Website':
      default:
        classes = 'bg-slate-50 text-slate-600 border-slate-200';
        break;
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${classes}`}>
        {source}
      </span>
    );
  };

  // Priority Badge styles
  const renderPriorityBadge = (priority: string) => {
    let classes = '';
    switch (priority) {
      case 'High':
        classes = 'bg-red-50 text-red-700 border-red-200';
        break;
      case 'Medium':
        classes = 'bg-amber-50 text-amber-700 border-amber-200';
        break;
      case 'Low':
      default:
        classes = 'bg-slate-50 text-slate-500 border-slate-200';
        break;
    }

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${classes}`}>
        {priority}
      </span>
    );
  };

  // Assigned To Avatar renderer
  const renderAvatar = (name: string) => {
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    return (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0">
          {initials}
        </div>
        <span className="text-slate-700 font-medium text-xs">{name}</span>
      </div>
    );
  };

  // Date formatter
  const formatDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-808 tracking-tight flex items-center gap-2 m-0 text-left">
            CRM Leads
          </h2>
          <p className="text-sm text-slate-500 mt-1 text-left">
            Monitor qualification progress and sales process for all accepted leads.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-sm text-xs font-semibold text-slate-600">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>Active CRM Leads</span>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col xl:flex-row gap-4 items-center justify-between">
        <div className="relative w-full xl:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, name, company or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full xl:w-auto">
          {/* Status Dropdown */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 w-full sm:w-auto">
            <Filter size={14} className="text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-707 focus:outline-none cursor-pointer"
            >
              {statuses.map((stat) => (
                <option key={stat} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
          </div>

          {/* Source Dropdown */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 w-full sm:w-auto">
            <Filter size={14} className="text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Source:</span>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-707 focus:outline-none cursor-pointer"
            >
              {sources.map((src) => (
                <option key={src} value={src}>
                  {src}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Dropdown */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 w-full sm:w-auto">
            <Filter size={14} className="text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Priority:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-707 focus:outline-none cursor-pointer"
            >
              {priorities.map((prio) => (
                <option key={prio} value={prio}>
                  {prio}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main CRM Leads Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-sm font-medium text-slate-500">Loading CRM leads...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-500" />
            <p className="text-sm font-bold text-slate-800">Failed to load CRM leads</p>
            <p className="text-xs text-slate-500 max-w-md">
              There was an error communicating with the crm leads endpoint. Please check the mock adapter configuration.
            </p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
            <Search className="w-10 h-10 text-slate-300" />
            <p className="text-sm font-bold text-slate-800">No CRM leads found</p>
            <p className="text-xs text-slate-500 max-w-sm">
              We couldn't find any CRM leads matching your search query or filter selection. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200/80 text-slate-500 font-semibold">
                  <th className="py-3.5 px-6 font-semibold">Lead Number</th>
                  <th className="py-3.5 px-4 font-semibold">Name & Email</th>
                  <th className="py-3.5 px-4 font-semibold">Company</th>
                  <th className="py-3.5 px-4 font-semibold">Source</th>
                  <th className="py-3.5 px-4 font-semibold">Priority</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Assigned To</th>
                  <th className="py-3.5 px-6 font-semibold">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-500">
                      {lead.leadNumber}
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
                      {lead.company}
                    </td>
                    <td className="py-4 px-4">
                      {renderSourceBadge(lead.source)}
                    </td>
                    <td className="py-4 px-4">
                      {renderPriorityBadge(lead.priority)}
                    </td>
                    <td className="py-4 px-4">
                      {renderStatusBadge(lead.status)}
                    </td>
                    <td className="py-4 px-4">
                      {renderAvatar(lead.assignedTo)}
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
