import { useState } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  FileText,
  Plus
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'customer' | 'agent';
  text: string;
  time: string;
  fileName?: string;
  fileSize?: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatSession {
  id: string;
  name: string;
  phone: string;
  location: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  email: string;
  clientSince: string;
  status: 'Open' | 'Closed';
  aiScore: number;
  aiInsights: {
    intent: string;
    suggestedReply: string;
  };
  messages: ChatMessage[];
}

const initialChats: ChatSession[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    avatar: '',
    lastMessage: "Hi, I'm interested in the Enterprise plan.",
    time: '10:30 AM',
    unreadCount: 2,
    email: 'rahul.sharma@email.com',
    clientSince: 'Apr 12, 2024',
    status: 'Open',
    aiScore: 85,
    aiInsights: {
      intent: 'Interested in Enterprise Plan',
      suggestedReply: 'Share calendar demo booking link'
    },
    messages: [
      { id: '1', sender: 'customer', text: "Hi, I saw your ad on LinkedIn and I'm interested in the Enterprise plan.", time: '10:21 AM' },
      { id: '2', sender: 'agent', text: 'Hi Rahul! 👋 Thanks for reaching out. Our Enterprise plan includes advanced analytics, priority support and custom integrations.', time: '10:22 AM', status: 'read' },
      { id: '3', sender: 'customer', text: 'That sounds good. Can you share the pricing and implementation timeline?', time: '10:24 AM' },
      { id: '4', sender: 'agent', text: 'Here is the pricing and plan details.', time: '10:25 AM', fileName: 'Enterprise_Plan_Details.pdf', fileSize: '1.2 MB', status: 'read' },
      { id: '5', sender: 'customer', text: 'Thanks for the info! Please share a demo link so we can discuss with our team.', time: '10:30 AM' }
    ]
  },
  {
    id: '2',
    name: 'Priya Mehta',
    phone: '+91 91234 56789',
    location: 'Mumbai, India',
    avatar: '',
    lastMessage: 'Thanks for the info! Please share pricing.',
    time: '10:15 AM',
    unreadCount: 1,
    email: 'priya@mehta.com',
    clientSince: 'Mar 15, 2024',
    status: 'Open',
    aiScore: 78,
    aiInsights: {
      intent: 'Requesting WhatsApp pricing model',
      suggestedReply: 'Send Standard pricing sheets link'
    },
    messages: [
      { id: '1', sender: 'customer', text: 'Hello, looking for details on WhatsApp broadcasting rules.', time: '10:10 AM' },
      { id: '2', sender: 'agent', text: 'Broadcasting allows up to 100k messages daily under standard templates.', time: '10:12 AM', status: 'read' },
      { id: '3', sender: 'customer', text: 'Thanks for the info! Please share pricing.', time: '10:15 AM' }
    ]
  },
  {
    id: '3',
    name: 'Amit Verma',
    phone: '+91 99876 54321',
    location: 'Delhi, India',
    avatar: '',
    lastMessage: 'Can we schedule a demo tomorrow?',
    time: '09:58 AM',
    unreadCount: 0,
    email: 'amit@verma.com',
    clientSince: 'May 01, 2024',
    status: 'Open',
    aiScore: 65,
    aiInsights: {
      intent: 'Inquiring demo availability',
      suggestedReply: 'Share booking calendar invite'
    },
    messages: [
      { id: '1', sender: 'customer', text: 'Can we schedule a demo tomorrow?', time: '09:58 AM' }
    ]
  }
];

export default function WhatsApp() {
  const [chats, setChats] = useState<ChatSession[]>(initialChats);
  const [selectedChat, setSelectedChat] = useState<ChatSession>(initialChats[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'agent',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMsg],
      lastMessage: inputText,
      time: 'Just now'
    };

    setChats((prev) => prev.map((c) => (c.id === selectedChat.id ? updatedChat : c)));
    setSelectedChat(updatedChat);
    setInputText('');

    // Simulate double blue tick and client response
    setTimeout(() => {
      const deliveredMsg = {
        ...newMsg,
        status: 'read' as const
      };
      const readUpdated = {
        ...updatedChat,
        messages: updatedChat.messages.map((m) => (m.id === newMsg.id ? deliveredMsg : m))
      };
      setChats((prev) => prev.map((c) => (c.id === selectedChat.id ? readUpdated : c)));
      setSelectedChat(readUpdated);
    }, 1500);

    setTimeout(() => {
      const clientReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'customer',
        text: 'Got it, looking forward to it!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const finalUpdated = {
        ...updatedChat,
        messages: [...updatedChat.messages, newMsg, clientReply],
        unreadCount: 0
      };
      setChats((prev) => prev.map((c) => (c.id === selectedChat.id ? finalUpdated : c)));
      setSelectedChat(finalUpdated);
    }, 3000);
  };

  const handleSmartReply = (reply: string) => {
    setInputText(reply);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0">
            WhatsApp Hub
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage WhatsApp conversations and engage with your leads & customers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-1.5 rounded-xl shadow-sm text-xs font-bold text-slate-700 transition-colors">
            <MessageSquare size={14} />
            <span>Broadcast</span>
          </button>
          <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold transition-all shadow-indigo-100">
            <Plus size={14} />
            <span>Connect WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { title: 'Total Conversations', val: '1,248' },
          { title: 'New Conversations', val: '320' },
          { title: 'Open Conversations', val: '894' },
          { title: 'Closed Conversations', val: '354' },
          { title: 'Avg. Response Time', val: '02m 18s' },
          { title: 'Resolution Rate', val: '72.4%' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{item.title}</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-base font-bold text-slate-800 block">{item.val}</span>
              <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▲ +18.6% vs last 7d</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main chat window split panel */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch h-[560px]">
        {/* Left: Chats list */}
        <div className="w-full lg:w-72 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col p-4 space-y-4 shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm m-0">Conversations</h3>
            <button className="p-1 hover:bg-slate-50 rounded">
              <Filter size={14} className="text-slate-400" />
            </button>
          </div>

          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search chat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5">
            {filteredChats.map((c) => {
              const isSelected = selectedChat.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedChat(c)}
                  className={`flex gap-2.5 p-2 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors ${
                    isSelected ? 'bg-indigo-50/50 border border-indigo-100/50' : 'border border-transparent'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-550/10 text-indigo-650 flex items-center justify-center font-bold text-xs shrink-0">
                    {c.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline leading-none">
                      <span className="font-bold text-slate-700 text-xs truncate">{c.name}</span>
                      <span className="text-[9px] text-slate-400">{c.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-1.5 leading-tight">{c.lastMessage}</p>
                  </div>
                  {c.unreadCount > 0 && (
                    <span className="w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 self-center">
                      {c.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle: Chat bubble stream */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
          {/* Header */}
          <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                {selectedChat.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 leading-tight m-0">{selectedChat.name}</h4>
                <span className="text-[9.5px] text-slate-400 block mt-0.5">{selectedChat.phone} • {selectedChat.location}</span>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-650 p-1">
              <MoreVertical size={16} />
            </button>
          </div>

          {/* Chat Stream timeline */}
          <div className="flex-1 p-4 bg-slate-50/20 overflow-y-auto space-y-4">
            <div className="text-center">
              <span className="px-2 py-0.5 bg-slate-200/50 text-slate-500 text-[9px] font-bold rounded-md">Yesterday</span>
            </div>

            {selectedChat.messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col max-w-[70%] ${
                  m.sender === 'agent' ? 'ml-auto items-end' : 'items-start'
                }`}
              >
                <div className={`p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
                  m.sender === 'agent'
                    ? 'bg-emerald-50 text-slate-700 border border-emerald-100 rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
                }`}>
                  {m.fileName && (
                    <div className="bg-slate-100 p-2 rounded-xl flex items-center gap-2.5 border border-slate-200 mb-2">
                      <FileText size={20} className="text-indigo-600 shrink-0" />
                      <div className="text-left leading-tight min-w-0">
                        <span className="font-bold text-slate-700 text-[10px] block truncate">{m.fileName}</span>
                        <span className="text-[8.5px] text-slate-400 block mt-0.5">{m.fileSize}</span>
                      </div>
                    </div>
                  )}
                  <p className="m-0 leading-normal">{m.text}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[8.5px] text-slate-400 px-1">
                  <span>{m.time}</span>
                  {m.sender === 'agent' && (
                    <span className={m.status === 'read' ? 'text-indigo-600 font-bold' : 'text-slate-350'}>✓✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat input box */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-1.5 flex items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
              <button type="button" className="text-slate-400 hover:text-slate-650 p-1"><Smile size={15} /></button>
              <button type="button" className="text-slate-400 hover:text-slate-650 p-1"><Paperclip size={15} /></button>
              <input
                type="text"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-transparent border-none text-xs focus:outline-none placeholder:text-slate-400 px-2 py-1"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg flex items-center justify-center shrink-0 cursor-pointer transition-colors shadow-sm"
              >
                <Send size={13} className="translate-x-[0.5px] -translate-y-[0.5px]" />
              </button>
            </div>
          </form>
        </div>

        {/* Right: Contact details sidebar */}
        <div className="w-full lg:w-72 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col p-4 shrink-0 overflow-y-auto space-y-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm mb-2 shadow">
              {selectedChat.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <h4 className="font-bold text-slate-800 text-xs m-0">{selectedChat.name}</h4>
            <span className="text-[9.5px] text-slate-400 mt-1 block">{selectedChat.phone} • {selectedChat.location}</span>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-1 border-t border-b border-slate-50 py-3 text-center">
            <button className="flex flex-col items-center text-[9px] font-bold text-slate-400 hover:text-slate-700">
              <Phone size={14} className="mb-1 text-slate-500" />
              <span>Call</span>
            </button>
            <button className="flex flex-col items-center text-[9px] font-bold text-slate-400 hover:text-slate-700">
              <MessageSquare size={14} className="mb-1 text-slate-500" />
              <span>WhatsApp</span>
            </button>
            <button className="flex flex-col items-center text-[9px] font-bold text-slate-400 hover:text-slate-700">
              <Mail size={14} className="mb-1 text-slate-500" />
              <span>Email</span>
            </button>
            <button className="flex flex-col items-center text-[9px] font-bold text-slate-400 hover:text-slate-700">
              <Calendar size={14} className="mb-1 text-slate-500" />
              <span>Schedule</span>
            </button>
          </div>

          {/* Conversation info */}
          <div className="space-y-2 text-[10px] text-slate-500">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded">{selectedChat.status}</span>
            </div>
            <div className="flex justify-between">
              <span>Channel:</span>
              <span className="font-semibold text-slate-700">WhatsApp</span>
            </div>
            <div className="flex justify-between">
              <span>AI Lead Score:</span>
              <span className="font-extrabold text-indigo-600">{selectedChat.aiScore}/100</span>
            </div>
          </div>

          {/* AI Insights Smart Suggestions */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-xl border border-indigo-100 text-xs">
            <span className="font-bold text-indigo-850 flex items-center gap-1.5 mb-1.5">
              <Sparkles size={12} className="text-indigo-600 animate-float" />
              AI Copy Reply Suggestion
            </span>
            <button
              onClick={() => handleSmartReply("Here is your calendar booking link to schedule a demo call: https://calendly.com/praveshaai/demo")}
              className="text-[9.5px] bg-white border border-slate-200 text-slate-600 px-2 py-1.5 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-200 transition-all text-left w-full block leading-relaxed"
            >
              💡 Suggestion: "Send booking calendar demo link"
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
