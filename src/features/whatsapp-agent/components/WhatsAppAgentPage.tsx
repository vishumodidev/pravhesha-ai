import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  BookOpen,
  User,
  Zap,
  ArrowRight,
  UserCheck,
  Building2,
  Clock,
  Send,
  Phone,
  Bot
} from 'lucide-react';
import { useWhatsAppAgent } from '../hooks/useWhatsAppAgent';

export default function WhatsAppAgentPage() {
  const {
    conversations,
    activeConvId,
    setActiveConvId,
    activeConversation,
    loading,
    queryInput,
    setQueryInput,
    knowledgeResults,
    agentThoughts,
    suggestedReply,
    suggestedActions,
    crmLead,
    crmCustomer,
    actionStatus,
    handleSendMessage,
    handleExecuteAction
  } = useWhatsAppAgent();

  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    handleSendMessage(queryInput);
  };


  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-4 sm:-m-6 select-none bg-slate-50 overflow-hidden">
      {/* 1. Header toolbar */}
      <header className="h-16 border-b border-slate-200 bg-white shrink-0 px-6 flex items-center justify-between shadow-sm relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-100 animate-pulse-ring">
            <MessageSquare size={18} className="fill-white" />
          </div>
          <div className="text-left">
            <h1 className="font-extrabold text-base text-slate-800 tracking-tight leading-none flex items-center gap-1.5">
              WhatsApp AI Agent Portal
              <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                Active Session
              </span>
            </h1>
            <span className="text-[10px] text-slate-400 font-medium">Automatic lead generation, CRM mapping, and RAG resolution over WhatsApp</span>
          </div>
        </div>

        {/* Status Dashboard indicator */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg shadow-sm">
            <Bot size={13} className="text-emerald-600" />
            <span>AI Responder: <strong className="text-slate-800">Auto-pilot</strong></span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg shadow-sm">
            <Clock size={13} className="text-slate-400" />
            <span>SLA: <strong className="text-slate-800">Inbound response</strong></span>
          </div>
        </div>
      </header>

      {/* 2. Three-column app body */}
      <div className="flex-1 flex overflow-hidden min-w-0 relative">
        
        {/* Left Drawer: Conversations List */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-hidden relative z-10 shadow-sm">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-[11px] tracking-wider uppercase flex items-center gap-1.5">
              <MessageSquare size={13} className="text-slate-400" />
              WhatsApp Conversations ({conversations.length})
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
            {conversations.map((c) => {
              const isActive = c.conversationId === activeConvId;
              return (
                <button
                  key={c.conversationId}
                  onClick={() => setActiveConvId(c.conversationId)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 cursor-pointer group hover:scale-[1.01] hover:shadow-sm ${
                    isActive
                      ? 'bg-emerald-50/50 border-emerald-200 shadow-sm'
                      : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  {/* Phone avatar */}
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 duration-200 ${
                    isActive ? 'bg-white border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'
                  }`}>
                    <Phone size={14} />
                  </div>
                  
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <h4 className="font-bold text-xs text-slate-800 leading-tight tracking-tight truncate">
                        {c.name}
                      </h4>
                      <span className="text-[9px] text-slate-400 font-mono tracking-tighter">
                        {new Date(c.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 font-normal leading-tight truncate">
                      {c.lastMessage}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[9px] font-bold">
                      <span className="text-slate-400 font-normal tracking-wide">{c.phone}</span>
                      <span className={`px-1.5 py-0.2 rounded border uppercase text-[8px] ${
                        c.status === 'pending_human'
                          ? 'bg-rose-50 text-rose-600 border-rose-100'
                          : c.status === 'resolved'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                      }`}>
                        {c.status === 'pending_human' ? 'Human Pending' : c.status}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Panel: Active Chat Window & Reply Box */}
        <div className="flex-1 bg-slate-50 border-r border-slate-200 flex flex-col overflow-hidden min-w-0 relative">
          {activeConversation ? (
            <>
              {/* Chat Header info */}
              <div className="px-6 py-3 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-sm relative z-10">
                <div className="text-left">
                  <h4 className="font-extrabold text-xs text-slate-800 tracking-tight leading-none">
                    {activeConversation.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium tracking-wide mt-1 block">
                    Phone: {activeConversation.phone}
                  </span>
                </div>
                
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                  activeConversation.status === 'pending_human'
                    ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse'
                    : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                }`}>
                  {activeConversation.status === 'pending_human' ? '● Pending Human Handoff' : '● Managed by AI Agent'}
                </span>
              </div>

              {/* Message bubble stream */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeConversation.messages.map((msg) => {
                  const isOutbound = msg.direction === 'outbound';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col max-w-[80%] ${isOutbound ? 'ml-auto text-right' : 'mr-auto text-left'}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400 font-bold uppercase justify-start">
                        {isOutbound ? (
                          <>
                            <Bot size={10} className="text-emerald-600" />
                            Pravesha AI Agent
                          </>
                        ) : (
                          <>
                            <User size={10} />
                            {activeConversation.name}
                          </>
                        )}
                        <span>•</span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>

                      <div
                        className={`p-3.5 rounded-2xl shadow-sm text-xs font-normal leading-relaxed text-left border ${
                          isOutbound
                            ? 'bg-emerald-600 border-emerald-700 text-white rounded-tr-sm shadow-emerald-100/50'
                            : 'bg-white border-slate-200/60 text-slate-700 rounded-tl-sm'
                        }`}
                      >
                        {msg.message}
                      </div>

                      {/* Outbound Agent thoughts log */}
                      {isOutbound && msg.thoughts && (
                        <div className="mt-2 text-left">
                          <button
                            onClick={() => setExpandedMessageId(expandedMessageId === msg.id ? null : msg.id)}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/60 px-2.5 py-1 rounded-md border border-emerald-100 cursor-pointer transition-all"
                          >
                            <Sparkles size={10} />
                            {expandedMessageId === msg.id ? 'Hide thoughts log' : 'View Agent Reasoning'}
                          </button>
                          
                          {expandedMessageId === msg.id && (
                            <div className="mt-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[10.5px] font-mono text-slate-300 leading-normal space-y-1 max-w-lg shadow-lg">
                              <span className="text-[9.5px] text-emerald-400 font-bold block mb-1 uppercase tracking-wide">
                                LLM Reasoning Log:
                              </span>
                              {msg.thoughts.split('\n').map((line, idx) => (
                                <p key={idx} className="border-l-2 border-emerald-700 pl-2">
                                  {line}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Loading state bubble */}
                {loading && (
                  <div className="flex flex-col mr-auto max-w-[80%] text-left animate-pulse">
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400 font-bold uppercase">
                      <Bot size={10} className="text-emerald-600" />
                      Pravesha AI Agent
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl rounded-tl-sm text-xs text-slate-500 font-normal italic flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                      <span>Agent is searching RAG and drafting CRM proposals...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Real-time Agent thought trace logs */}
              {agentThoughts.length > 0 && (
                <div className="bg-slate-900 border-t border-slate-800 px-6 py-2.5 text-left shrink-0">
                  <span className="text-[9.5px] text-emerald-400 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                    <Sparkles size={11} />
                    Agent Trace Log
                  </span>
                  <div className="max-h-16 overflow-y-auto font-mono text-[9.5px] text-slate-400 space-y-0.5">
                    {agentThoughts.map((step, idx) => (
                      <p key={idx} className="flex items-start gap-1">
                        <span className="text-emerald-500 font-bold">➜</span>
                        <span>{step}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Reply Box */}
              <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-200 shrink-0 flex gap-2 items-center">
                <input
                  type="text"
                  required
                  disabled={loading}
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Type a message override to reply to the user over WhatsApp..."
                  className="flex-1 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-emerald-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={loading || !queryInput.trim()}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  Send
                  <Send size={11} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
              <MessageSquare size={36} className="stroke-[1.2] text-slate-300 mb-3" />
              <span className="font-bold text-sm text-slate-700">No active conversation</span>
              <p className="text-xs text-slate-400 mt-1">Select a conversation from the sidebar to start.</p>
            </div>
          )}
        </div>

        {/* Right Column: CRM Information & AI Suggestions */}
        <div className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-y-auto z-10 shadow-sm p-4 space-y-5 text-left">
          
          {/* CRM Profile Panel */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-[11px] tracking-wider uppercase flex items-center gap-1.5">
              <UserCheck size={13} className="text-slate-400" />
              CRM Mapped Information
            </h3>

            {crmCustomer ? (
              <div className="p-3.5 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 rounded-xl space-y-3">
                <div className="text-left">
                  <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                    Existing Customer
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-800 mt-2 leading-tight">{crmCustomer.name}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">{crmCustomer.company}</span>
                </div>
                
                <div className="pt-2 border-t border-slate-200/40 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="flex flex-col">
                    <span className="text-[8.5px] text-slate-400 font-bold uppercase">Plan</span>
                    <span className="font-semibold text-slate-800 mt-0.5">{crmCustomer.plan}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8.5px] text-slate-400 font-bold uppercase">Status</span>
                    <span className="font-semibold text-slate-800 mt-0.5">{crmCustomer.status}</span>
                  </div>
                </div>
              </div>
            ) : crmLead ? (
              <div className="p-3.5 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 rounded-xl space-y-3">
                <div className="text-left">
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                    Acquired Lead
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-800 mt-2 leading-tight">{crmLead.name}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">{crmLead.company || 'Not Specified'}</span>
                </div>
                
                <div className="pt-2 border-t border-slate-200/40 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="flex flex-col">
                    <span className="text-[8.5px] text-slate-400 font-bold uppercase">CRM Status</span>
                    <span className="font-semibold text-slate-800 mt-0.5">{crmLead.status}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8.5px] text-slate-400 font-bold uppercase">Budget</span>
                    <span className="font-semibold text-slate-800 mt-0.5">{crmLead.budget || '—'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-3">
                <Building2 size={24} className="text-slate-300 stroke-[1.2] mb-1.5" />
                <span className="text-[11px] font-bold text-slate-600">No CRM record linked</span>
                <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                  The user phone is not registered as a customer or lead. Trigger analysis to automatically create a lead!
                </p>
                <button
                  onClick={() => handleExecuteAction({
                    type: 'Create Lead',
                    title: 'Create Lead profile for Marcus',
                    description: 'Create a CRM Lead for Marcus Aurelius.',
                    payload: { name: activeConversation?.name || 'New Client', phone: activeConversation?.phone || '', company: 'Rome Logistics', budget: 'Standard Plan' }
                  })}
                  disabled={!activeConversation}
                  className="mt-2.5 w-full py-1.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                >
                  Create Manual Lead +
                </button>
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* AI Suggestions (RAG matches & actions) */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-[11px] tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen size={13} className="text-slate-400" />
              Retrieved Knowledge (RAG)
            </h3>
            
            <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-0.5">
              {knowledgeResults.length === 0 ? (
                <div className="p-3 bg-slate-50 rounded-xl text-slate-400 text-[10.5px] italic text-center border border-slate-100">
                  RAG is inactive. Send a message to query articles.
                </div>
              ) : (
                knowledgeResults.map((r, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-1 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {r.doc.source}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600">
                        {Math.round(r.score * 100)}% match
                      </span>
                    </div>
                    <h4 className="font-extrabold text-[10.5px] text-slate-700 leading-snug">
                      {r.doc.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-normal leading-normal line-clamp-3">
                      {r.doc.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Suggested WhatsApp Reply */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-[11px] tracking-wider uppercase flex items-center gap-1.5">
              <Bot size={13} className="text-slate-400" />
              Suggested AI Reply
            </h3>

            {suggestedReply ? (
              <div className="relative group">
                <textarea
                  disabled
                  rows={4}
                  value={suggestedReply}
                  className="w-full text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-3 cursor-not-allowed select-all resize-none leading-relaxed font-normal"
                />
                <button
                  type="button"
                  onClick={() => setQueryInput(suggestedReply)}
                  className="absolute bottom-2 right-2 px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-[9px] font-bold uppercase transition-all cursor-pointer"
                >
                  Use Reply
                </button>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-xl text-slate-400 text-[10.5px] italic text-center border border-slate-100">
                Draft response will load after incoming message.
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Action proposals */}
          <div className="space-y-3 flex-1 flex flex-col min-h-0">
            <h3 className="font-bold text-slate-800 text-[11px] tracking-wider uppercase flex items-center gap-1.5">
              <Zap size={13} className="text-slate-400" />
              Suggested Actions (Tool Traces)
            </h3>

            {actionStatus && (
              <div className="p-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold animate-pulse text-center shrink-0">
                {actionStatus}
              </div>
            )}

            <div className="space-y-2.5 overflow-y-auto flex-1 pr-0.5">
              {suggestedActions.length === 0 ? (
                <div className="p-3 bg-slate-50 rounded-xl text-slate-400 text-[10.5px] italic text-center border border-slate-100">
                  No action recommendations proposed.
                </div>
              ) : (
                suggestedActions.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-slate-150 rounded-xl shadow-sm hover:shadow transition-all flex flex-col gap-2"
                  >
                    <div className="flex flex-col gap-0.5 text-left">
                      <span className="text-[9px] text-slate-400 font-bold uppercase">Proposal</span>
                      <h4 className="font-bold text-xs text-slate-700 leading-tight">
                        {act.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-normal leading-normal mt-0.5">
                        {act.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleExecuteAction(act)}
                      disabled={loading || !!actionStatus}
                      className="w-full mt-1 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-250 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-100"
                    >
                      Execute Proposal Action
                      <ArrowRight size={10} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
