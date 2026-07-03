import { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  Search,
  Filter,
  Columns,
  MessageSquare,
  Smartphone,
  Mail,
  Globe,
  Plus,
  Send,
  Sparkles,
  Paperclip,
  Image,
  Link2,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface ChatMessage {
  sender: 'customer' | 'agent';
  name: string;
  avatar?: string;
  time: string;
  text: string;
}

interface TicketRecord {
  id: string;
  subject: string;
  category: string;
  customerName: string;
  customerEmail: string;
  source: 'Website' | 'Mobile App' | 'Email' | 'WhatsApp';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Pending' | 'Resolved';
  assignedAgent: string;
  agentAvatar: string;
  updatedTime: string;
  description: string;
  clientSince: string;
  totalClientTickets: number;
  messages: ChatMessage[];
}

const initialTickets: TicketRecord[] = [
  {
    id: 'TKT-1248',
    subject: 'Unable to login to account',
    category: 'Account Access',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@email.com',
    source: 'Website',
    priority: 'High',
    status: 'Open',
    assignedAgent: 'Priya Mehta',
    agentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
    updatedTime: '20 May, 10:30 AM',
    description: "I am unable to login to my account. It shows 'Invalid credentials' even though I am using the correct password.",
    clientSince: 'Apr 12, 2024',
    totalClientTickets: 5,
    messages: [
      { sender: 'customer', name: 'Rahul Sharma', time: 'May 20, 10:30 AM', text: "I am unable to login to my account. It shows 'Invalid credentials' even though I am using the correct password." },
      { sender: 'agent', name: 'Priya Mehta', time: 'May 20, 10:32 AM', text: 'Hi Rahul, sorry for the inconvenience. Let me check this for you. Could you try resetting your password?' },
      { sender: 'customer', name: 'Rahul Sharma', time: 'May 20, 10:34 AM', text: "I tried resetting, but didn't receive the password reset link email." },
      { sender: 'agent', name: 'Priya Mehta', time: 'May 20, 10:36 AM', text: 'I have resent the password reset link. Please check your inbox and spam folder.' }
    ]
  },
  {
    id: 'TKT-1247',
    subject: 'Payment not reflecting',
    category: 'Payments',
    customerName: 'Amit Verma',
    customerEmail: 'amit.verma@email.com',
    source: 'Mobile App',
    priority: 'High',
    status: 'In Progress',
    assignedAgent: 'Vikram Patel',
    agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    updatedTime: '20 May, 09:15 AM',
    description: "I made a payment of ₹15,000 for the Premium plan upgrade. The amount was debited, but my dashboard still shows the Standard plan.",
    clientSince: 'Mar 15, 2024',
    totalClientTickets: 2,
    messages: [
      { sender: 'customer', name: 'Amit Verma', time: 'May 20, 09:15 AM', text: 'I made a payment of ₹15,000 for the Premium plan upgrade. The amount was debited, but my dashboard still shows standard.' }
    ]
  },
  {
    id: 'TKT-1246',
    subject: 'Feature request: Dark mode',
    category: 'Feature Request',
    customerName: 'Sneha Iyer',
    customerEmail: 'sneha.iyer@email.com',
    source: 'Email',
    priority: 'Medium',
    status: 'Open',
    assignedAgent: 'Anjali Singh',
    agentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150',
    updatedTime: '20 May, 08:45 AM',
    description: "Our team works late at night and a dark mode interface would greatly reduce eye strain. Are there plans to implement this soon?",
    clientSince: 'May 01, 2024',
    totalClientTickets: 1,
    messages: [
      { sender: 'customer', name: 'Sneha Iyer', time: 'May 20, 08:45 AM', text: 'Our team works late at night and a dark mode interface would help. Are there plans for this?' }
    ]
  },
  {
    id: 'TKT-1245',
    subject: 'App crash on startup',
    category: 'Technical Issue',
    customerName: 'Dinesh Kumar',
    customerEmail: 'dinesh.kumar@email.com',
    source: 'Mobile App',
    priority: 'High',
    status: 'Open',
    assignedAgent: 'Rahul Desai',
    agentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150',
    updatedTime: '19 May, 07:30 PM',
    description: "The Android application crashes immediately on the loading splash screen. I tried reinstalling, but the issue persists.",
    clientSince: 'Jan 10, 2024',
    totalClientTickets: 8,
    messages: [
      { sender: 'customer', name: 'Dinesh Kumar', time: 'May 19, 07:30 PM', text: 'The Android application crashes immediately on startup. I tried reinstalling.' }
    ]
  }
];

export default function CustomerTickets() {
  const [tickets, setTickets] = useState<TicketRecord[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<TicketRecord>(initialTickets[0]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyMode, setReplyMode] = useState<'reply' | 'note'>('reply');

  const handleRowClick = (t: TicketRecord) => {
    setSelectedTicket(t);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg: ChatMessage = {
      sender: 'agent',
      name: 'Priya Mehta',
      time: 'Just now',
      text: replyText
    };

    const updated = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMsg]
    };

    setTickets((prev) => prev.map((t) => (t.id === selectedTicket.id ? updated : t)));
    setSelectedTicket(updated);
    setReplyText('');

    // Simulate Client response
    setTimeout(() => {
      const clientMsg: ChatMessage = {
        sender: 'customer',
        name: selectedTicket.customerName,
        time: 'Just now',
        text: "Thanks for the quick response. I'll test it out and let you know!"
      };
      const finalUpdated = {
        ...updated,
        messages: [...updated.messages, clientMsg]
      };
      setTickets((prev) => prev.map((t) => (t.id === selectedTicket.id ? finalUpdated : t)));
      setSelectedTicket(finalUpdated);
    }, 2500);
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'open') return matchesSearch && t.status === 'Open';
    if (activeTab === 'in-progress') return matchesSearch && t.status === 'In Progress';
    return matchesSearch;
  });

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Website':
        return <Globe size={13} className="text-slate-400" />;
      case 'Mobile App':
        return <Smartphone size={13} className="text-slate-400" />;
      case 'Email':
        return <Mail size={13} className="text-slate-400" />;
      default:
        return <MessageSquare size={13} className="text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0">
            Customer Tickets
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage, respond and resolve customer tickets efficiently.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm text-xs font-semibold text-slate-600">
            <Clock size={14} className="text-slate-400" />
            <span>May 15, 2024 - May 21, 2024</span>
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-1.5 rounded-xl shadow-sm text-xs font-bold text-slate-700 transition-colors">
            <Filter size={14} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold transition-all">
            <Plus size={14} />
            <span>New Ticket</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Tickets</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">1,248</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +18.6%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Open Tickets</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">320</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +16.3%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">In Progress</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">245</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +14.2%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Resolved</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">658</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +20.7%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Overdue</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">25</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingDown size={10} /> -8.3%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg. Resolution</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-bold text-slate-800">2h 45m</span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> +12.6%
            </span>
          </div>
        </div>
      </div>

      {/* Main Double Panel Workspace */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Side: Tickets Table */}
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Tickets', count: 1248 },
                { id: 'open', label: 'Open', count: 320 },
                { id: 'in-progress', label: 'In Progress', count: 245 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-[10.5px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
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
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/20 placeholder:text-slate-400 w-36 sm:w-44 focus:w-56 transition-all"
                />
              </div>
              <button className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl transition-all">
                <Columns size={14} />
              </button>
            </div>
          </div>

          {/* Table content */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-2 font-semibold w-4">
                    <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                  </th>
                  <th className="pb-2 font-semibold">Ticket ID</th>
                  <th className="pb-2 font-semibold">Subject</th>
                  <th className="pb-2 font-semibold">Customer</th>
                  <th className="pb-2 font-semibold">Source</th>
                  <th className="pb-2 font-semibold">Priority</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">Assigned To</th>
                  <th className="pb-2 font-semibold">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredTickets.map((t) => {
                  const isSelected = selectedTicket?.id === t.id;
                  return (
                    <tr
                      key={t.id}
                      onClick={() => handleRowClick(t)}
                      className={`hover:bg-indigo-50/20 cursor-pointer transition-colors ${
                        isSelected ? 'bg-indigo-50/40 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded text-indigo-600" />
                      </td>
                      <td className="py-3 font-semibold text-slate-500">#{t.id}</td>
                      <td className="py-3">
                        <span className="text-slate-800 font-bold block">{t.subject}</span>
                        <span className="text-[10px] text-slate-400 block">{t.category}</span>
                      </td>
                      <td className="py-3">
                        <span className="text-slate-800 font-bold block">{t.customerName}</span>
                        <span className="text-[10px] text-slate-400 block">{t.customerEmail}</span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          {getSourceIcon(t.source)}
                          <span className="text-slate-600">{t.source}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                          t.priority === 'High'
                            ? 'bg-rose-50 text-rose-600'
                            : t.priority === 'Medium'
                            ? 'bg-amber-50 text-amber-500'
                            : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                          t.status === 'Open'
                            ? 'bg-red-50 text-rose-600 border border-rose-100'
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1.5">
                          <img src={t.agentAvatar} alt={t.assignedAgent} className="w-5 h-5 rounded-full object-cover" />
                          <span className="text-slate-600">{t.assignedAgent}</span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-400">{t.updatedTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Chat Conversation Sidebar */}
        {selectedTicket && (
          <div className="w-full lg:w-96 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col shrink-0 overflow-hidden">
            {/* Header info */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500">Ticket #{selectedTicket.id}</span>
                <span className="px-2 py-0.5 text-[9px] bg-red-50 text-rose-600 rounded font-bold ml-2">Open</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                  selectedTicket.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-500'
                }`}>
                  {selectedTicket.priority} Priority
                </span>
              </div>
            </div>

            {/* Customer mini profile */}
            <div className="p-4 border-b border-slate-50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold text-sm border border-indigo-100">
                {selectedTicket.customerName.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-xs truncate leading-tight">{selectedTicket.customerName}</h4>
                <span className="text-[10px] text-slate-400 truncate block mt-0.5">{selectedTicket.customerEmail}</span>
                <span className="text-[9px] text-slate-400 mt-1 block">Customer since {selectedTicket.clientSince} • Tickets: {selectedTicket.totalClientTickets}</span>
              </div>
            </div>

            {/* Conversation Messages Box */}
            <div className="p-4 bg-slate-50/50 space-y-3 max-h-[220px] overflow-y-auto flex-1">
              {/* Ticket description as initial request */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm text-xs">
                <span className="text-[9px] text-indigo-600 font-bold uppercase tracking-wider block mb-1">Issue Description</span>
                <p className="text-slate-700 leading-relaxed font-medium">{selectedTicket.description}</p>
              </div>

              {/* Chat messages */}
              {selectedTicket.messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] ${
                    m.sender === 'agent' ? 'ml-auto items-end' : 'items-start'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl text-[11px] leading-relaxed ${
                    m.sender === 'agent'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 block px-1">{m.name} • {m.time}</span>
                </div>
              ))}
            </div>

            {/* Reply Options selector */}
            <div className="flex border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setReplyMode('reply')}
                className={`flex-1 py-1.5 text-center text-[10.5px] font-bold border-b-2 ${
                  replyMode === 'reply' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'
                }`}
              >
                Reply to Customer
              </button>
              <button
                onClick={() => setReplyMode('note')}
                className={`flex-1 py-1.5 text-center text-[10.5px] font-bold border-b-2 ${
                  replyMode === 'note' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'
                }`}
              >
                Add Internal Note
              </button>
            </div>

            {/* Editor */}
            <form onSubmit={handleSendReply} className="p-3 border-t border-slate-100 bg-white">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-1 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                <textarea
                  placeholder={replyMode === 'reply' ? 'Type your response here...' : 'Write internal note...'}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-transparent px-3 py-2 text-xs focus:outline-none resize-none h-16 placeholder:text-slate-400"
                />
                <div className="flex items-center justify-between border-t border-slate-200/50 pt-1.5 px-2">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <button type="button" className="hover:text-slate-600 p-0.5 rounded"><Paperclip size={13} /></button>
                    <button type="button" className="hover:text-slate-600 p-0.5 rounded"><Image size={13} /></button>
                    <button type="button" className="hover:text-slate-600 p-0.5 rounded"><Link2 size={13} /></button>
                  </div>
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Send Reply</span>
                    <Send size={11} />
                  </button>
                </div>
              </div>
            </form>

            {/* AI Reply Suggestions */}
            <div className="p-3 border-t border-slate-100 bg-slate-50/50">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <Sparkles size={11} className="text-indigo-600 animate-float" />
                AI Smart Replies
              </span>
              <div className="flex flex-col gap-1">
                {[
                  { text: 'Send reset instructions email link', action: 'reset-pwd' },
                  { text: 'Verify email registration metadata', action: 'verify' },
                  { text: 'Escalate ticket to Technical L2 Support team', action: 'escalate' }
                ].map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setReplyText(`I will assist you in triggering the: ${sug.text}.`)}
                    className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all text-left truncate"
                  >
                    💡 {sug.text}
                  </button>
                ))}
              </div>
            </div>

            {/* SLA Statistics Footer */}
            <div className="p-3 border-t border-slate-100 bg-white grid grid-cols-2 gap-3 text-[10px] text-slate-400">
              <div>
                <span>First Response Time</span>
                <span className="font-bold text-slate-700 block mt-0.5">10m (SLA Met)</span>
              </div>
              <div>
                <span>SLA Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                  <CheckCircle2 size={10} /> In Progress
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
