import { useState, useEffect, useRef } from 'react';
import { useConversations } from '../hooks/useConversations';
import { useAIChat } from '../hooks/useAIChat';
import ProviderSettings from '../components/ProviderSettings';
import PromptLibraryPage from '../prompt-engine/components/PromptLibraryPage';
import ToolRegistryPage from '../tool-engine/components/ToolRegistryPage';
import { MessageSquare, Send, Brain, Cpu, RefreshCw, AlertCircle, ShieldAlert, Settings, BookOpen, Terminal } from 'lucide-react';

export default function AIPlatformPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'settings' | 'prompts' | 'tools'>('chat');
  const {
    conversations,
    loading: conversationsLoading,
    error: conversationsError,
    currentConversation,
    setCurrentConversation,
    selectedProvider,
    setSelectedProvider,
  } = useConversations();

  const {
    messages,
    loading: chatLoading,
    error: chatError,
    sendMessage,
  } = useAIChat(currentConversation?.id);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Set first conversation as active by default if none selected
  useEffect(() => {
    if (conversations.length > 0 && !currentConversation) {
      setCurrentConversation(conversations[0]);
    }
  }, [conversations, currentConversation, setCurrentConversation]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatLoading) return;
    const textToSend = input;
    setInput('');
    await sendMessage(textToSend);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white border border-slate-200 rounded-2xl shadow-sm flex overflow-hidden">
      {/* Left Column: Conversation List & Provider Select */}
      <div className="w-80 border-r border-slate-200 bg-slate-50/50 flex flex-col shrink-0">
        {/* Header Block */}
        <div className="p-4 border-b border-slate-200 space-y-3 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Brain size={18} />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-800 m-0">AI Platform</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Foundation Architecture</p>
            </div>
          </div>

          {/* Model Provider Dropdown */}
          <div className="space-y-1 text-left">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              AI Provider Model
            </label>
            <div className="relative">
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold text-slate-700 appearance-none cursor-pointer"
              >
                <option value="openai">OpenAI (GPT-4)</option>
                <option value="gemini">Google Gemini (1.5 Pro)</option>
                <option value="claude">Anthropic Claude (3.5 Sonnet)</option>
                <option value="ollama">Ollama (Local Llama 3)</option>
                <option value="azure-openai">Azure OpenAI (GPT-4o)</option>
              </select>
              <Cpu size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-1.5 border-t border-slate-100 pt-3">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'chat'
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-100/50'
                  : 'text-slate-500 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <MessageSquare size={12} />
              Chat View
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'settings'
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-100/50'
                  : 'text-slate-500 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <Settings size={12} />
              Providers
            </button>
            <button
              onClick={() => setActiveTab('prompts')}
              className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'prompts'
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-100/50'
                  : 'text-slate-500 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <BookOpen size={12} />
              Library
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'tools'
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-100/50'
                  : 'text-slate-500 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <Terminal size={12} />
              Tools
            </button>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 mb-2 text-left">
            Conversations
          </span>

          {conversationsLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-2">
              <RefreshCw className="w-5 h-5 text-indigo-500 animate-spin" />
              <p className="text-[10px] font-semibold text-slate-400">Loading threads...</p>
            </div>
          ) : conversationsError ? (
            <div className="p-3 text-center text-xs font-semibold text-rose-500">
              Failed to load conversations.
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center text-slate-400 py-10 text-xs font-semibold">
              No threads found.
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = currentConversation?.id === conv.id;
              return (
                <button
                  key={conv.id}
                  onClick={() => setCurrentConversation(conv)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-left group ${
                    isActive
                      ? 'bg-indigo-50/70 border border-indigo-100/50 text-indigo-600'
                      : 'border border-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <MessageSquare
                    size={16}
                    className={`shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}
                  />
                  <span className="text-xs font-bold truncate flex-1 leading-tight">{conv.title}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {activeTab === 'settings' ? (
        <ProviderSettings />
      ) : activeTab === 'prompts' ? (
        <PromptLibraryPage />
      ) : activeTab === 'tools' ? (
        <ToolRegistryPage />
      ) : (
        /* Right Column: Chat Window */
        <div className="flex-1 bg-white flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/20 shrink-0">
            <div className="text-left">
              <h4 className="text-sm font-bold text-slate-800 m-0">
                {currentConversation ? currentConversation.title : 'Select a Conversation'}
              </h4>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                Powered by model provider: <span className="font-bold text-indigo-600 uppercase">{selectedProvider}</span>
              </p>
            </div>
            <div className="px-2.5 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-[10px] font-bold">
              Read-only Foundation
            </div>
          </div>

          {/* Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatError ? (
              <div className="flex items-center gap-2 p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs font-bold justify-center">
                <AlertCircle size={16} />
                <span>Failed to load messages.</span>
              </div>
            ) : !currentConversation ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                <Brain size={36} className="text-slate-300 animate-pulse" />
                <p className="text-xs font-bold">Select a conversation thread to get started.</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                <MessageSquare size={32} className="text-slate-350" />
                <p className="text-xs font-bold">No messages in this conversation thread.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => {
                  const isAssistant = msg.role === 'assistant';
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} gap-3 text-left`}
                    >
                      {/* Assistant Avatar */}
                      {isAssistant && (
                        <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                          <Brain size={16} />
                        </div>
                      )}

                      {/* Chat Bubble */}
                      <div className="max-w-[70%]">
                        <div
                          className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                            isAssistant
                              ? 'bg-slate-50 border-slate-200 text-slate-800 rounded-tl-xs'
                              : 'bg-indigo-600 border-indigo-700 text-white rounded-tr-xs'
                          }`}
                        >
                          <p className="whitespace-pre-line m-0 font-medium">{msg.content}</p>
                        </div>
                        {/* Sub-label timestamp / status */}
                        <span
                          className={`text-[9px] font-semibold mt-1 block ${
                            isAssistant ? 'text-slate-400 text-left' : 'text-slate-400 text-right'
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          {!isAssistant && msg.status === 'sending' && '• Sending...'}
                          {!isAssistant && msg.status === 'error' && '• Failed to send'}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Message Input Panel */}
          <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
            <form onSubmit={handleSend} className="flex gap-3 items-end">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={
                  currentConversation
                    ? `Send a message to AI using ${selectedProvider.toUpperCase()}...`
                    : 'Select a conversation to begin...'
                }
                disabled={!currentConversation || chatLoading}
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 resize-none max-h-24 min-h-[40px] leading-relaxed disabled:opacity-50 scrollbar-none"
              />
              <button
                type="submit"
                disabled={!currentConversation || chatLoading || !input.trim()}
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md disabled:opacity-50 transition-all shadow-indigo-100 flex items-center justify-center shrink-0 cursor-pointer h-10 w-10 active:scale-95"
              >
                {chatLoading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </form>
            <div className="mt-2 flex items-center gap-1 text-[9.5px] font-semibold text-slate-400 justify-start">
              <ShieldAlert size={11} className="text-amber-500" />
              <span>AI Platform Foundation: Messages are intercepted by the local Mock Adapter.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
