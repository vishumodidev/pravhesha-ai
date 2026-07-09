import { Info, HelpCircle, Code, Shield, AlertTriangle } from 'lucide-react';
import type { Automation, AutomationNode } from '../types';
import type { ValidationError } from '../validation/AutomationValidator';

interface PropertiesPanelProps {
  flow: Automation;
  selectedNode: AutomationNode | null;
  validationErrors: ValidationError[];
}

export default function PropertiesPanel({ flow, selectedNode, validationErrors }: PropertiesPanelProps) {
  return (
    <div className="w-full h-full bg-white flex flex-col border-l border-slate-100 select-none">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase">
          {selectedNode ? 'Node Settings' : 'Workflow Info'}
        </h3>
        <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded border border-slate-200">
          READ ONLY
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {selectedNode ? (
          <>
            {/* Selected Node Header Metadata */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Node Name</label>
              <input
                type="text"
                disabled
                value={selectedNode.name}
                className="w-full text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed select-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Node Type</label>
                <div className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                  {selectedNode.type}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Node ID</label>
                <div className="text-[10.5px] font-mono text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-2.5 truncate" title={selectedNode.id}>
                  {selectedNode.id}
                </div>
              </div>
            </div>

            {/* Input & Output Ports information */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Inputs</span>
                {selectedNode.inputs.length === 0 ? (
                  <span className="text-[11px] text-slate-400 italic">None (Starting node)</span>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {selectedNode.inputs.map(ip => (
                      <span key={ip} className="text-[10.5px] font-medium bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                        {ip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Outputs</span>
                {selectedNode.outputs.length === 0 ? (
                  <span className="text-[11px] text-slate-400 italic">None (End node)</span>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {selectedNode.outputs.map(op => (
                      <span key={op} className="text-[10.5px] font-medium bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                        {op}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <hr className="border-slate-100 my-4" />

            {/* Configuration Options */}
            <div className="space-y-3.5 text-left">
              <h4 className="font-bold text-xs text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
                <Code size={14} className="text-indigo-500" />
                Parameters Configuration
              </h4>

              {selectedNode.type === 'Trigger' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10.5px] text-slate-500 font-medium">Trigger Type</label>
                    <select disabled value={selectedNode.configuration?.triggerType || ''} className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed">
                      <option value="Lead Created">Lead Created</option>
                      <option value="Customer Created">Customer Created</option>
                      <option value="Task Due">Task Due</option>
                      <option value="Workflow Completed">Workflow Completed</option>
                      <option value="Schedule">Schedule</option>
                      <option value="Webhook">Webhook</option>
                    </select>
                  </div>

                  {selectedNode.configuration?.triggerType === 'Webhook' && (
                    <div className="space-y-1">
                      <label className="text-[10.5px] text-slate-500 font-medium">Webhook URL</label>
                      <input
                        type="text"
                        disabled
                        value={selectedNode.configuration?.webhookUrl || 'https://api.pravesha.ai/v1/webhooks/'}
                        className="w-full text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed"
                      />
                    </div>
                  )}

                  {selectedNode.configuration?.triggerType === 'Schedule' && (
                    <div className="space-y-1">
                      <label className="text-[10.5px] text-slate-500 font-medium">Cron Expression</label>
                      <input
                        type="text"
                        disabled
                        value={selectedNode.configuration?.cronExpression || '0 9 * * *'}
                        className="w-full text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed"
                      />
                    </div>
                  )}
                </div>
              )}

              {selectedNode.type === 'Action' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10.5px] text-slate-500 font-medium">Action Type</label>
                    <select disabled value={selectedNode.configuration?.actionType || ''} className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed">
                      <option value="Create Task">Create Task</option>
                      <option value="Assign User">Assign User</option>
                      <option value="Send Email">Send Email</option>
                      <option value="Send WhatsApp">Send WhatsApp</option>
                      <option value="Update CRM">Update CRM</option>
                      <option value="Notify User">Notify User</option>
                    </select>
                  </div>

                  {selectedNode.configuration?.actionType === 'Send Email' && (
                    <div className="space-y-1">
                      <label className="text-[10.5px] text-slate-500 font-medium">Email Template</label>
                      <input
                        type="text"
                        disabled
                        value={selectedNode.configuration?.emailTemplate || 'Welcome Introduction Email'}
                        className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed"
                      />
                    </div>
                  )}

                  {selectedNode.configuration?.actionType === 'Send WhatsApp' && (
                    <div className="space-y-1">
                      <label className="text-[10.5px] text-slate-500 font-medium">WhatsApp Template</label>
                      <input
                        type="text"
                        disabled
                        value={selectedNode.configuration?.whatsappTemplate || 'optin_welcome'}
                        className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed"
                      />
                    </div>
                  )}

                  {selectedNode.configuration?.actionType === 'Create Task' && (
                    <>
                      <div className="space-y-1">
                        <label className="text-[10.5px] text-slate-500 font-medium">Task Title</label>
                        <input
                          type="text"
                          disabled
                          value={selectedNode.configuration?.taskTitle || ''}
                          className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10.5px] text-slate-500 font-medium">Task Priority</label>
                        <input
                          type="text"
                          disabled
                          value={selectedNode.configuration?.taskPriority || 'Medium'}
                          className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed"
                        />
                      </div>
                    </>
                  )}

                  {selectedNode.configuration?.actionType === 'Assign User' && (
                    <div className="space-y-1">
                      <label className="text-[10.5px] text-slate-500 font-medium">Assignee Representative ID</label>
                      <input
                        type="text"
                        disabled
                        value={selectedNode.configuration?.assigneeId || 'User Representative'}
                        className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed"
                      />
                    </div>
                  )}
                </div>
              )}

              {selectedNode.type === 'AI' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10.5px] text-slate-500 font-medium">LLM Engine Model</label>
                    <input
                      type="text"
                      disabled
                      value={selectedNode.configuration?.aiModel || 'gemini-1.5-pro'}
                      className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] text-slate-500 font-medium flex items-center justify-between">
                      Instruction Prompt
                      <span title="Secure prompt execution"><Shield size={11} className="text-violet-500" /></span>
                    </label>
                    <textarea
                      disabled
                      rows={4}
                      value={selectedNode.configuration?.aiPrompt || ''}
                      className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed resize-none"
                    />
                  </div>
                </div>
              )}

              {selectedNode.type === 'Condition' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10.5px] text-slate-500 font-medium">Logic Expression</label>
                    <input
                      type="text"
                      disabled
                      value={selectedNode.configuration?.conditionExpression || ''}
                      className="w-full text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed"
                    />
                  </div>
                </div>
              )}

              {selectedNode.type === 'Delay' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10.5px] text-slate-500 font-medium">Delay Value</label>
                      <input
                        type="number"
                        disabled
                        value={selectedNode.configuration?.delayDuration || 1}
                        className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] text-slate-500 font-medium">Time Unit</label>
                      <input
                        type="text"
                        disabled
                        value={selectedNode.configuration?.delayUnit || 'days'}
                        className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedNode.type === 'Notification' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10.5px] text-slate-500 font-medium">Push Alert Message</label>
                    <textarea
                      disabled
                      rows={3}
                      value={selectedNode.configuration?.notificationMessage || ''}
                      className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Default workspace / validation errors info view */
          <div className="space-y-5 text-left">
            <div>
              <h4 className="font-bold text-xs text-slate-800 tracking-wide uppercase">Workflow Details</h4>
              <div className="mt-3 space-y-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9.5px] text-slate-400 font-bold uppercase">Name</span>
                  <span className="text-xs font-semibold text-slate-700">{flow.name}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9.5px] text-slate-400 font-bold uppercase">Description</span>
                  <span className="text-xs text-slate-500 font-normal leading-normal">
                    {flow.description || 'No description provided.'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                  <div className="flex flex-col">
                    <span>STATUS</span>
                    <span className={`text-[10px] font-bold uppercase mt-0.5 ${
                      flow.status === 'active' ? 'text-emerald-600' : 'text-slate-500'
                    }`}>
                      ● {flow.status}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span>CREATOR</span>
                    <span className="font-semibold text-slate-600 mt-0.5">{flow.createdBy}</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Validation Panel */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
                  <Shield size={14} className="text-indigo-500" />
                  Validation Analysis
                </h4>
                <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                  validationErrors.length === 0 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                }`}>
                  {validationErrors.length === 0 ? 'Healthy' : `${validationErrors.length} Issues`}
                </span>
              </div>

              {validationErrors.length === 0 ? (
                <div className="p-3 bg-emerald-50/40 border border-emerald-100 rounded-xl flex gap-2.5 items-start">
                  <Info size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-emerald-800 font-medium leading-relaxed">
                    All nodes and port connections passed structural validation tests. The layout is set up correctly.
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {validationErrors.map((err) => (
                    <div
                      key={err.id}
                      className={`p-3 border rounded-xl flex gap-2.5 items-start text-left text-[11px] font-medium leading-relaxed ${
                        err.severity === 'error'
                          ? 'bg-rose-50/50 border-rose-100 text-rose-800'
                          : 'bg-amber-50/50 border-amber-100 text-amber-800'
                      }`}
                    >
                      <AlertTriangle
                        size={14}
                        className={`shrink-0 mt-0.5 ${err.severity === 'error' ? 'text-rose-500' : 'text-amber-500'}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p>{err.message}</p>
                        {err.nodeId && (
                          <span className="inline-block mt-1 font-mono text-[9px] text-slate-400 bg-white border border-slate-100 px-1 py-0.2 rounded">
                            Node: {err.nodeId.substring(0, 16)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 mt-4 text-[10.5px] text-slate-400 leading-relaxed font-normal flex gap-2">
              <HelpCircle size={14} className="text-slate-400 shrink-0 mt-0.5" />
              <span>
                Select any node on the canvas workspace to view details, inspect its properties, and review custom configurations.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
