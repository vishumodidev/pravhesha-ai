import { useState, useEffect } from 'react';
import { useAgentOrchestrator } from '../hooks/useAgentOrchestrator';
import { useAgentExecution } from '../hooks/useAgentExecution';
import type { AgentExecution, AgentTask, AgentMessage } from '../types';
import { Network, Search, Play, CheckCircle, RefreshCw, MessageSquare, ListTodo, Activity, Compass, Clock } from 'lucide-react';

export default function AgentOrchestratorPage() {
  const { executions, runningAgents, loading, error } = useAgentOrchestrator();
  const { triggerOrchestration, orchestrating } = useAgentExecution();

  const [search, setSearch] = useState('');
  const [selectedExec, setSelectedExec] = useState<AgentExecution | null>(null);
  const [goalInput, setGoalInput] = useState('');

  const [simulatedStatus, setSimulatedStatus] = useState<'Idle' | 'Planning' | 'Communicating' | 'Running' | 'Completed' | 'Failed'>('Idle');
  const [liveTasks, setLiveTasks] = useState<AgentTask[]>([]);
  const [liveMessages, setLiveMessages] = useState<AgentMessage[]>([]);
  const [liveResult, setLiveResult] = useState<AgentExecution | null>(null);

  useEffect(() => {
    if (executions.length > 0 && !selectedExec && simulatedStatus === 'Idle') {
      setSelectedExec(executions[0]);
    }
  }, [executions, selectedExec, simulatedStatus]);

  const handleSelectExec = (exec: AgentExecution) => {
    setSelectedExec(exec);
    setSimulatedStatus('Idle');
    setLiveTasks([]);
    setLiveMessages([]);
    setLiveResult(null);
  };

  const handleTriggerRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalInput.trim()) return;

    setSelectedExec(null);
    setLiveResult(null);
    setLiveTasks([]);
    setLiveMessages([]);
    setSimulatedStatus('Planning');

    // Phase 1: Planning
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSimulatedStatus('Communicating');

    // Populate initial tasks
    const initialTasks: AgentTask[] = [];
    const isAudit = goalInput.toLowerCase().includes('audit') || goalInput.toLowerCase().includes('report') || goalInput.toLowerCase().includes('sync');
    if (isAudit) {
      initialTasks.push(
        { id: 't-1', agentId: 'agent-sales', goal: 'Scan active lead pipelines status indicators', status: 'Waiting', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 't-2', agentId: 'agent-support', goal: 'Query support tickets backlog levels', status: 'Waiting', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 't-3', agentId: 'agent-finance', goal: 'Compile invoices collections forecasting analytics', status: 'Waiting', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      );
    } else {
      initialTasks.push(
        { id: 't-1', agentId: 'agent-sales', goal: 'Gather primary target counseling leads criteria', status: 'Waiting', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 't-2', agentId: 'agent-support', goal: 'Cross check FAQs template responses matching lead queries', status: 'Waiting', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      );
    }
    setLiveTasks(initialTasks);

    // Phase 2: Communicating messages
    const msg1: AgentMessage = {
      id: 'm-1',
      fromAgentId: 'agent-sales',
      toAgentId: 'agent-support',
      content: `Requesting sibling counselor logs details to resolve goal "${goalInput}"`,
      timestamp: new Date().toISOString(),
    };
    setLiveMessages([msg1]);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const msg2: AgentMessage = {
      id: 'm-2',
      fromAgentId: 'agent-support',
      toAgentId: 'agent-sales',
      content: 'Syllabus FAQ context retrieved. counselor advice response compiled.',
      timestamp: new Date().toISOString(),
    };
    setLiveMessages([msg1, msg2]);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Phase 3: Executing tasks
    setSimulatedStatus('Running');

    // Mutate and get final output
    try {
      const output = await triggerOrchestration(goalInput);

      // Transition step-by-step
      for (let i = 0; i < initialTasks.length; i++) {
        setLiveTasks((prev) =>
          prev.map((t, idx) => (idx === i ? { ...t, status: 'Running' } : t))
        );
        await new Promise((resolve) => setTimeout(resolve, 600));

        setLiveTasks((prev) =>
          prev.map((t, idx) => (idx === i ? { ...t, status: 'Completed' } : t))
        );
      }

      setLiveResult(output);
      setSimulatedStatus('Completed');
    } catch (err) {
      console.error(err);
      setSimulatedStatus('Failed');
    }
  };

  const getStatusStyle = (statusStr: string) => {
    switch (statusStr) {
      case 'Completed':
      case 'success':
        return 'text-emerald-600 bg-emerald-50';
      case 'Running':
      case 'Executing':
        return 'text-indigo-600 bg-indigo-50 animate-pulse';
      case 'Waiting':
      case 'Planning':
      case 'Communicating':
        return 'text-amber-600 bg-amber-50';
      default:
        return 'text-slate-500 bg-slate-100';
    }
  };

  const filteredExecs = executions.filter((ex) =>
    ex.goal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/20">
      {/* Banner */}
      <div className="bg-white border-b border-slate-200 p-5 shrink-0 text-left space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2 m-0">
              <Network className="text-indigo-600" size={22} />
              Multi-Agent Orchestrator
            </h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Collaborative multi-agent framework coordinating task scheduler queues, message logs, and workflow consolidation layers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search goals history..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-slate-700"
              />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: History Logs & Running stats */}
        <div className="w-80 border-r border-slate-200 bg-slate-50/30 overflow-y-auto p-4 space-y-4 shrink-0 text-left">
          {/* Running agent list */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
            <span className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider">
              Orchestrator Agent Pool
            </span>
            <div className="space-y-2">
              {runningAgents.map((ag) => (
                <div key={ag.agentId} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-150">
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-700 truncate leading-snug">{ag.name}</div>
                    <div className="text-[9.5px] text-slate-400 font-medium">{ag.role}</div>
                  </div>
                  <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.25 rounded-md">
                    {ag.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* History log List */}
          <div className="space-y-2.5">
            <span className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider px-1">
              Executions History
            </span>

            {loading ? (
              <div className="text-center text-xs font-semibold text-slate-450 py-10">
                Loading logs...
              </div>
            ) : error ? (
              <div className="text-center text-xs font-semibold text-rose-500 py-10">
                Failed to load executions.
              </div>
            ) : filteredExecs.length === 0 ? (
              <div className="text-center text-xs font-semibold text-slate-400 py-10 bg-white border border-dashed border-slate-200 rounded-2xl">
                No past runs.
              </div>
            ) : (
              <div className="space-y-2">
                {filteredExecs.map((ex) => {
                  const isActive = selectedExec?.id === ex.id;
                  return (
                    <button
                      key={ex.id}
                      onClick={() => handleSelectExec(ex)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                        isActive
                          ? 'bg-white border-indigo-200 shadow-md shadow-slate-100/50 scale-[1.01]'
                          : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-700 leading-snug block truncate">{ex.goal}</span>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-[9px] font-bold text-slate-400 flex items-center gap-0.5">
                          <Clock size={10} />
                          {ex.executionTimeMs ? `${(ex.executionTimeMs / 1000).toFixed(1)}s` : '0s'}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.25 rounded ${getStatusStyle(ex.status)}`}>
                          {ex.status}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Active Runner Console */}
        <div className="flex-1 bg-white overflow-y-auto p-5 flex flex-col h-full text-left">
          {/* Top Form Goal Submission */}
          <div className="border-b border-slate-200 pb-5 shrink-0">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Multi-Agent Orchestrator Sandbox
            </span>
            <form onSubmit={handleTriggerRun} className="flex gap-2.5">
              <input
                type="text"
                required
                disabled={orchestrating || (simulatedStatus !== 'Idle' && simulatedStatus !== 'Completed' && simulatedStatus !== 'Failed')}
                placeholder="Assign a multi-agent orchestration goal (e.g. Audit crm report and sync invoices)..."
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="flex-1 pl-4 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-slate-700"
              />
              <button
                type="submit"
                disabled={!goalInput.trim() || orchestrating || (simulatedStatus !== 'Idle' && simulatedStatus !== 'Completed' && simulatedStatus !== 'Failed')}
                className="px-4 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl shadow-md text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                {orchestrating ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play size={14} fill="currentColor" />
                    Orchestrate
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Console Viewport */}
          <div className="flex-1 overflow-y-auto pt-5 space-y-5">
            {/* If looking at historical run */}
            {selectedExec && simulatedStatus === 'Idle' && (
              <div className="space-y-5 animate-fadeIn">
                {/* General stats */}
                <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-450 font-semibold border-b border-slate-100 pb-3">
                  <span>Goal: <strong className="text-slate-700">"{selectedExec.goal}"</strong></span>
                  <span>Tasks: <strong className="text-slate-700">{selectedExec.tasks.length} Assigned</strong></span>
                  <span>Latency: <strong className="text-slate-700">{selectedExec.executionTimeMs} ms</strong></span>
                  <span>Status: <span className={`px-1.5 py-0.25 rounded font-bold ${getStatusStyle(selectedExec.status)}`}>{selectedExec.status}</span></span>
                </div>

                {/* Queue scheduler */}
                <div className="space-y-2">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <ListTodo size={12} className="text-slate-400" />
                    Task Scheduler Queue
                  </h5>
                  <div className="border border-slate-150 rounded-xl overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-150 text-left text-xs text-slate-600">
                      <thead className="bg-slate-50 text-[10px] font-bold text-slate-450 uppercase">
                        <tr>
                          <th className="px-4 py-2.5">Task Goal</th>
                          <th className="px-4 py-2.5">Assigned Agent</th>
                          <th className="px-4 py-2.5 text-right">Queue Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 bg-white">
                        {selectedExec.tasks.map((task) => (
                          <tr key={task.id}>
                            <td className="px-4 py-2.5 font-semibold text-slate-700 leading-snug">{task.goal}</td>
                            <td className="px-4 py-2.5 font-mono text-[10.5px]">{task.agentId}</td>
                            <td className="px-4 py-2.5 text-right">
                              <span className={`text-[9px] font-bold px-1.5 py-0.25 rounded ${getStatusStyle(task.status)}`}>
                                {task.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Merge Results Output block */}
                <div className="bg-indigo-50/20 border border-indigo-100 rounded-2xl p-4 text-left space-y-2 shadow-sm">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase flex items-center gap-1">
                    <Activity size={12} />
                    Merged Output Response
                  </span>
                  <p className="text-xs text-slate-700 font-semibold leading-relaxed bg-white border border-indigo-50 rounded-xl p-3">
                    {selectedExec.finalResponse}
                  </p>
                </div>
              </div>
            )}

            {/* If running live simulation */}
            {simulatedStatus !== 'Idle' && (
              <div className="space-y-5 animate-fadeIn">
                {/* Lifecycle status banner */}
                <div className="flex items-center gap-2 text-[10.5px] font-bold text-slate-500">
                  <Compass size={14} className="text-indigo-500 animate-spin" />
                  Orchestrator Stage: {getStatusBadge(simulatedStatus)}
                </div>

                {/* Live Message logs */}
                {liveMessages.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare size={12} className="text-slate-400" />
                      Inter-Agent Messages Exchange
                    </h5>
                    <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-3 shadow-inner">
                      {liveMessages.map((msg) => (
                        <div key={msg.id} className="flex flex-col space-y-1 max-w-[85%] text-left bg-white border border-slate-200/60 p-3 rounded-2xl shadow-sm">
                          <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-1.5 mb-1.5 text-[9px] font-bold text-indigo-600">
                            <span>From: {msg.fromAgentId} ➜ To: {msg.toAgentId}</span>
                            <span className="text-slate-400 font-normal">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-xs text-slate-650 font-semibold leading-relaxed leading-snug">{msg.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Queue live logs */}
                {liveTasks.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider flex items-center gap-1">
                      <ListTodo size={12} className="text-slate-400" />
                      Live Tasks Scheduler Status
                    </h5>
                    <div className="border border-slate-150 rounded-xl overflow-hidden bg-white shadow-sm">
                      <table className="min-w-full divide-y divide-slate-150 text-left text-xs text-slate-600">
                        <thead className="bg-slate-50 text-[10px] font-bold text-slate-450 uppercase">
                          <tr>
                            <th className="px-4 py-2.5">Goal Description</th>
                            <th className="px-4 py-2.5">Agent</th>
                            <th className="px-4 py-2.5 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150">
                          {liveTasks.map((t) => (
                            <tr key={t.id}>
                              <td className="px-4 py-2.5 font-semibold text-slate-700 leading-snug">{t.goal}</td>
                              <td className="px-4 py-2.5 font-mono text-[10.5px]">{t.agentId}</td>
                              <td className="px-4 py-2.5 text-right">
                                <span className={`text-[9px] font-bold px-1.5 py-0.25 rounded ${getStatusStyle(t.status)}`}>
                                  {t.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Live consolidated result output */}
                {simulatedStatus === 'Completed' && liveResult && (
                  <div className="bg-emerald-50/20 border border-emerald-100 rounded-2xl p-4 text-left space-y-2 shadow-sm animate-fadeIn">
                    <span className="text-[10px] font-bold text-emerald-650 uppercase flex items-center gap-1">
                      <CheckCircle size={12} />
                      Orchestration Completed Response
                    </span>
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed bg-white border border-emerald-55 rounded-xl p-3">
                      {liveResult.finalResponse}
                    </p>
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

const getStatusBadge = (statusStr: string) => {
  switch (statusStr) {
    case 'Planning':
      return <span className="text-[9px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.25 rounded">Planning Tasks</span>;
    case 'Communicating':
      return <span className="text-[9px] font-bold text-sky-500 bg-sky-50 px-1.5 py-0.25 rounded">Agent Messaging</span>;
    case 'Running':
      return <span className="text-[9px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.25 rounded animate-pulse">Running Tasks</span>;
    case 'Completed':
      return <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.25 rounded">Success</span>;
    case 'Failed':
      return <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.25 rounded">Failed</span>;
    default:
      return <span className="text-[9px] font-bold text-slate-500 bg-slate-50 px-1.5 py-0.25 rounded">{statusStr}</span>;
  }
};
