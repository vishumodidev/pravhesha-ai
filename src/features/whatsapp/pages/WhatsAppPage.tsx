import { useState, useEffect } from 'react';
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
import { useWhatsApp } from '../hooks/useWhatsApp';
import type { ChatSession, ChatMessage } from '../types';

export default function WhatsAppPage() {
  const { chats, isLoading, sendMessage } = useWhatsApp();
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (chats.length > 0 && !selectedChat) {
      setSelectedChat(chats[0]);
    }
  }, [chats, selectedChat]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedChat) return;

    try {
      const updated = await sendMessage({ chatId: selectedChat.id, text: inputText });
      setSelectedChat(updated);
      setInputText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSmartReply = (reply: string) => {
    setInputText(reply);
  };

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-650 rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Loading WhatsApp hub...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0 text-left">
            WhatsApp Hub
          </h2>
          <p className="text-sm text-slate-500 mt-1 text-left">
            Manage WhatsApp conversations and engage with your leads & customers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-1.5 rounded-xl shadow-sm text-xs font-bold text-slate-707 transition-colors">
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
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{item.title}</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-base font-bold text-slate-800 block">{item.val}</span>
              <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▲ +18.6% vs last 7d</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main chat window split panel */}
      {selectedChat && (
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

            <div className="flex-1 overflow-y-auto space-y-1.5 text-left">
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
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                      {c.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline leading-none">
                        <span className="font-bold text-slate-707 text-xs truncate">{c.name}</span>
                        <span className="text-[9px] text-slate-404">{c.time}</span>
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
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-808 leading-tight m-0">{selectedChat.name}</h4>
                  <span className="text-[9.5px] text-slate-404 block mt-0.5">{selectedChat.phone} • {selectedChat.location}</span>
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

              {selectedChat.messages.map((m: ChatMessage) => (
                <div
                  key={m.id}
                  className={`flex flex-col max-w-[70%] ${
                    m.sender === 'agent' ? 'ml-auto items-end' : 'items-start'
                  }`}
                >
                  <div className={`p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm text-left ${
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
                  <div className="flex items-center gap-1.5 mt-1 text-[8.5px] text-slate-404 px-1">
                    <span>{m.time}</span>
                    {m.sender === 'agent' && (
                      <span className={m.status === 'read' ? 'text-indigo-600 font-bold' : 'text-slate-300'}>✓✓</span>
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
              <h4 className="font-bold text-slate-808 text-xs m-0">{selectedChat.name}</h4>
              <span className="text-[9.5px] text-slate-404 mt-1 block">{selectedChat.phone} • {selectedChat.location}</span>
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
            <div className="space-y-2 text-[10px] text-slate-500 text-left">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded">{selectedChat.status}</span>
              </div>
              <div className="flex justify-between">
                <span>Channel:</span>
                <span className="font-semibold text-slate-707">WhatsApp</span>
              </div>
              <div className="flex justify-between">
                <span>AI Lead Score:</span>
                <span className="font-extrabold text-indigo-600">{selectedChat.aiScore}/100</span>
              </div>
            </div>

            {/* AI Insights Smart Suggestions */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-xl border border-indigo-100 text-xs text-left">
              <span className="font-bold text-indigo-800 flex items-center gap-1.5 mb-1.5">
                <Sparkles size={12} className="text-indigo-600 animate-float" />
                AI Copy Reply Suggestion
              </span>
              <button
                onClick={() => handleSmartReply(`Here is your calendar booking link to schedule a demo call: https://calendly.com/praveshaai/demo`)}
                className="text-[9.5px] bg-white border border-slate-200 text-slate-600 px-2 py-1.5 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-200 transition-all text-left w-full block leading-relaxed"
              >
                💡 Suggestion: "{selectedChat.aiInsights.suggestedReply}"
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
