import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AICopilot from './components/AICopilot';
import Overview from './views/Overview';
import VisitorIntelligence from './views/VisitorIntelligence';
import SocialLeads from './views/SocialLeads';
import AITraining from './views/AITraining';
import Leads from './views/Leads';
import Customers from './views/Customers';
import CustomerTickets from './views/CustomerTickets';
import CallLogs from './views/CallLogs';
import WhatsApp from './views/WhatsApp';
import FollowUps from './views/FollowUps';
import Scheduling from './views/Scheduling';
import Analytics from './views/Analytics';
import Notifications from './views/Notifications';
import UserManagement from './views/UserManagement';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [copilotOpen, setCopilotOpen] = useState(false);

  const openCopilot = () => setCopilotOpen(true);
  const closeCopilot = () => setCopilotOpen(false);

  // Renders the appropriate view based on the current active tab
  const renderView = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview setActiveTab={setActiveTab} />;
      case 'visitor-intelligence':
        return <VisitorIntelligence />;
      case 'social-leads':
        return <SocialLeads />;
      case 'ai-training':
        return <AITraining />;
      case 'leads':
        return <Leads />;
      case 'customers':
        return <Customers />;
      case 'customer-tickets':
        return <CustomerTickets />;
      case 'call-logs':
        return <CallLogs />;
      case 'whatsapp':
        return <WhatsApp />;
      case 'follow-ups':
        return <FollowUps />;
      case 'scheduling':
        return <Scheduling />;
      case 'analytics':
        return <Analytics />;
      case 'notifications':
        return <Notifications />;
      case 'user-management':
        return <UserManagement />;
      default:
        return (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-2xl mx-auto my-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-md animate-float">
              <Sparkles size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                {activeTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Module
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
                This section is currently being integrated with the live PRAVESHA™ AI background microservices. Use the AI Copilot on the right to simulate queries about this module!
              </p>
            </div>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={openCopilot}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <Sparkles size={14} />
                <span>Ask AI Copilot</span>
              </button>
              <button
                onClick={() => setActiveTab('overview')}
                className="px-4 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all"
              >
                Go Back to Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex bg-[#f8fafc] min-h-screen text-slate-800">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openCopilot={openCopilot}
      />

      {/* Main Core Dashboard Content Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          openCopilot={openCopilot}
        />

        {/* Dynamic Viewport */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderView()}
        </main>
      </div>

      {/* Slide-out AI Copilot Panel */}
      <AICopilot isOpen={copilotOpen} onClose={closeCopilot} />
    </div>
  );
}
