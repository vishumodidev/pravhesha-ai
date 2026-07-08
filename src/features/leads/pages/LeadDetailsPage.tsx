import { useParams } from 'react-router-dom';
import { useLeadDetails } from '../hooks/useLeadDetails';
import LeadHeader from '../components/LeadHeader/LeadHeader';
import LeadSummary from '../components/LeadSummary/LeadSummary';
import LeadStatus from '../components/LeadStatus/LeadStatus';
import LeadProfile from '../components/LeadProfile/LeadProfile';
import ActivityTimeline from '../../lead-activities/components/ActivityTimeline';
import LeadNotesSection from '../../lead-notes/components/LeadNotesSection';
import LeadTasksSection from '../../tasks/components/LeadTasksSection';
import LeadCommunicationsSection from '../../communication/components/LeadCommunicationsSection';
import DocumentsPanel from '../../documents/components/DocumentsPanel';
import { RefreshCw, AlertCircle } from 'lucide-react';

export default function LeadDetailsPage() {
  const { leadId } = useParams<{ leadId: string }>();
  const { data: lead, loading, error } = useLeadDetails(leadId || '');

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-3">
        <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Loading lead details...</p>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="flex flex-col items-center justify-center py-40 px-4 text-center space-y-3">
        <AlertCircle className="w-10 h-10 text-rose-500" />
        <p className="text-sm font-bold text-slate-800">Failed to load lead details</p>
        <p className="text-xs text-slate-500 max-w-md">
          We couldn't retrieve the details for lead ID "{leadId}". Please check the ID and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Lead Header */}
      <LeadHeader name={lead.name} leadNumber={lead.leadNumber} />

      {/* Lead Summary */}
      <LeadSummary name={lead.name} company={lead.company} assignedTo={lead.assignedTo} />

      {/* Lead Status & Priority */}
      <LeadStatus status={lead.status} priority={lead.priority} />

      {/* Profile Details */}
      <LeadProfile
        leadNumber={lead.leadNumber}
        name={lead.name}
        company={lead.company}
        email={lead.email}
        phone={lead.phone}
        source={lead.source}
        status={lead.status}
        priority={lead.priority}
        assignedTo={lead.assignedTo}
        createdAt={lead.createdAt}
      />

      {/* Timeline, Tasks and Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <ActivityTimeline leadId={lead.id} />
          <LeadCommunicationsSection leadId={lead.id} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <LeadTasksSection leadId={lead.id} />
          <LeadNotesSection leadId={lead.id} />
          <DocumentsPanel entityType="Lead" entityId={lead.id} />
        </div>
      </div>
    </div>
  );
}
