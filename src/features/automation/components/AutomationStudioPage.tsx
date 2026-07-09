import React, { useState, useEffect } from 'react';
import {
  ListFilter,
  Plus,
  Sparkles,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle,
  X,
  ArrowLeft,
  Briefcase,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useAutomations } from '../hooks/useAutomations';
import { useAutomationBuilder } from '../hooks/useAutomationBuilder';
import CanvasView from './CanvasView';
import NodePaletteList from './NodePaletteList';
import TemplatesList from './TemplatesList';
import PropertiesPanel from './PropertiesPanel';
import type { Automation } from '../types';

export default function AutomationStudioPage() {
  const {
    automations,
    templates,
    loading,
    createAutomation,
    deleteAutomation
  } = useAutomations();

  const {
    activeFlow,
    selectedNodeId,
    validationErrors,
    connectSourceNodeId,
    connectSourcePortName,
    loadFlow,
    unloadFlow,
    setName,
    setDescription,
    setStatus,
    addNode,
    updateNodePosition,
    deleteNode,
    selectNode,
    startConnecting,
    completeConnecting,
    cancelConnecting,
    deleteConnection,
    runValidation
  } = useAutomationBuilder();

  // Dialog / Creation states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFlowName, setNewFlowName] = useState('');
  const [newFlowDesc, setNewFlowDesc] = useState('');
  const [newFlowTrigger, setNewFlowTrigger] = useState('Lead Created');

  // Left sidebar tab: 'palette' | 'templates'
  const [leftTab, setLeftTab] = useState<'palette' | 'templates'>('palette');
  // Notification states
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Trigger validation on flow changes or run manually
  useEffect(() => {
    if (activeFlow) {
      runValidation();
    }
  }, [activeFlow, runValidation]);

  const handleCreateFlowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFlowName.trim()) return;

    try {
      const created = await createAutomation({
        name: newFlowName,
        description: newFlowDesc,
        trigger: newFlowTrigger
      });
      loadFlow(created);
      setShowCreateModal(false);
      setNewFlowName('');
      setNewFlowDesc('');
    } catch (err) {
      console.error('Failed to create flow', err);
    }
  };

  const handleLoadTemplate = (template: Automation) => {
    // Generate a fresh template copy with fresh IDs
    const freshFlow: Automation = {
      ...template,
      id: `auto-tpl-${Date.now()}`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    loadFlow(freshFlow);
  };

  const handleSaveFlow = async () => {
    if (!activeFlow) return;
    try {
      const api = (await import('../../../api/axios')).default;
      await api.put(`/crm-automation/automations/${activeFlow.id}`, activeFlow);
      setSaveStatus({ type: 'success', message: 'Workflow changes saved successfully!' });
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus({ type: 'error', message: 'Failed to save workflow changes.' });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const selectedNode = activeFlow?.nodes.find((n) => n.id === selectedNodeId) || null;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-4 sm:-m-6 select-none bg-slate-50 overflow-hidden">
      {/* 1. Header Toolbar */}
      <header className="h-16 border-b border-slate-200 bg-white shrink-0 px-6 flex items-center justify-between shadow-sm relative z-20">
        <div className="flex items-center gap-3">
          {activeFlow ? (
            <>
              <button
                onClick={unloadFlow}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-all cursor-pointer"
                title="Back to Dashboard"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={activeFlow.name}
                    onChange={(e) => setName(e.target.value)}
                    className="font-bold text-sm text-slate-800 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-600 focus:outline-none px-1 py-0.5 rounded transition-all max-w-[200px]"
                    placeholder="Workflow Name"
                  />
                  <select
                    value={activeFlow.status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className={`text-[10px] font-bold uppercase rounded px-2 py-0.5 border ${
                      activeFlow.status === 'active'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        : activeFlow.status === 'inactive'
                        ? 'bg-rose-50 text-rose-600 border-rose-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={activeFlow.description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-xs text-slate-400 font-normal bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-600 focus:outline-none px-1 py-0.5 rounded transition-all w-[300px] truncate"
                  placeholder="Add description..."
                />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
                <Layers size={18} />
              </div>
              <div className="text-left">
                <h1 className="font-extrabold text-base text-slate-800 tracking-tight leading-none">
                  AI Automation Studio
                </h1>
                <span className="text-[10px] text-slate-400 font-medium">Build codeless AI-powered workflows</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {activeFlow ? (
            <>
              {saveStatus && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium animate-pulse ${
                  saveStatus.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {saveStatus.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                  <span>{saveStatus.message}</span>
                </div>
              )}
              <button
                onClick={() => {
                  runValidation();
                }}
                className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-sm active:scale-95"
              >
                Validate Flow
              </button>
              <button
                onClick={handleSaveFlow}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95 hover:shadow-indigo-100"
              >
                <Save size={14} />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center gap-1.5 cursor-pointer hover:scale-[1.01]"
            >
              <Plus size={16} />
              Create Flow
            </button>
          )}
        </div>
      </header>

      {/* 2. Workspace Body */}
      <div className="flex-1 flex overflow-hidden min-w-0 relative">
        {activeFlow ? (
          /* ========================================================
             VISUAL BUILDER WORKSPACE VIEW
             ======================================================== */
          <>
            {/* Left Drawer Panels (Palette / Templates) */}
            <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-hidden relative z-10 shadow-sm">
              <div className="flex border-b border-slate-100 p-2 gap-1 bg-slate-50/50">
                <button
                  onClick={() => setLeftTab('palette')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    leftTab === 'palette' ? 'bg-white text-slate-800 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Node Palette
                </button>
                <button
                  onClick={() => setLeftTab('templates')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    leftTab === 'templates' ? 'bg-white text-slate-800 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Templates
                </button>
              </div>

              <div className="flex-1 overflow-hidden">
                {leftTab === 'palette' ? (
                  <NodePaletteList
                    onAddNode={(details) => {
                      addNode(details);
                    }}
                  />
                ) : (
                  <TemplatesList
                    templates={templates}
                    onLoadTemplate={(tpl) => {
                      if (window.confirm('Loading template will replace your current flow workspace. Proceed?')) {
                        handleLoadTemplate(tpl);
                      }
                    }}
                  />
                )}
              </div>
            </div>

            {/* Interactive Flow Canvas */}
            <div className="flex-1 relative h-full bg-slate-50 min-w-0">
              <CanvasView
                flow={activeFlow}
                selectedNodeId={selectedNodeId}
                onSelectNode={selectNode}
                onDeleteNode={deleteNode}
                onUpdateNodePosition={updateNodePosition}
                connectSourceNodeId={connectSourceNodeId}
                connectSourcePortName={connectSourcePortName}
                onStartConnect={startConnecting}
                onCompleteConnect={(targetId, portName) => completeConnecting(targetId, portName)}
                onCancelConnect={cancelConnecting}
                onDeleteConnection={deleteConnection}
              />
            </div>

            {/* Right Properties Panel Drawer */}
            <div className="w-80 bg-white border-l border-slate-200 shrink-0 overflow-hidden relative z-10 shadow-sm">
              <PropertiesPanel
                flow={activeFlow}
                selectedNode={selectedNode}
                validationErrors={validationErrors}
              />
            </div>
          </>
        ) : (
          /* ========================================================
             STUDIO DASHBOARD & TEMPLATES VIEW
             ======================================================== */
          <div className="flex-1 overflow-y-auto p-6 space-y-8 max-w-7xl mx-auto w-full">
            {/* Intro Hero Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-indigo-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="relative space-y-2 max-w-xl text-left">
                <div className="inline-flex items-center gap-1 bg-indigo-500/20 text-indigo-300 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-indigo-500/30">
                  <Sparkles size={10} className="animate-float" />
                  Sprint 30 Engine Ready
                </div>
                <h2 className="font-extrabold text-xl tracking-tight leading-snug sm:text-2xl">
                  Automate Business Logic with AI Workflows
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  Connect CRM trigger points, route leads through Gemini AI classifiers, assign tasks, and trigger actions—without writing a single line of code.
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-2.5 bg-white text-indigo-900 text-xs font-bold rounded-xl shadow-lg hover:bg-slate-50 transition-all select-none self-start md:self-auto hover:scale-[1.02] active:scale-95 cursor-pointer shrink-0"
              >
                Create Custom Flow
              </button>
            </div>

            {/* List and Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left Column: Your Custom Workflows list */}
              <div className="lg:col-span-2 space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-1.5">
                    <ListFilter size={16} className="text-slate-400" />
                    Custom Workflows ({automations.length})
                  </h3>
                </div>

                {loading ? (
                  <div className="h-64 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 text-xs">
                    Loading workflows database...
                  </div>
                ) : automations.length === 0 ? (
                  <div className="h-64 rounded-2xl bg-white border border-slate-100 border-dashed flex flex-col items-center justify-center text-slate-400 p-6">
                    <Briefcase size={36} className="stroke-[1.2] mb-3 text-slate-300" />
                    <span className="font-bold text-sm text-slate-700">No workflows active</span>
                    <p className="text-xs text-slate-400 text-center max-w-sm mt-1 leading-relaxed">
                      You haven't built any workflows yet. Get started by creating a blank flow or using a preset template.
                    </p>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="mt-4 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold rounded-lg transition-all cursor-pointer"
                    >
                      New Workflow
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {automations.map((flow) => (
                      <div
                        key={flow.id}
                        className="bg-white rounded-2xl border border-slate-200/60 p-4.5 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-bold text-sm text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                              {flow.name}
                            </h4>
                            <span className={`text-[9px] font-bold uppercase rounded px-1.5 py-0.5 border shrink-0 ${
                              flow.status === 'active'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                : flow.status === 'inactive'
                                ? 'bg-rose-50 text-rose-600 border-rose-100'
                                : 'bg-slate-100 text-slate-600 border-slate-100'
                            }`}>
                              {flow.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 font-normal leading-normal mt-1.5 line-clamp-2">
                            {flow.description || 'No description provided.'}
                          </p>
                        </div>

                        <div className="mt-4 pt-3.5 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-medium bg-slate-50 border border-slate-100 rounded px-2 py-0.5 text-slate-500">
                            Trigger: {flow.trigger}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this workflow?')) {
                                  deleteAutomation(flow.id);
                                }
                              }}
                              className="p-1 rounded text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete Workflow"
                            >
                              <Trash2 size={13} />
                            </button>
                            <button
                              onClick={() => loadFlow(flow)}
                              className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg font-bold flex items-center gap-0.5 cursor-pointer active:scale-95 transition-all"
                            >
                              Open Studio
                              <ChevronRight size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Templates Preview Card */}
              <div className="space-y-4 text-left">
                <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-1.5 border-b border-slate-200 pb-2">
                  <Sparkles size={16} className="text-indigo-500" />
                  Preset Templates ({templates.length})
                </h3>

                <div className="space-y-3">
                  {templates.map((tpl) => (
                    <div
                      key={tpl.id}
                      className="bg-white rounded-2xl border border-slate-200/60 p-4 hover:shadow-md transition-all duration-200 flex flex-col gap-2 group cursor-pointer"
                      onClick={() => handleLoadTemplate(tpl)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-bold text-xs text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                          {tpl.name}
                        </h4>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded">
                          {tpl.trigger}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-normal leading-relaxed line-clamp-2">
                        {tpl.description}
                      </p>
                      <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400 pt-2 border-t border-slate-50">
                        <span>{tpl.nodes.length} canvas nodes</span>
                        <span className="text-indigo-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          Load Preset
                          <ChevronRight size={10} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Create Custom Flow Modal Dialog Overlay */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase">Create Custom Workflow</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateFlowSubmit} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Workflow Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Qualification Responder"
                  value={newFlowName}
                  onChange={(e) => setNewFlowName(e.target.value)}
                  className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:bg-white focus:outline-none rounded-lg p-2.5 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe what tasks this automation automates..."
                  value={newFlowDesc}
                  onChange={(e) => setNewFlowDesc(e.target.value)}
                  className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:bg-white focus:outline-none rounded-lg p-2.5 transition-all resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Starting Trigger Point</label>
                <select
                  value={newFlowTrigger}
                  onChange={(e) => setNewFlowTrigger(e.target.value)}
                  className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:bg-white focus:outline-none rounded-lg p-2.5 transition-all"
                >
                  <option value="Lead Created">Lead Created</option>
                  <option value="Customer Created">Customer Created</option>
                  <option value="Task Due">Task Due</option>
                  <option value="Workflow Completed">Workflow Completed</option>
                  <option value="Schedule">Schedule (Time Interval)</option>
                  <option value="Webhook">Webhook Trigger</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer hover:shadow-indigo-100"
                >
                  Create and Launch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
