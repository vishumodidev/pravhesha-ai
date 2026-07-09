import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  BookOpen,
  Mail,
  Zap,
  User,
  Play,
  FolderOpen,
  ArrowRight,
  Bot
} from 'lucide-react';
import { useSupportAgent } from '../hooks/useSupportAgent';

export default function SupportAgentPage() {
  const {
    scenarios,
    activeScenarioId,
    setActiveScenarioId,
    customer,
    messages,
    tickets,
    loading,
    queryInput,
    setQueryInput,
    knowledgeResults,
    agentThoughts,
    suggestedReply,
    suggestedActions,
    actionStatus,
    handleQuerySubmit,
    executeAction
  } = useSupportAgent();

  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    handleQuerySubmit(queryInput);
  };

  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveScenarioId(e.target.value);
  };

  const handleTriggerScenario = () => {
    const selected = scenarios.find(s => s.id === activeScenarioId);
    if (selected && selected.history.length > 0) {
      const firstCustomerText = selected.history[0].text;
      handleQuerySubmit(firstCustomerText);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-4 sm:-m-6 select-none bg-slate-50 overflow-hidden">
      {/* 1. Agent Workspace Header */}
      <header className="h-16 border-b border-slate-200 bg-white shrink-0 px-6 flex items-center justify-between shadow-sm relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-md shadow-violet-100 animate-pulse-ring">
            <Bot size={18} />
          </div>
          <div className="text-left">
            <h1 className="font-extrabold text-base text-slate-800 tracking-tight leading-none flex items-center gap-1.5">
              Customer Support AI Agent
              <span className="text-[10px] bg-violet-50 text-violet-600 font-bold px-2 py-0.5 rounded-full border border-violet-100">
                Claude 3.5 Sonnet
              </span>
            </h1>
            <span className="text-[10px] text-slate-400 font-medium">Auto-draft tickets, query documentation, and recommend resolutions</span>
          </div>
        </div>

        {/* Support Scenario Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
            Active Scenario:
          </label>
          <select
            value={activeScenarioId}
            onChange={handleScenarioChange}
            className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-violet-600 focus:bg-white rounded-lg px-3 py-1.5 focus:outline-none transition-all cursor-pointer shadow-sm min-w-[200px]"
          >
            {scenarios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.customer.name} - {s.customer.notes?.substring(0, 20)}...
              </option>
            ))}
          </select>
          <button
            onClick={handleTriggerScenario}
            disabled={loading}
            className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95 hover:shadow-violet-100 shrink-0"
          >
            <Play size={12} className="fill-white" />
            Analyze Query
          </button>
        </div>
      </header>

      {/* 2. Workspace Body Columns */}
      <div className="flex-1 flex overflow-hidden min-w-0 relative">
        
        {/* Left Column: Customer Profile & Ticket List */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto z-10 shadow-sm p-4 space-y-5">
          {customer ? (
            <>
              {/* Customer Info Card */}
              <div className="space-y-3 text-left">
                <h3 className="font-bold text-slate-800 text-[11px] tracking-wider uppercase flex items-center gap-1.5">
                  <User size={13} className="text-slate-400" />
                  Customer Profile
                </h3>
                
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-100 flex flex-col gap-3">
                  <div className="text-left">
                    <h4 className="font-extrabold text-sm text-slate-800 leading-tight">
                      {customer.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block mt-0.5">
                      {customer.company}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Plan Tier</span>
                      <span className="font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-100 text-[11px]">
                        {customer.plan}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/40">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Email</span>
                      <span className="font-medium text-slate-700 truncate max-w-[150px]">{customer.email}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/40">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Phone</span>
                      <span className="font-medium text-slate-700">{customer.phone}</span>
                    </div>
                  </div>
                  
                  {customer.notes && (
                    <div className="p-2.5 rounded-lg bg-white border border-slate-100 text-[10.5px] text-slate-500 leading-relaxed font-normal">
                      <strong>Notes:</strong> {customer.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Tickets List */}
              <div className="space-y-3 text-left flex-1 flex flex-col min-h-0">
                <h3 className="font-bold text-slate-800 text-[11px] tracking-wider uppercase flex items-center gap-1.5 shrink-0">
                  <FolderOpen size={13} className="text-slate-400" />
                  Active Tickets ({tickets.length})
                </h3>

                <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
                  {tickets.length === 0 ? (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center text-slate-400 text-xs italic">
                      No active tickets mapped
                    </div>
                  ) : (
                    tickets.map((t) => (
                      <div
                        key={t.id}
                        className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow transition-all flex flex-col gap-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-[11.5px] text-slate-700 leading-tight">
                            {t.title}
                          </h4>
                          <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                            t.priority === 'High'
                              ? 'bg-rose-50 text-rose-600 border border-rose-100'
                              : t.priority === 'Medium'
                              ? 'bg-amber-50 text-amber-600 border border-amber-100'
                              : 'bg-blue-50 text-blue-600 border border-blue-100'
                          }`}>
                            {t.priority}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-50">
                          <span className="font-mono">{t.id}</span>
                          <span className={`font-semibold ${
                            t.status === 'Resolved' ? 'text-emerald-600' : 'text-slate-500'
                          }`}>
                            ● {t.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-48 text-slate-400 text-xs">
              No customer scenario selected
            </div>
          )}
        </div>

        {/* Center Column: Conversation Frame */}
        <div className="flex-1 bg-slate-50 border-r border-slate-200 flex flex-col overflow-hidden min-w-0 relative">
          
          {/* Messages History Pane */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center max-w-sm mx-auto">
                <MessageSquare size={36} className="stroke-[1.2] text-slate-300 mb-3" />
                <span className="font-bold text-sm text-slate-700">No support session active</span>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Trigger an scenario query analysis or type a message to start tracing the customer support agent's RAG/thinking steps.
                </p>
              </div>
            ) : (
              messages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] ${isCustomer ? 'mr-auto text-left' : 'ml-auto text-right'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400 font-bold uppercase">
                      {isCustomer ? (
                        <>
                          <User size={10} />
                          Customer
                        </>
                      ) : (
                        <>
                          <Bot size={10} className="text-violet-600" />
                          Pravesha Support Agent
                        </>
                      )}
                      <span>•</span>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl shadow-sm text-xs font-normal leading-relaxed text-left border ${
                        isCustomer
                          ? 'bg-white border-slate-200/60 text-slate-700 rounded-tl-sm'
                          : 'bg-violet-600 border-violet-700 text-white rounded-tr-sm shadow-violet-100/50'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Agent reasoning thought log */}
                    {!isCustomer && msg.thoughts && (
                      <div className="mt-2 text-left">
                        <button
                          onClick={() => setExpandedMessageId(expandedMessageId === msg.id ? null : msg.id)}
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100/60 px-2.5 py-1 rounded-md border border-violet-100 cursor-pointer transition-all"
                        >
                          <Sparkles size={10} />
                          {expandedMessageId === msg.id ? 'Hide Agent Trace' : 'View Agent Reasoning Trace'}
                        </button>
                        
                        {expandedMessageId === msg.id && (
                          <div className="mt-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[10.5px] font-mono text-slate-300 leading-normal space-y-1 max-w-lg shadow-lg">
                            <span className="text-[9.5px] text-violet-400 font-bold block mb-1 uppercase tracking-wide">
                              LLM Thought Process:
                            </span>
                            {msg.thoughts.split('\n').map((line, idx) => (
                              <p key={idx} className="border-l-2 border-violet-700 pl-2">
                                {line}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Simulated Live thinking animation */}
            {loading && (
              <div className="flex flex-col mr-auto max-w-[80%] text-left">
                <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400 font-bold uppercase">
                  <Bot size={10} className="text-violet-600" />
                  Pravesha Support Agent
                </div>
                <div className="p-3 bg-violet-50 border border-violet-100 rounded-2xl rounded-tl-sm text-xs text-slate-500 font-normal italic flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-violet-600 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-violet-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-violet-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span>Agent is retrieving knowledge, running prompts, and formulating reply...</span>
                </div>
              </div>
            )}
          </div>

          {/* RAG Agent Thinking Steps log at the bottom */}
          {agentThoughts.length > 0 && (
            <div className="bg-slate-900 border-t border-slate-800 px-6 py-3 text-left">
              <span className="text-[9.5px] text-violet-400 font-bold uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <Sparkles size={11} />
                Real-time Agent Execution Trace Log
              </span>
              <div className="max-h-20 overflow-y-auto font-mono text-[10px] text-slate-400 space-y-0.5">
                {agentThoughts.map((step, idx) => (
                  <p key={idx} className="flex items-start gap-1">
                    <span className="text-violet-500 font-bold shrink-0">➜</span>
                    <span>{step}</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Prompt Query input box */}
          <form onSubmit={handleSendQuery} className="p-4 bg-white border-t border-slate-200 shrink-0 flex gap-2 items-center">
            <input
              type="text"
              required
              disabled={loading}
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Ask support agent a question or input customer query details..."
              className="flex-1 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-violet-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={loading || !queryInput.trim()}
              className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 cursor-pointer active:scale-95"
            >
              Send
              <ArrowRight size={12} />
            </button>
          </form>
        </div>

        {/* Right Column: RAG Match & Suggested actions */}
        <div className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-y-auto z-10 shadow-sm p-4 space-y-5 text-left">
          
          {/* RAG Matches */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-[11px] tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen size={13} className="text-slate-400" />
              Retrieved Knowledge (RAG)
            </h3>
            
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-0.5">
              {knowledgeResults.length === 0 ? (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-400 text-xs italic text-center">
                  RAG has not run. Enter a query to retrieve docs.
                </div>
              ) : (
                knowledgeResults.map((r, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-1.5 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-100">
                        {r.doc.source}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600">
                        {Math.round(r.score * 100)}% match
                      </span>
                    </div>
                    <h4 className="font-extrabold text-[11px] text-slate-700 leading-snug">
                      {r.doc.title}
                    </h4>
                    <p className="text-[10.5px] text-slate-500 font-normal leading-normal line-clamp-3">
                      {r.doc.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Suggested Email Reply */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-[11px] tracking-wider uppercase flex items-center gap-1.5">
              <Mail size={13} className="text-slate-400" />
              Suggested Email Reply
            </h3>

            {suggestedReply ? (
              <div className="relative group">
                <textarea
                  disabled
                  rows={6}
                  value={suggestedReply}
                  className="w-full text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-3 cursor-not-allowed select-all resize-none leading-relaxed font-normal"
                />
                <span className="absolute top-2 right-2 text-[9px] bg-slate-800 text-white rounded px-1.5 py-0.5 font-bold uppercase select-none opacity-0 group-hover:opacity-100 transition-opacity">
                  Drafted
                </span>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-400 text-xs italic text-center">
                Draft response will load after query analysis.
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Suggested Actions panel */}
          <div className="space-y-3 flex-1 flex flex-col min-h-0">
            <h3 className="font-bold text-slate-800 text-[11px] tracking-wider uppercase flex items-center gap-1.5">
              <Zap size={13} className="text-slate-400" />
              Suggested Actions (Tool Traces)
            </h3>

            {actionStatus && (
              <div className="p-2 bg-violet-50 border border-violet-100 text-violet-700 rounded-lg text-[10.5px] font-bold animate-pulse text-center shrink-0">
                {actionStatus}
              </div>
            )}

            <div className="space-y-2.5 overflow-y-auto flex-1 pr-0.5">
              {suggestedActions.length === 0 ? (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-400 text-xs italic text-center">
                  No pending action recommendations.
                </div>
              ) : (
                suggestedActions.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-slate-150 rounded-xl shadow-sm hover:shadow transition-all flex flex-col gap-2"
                  >
                    <div className="flex flex-col gap-0.5 text-left">
                      <span className="text-[9.5px] text-slate-400 font-bold uppercase">Proposal</span>
                      <h4 className="font-bold text-xs text-slate-700 leading-tight">
                        {act.title}
                      </h4>
                      <p className="text-[10.5px] text-slate-500 font-normal leading-normal mt-0.5">
                        {act.description}
                      </p>
                    </div>

                    <button
                      onClick={() => executeAction(act)}
                      disabled={loading || !!actionStatus}
                      className="w-full mt-1.5 py-1.5 bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 rounded-lg text-[10.5px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-100"
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
