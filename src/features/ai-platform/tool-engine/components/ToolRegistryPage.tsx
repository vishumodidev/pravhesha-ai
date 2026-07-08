import { useState, useEffect } from 'react';
import { useTools } from '../hooks/useTools';
import { useToolExecution } from '../hooks/useToolExecution';
import type { Tool, ToolCategory } from '../types';
import { Terminal, Search, SlidersHorizontal, Play, FileJson, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ToolRegistryPage() {
  const { tools, loading, error } = useTools();
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const {
    parameters,
    result,
    executing,
    error: execError,
    updateParameter,
    execute,
  } = useToolExecution(selectedTool);

  // Default to first tool
  useEffect(() => {
    if (tools.length > 0 && !selectedTool) {
      setSelectedTool(tools[0]);
    }
  }, [tools, selectedTool]);

  const filteredTools = tools.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories: (ToolCategory | 'ALL')[] = ['ALL', 'CRM', 'Lead', 'Customer', 'Task', 'Workflow', 'Dashboard', 'Notification'];

  return (
    <div className="flex-1 flex overflow-hidden bg-slate-50/20 h-full">
      {/* Left Column: List & Filters */}
      <div className="w-80 border-r border-slate-200 bg-slate-50/50 flex flex-col shrink-0">
        {/* Search & Filters */}
        <div className="p-4 bg-white border-b border-slate-200 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Terminal size={18} />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-800 m-0">Tool Registry</h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">CRM Function Declarations</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search tools..."
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

        {/* Tools List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 mb-2 text-left">
            Registered CRM Tools
          </span>

          {loading ? (
            <div className="text-center text-xs font-semibold text-slate-450 py-20">
              Loading tools...
            </div>
          ) : error ? (
            <div className="text-center text-xs font-semibold text-rose-500 py-10">
              Failed to load registry.
            </div>
          ) : filteredTools.length === 0 ? (
            <div className="text-center text-xs font-semibold text-slate-400 py-10">
              No tools match filters.
            </div>
          ) : (
            filteredTools.map((t) => {
              const isActive = selectedTool?.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTool(t)}
                  className={`w-full flex flex-col px-3 py-2.5 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'bg-indigo-50/70 border-indigo-100 text-indigo-700 shadow-xs'
                      : 'border-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold truncate leading-snug">{t.name}</span>
                    <span className={`text-[8px] px-1.5 py-0.25 rounded-full font-bold ${
                      t.enabled
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}>
                      {t.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-1">{t.description}</p>
                  <div className="flex items-center justify-between w-full mt-2.5">
                    <span className={`text-[8.5px] px-1.5 py-0.5 rounded-md font-bold ${
                      isActive ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {t.category}
                    </span>
                    <span className="text-[9px] text-slate-400 font-semibold">v{t.version}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Column: Details & Executor Console */}
      <div className="flex-1 bg-white overflow-y-auto p-6 space-y-6 text-left">
        {!selectedTool ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
            <Terminal size={40} className="text-slate-300 animate-pulse" />
            <p className="text-xs font-bold">Select a tool from registry to inspect and simulate.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h4 className="text-base font-bold text-slate-800 font-mono">{selectedTool.name}</h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{selectedTool.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  selectedTool.enabled
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}>
                  {selectedTool.enabled ? 'Active Schema' : 'Disabled'}
                </span>
                <span className="text-xs font-bold text-slate-500">v{selectedTool.version}</span>
              </div>
            </div>

            {/* Parameters Schema Definition */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                <SlidersHorizontal size={14} />
                <span>Parameter Properties Specification</span>
              </div>

              {Object.keys(selectedTool.parameters.properties).length === 0 ? (
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-center text-xs text-slate-400 italic">
                  This tool accepts no arguments.
                </div>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-450 text-[10px] font-bold uppercase tracking-wider">
                        <th className="px-4 py-2">Parameter</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Required</th>
                        <th className="px-4 py-2">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150">
                      {Object.entries(selectedTool.parameters.properties).map(([pName, pMeta]) => {
                        const isRequired = selectedTool.parameters.required.includes(pName);
                        return (
                          <tr key={pName} className="hover:bg-slate-50/50 text-slate-700 font-medium">
                            <td className="px-4 py-2.5 font-mono text-indigo-600">{pName}</td>
                            <td className="px-4 py-2.5">
                              <span className="text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">
                                {pMeta.type}
                              </span>
                            </td>
                            <td className="px-4 py-2.5">
                              {isRequired ? (
                                <span className="text-[9px] font-bold bg-rose-50 text-rose-600 border border-rose-100 px-1.5 py-0.5 rounded-md">
                                  Required
                                </span>
                              ) : (
                                <span className="text-[9px] text-slate-400 font-semibold">Optional</span>
                              )}
                            </td>
                            <td className="px-4 py-2.5 text-slate-500 font-normal">
                              {pMeta.description}
                              {pMeta.enum && (
                                <div className="mt-1 text-[10px] text-slate-400">
                                  Allowed values: <span className="font-bold text-slate-600 font-mono">{pMeta.enum.join(' | ')}</span>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Simulated Executor Console Block */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider font-mono">
                  <Terminal size={14} />
                  <span>Execution Sandbox Simulator</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded-lg">
                  <ShieldCheck size={12} />
                  <span>Mock Runtime sandbox</span>
                </div>
              </div>

              {/* Dynamic Inputs Form */}
              {Object.keys(selectedTool.parameters.properties).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedTool.parameters.properties).map(([pName, pMeta]) => {
                    const isRequired = selectedTool.parameters.required.includes(pName);
                    return (
                      <div key={pName} className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-slate-400 font-mono">
                          {pName} {isRequired && <span className="text-rose-500">*</span>}
                        </label>
                        {pMeta.type === 'boolean' ? (
                          <select
                            value={String(parameters[pName] ?? false)}
                            onChange={(e) => updateParameter(pName, e.target.value === 'true')}
                            className="w-full px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold text-slate-200"
                          >
                            <option value="true">true</option>
                            <option value="false">false</option>
                          </select>
                        ) : pMeta.enum ? (
                          <select
                            value={parameters[pName] || ''}
                            onChange={(e) => updateParameter(pName, e.target.value)}
                            className="w-full px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold text-slate-200"
                          >
                            {pMeta.enum.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={pMeta.type === 'number' ? 'number' : 'text'}
                            value={parameters[pName] ?? ''}
                            onChange={(e) => updateParameter(pName, pMeta.type === 'number' ? Number(e.target.value) : e.target.value)}
                            className="w-full px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold text-slate-200"
                            placeholder={`${pName}...`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Execution Run Trigger */}
              <button
                onClick={execute}
                disabled={executing || !selectedTool.enabled}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Play size={12} fill="currentColor" />
                {executing ? 'Executing...' : 'Execute Tool Action'}
              </button>

              {/* Error Output */}
              {execError && (
                <div className="bg-rose-950/30 border border-rose-900/60 rounded-xl p-3 flex items-start gap-2.5 text-left text-xs text-rose-450 font-semibold">
                  <AlertTriangle size={16} className="shrink-0 text-rose-500" />
                  <div>
                    <span className="font-bold block">Execution Failed</span>
                    <span className="font-mono text-[11px] block mt-0.5">{execError}</span>
                  </div>
                </div>
              )}

              {/* Execution Result payload JSON */}
              {result && (
                <div className="space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <span className="flex items-center gap-1">
                      <FileJson size={12} className="text-emerald-400" />
                      <span>Response Payload Payload</span>
                    </span>
                    <span className="text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 px-2 py-0.5 rounded">
                      SUCCESS ({result.executionTimeMs}ms)
                    </span>
                  </div>
                  <pre className="text-xs text-emerald-400 bg-slate-950 border border-slate-800 rounded-xl p-3.5 whitespace-pre-wrap font-mono font-semibold max-h-72 overflow-y-auto leading-relaxed scrollbar-thin">
                    {JSON.stringify(result.response, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
