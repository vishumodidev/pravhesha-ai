import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AICopilot from '../components/AICopilot';
import { useClientStore } from '../app/useClientStore';

export default function DashboardLayout() {
  const { copilotOpen, setCopilotOpen } = useClientStore();
  const [searchQuery, setSearchQuery] = useState('');

  const openCopilot = () => setCopilotOpen(true);
  const closeCopilot = () => setCopilotOpen(false);

  return (
    <div className="flex bg-[#f8fafc] min-h-screen text-slate-800">
      {/* Sidebar Navigation */}
      <Sidebar openCopilot={openCopilot} />

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
          <Outlet context={{ searchQuery }} />
        </main>
      </div>

      {/* Slide-out AI Copilot Panel */}
      <AICopilot isOpen={copilotOpen} onClose={closeCopilot} />
    </div>
  );
}
