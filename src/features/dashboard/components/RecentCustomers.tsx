import type { RecentCustomer } from '../types';

interface RecentCustomersProps {
  customers: RecentCustomer[];
  onViewAllClick: () => void;
}

export default function RecentCustomers({ customers, onViewAllClick }: RecentCustomersProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-sm m-0">Recent Customers</h3>
        <button
          className="text-xs text-indigo-600 font-bold hover:underline"
          onClick={onViewAllClick}
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100">
              <th className="pb-2 font-semibold">Customer</th>
              <th className="pb-2 font-semibold">Company</th>
              <th className="pb-2 font-semibold">Plan</th>
              <th className="pb-2 font-semibold">Joined On</th>
              <th className="pb-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {customers.map((c, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="py-2.5 font-semibold text-slate-800">{c.name}</td>
                <td className="py-2.5 text-slate-550">{c.company}</td>
                <td className="py-2.5 text-slate-550">{c.plan}</td>
                <td className="py-2.5 text-slate-400">{c.joined}</td>
                <td className="py-2.5">
                  <span className="px-2 py-0.5 text-[10px] bg-emerald-50 text-emerald-600 rounded-md font-bold">
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
