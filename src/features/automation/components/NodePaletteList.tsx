import React from 'react';
import {
  Play,
  GitBranch,
  Settings,
  Sparkles,
  Clock,
  Bell,
  Plus
} from 'lucide-react';
import type { NodeType } from '../types';

interface NodePaletteItem {
  type: NodeType;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  defaultConfig: Record<string, any>;
}

const PALETTE_ITEMS: NodePaletteItem[] = [
  {
    type: 'Trigger',
    name: 'Trigger Node',
    description: 'Listen to CRM events like Leads created, schedules, or webhooks.',
    icon: Play,
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50 hover:bg-emerald-100/70',
    borderClass: 'border-emerald-200',
    defaultConfig: { triggerType: 'Lead Created' }
  },
  {
    type: 'AI',
    name: 'AI Agent Node',
    description: 'Execute Gemini AI models to analyze data or generate copy.',
    icon: Sparkles,
    colorClass: 'text-violet-600',
    bgClass: 'bg-violet-50 hover:bg-violet-100/70',
    borderClass: 'border-violet-200',
    defaultConfig: { aiPrompt: 'Summarize details and qualify...', aiModel: 'gemini-1.5-flash' }
  },
  {
    type: 'Condition',
    name: 'Branch Node',
    description: 'Split paths dynamically based on data values or status.',
    icon: GitBranch,
    colorClass: 'text-amber-600',
    bgClass: 'bg-amber-50 hover:bg-amber-100/70',
    borderClass: 'border-amber-200',
    defaultConfig: { conditionExpression: 'lead.score > 80' }
  },
  {
    type: 'Action',
    name: 'CRM Action Node',
    description: 'Interact with CRM systems: assign users, create tasks, send emails.',
    icon: Settings,
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50 hover:bg-blue-100/70',
    borderClass: 'border-blue-200',
    defaultConfig: { actionType: 'Send Email', emailTemplate: 'Standard Notification' }
  },
  {
    type: 'Delay',
    name: 'Wait Delay Node',
    description: 'Pause flow execution for a specified duration of hours or days.',
    icon: Clock,
    colorClass: 'text-indigo-600',
    bgClass: 'bg-indigo-50 hover:bg-indigo-100/70',
    borderClass: 'border-indigo-200',
    defaultConfig: { delayDuration: 1, delayUnit: 'days' }
  },
  {
    type: 'Notification',
    name: 'Notification Node',
    description: 'Alert administrators or channels via in-app push messages.',
    icon: Bell,
    colorClass: 'text-rose-600',
    bgClass: 'bg-rose-50 hover:bg-rose-100/70',
    borderClass: 'border-rose-200',
    defaultConfig: { actionType: 'Notify User', notificationMessage: 'Action required!' }
  }
];

interface NodePaletteListProps {
  onAddNode: (nodeDetails: { type: NodeType; name: string; inputs: string[]; outputs: string[]; configuration: Record<string, any> }) => void;
}

export default function NodePaletteList({ onAddNode }: NodePaletteListProps) {
  return (
    <div className="flex flex-col h-full bg-white select-none">
      <div className="p-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase">Node Palette</h3>
        <p className="text-xs text-slate-400 mt-1">Click nodes to add them to your workspace canvas.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {PALETTE_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.type}
              onClick={() =>
                onAddNode({
                  type: item.type,
                  name: item.name,
                  inputs: item.type === 'Trigger' ? [] : ['Input'],
                  outputs: item.type === 'Condition' ? ['Yes', 'No'] : ['Output'],
                  configuration: item.defaultConfig
                })
              }
              className={`w-full text-left p-3 rounded-xl border border-dashed transition-all duration-200 cursor-pointer flex gap-3 group hover:scale-[1.01] hover:shadow-sm ${item.bgClass} ${item.borderClass}`}
            >
              <div className={`w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-100 shrink-0 ${item.colorClass} group-hover:scale-105 transition-transform duration-200`}>
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-slate-800 tracking-tight">{item.name}</h4>
                  <div className="p-0.5 rounded-full bg-white text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={14} />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug mt-1 font-normal line-clamp-2">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
