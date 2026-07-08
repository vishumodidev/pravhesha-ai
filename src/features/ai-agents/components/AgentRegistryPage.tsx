import { useState } from 'react';
import { useAgents } from '../hooks/useAgents';
import { useAgentExecution } from '../hooks/useAgentExecution';
import type { Agent, AgentPlanStep } from '../types/agent';
import { Cpu, Play, CheckCircle, RefreshCw, Layers, UserCheck, Timer, Terminal } from 'lucide-react';

export default function AgentRegistryPage() {
  const { agents, loading, error } = useAgents();
  const { executeAgent, result } = useAgentExecution();

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [goalInput, setGoalInput] = useState('');
  const [activePlanSteps, setActivePlanSteps] = useState<AgentPlanStep[]>([]);
  const [simulatedStatus, setSimulatedStatus] = useState<'Idle' | 'Thinking' | 'Planning' | 'Executing' | 'Completed' | 'Failed'>('Idle');

  // Handle auto-selected default agent
  if (agents.length > 0 && !selectedAgent) {
    setSelectedAgent(agents[0]);
  }

  const handleRunSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgent || !goalInput.trim()) return;

    // Simulate lifecycle state updates
    setSimulatedStatus('Thinking');
    setActivePlanSteps([]);

    // Step 1: Thinking -> Planning
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSimulatedStatus('Planning');

    // Load initial planning steps based on selected agent
    let initialSteps: AgentPlanStep[] = [];
    const idKey = selectedAgent.id.toLowerCase();
    if (idKey.includes('sales')) {
      initialSteps = [
        { id: 'step-1', title: 'Query active leads', description: 'Fetch CRM leads list filtered by new status', status: 'pending', toolId: 'tool-get-leads' },
        { id: 'step-2', title: 'Compile sales coaching script', description: 'Construct counselor advice script template', status: 'pending' },
        { id: 'step-3', title: 'Schedule counselor follow-up task', description: 'Insert new CRM task activity record', status: 'pending', toolId: 'tool-create-task' },
      ];
    } else if (idKey.includes('support')) {
      initialSteps = [
        { id: 'step-1', title: 'Fetch unread support tickets', description: 'Query tickets catalogue in CRM', status: 'pending' },
        { id: 'step-2', title: 'Generate FAQ auto-reply', description: 'Build troubleshooting email draft from FAQ document resources', status: 'pending' },
      ];
    } else if (idKey.includes('hr')) {
      initialSteps = [
        { id: 'step-1', title: 'Search Employee Handbook', description: 'Fetch policy documents content from Knowledge Base', status: 'pending' },
        { id: 'step-2', title: 'Summarize leave policies', description: 'Extract leave calculations parameters', status: 'pending' },
      ];
    } else {
      initialSteps = [
        { id: 'step-1', title: 'Analyze business goal request', description: 'Parse target parameters logs', status: 'pending' },
        { id: 'step-2', title: 'Execute default operations sequence', description: 'Fetch stats summary indicators', status: 'pending', toolId: 'tool-get-dashboard-summary' },
      ];
    }
    setActivePlanSteps(initialSteps);

    // Step 2: Planning -> Executing
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSimulatedStatus('Executing');

    // Run remote execution request to get final results
    try {
      const runResult = await executeAgent({
        id: selectedAgent.id,
        goal: goalInput,
      });

      // Gradually complete steps in UI for high fidelity visual feedback
      for (let i = 0; i < initialSteps.length; i++) {
        // Mark current as executing
        setActivePlanSteps((prev) =>
          prev.map((s, idx) => (idx === i ? { ...s, status: 'executing' } : s))
        );
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Mark current as completed using mock adapter response payload
        const finalStepMatch = runResult.steps[i];
        setActivePlanSteps((prev) =>
          prev.map((s, idx) =>
            idx === i
              ? {
                  ...s,
                  status: finalStepMatch ? finalStepMatch.status : 'completed',
                  result: finalStepMatch ? finalStepMatch.result : undefined,
                }
              : s
          )
        );
      }

      setSimulatedStatus('Completed');
    } catch (err) {
      console.error('[AgentRegistryPage] Error running agent:', err);
      setSimulatedStatus('Failed');
    }
  };

  const getStatusBadge = (statusStr: string) => {
    switch (statusStr) {
      case 'Idle':
        return <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">Idle</span>;
      case 'Thinking':
        return <span className="text-[10px] font-bold text-sky-500 bg-sky-50 px-2 py-0.5 rounded-lg animate-pulse">Thinking</span>;
      case 'Planning':
        return <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg animate-pulse">Planning</span>;
      case 'Executing':
        return <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-lg animate-pulse">Executing</span>;
      case 'Completed':
        return <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg">Completed</span>;
      case 'Failed':
        return <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg">Failed</span>;
      default:
        return <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-lg">{statusStr}</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/20 text-left">
      {/* Tab Banner */}
      <div className="bg-white border-b border-slate-200 p-5 shrink-0 text-left">
        <h2 className="text-base font-extrabold text-slate-800 tracking-tight flex items-center gap-2 m-0">
          <Cpu className="text-indigo-600" size={18} />
          Agent Registry & Planning Framework
        </h2>
        <p className="text-[11px] text-slate-400 font-semibold mt-1">
          Unified base controller architecture that compiles goal specifications, builds step-by-step plans, and sandbox executes CRM tool calls.
        </p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Registry Catalogue */}
        <div className="w-80 border-r border-slate-200 bg-slate-50/30 overflow-y-auto p-4 space-y-3 shrink-0">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">
              Registered Agents
            </span>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              {agents.length} Base Classes
            </span>
          </div>

          {loading ? (
            <div className="text-center text-xs font-semibold text-slate-450 py-10">
              Loading registry database...
            </div>
          ) : error ? (
            <div className="text-center text-xs font-semibold text-rose-500 py-10">
              Failed to load agent registry.
            </div>
          ) : (
            <div className="space-y-2">
              {agents.map((agent) => {
                const isActive = selectedAgent?.id === agent.id;
                return (
                  <button
                    key={agent.id}
                    onClick={() => {
                      setSelectedAgent(agent);
                      setGoalInput('');
                      setActivePlanSteps([]);
                      setSimulatedStatus('Idle');
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                      isActive
                        ? 'bg-white border-indigo-200 shadow-md shadow-slate-100/50 scale-[1.01]'
                        : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-700 leading-snug">{agent.name}</span>
                      <span className="text-[9px] font-bold text-slate-400">v{agent.version}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">{agent.description}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.25 rounded">
                        {agent.role}
                      </span>
                      {getStatusBadge(isActive ? simulatedStatus : agent.status)}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Pane: Agent Execution Sandbox */}
        <div className="flex-1 bg-white overflow-y-auto p-5 flex flex-col h-full">
          {!selectedAgent ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2">
              <Cpu size={40} className="text-slate-350 animate-pulse" />
              <p className="text-xs font-bold">Select an agent from the registry to run execution.</p>
            </div>
          ) : (
            <div className="space-y-5 flex-1 flex flex-col">
              {/* Agent info cards */}
              <div className="border border-slate-200 bg-slate-50/20 rounded-2xl p-4 shrink-0 text-left space-y-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800 m-0">{selectedAgent.name}</h3>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{selectedAgent.description}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100/50 px-2.5 py-0.5 rounded-lg">
                    {selectedAgent.provider}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-slate-400 font-semibold border-t border-slate-100/80 pt-2.5">
                  <span>Role: <strong className="text-slate-600">{selectedAgent.role}</strong></span>
                  <span>Created: <strong className="text-slate-600">{new Date(selectedAgent.createdAt).toLocaleDateString('en-IN')}</strong></span>
                  <span>Status: {getStatusBadge(simulatedStatus)}</span>
                </div>
              </div>

              {/* Goal Submission Input Form */}
              <form onSubmit={handleRunSimulation} className="flex gap-2.5 shrink-0">
                <input
                  type="text"
                  required
                  disabled={simulatedStatus !== 'Idle' && simulatedStatus !== 'Completed' && simulatedStatus !== 'Failed'}
                  placeholder={`Assign goal to ${selectedAgent.name} (e.g. Qualify new counseling leads)...`}
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="flex-1 pl-4 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-slate-700"
                />
                <button
                  type="submit"
                  disabled={!goalInput.trim() || (simulatedStatus !== 'Idle' && simulatedStatus !== 'Completed' && simulatedStatus !== 'Failed')}
                  className="px-4 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl shadow-md text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  {simulatedStatus === 'Thinking' || simulatedStatus === 'Planning' || simulatedStatus === 'Executing' ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play size={14} fill="currentColor" />
                      Execute Agent Goal
                    </>
                  )}
                </button>
              </form>

              {/* Steps planning progress viewer */}
              {activePlanSteps.length > 0 && (
                <div className="flex-1 flex flex-col min-h-[300px] border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-50/20">
                  <div className="bg-slate-100/50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shrink-0">
                    <span className="text-[10px] font-bold text-slate-550 uppercase tracking-wider flex items-center gap-1">
                      <Layers size={12} className="text-slate-400" />
                      Runtime Execution Plan Steps
                    </span>
                    <span className="text-[9.5px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {activePlanSteps.filter((s) => s.status === 'completed').length} / {activePlanSteps.length} Steps
                    </span>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {activePlanSteps.map((step, idx) => {
                      const isExecuting = step.status === 'executing';
                      const isCompleted = step.status === 'completed';
                      return (
                        <div
                          key={step.id}
                          className={`border rounded-xl p-3 text-left transition-all ${
                            isExecuting
                              ? 'bg-indigo-50/20 border-indigo-250 shadow-sm'
                              : isCompleted
                              ? 'bg-white border-slate-200'
                              : 'bg-white/40 border-slate-150 opacity-60'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                isCompleted
                                  ? 'bg-emerald-50 text-emerald-600'
                                  : isExecuting
                                  ? 'bg-indigo-150 text-indigo-600'
                                  : 'bg-slate-100 text-slate-500'
                              }`}>
                                {isCompleted ? <CheckCircle size={12} className="text-emerald-500" /> : idx + 1}
                              </div>
                              <div className="text-left min-w-0">
                                <h5 className="text-xs font-bold text-slate-700">{step.title}</h5>
                                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{step.description}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {step.toolId && (
                                <span className="text-[9px] font-bold bg-slate-100 text-indigo-600 border border-slate-200/50 px-1.5 py-0.25 rounded flex items-center gap-0.5">
                                  <Terminal size={9} />
                                  {step.toolId}
                                </span>
                              )}
                              {isExecuting && <RefreshCw size={10} className="text-indigo-500 animate-spin" />}
                            </div>
                          </div>

                          {/* Show simulated payload outputs */}
                          {step.result && (
                            <div className="mt-2.5 border-t border-slate-100 pt-2 text-[9.5px] font-medium text-slate-500 bg-slate-50/70 p-2 rounded-lg font-mono whitespace-pre-wrap leading-relaxed">
                              {step.result.toolCalled ? (
                                <div className="space-y-1">
                                  <div className="text-indigo-600 font-bold">Tool Output ({step.result.toolCalled})</div>
                                  <div>{JSON.stringify(step.result.simulatedPayload, null, 2)}</div>
                                </div>
                              ) : (
                                <div>{step.result.outcome}</div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary Response block */}
                  {simulatedStatus === 'Completed' && result && (
                    <div className="bg-emerald-50/30 border-t border-slate-200 p-4 shrink-0 text-left space-y-2.5 animate-fadeIn">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                        <span className="flex items-center gap-1 text-slate-550">
                          <UserCheck size={12} className="text-slate-400" />
                          Final Outcome Response Summary
                        </span>
                        <span className="flex items-center gap-1">
                          <Timer size={12} />
                          {result.executionTimeMs} ms
                        </span>
                      </div>
                      <div className="text-xs text-slate-650 font-bold bg-white border border-emerald-100/50 rounded-xl p-3 leading-relaxed shadow-sm">
                        {result.response}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
