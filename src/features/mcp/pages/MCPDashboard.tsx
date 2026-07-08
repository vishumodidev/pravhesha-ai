import { useState, useEffect } from 'react';
import { useMCP } from '../hooks/useMCP';
import { useMCPTools } from '../hooks/useMCPTools';
import type { MCPServer, MCPTool } from '../types';
import { Cable, Play, CheckCircle, RefreshCw, Cpu, ToggleLeft, ToggleRight } from 'lucide-react';

export default function MCPDashboard() {
  const { servers, loading: serversLoading, error: serversError, toggleServer } = useMCP();
  const [selectedServer, setSelectedServer] = useState<MCPServer | null>(null);

  const { tools, loading: toolsLoading, executeTool, executing, result } = useMCPTools(selectedServer?.id);

  const [selectedTool, setSelectedTool] = useState<MCPTool | null>(null);
  const [argsInput, setArgsInput] = useState('');
  const [localServers, setLocalServers] = useState<MCPServer[]>([]);

  useEffect(() => {
    if (servers.length > 0) {
      setLocalServers(servers);
      if (!selectedServer) {
        setSelectedServer(servers[0]);
      }
    }
  }, [servers, selectedServer]);

  useEffect(() => {
    if (tools.length > 0) {
      setSelectedTool(tools[0]);
    } else {
      setSelectedTool(null);
    }
    setArgsInput('');
  }, [tools]);

  const handleToggleServer = async (id: string, currentVal: boolean) => {
    try {
      await toggleServer({ id, enabled: !currentVal });
      // Update local state for immediate response
      setLocalServers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, enabled: !currentVal, status: !currentVal ? 'connected' : 'disconnected' } : s))
      );
      if (selectedServer?.id === id) {
        setSelectedServer((prev) =>
          prev ? { ...prev, enabled: !currentVal, status: !currentVal ? 'connected' : 'disconnected' } : null
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunExecution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServer || !selectedTool) return;

    let parsedArgs = {};
    try {
      if (argsInput.trim()) {
        parsedArgs = JSON.parse(argsInput);
      }
    } catch (err) {
      alert('Invalid JSON arguments syntax!');
      return;
    }

    try {
      await executeTool({
        serverId: selectedServer.id,
        toolName: selectedTool.name,
        args: parsedArgs,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (statusStr: string, enabled: boolean) => {
    if (!enabled) {
      return <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">Disabled</span>;
    }
    switch (statusStr) {
      case 'connected':
        return <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg">Connected</span>;
      case 'connecting':
        return <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg animate-pulse">Connecting</span>;
      case 'disconnected':
        return <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg">Offline</span>;
      default:
        return <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-lg">{statusStr}</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/20 text-left">
      {/* Banner */}
      <div className="bg-white border-b border-slate-200 p-5 shrink-0 text-left">
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2 m-0">
          <Cable className="text-indigo-600 animate-pulse" size={22} />
          Model Context Protocol (MCP) Bridge
        </h2>
        <p className="text-xs text-slate-400 font-semibold mt-1">
          Standardized client integration layer exposing third-party file repositories, channels notifications, and SOP document tools.
        </p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Registered MCP Servers */}
        <div className="w-80 border-r border-slate-200 bg-slate-50/30 overflow-y-auto p-4 space-y-4 shrink-0">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">
              MCP Servers Registry
            </span>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              {localServers.length} Servers
            </span>
          </div>

          {serversLoading ? (
            <div className="text-center text-xs font-semibold text-slate-450 py-10">
              Loading registry index...
            </div>
          ) : serversError ? (
            <div className="text-center text-xs font-semibold text-rose-500 py-10">
              Failed to load MCP servers.
            </div>
          ) : (
            <div className="space-y-3">
              {localServers.map((server) => {
                const isActive = selectedServer?.id === server.id;
                return (
                  <div
                    key={server.id}
                    onClick={() => {
                      if (server.enabled) {
                        setSelectedServer(server);
                      }
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white border-indigo-200 shadow-md shadow-slate-100/50 scale-[1.01]'
                        : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-350'
                    } ${!server.enabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-slate-700 leading-snug">{server.name}</span>
                        <p className="text-[10px] text-slate-400 font-medium line-clamp-2 mt-1 leading-relaxed">
                          {server.description}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleServer(server.id, server.enabled);
                        }}
                        className="text-slate-400 hover:text-indigo-600 transition-colors p-0.5"
                      >
                        {server.enabled ? <ToggleRight size={22} className="text-indigo-600" /> : <ToggleLeft size={22} />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4 text-[10px] text-slate-400 font-semibold border-t border-slate-100 pt-2.5">
                      <span className="bg-slate-100 text-slate-500 px-1.5 py-0.25 rounded uppercase">
                        {server.transport}
                      </span>
                      {getStatusBadge(server.status, server.enabled)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Center/Right: Tools Catalogue & Sandbox Execution */}
        <div className="flex-1 flex overflow-hidden">
          {/* Center Column: Server Tools List */}
          <div className="w-1/2 border-r border-slate-200 overflow-y-auto p-4 space-y-4">
            <div className="flex items-center justify-between px-1 shrink-0">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                Exposed Schemas Tools
              </span>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                {tools.length} Available
              </span>
            </div>

            {toolsLoading ? (
              <div className="text-center text-xs font-semibold text-slate-450 py-10">
                Discovering schemas...
              </div>
            ) : tools.length === 0 ? (
              <div className="text-center text-xs font-semibold text-slate-400 py-20 bg-white border border-dashed border-slate-200 rounded-2xl">
                No active tools exposed. Select a connected server.
              </div>
            ) : (
              <div className="space-y-3">
                {tools.map((tool) => {
                  const isToolActive = selectedTool?.name === tool.name;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setSelectedTool(tool)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all ${
                        isToolActive
                          ? 'bg-white border-indigo-200 shadow-md shadow-slate-100/50 scale-[1.01]'
                          : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-xs font-mono font-bold text-indigo-600 leading-snug">
                            {tool.name}()
                          </span>
                          <p className="text-[10.5px] text-slate-400 font-medium mt-1 leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      {/* Schema breakdown */}
                      <div className="mt-3 border-t border-slate-100 pt-2.5 text-[9px] font-medium text-slate-450 font-mono">
                        <span className="font-bold text-slate-600">Params:</span> {JSON.stringify(tool.inputSchema.properties)}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Run Tool Sandbox Simulator */}
          <div className="w-1/2 bg-white overflow-y-auto p-5 flex flex-col h-full space-y-4">
            {!selectedTool ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2">
                <Cpu size={40} className="text-slate-350 animate-pulse" />
                <p className="text-xs font-bold">Select an exposed tool from the center catalogue to test.</p>
              </div>
            ) : (
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="border border-slate-200 bg-slate-50/20 rounded-2xl p-4 shrink-0 text-left space-y-2.5">
                  <span className="text-[9px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100/50 px-2 py-0.5 rounded-lg font-mono">
                    {selectedServer?.name}
                  </span>
                  <h4 className="text-sm font-bold text-slate-800 m-0 font-mono text-indigo-600">
                    {selectedTool.name}()
                  </h4>
                  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                    {selectedTool.description}
                  </p>
                </div>

                {/* Form Arguments editor */}
                <form onSubmit={handleRunExecution} className="flex-1 flex flex-col space-y-4">
                  <div className="flex-1 flex flex-col space-y-1.5 min-h-[150px]">
                    <label className="block text-[10.5px] font-bold text-slate-450 uppercase tracking-wider">
                      Input Arguments (JSON Format)
                    </label>
                    <textarea
                      required
                      value={argsInput}
                      onChange={(e) => setArgsInput(e.target.value)}
                      placeholder={
                        selectedTool.name === 'search_gdrive_files'
                          ? '{\n  "query": "Leads"\n}'
                          : selectedTool.name === 'post_message_alert'
                          ? '{\n  "channel": "#counselors-feed",\n  "message": "New student registered"\n}'
                          : '{\n  "key": "value"\n}'
                      }
                      className="flex-1 w-full p-3.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono text-slate-700 leading-relaxed shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={executing}
                    className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl shadow-md text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
                  >
                    {executing ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        Executing Schema run...
                      </>
                    ) : (
                      <>
                        <Play size={14} fill="currentColor" />
                        Execute Tool Sandbox
                      </>
                    )}
                  </button>
                </form>

                {/* Return Result display */}
                {result && (
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/30 text-left space-y-3 shrink-0 animate-fadeIn shadow-sm">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold border-b border-slate-100 pb-2">
                      <span className="flex items-center gap-1 text-emerald-600 font-bold">
                        <CheckCircle size={12} className="text-emerald-500" />
                        Execution Success Output
                      </span>
                      <span>{result.executionTimeMs} ms</span>
                    </div>

                    <pre className="text-[10px] font-mono text-slate-600 bg-white border border-slate-150 p-3 rounded-xl overflow-x-auto leading-relaxed shadow-inner">
                      {JSON.stringify(result.result, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
