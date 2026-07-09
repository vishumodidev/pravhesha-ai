import React from 'react';
import {
  Play,
  GitBranch,
  Settings,
  Sparkles,
  Clock,
  Bell,
  Trash2
} from 'lucide-react';
import type { AutomationNode, NodeType } from '../types';

interface NodeCardProps {
  node: AutomationNode;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onUpdatePosition: (id: string, pos: { x: number; y: number }) => void;
  // Connection actions
  onStartConnect: (nodeId: string, portName: string) => void;
  onCompleteConnect: (nodeId: string, portName: string) => void;
  isConnectingSource: boolean;
  isConnectingModeActive: boolean;
}

const TYPE_CONFIGS: Record<
  NodeType,
  {
    icon: React.ComponentType<any>;
    colorClass: string;
    borderClass: string;
    headerBg: string;
    label: string;
  }
> = {
  Trigger: {
    icon: Play,
    colorClass: 'text-emerald-600',
    borderClass: 'border-emerald-200 shadow-emerald-50/50',
    headerBg: 'bg-emerald-50',
    label: 'Trigger'
  },
  Condition: {
    icon: GitBranch,
    colorClass: 'text-amber-600',
    borderClass: 'border-amber-200 shadow-amber-50/50',
    headerBg: 'bg-amber-50',
    label: 'Condition'
  },
  Action: {
    icon: Settings,
    colorClass: 'text-blue-600',
    borderClass: 'border-blue-200 shadow-blue-50/50',
    headerBg: 'bg-blue-50',
    label: 'CRM Action'
  },
  AI: {
    icon: Sparkles,
    colorClass: 'text-violet-600',
    borderClass: 'border-violet-200 shadow-violet-50/50',
    headerBg: 'bg-violet-50',
    label: 'AI Model'
  },
  Delay: {
    icon: Clock,
    colorClass: 'text-indigo-600',
    borderClass: 'border-indigo-200 shadow-indigo-50/50',
    headerBg: 'bg-indigo-50',
    label: 'Delay'
  },
  Notification: {
    icon: Bell,
    colorClass: 'text-rose-600',
    borderClass: 'border-rose-200 shadow-rose-50/50',
    headerBg: 'bg-rose-50',
    label: 'Push Alert'
  }
};

export default function NodeCard({
  node,
  isSelected,
  onSelect,
  onDelete,
  onUpdatePosition,
  onStartConnect,
  onCompleteConnect,
  isConnectingSource,
  isConnectingModeActive
}: NodeCardProps) {
  const config = TYPE_CONFIGS[node.type] || TYPE_CONFIGS.Action;
  const Icon = config.icon;

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    const shift = 40;
    let { x, y } = node.position;
    if (direction === 'up') y -= shift;
    if (direction === 'down') y += shift;
    if (direction === 'left') x -= shift;
    if (direction === 'right') x += shift;
    onUpdatePosition(node.id, { x, y });
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
        width: '240px'
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm flex flex-col group select-none hover:shadow-md
        ${isSelected ? 'border-indigo-600 ring-2 ring-indigo-50 ring-offset-0 scale-[1.01]' : 'border-slate-200'}
        ${isConnectingSource ? 'border-indigo-500 scale-[0.99] ring-2 ring-indigo-50' : ''}
      `}
    >
      {/* Node Header */}
      <div className={`p-3 rounded-t-2xl flex items-center justify-between border-b border-slate-100 ${config.headerBg}`}>
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 ${config.colorClass}`}>
            <Icon size={14} className="stroke-[2.5]" />
          </div>
          <div className="text-left min-w-0">
            <h4 className="font-bold text-xs text-slate-800 truncate m-0 leading-tight">
              {node.name}
            </h4>
            <span className="text-[9px] text-slate-400 font-medium tracking-wide uppercase">
              {config.label}
            </span>
          </div>
        </div>
        
        {/* Actions */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 rounded text-slate-300 hover:text-rose-500 hover:bg-white active:scale-95 transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-sm border border-transparent hover:border-slate-100"
          title="Delete Node"
        >
          <Trash2 size={12} />
        </button>
      </div>

      {/* Node Content / Configuration Badges */}
      <div className="p-3 text-left space-y-1.5 flex-1 flex flex-col justify-center">
        {node.type === 'Trigger' && node.configuration?.triggerType && (
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Event</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded self-start border border-emerald-100">
              {node.configuration.triggerType}
            </span>
          </div>
        )}
        {node.type === 'Action' && node.configuration?.actionType && (
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Action Type</span>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded self-start border border-blue-100">
              {node.configuration.actionType}
            </span>
          </div>
        )}
        {node.type === 'AI' && (
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">AI Engine</span>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded self-start border border-purple-100">
              {node.configuration.aiModel || 'gemini-1.5-pro'}
            </span>
          </div>
        )}
        {node.type === 'Condition' && node.configuration?.conditionExpression && (
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Rule</span>
            <code className="text-[9.5px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded self-start truncate max-w-full border border-amber-100">
              {node.configuration.conditionExpression}
            </code>
          </div>
        )}
        {node.type === 'Delay' && (
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Wait Duration</span>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded self-start border border-indigo-100">
              {node.configuration.delayDuration} {node.configuration.delayUnit || 'days'}
            </span>
          </div>
        )}
      </div>

      {/* Position Controller (Read-only studio alternative) */}
      <div className="px-3 pb-2.5 flex items-center justify-between border-t border-slate-50 pt-2 text-[10px] text-slate-400">
        <span className="font-mono text-[9px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
          X: {node.position.x}, Y: {node.position.y}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); handleMove('left'); }}
            className="w-4 h-4 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded text-slate-500 font-bold border border-slate-100 cursor-pointer"
            title="Move Left"
          >
            ←
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleMove('up'); }}
            className="w-4 h-4 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded text-slate-500 font-bold border border-slate-100 cursor-pointer"
            title="Move Up"
          >
            ↑
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleMove('down'); }}
            className="w-4 h-4 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded text-slate-500 font-bold border border-slate-100 cursor-pointer"
            title="Move Down"
          >
            ↓
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleMove('right'); }}
            className="w-4 h-4 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded text-slate-500 font-bold border border-slate-100 cursor-pointer"
            title="Move Right"
          >
            →
          </button>
        </div>
      </div>

      {/* Port Interfaces */}
      {/* Input Ports (Left) */}
      <div className="absolute inset-y-0 -left-1.5 flex flex-col justify-center gap-4">
        {node.inputs.map((inputName) => {
          const isTargetable = isConnectingModeActive && !isConnectingSource;
          return (
            <button
              key={inputName}
              onClick={(e) => {
                e.stopPropagation();
                if (isTargetable) {
                  onCompleteConnect(node.id, inputName);
                }
              }}
              className={`w-3.5 h-3.5 rounded-full border bg-white flex items-center justify-center shadow-sm relative group cursor-pointer transition-all duration-200
                ${isTargetable
                  ? 'border-indigo-600 bg-indigo-50 hover:scale-125 ring-2 ring-indigo-200 animate-pulse'
                  : 'border-slate-300 hover:border-indigo-500 hover:bg-indigo-50'
                }
              `}
              title={`Connect target: ${inputName}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${isTargetable ? 'bg-indigo-600' : 'bg-slate-400 group-hover:bg-indigo-600'}`} />
              <span className="absolute right-5 text-[9px] bg-slate-800 text-white rounded px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity font-medium tracking-wide whitespace-nowrap pointer-events-none shadow-md">
                {inputName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Output Ports (Right) */}
      <div className="absolute inset-y-0 -right-1.5 flex flex-col justify-center gap-4">
        {node.outputs.map((outputName) => (
          <button
            key={outputName}
            onClick={(e) => {
              e.stopPropagation();
              onStartConnect(node.id, outputName);
            }}
            className={`w-3.5 h-3.5 rounded-full border bg-white flex items-center justify-center shadow-sm relative group cursor-pointer transition-all duration-200
              ${isConnectingSource
                ? 'border-indigo-600 bg-indigo-500 hover:scale-125 ring-2 ring-indigo-200'
                : 'border-slate-300 hover:border-indigo-500 hover:bg-indigo-50'
              }
            `}
            title={`Drag or Click to connect: ${outputName}`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isConnectingSource ? 'bg-white' : 'bg-slate-400 group-hover:bg-indigo-600'}`} />
            <span className="absolute left-5 text-[9px] bg-slate-800 text-white rounded px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity font-medium tracking-wide whitespace-nowrap pointer-events-none shadow-md">
              {outputName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
