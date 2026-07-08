import { useState, useEffect } from 'react';
import { usePrompt } from '../hooks/usePrompt';
import { usePromptBuilder } from '../hooks/usePromptBuilder';
import type { Prompt, PromptCategory } from '../types';
import { BookOpen, Search, SlidersHorizontal, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

export default function PromptLibraryPage() {
  const { prompts, loading, error } = usePrompt();
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const {
    variables,
    compiledPrompt,
    compiling,
    updateVariable,
    compilePrompt,
  } = usePromptBuilder(selectedPrompt);

  // Default to first prompt
  useEffect(() => {
    if (prompts.length > 0 && !selectedPrompt) {
      setSelectedPrompt(prompts[0]);
    }
  }, [prompts, selectedPrompt]);

  const filteredPrompts = prompts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories: (PromptCategory | 'ALL')[] = ['ALL', 'CRM', 'Dashboard', 'Sales', 'Customer', 'Support', 'Workflow'];

  return (
    <div className="flex-1 flex overflow-hidden bg-slate-50/20 h-full">
      {/* Left Column: List & Filters */}
      <div className="w-80 border-r border-slate-200 bg-slate-50/50 flex flex-col shrink-0">
        {/* Search & Filter Bar */}
        <div className="p-4 bg-white border-b border-slate-200 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen size={18} />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-800 m-0">Prompt Library</h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Centralized Prompts Manager</p>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search prompts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-slate-700"
            />
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Category Filter */}
          <div className="space-y-1 text-left">
            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              Filter Category
            </label>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none font-semibold text-slate-700 appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <SlidersHorizontal size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Prompt List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 mb-2 text-left">
            Prompt Templates
          </span>

          {loading ? (
            <div className="text-center text-xs font-semibold text-slate-450 py-20">
              Loading templates...
            </div>
          ) : error ? (
            <div className="text-center text-xs font-semibold text-rose-500 py-10">
              Failed to load templates.
            </div>
          ) : filteredPrompts.length === 0 ? (
            <div className="text-center text-xs font-semibold text-slate-400 py-10">
              No prompts match filters.
            </div>
          ) : (
            filteredPrompts.map((p) => {
              const isActive = selectedPrompt?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPrompt(p)}
                  className={`w-full flex flex-col px-3 py-2.5 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'bg-indigo-50/70 border-indigo-100 text-indigo-700 shadow-xs'
                      : 'border-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <span className="text-xs font-bold truncate leading-snug">{p.name}</span>
                  <div className="flex items-center justify-between w-full mt-1.5">
                    <span className={`text-[8.5px] px-1.5 py-0.5 rounded-md font-bold ${
                      isActive ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {p.category}
                    </span>
                    <span className="text-[9px] text-slate-400 font-semibold">v{p.version}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Column: Prompt Details & Builder Panel */}
      <div className="flex-1 bg-white overflow-y-auto p-6 space-y-6 text-left">
        {!selectedPrompt ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
            <BookOpen size={40} className="text-slate-300 animate-pulse" />
            <p className="text-xs font-bold">Select a template to build and compile prompts.</p>
          </div>
        ) : (
          <>
            {/* Header Metadata */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h4 className="text-base font-bold text-slate-800">{selectedPrompt.name}</h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{selectedPrompt.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  selectedPrompt.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    : 'bg-amber-50 text-amber-600 border border-amber-100'
                }`}>
                  {selectedPrompt.status}
                </span>
                <span className="text-xs font-bold text-slate-500">Version {selectedPrompt.version}</span>
              </div>
            </div>

            {/* Template Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                <FileText size={14} />
                <span>Raw Prompt Template Syntax</span>
              </div>
              <pre className="text-xs text-slate-700 bg-white border border-slate-150 rounded-xl p-3.5 whitespace-pre-wrap font-semibold leading-relaxed font-mono">
                {selectedPrompt.template}
              </pre>
            </div>

            {/* Prompt Variables Editor Form */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                <SlidersHorizontal size={14} />
                <span>Inject Dynamic Variables</span>
              </div>

              {selectedPrompt.variables.length === 0 ? (
                <div className="text-slate-400 text-xs italic">No variables required.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPrompt.variables.map((vName) => (
                    <div key={vName} className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-500 font-mono">
                        {"{"}{vName}{"}"}
                      </label>
                      <input
                        type="text"
                        value={variables[vName] || ''}
                        onChange={(e) => updateVariable(vName, e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-slate-700"
                        placeholder={`Value for ${vName}...`}
                      />
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={compilePrompt}
                disabled={compiling}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-100 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
              >
                <Sparkles size={14} />
                {compiling ? 'Compiling Preview...' : 'Compile Prompt Preview'}
              </button>
            </div>

            {/* Compiled Prompt Output Preview */}
            {compiledPrompt && (
              <div className="bg-emerald-50/30 border border-emerald-200/60 rounded-2xl p-4 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[10px] uppercase tracking-wider">
                  <CheckCircle2 size={14} />
                  <span>Compiled Prompt Output Preview</span>
                </div>
                <div className="text-xs text-slate-700 bg-white border border-emerald-250/30 rounded-xl p-3.5 whitespace-pre-wrap font-semibold leading-relaxed">
                  {compiledPrompt}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
