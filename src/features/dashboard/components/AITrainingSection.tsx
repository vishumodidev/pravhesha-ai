import { Upload, Brain, ChevronRight } from 'lucide-react';

interface AITrainingSectionProps {
  accuracy: number;
  totalDocs: number;
  questionsTrained: number;
  lastTrained: string;
  onNavigateToTraining: () => void;
}

export default function AITrainingSection({
  accuracy,
  totalDocs,
  questionsTrained,
  lastTrained,
  onNavigateToTraining,
}: AITrainingSectionProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-sm m-0">AI Training Module</h3>
          <p className="text-[11px] text-slate-400">Train PRAVESHA AI with your business knowledge base</p>
        </div>
        <button
          className="text-xs text-indigo-600 font-bold hover:underline"
          onClick={onNavigateToTraining}
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Quick Actions */}
        <div className="space-y-2.5">
          <button
            className="w-full flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 hover:border-indigo-200 rounded-xl transition-all group"
            onClick={onNavigateToTraining}
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                <Upload size={14} />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-slate-705 block">Upload Documents</span>
                <span className="text-[9px] text-slate-405 block">Upload PDFs, FAQs, SOPs</span>
              </div>
            </div>
            <ChevronRight size={14} className="text-slate-400" />
          </button>

          <button
            className="w-full flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 hover:border-indigo-200 rounded-xl transition-all group"
            onClick={onNavigateToTraining}
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                <Brain size={14} />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-slate-750 block">Train AI Model</span>
                <span className="text-[9px] text-slate-405 block">Analyze and optimize models</span>
              </div>
            </div>
            <ChevronRight size={14} className="text-slate-400" />
          </button>
        </div>

        {/* Gauge Accuracy */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="w-32 h-20 overflow-hidden relative flex items-end justify-center">
            <svg width="128" height="64" className="overflow-visible">
              <path
                d="M 10 64 A 54 54 0 0 1 118 64"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 10 64 A 54 54 0 0 1 106 28"
                fill="none"
                stroke="url(#gauge-gradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="169.6"
                strokeDashoffset={169.6 - (169.6 * accuracy) / 100}
              />
              <defs>
                <linearGradient id="gauge-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0 flex flex-col items-center">
              <span className="text-xl font-extrabold text-slate-800 leading-none">{accuracy}%</span>
              <span className="text-[9px] text-slate-400 font-semibold uppercase mt-0.5">Model Accuracy</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3.5 border-l border-slate-100 pl-6 md:pl-8">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Documents</span>
            <span className="text-base font-bold text-slate-800">{totalDocs} Docs</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Questions Trained</span>
            <span className="text-base font-bold text-slate-800">{questionsTrained} QAs</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Last Trained On</span>
            <span className="text-xs font-semibold text-indigo-600 block">{lastTrained}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
