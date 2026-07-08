import { useParams } from 'react-router-dom';
import { useCustomerDetails } from '../hooks/useCustomerDetails';
import CustomerHeader from '../components/CustomerHeader/CustomerHeader';
import CustomerSummary from '../components/CustomerSummary/CustomerSummary';
import CustomerStatus from '../components/CustomerStatus/CustomerStatus';
import CustomerProfile from '../components/CustomerProfile/CustomerProfile';
import CustomerContacts from '../components/CustomerContacts/CustomerContacts';
import DocumentsPanel from '../../documents/components/DocumentsPanel';
import { RefreshCw, AlertCircle } from 'lucide-react';

export default function CustomerDetailsPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const { data: customer, loading, error } = useCustomerDetails(customerId || '');

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-3">
        <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Loading customer workspace...</p>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="flex flex-col items-center justify-center py-40 px-4 text-center space-y-3">
        <AlertCircle className="w-10 h-10 text-rose-500" />
        <p className="text-sm font-bold text-slate-800">Failed to load customer workspace</p>
        <p className="text-xs text-slate-500 max-w-md">
          We couldn't retrieve the details for customer ID "{customerId}". Please check the ID and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Customer Header */}
      <CustomerHeader name={customer.name} customerCode={customer.customerCode} />

      {/* Customer Summary Card */}
      <CustomerSummary
        name={customer.name}
        company={customer.company}
        accountManager={customer.accountManager}
      />

      {/* Customer Status */}
      <CustomerStatus status={customer.status} />

      {/* Customer Profile Info */}
      <CustomerProfile
        customerCode={customer.customerCode}
        industry={customer.industry}
        accountManager={customer.accountManager}
        createdAt={customer.createdAt}
      />

      {/* Contact Details */}
      <CustomerContacts
        name={customer.name}
        company={customer.company}
        email={customer.email}
        phone={customer.phone}
        address={customer.address}
      />

      {/* Document Management Section */}
      <DocumentsPanel entityType="Customer" entityId={customer.id} />
    </div>
  );
}
