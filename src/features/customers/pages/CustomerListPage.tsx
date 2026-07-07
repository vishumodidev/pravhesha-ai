import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../hooks/useCustomers';
import { Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';

export default function CustomerListPage() {
  const navigate = useNavigate();
  const { data: customers, loading, error } = useCustomers();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  // Industry options
  const industries = useMemo(() => {
    const list = new Set(customers.map((c) => c.industry));
    return ['All', ...Array.from(list)];
  }, [customers]);

  const statuses = ['All', 'Active', 'At Risk', 'Inactive'];

  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      const matchesSearch =
        cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.customerCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === 'All' || cust.status === selectedStatus;
      const matchesIndustry = selectedIndustry === 'All' || cust.industry === selectedIndustry;

      return matchesSearch && matchesStatus && matchesIndustry;
    });
  }, [customers, searchQuery, selectedStatus, selectedIndustry]);

  // Status Badge styles
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'At Risk':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Inactive':
      default:
        return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  };

  // Render initials avatar for Account Manager
  const renderAvatar = (name: string) => {
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    return (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-650 shrink-0">
          {initials}
        </div>
        <span className="text-xs font-semibold text-slate-700">{name}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight m-0">
            Customers Database
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Browse and manage all registered customer accounts.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2 self-start">
          <span className="text-xs font-bold text-indigo-700">Total Customers:</span>
          <span className="font-mono text-sm font-extrabold text-indigo-800">{customers.length}</span>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by code, name, company, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400 bg-slate-50/50"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Dropdown */}
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

          {/* Industry Dropdown */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 w-full sm:w-auto">
            <Filter size={14} className="text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Industry:</span>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Customers Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-sm font-medium text-slate-500">Loading customers...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-500" />
            <p className="text-sm font-bold text-slate-800">Failed to load customers</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
            <Search className="w-10 h-10 text-slate-300" />
            <p className="text-sm font-bold text-slate-800">No customers found</p>
            <p className="text-xs text-slate-500">
              Try adjusting your search queries or filter selectors.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200/80 text-slate-500 font-semibold">
                  <th className="py-3.5 px-6 font-semibold">Customer Code</th>
                  <th className="py-3.5 px-4 font-semibold">Name & Email</th>
                  <th className="py-3.5 px-4 font-semibold">Company</th>
                  <th className="py-3.5 px-4 font-semibold">Industry</th>
                  <th className="py-3.5 px-4 font-semibold">Phone</th>
                  <th className="py-3.5 px-4 font-semibold">Account Manager</th>
                  <th className="py-3.5 px-6 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    onClick={() => navigate(`/dashboard/customers/${cust.id}`)}
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                  >
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-500">
                      {cust.customerCode}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-sm">
                          {cust.name}
                        </span>
                        <span className="text-xs text-slate-400 mt-0.5">
                          {cust.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium text-xs">
                      {cust.company}
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-medium text-xs">
                      {cust.industry}
                    </td>
                    <td className="py-4 px-4 text-slate-505 text-xs font-medium">
                      {cust.phone}
                    </td>
                    <td className="py-4 px-4">
                      {renderAvatar(cust.accountManager)}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusClasses(cust.status)}`}>
                        {cust.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
