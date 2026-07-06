import { useState, useEffect } from 'react';
import {
  Phone,
  PhoneCall,
  Search,
  Filter,
  Columns,
  MessageSquare,
  Plus,
  Play,
  Pause,
  Download,
  Volume2,
  Calendar,
  Sparkles,
  TrendingUp,
  TrendingDown,
  CheckSquare
} from 'lucide-react';
import { useCalling } from '../hooks/useCalling';
import type { CallRecord } from '../types';

export default function CallLogsPage() {
  const { calls, isLoading, placeCall } = useCalling();
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Audio player simulation
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(30); // 30% progress
  const [audioTimer, setAudioTimer] = useState('01:57');
  const [sidebarTab, setSidebarTab] = useState<'summary' | 'recording'>('summary');

  useEffect(() => {
    if (calls.length > 0 && !selectedCall) {
      setSelectedCall(calls[0]);
    }
  }, [calls, selectedCall]);

  const handleRowClick = (call: CallRecord) => {
    setSelectedCall(call);
    setIsPlaying(false);
    setAudioProgress(0);
    setAudioTimer('00:00');
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const filteredCalls = calls.filter((c) => {
    const matchesSearch =
      c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'inbound') return matchesSearch && c.type === 'Inbound';
    if (activeTab === 'outbound') return matchesSearch && c.type === 'Outbound';
    if (activeTab === 'missed') return matchesSearch && c.status === 'Missed';
    return matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-650 rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Loading call logs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0 text-left">
            Call Logs
          </h2>
          <p className="text-sm text-slate-500 mt-1 text-left">
            Track, analyze and manage all your call interactions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm text-xs font-semibold text-slate-600">
            <Calendar size={14} className="text-slate-400" />
            <span>May 15, 2024 - May 21, 2024</span>
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-1.5 rounded-xl shadow-sm text-xs font-bold text-slate-707 transition-colors">
            <Filter size={14} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold transition-all">
            <PhoneCall size={14} />
            <span>Phone Settings</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Calls</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">1,248</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +18.6%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Answered Calls</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">892</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +16.2%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Missed Calls</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">356</span>
            <span className="text-[9px] text-rose-500 font-bold flex items-center gap-0.5">
              <TrendingDown size={10} /> -8.4%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Duration</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">05m 42s</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +12.6%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Unique Contacts</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">628</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +14.7%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Connection Rate</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">71.5%</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +9.3%
            </span>
          </div>
        </div>
      </div>

      {/* Main Double Panel Workspace */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Side: Call List Table */}
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Calls', count: calls.length },
                { id: 'inbound', label: 'Inbound', count: calls.filter(c => c.type === 'Inbound').length },
                { id: 'outbound', label: 'Outbound', count: calls.filter(c => c.type === 'Outbound').length },
                { id: 'missed', label: 'Missed', count: calls.filter(c => c.status === 'Missed').length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-[10.5px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-indigo-650 shadow-sm'
                      : 'text-slate-550 hover:text-slate-800'
                  }`}
                >
                  {tab.label} <span className="opacity-60 text-[9px]">({tab.count})</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search calls..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/20 placeholder:text-slate-400 w-36 sm:w-44 focus:w-56 transition-all"
                />
              </div>
              <button className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 rounded-xl transition-all">
                <Columns size={14} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-2 font-semibold w-4">
                    <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                  </th>
                  <th className="pb-2 font-semibold">Call Info</th>
                  <th className="pb-2 font-semibold">Contact</th>
                  <th className="pb-2 font-semibold">Type</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">Duration</th>
                  <th className="pb-2 font-semibold">Team Member</th>
                  <th className="pb-2 font-semibold">Date & Time</th>
                  <th className="pb-2 font-semibold">Recording</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredCalls.map((c) => {
                  const isSelected = selectedCall?.id === c.id;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => handleRowClick(c)}
                      className={`hover:bg-indigo-50/20 cursor-pointer transition-colors ${
                        isSelected ? 'bg-indigo-50/40 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                      </td>
                      <td className="py-3 text-left">
                        <span className="text-slate-800 font-bold block">{c.phone}</span>
                        <span className="text-[10px] text-slate-400 block">{c.location}</span>
                      </td>
                      <td className="py-3 text-left">
                        <span className="text-slate-808 font-bold block">{c.contactName}</span>
                        <span className="text-[10px] text-slate-404 block">{c.company}</span>
                      </td>
                      <td className="py-3 text-left">
                        <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                          c.type === 'Inbound' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {c.type}
                        </span>
                      </td>
                      <td className="py-3 text-left">
                        <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                          c.status === 'Answered' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-505 font-medium text-left">{c.duration}</td>
                      <td className="py-3 text-left">
                        <div className="flex items-center gap-1.5">
                          <img src={c.agentAvatar} alt={c.agentName} className="w-5 h-5 rounded-full object-cover" />
                          <span className="text-slate-606">{c.agentName}</span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-404 text-left">{c.dateTime}</td>
                      <td className="py-3 text-left" onClick={(e) => e.stopPropagation()}>
                        {c.recordingLength !== '—' ? (
                          <button
                            onClick={() => {
                              handleRowClick(c);
                              togglePlayback();
                            }}
                            className="flex items-center gap-1 text-[10px] bg-slate-50 border border-slate-200 px-2 py-1 rounded hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all font-bold cursor-pointer"
                          >
                            <Play size={10} className="fill-current" />
                            <span>{c.recordingLength}</span>
                          </button>
                        ) : (
                          <span className="text-slate-404">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Interactive Call Details Sidebar */}
        {selectedCall && (
          <div className="w-full lg:w-80 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden shrink-0 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call Details</span>
              <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                selectedCall.status === 'Answered' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {selectedCall.status}
              </span>
            </div>

            {/* Profile Info Card */}
            <div className="p-4 flex flex-col items-center text-center border-b border-slate-50">
              <div className="w-14 h-14 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-extrabold text-lg shadow-md mb-2">
                {selectedCall.contactName.split(' ').map((n) => n[0]).join('')}
              </div>
              <h3 className="font-bold text-slate-808 text-sm m-0">{selectedCall.contactName}</h3>
              <span className="text-[10px] text-indigo-600 font-semibold mt-0.5">{selectedCall.company}</span>
              <span className="text-[10px] text-slate-404 mt-1 block">{selectedCall.phone} • {selectedCall.location}</span>

              {/* Actions Grid */}
              <div className="grid grid-cols-4 gap-2 w-full mt-4">
                <button
                  onClick={() => placeCall(selectedCall.phone)}
                  className="flex flex-col items-center p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-800"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mb-1">
                    <Phone size={14} />
                  </div>
                  <span className="text-[9px] font-bold">Call</span>
                </button>
                <button className="flex flex-col items-center p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 hover:text-emerald-600">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
                    <MessageSquare size={14} />
                  </div>
                  <span className="text-[9px] font-bold">WhatsApp</span>
                </button>
                <button className="flex flex-col items-center p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mb-1">
                    <Plus size={14} />
                  </div>
                  <span className="text-[9px] font-bold">Add Note</span>
                </button>
                <button className="flex flex-col items-center p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 hover:text-indigo-600">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-1">
                    <CheckSquare size={14} />
                  </div>
                  <span className="text-[9px] font-bold">Ticket</span>
                </button>
              </div>
            </div>

            {/* Sidebar Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setSidebarTab('summary')}
                className={`flex-1 py-2 text-center text-xs font-bold transition-all border-b-2 ${
                  sidebarTab === 'summary'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-404 hover:text-slate-600'
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setSidebarTab('recording')}
                className={`flex-1 py-2 text-center text-xs font-bold transition-all border-b-2 ${
                  sidebarTab === 'recording'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-404 hover:text-slate-600'
                }`}
                disabled={selectedCall.status === 'Missed'}
              >
                Recording
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-4 flex-1 overflow-y-auto max-h-[300px]">
              {sidebarTab === 'summary' && (
                <div className="space-y-4 text-xs text-left">
                  {/* AI summary */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-xl border border-indigo-100">
                    <span className="font-bold text-indigo-800 flex items-center gap-1.5 mb-1.5">
                      <Sparkles size={12} className="text-indigo-600 animate-float" />
                      AI Call Summary
                    </span>
                    <p className="text-slate-605 leading-relaxed text-[11px] font-medium">{selectedCall.aiSummary}</p>
                  </div>

                  {/* Key points */}
                  <div>
                    <span className="font-bold text-slate-808 block mb-2">Key Points</span>
                    <ul className="space-y-1.5 pl-0">
                      {selectedCall.keyPoints.map((pt: string, i: number) => (
                        <li key={i} className="flex gap-1.5 items-start text-slate-605 text-[11px] leading-relaxed">
                          <span className="text-indigo-500 font-extrabold mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Next actions */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <span className="font-bold text-slate-808">Suggested Next Action</span>
                    <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-emerald-50 cursor-pointer">
                      <Calendar size={13} />
                      <span>{selectedCall.nextAction}</span>
                    </button>
                  </div>
                </div>
              )}

              {sidebarTab === 'recording' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center">
                    {/* Simulated Waveform graphic */}
                    <div className="h-10 w-full flex items-center justify-center gap-0.5 mb-3 px-2">
                      {[15, 30, 25, 45, 12, 8, 38, 22, 60, 32, 10, 48, 14, 55, 30, 42, 20, 28, 52, 18].map((h, i) => {
                        const isPlayed = i < (audioProgress / 5);
                        return (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all duration-300 ${
                              isPlayed ? 'bg-indigo-600' : 'bg-slate-200'
                            }`}
                            style={{ height: `${h * 0.6}px` }}
                          />
                        );
                      })}
                    </div>

                    {/* Progress Slider */}
                    <div className="w-full flex items-center justify-between text-[10px] text-slate-400 mb-2">
                      <span>{audioTimer}</span>
                      <span>{selectedCall.recordingLength}</span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={audioProgress}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setAudioProgress(val);
                        const mins = Math.floor((val / 100) * 6);
                        const secs = Math.floor(((val / 100) * 6 % 1) * 60);
                        setAudioTimer(`0${mins}:${secs < 10 ? '0' + secs : secs}`);
                      }}
                      className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-3"
                    />

                    {/* Player buttons */}
                    <div className="flex items-center gap-4 w-full justify-center">
                      <button className="text-slate-400 hover:text-slate-650 p-1">
                        <Volume2 size={16} />
                      </button>
                      <button
                        onClick={togglePlayback}
                        className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                      >
                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} className="translate-x-0.5" fill="currentColor" />}
                      </button>
                      <button className="text-slate-400 hover:text-slate-650 p-1" title="Download recording">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-404 space-y-1 text-left">
                    <div className="flex justify-between">
                      <span>Call ID:</span>
                      <span className="font-mono text-slate-606">CL-20240521-{selectedCall.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Connection:</span>
                      <span className="text-slate-606">Direct Route ({selectedCall.source})</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
