import { Sparkles, FileText, User, Zap } from 'lucide-react';
import type { Automation } from '../types';

interface TemplatesListProps {
  templates: Automation[];
  onLoadTemplate: (template: Automation) => void;
}

export default function TemplatesList({ templates, onLoadTemplate }: TemplatesListProps) {
  return (
    <div className="flex flex-col h-full bg-white select-none">
      <div className="p-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-1.5">
          <Sparkles size={16} className="text-indigo-600 animate-float" />
          Workflow Templates
        </h3>
        <p className="text-xs text-slate-400 mt-1">Pre-configured templates to kickstart your automation flows.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {templates.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-slate-400">
            <FileText size={28} className="stroke-[1.5] mb-2" />
            <span className="text-xs">No templates found</span>
          </div>
        ) : (
          templates.map((tpl) => (
            <div
              key={tpl.id}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all duration-200 flex flex-col gap-2 group hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-xs text-slate-800 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors">
                  {tpl.name}
                </h4>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 shrink-0">
                  {tpl.trigger}
                </span>
              </div>
              
              <p className="text-[11px] text-slate-500 font-normal leading-snug line-clamp-2">
                {tpl.description}
              </p>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <User size={10} />
                  {tpl.createdBy}
                </span>
                <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-slate-100 font-medium text-slate-500">
                  <Zap size={10} className="text-yellow-500" />
                  {tpl.nodes.length} nodes
                </span>
              </div>

              <button
                onClick={() => onLoadTemplate(tpl)}
                className="w-full mt-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer hover:shadow-indigo-100"
              >
                Use Template
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
