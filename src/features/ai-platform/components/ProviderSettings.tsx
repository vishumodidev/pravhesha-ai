import { useState } from 'react';
import { useLLMProvider } from '../hooks/useLLMProvider';
import { providerService } from '../services/provider.service';
import { Activity, Cpu, ShieldCheck, Zap, Server, Key, Sliders, PlayCircle } from 'lucide-react';

export default function ProviderSettings() {
  const { providers, activeProviderMeta, activeProviderConfig, switchProvider } = useLLMProvider();
  const [testingId, setTestingId] = useState<string | null>(null);
  const [healthStatus, setHealthStatus] = useState<Record<string, 'healthy' | 'unhealthy' | null>>({});

  const handleTestHealth = async (id: string) => {
    setTestingId(id);
    const isHealthy = await providerService.validateProvider(id);
    setHealthStatus((prev) => ({ ...prev, [id]: isHealthy ? 'healthy' : 'unhealthy' }));
    setTestingId(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
      {/* Overview Metadata Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 shadow-sm text-left">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Cpu size={22} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active LLM Provider</span>
            <span className="text-sm font-bold text-slate-800 block mt-0.5">{activeProviderMeta?.name || 'OpenAI'}</span>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 shadow-sm text-left">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Zap size={22} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Default Model</span>
            <span className="text-xs font-bold text-slate-700 block mt-1">{activeProviderConfig?.defaultModel || 'gpt-4o'}</span>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 shadow-sm text-left">
          <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shrink-0">
            <Activity size={22} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">System Status</span>
            <span className="text-xs font-bold text-slate-700 block mt-1">
              <span className="inline-flex items-center gap-1.5 text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Operational
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Active Configuration Details */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm text-left">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
          <Sliders size={16} className="text-slate-500" />
          <h4 className="text-sm font-bold text-slate-800">Active Model Parameters</h4>
        </div>
        <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Max Completion Tokens</span>
            <span className="text-xs font-semibold text-slate-700">{activeProviderConfig?.maxTokens || 'N/A'}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Temperature Parameter</span>
            <span className="text-xs font-semibold text-slate-700">{activeProviderConfig?.temperature ?? 'N/A'}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Timeout Threshold</span>
            <span className="text-xs font-semibold text-slate-700">{(activeProviderConfig?.timeoutMs || 30000) / 1000}s</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Credential Validation</span>
            <span className="text-xs font-semibold text-slate-700 inline-flex items-center gap-1">
              <Key size={12} className="text-amber-500" />
              {activeProviderConfig?.apiKey ? 'Configured (Env)' : 'Mock Framework'}
            </span>
          </div>
        </div>
      </div>

      {/* Providers Table List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm text-left">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
          <Server size={16} className="text-slate-500" />
          <h4 className="text-sm font-bold text-slate-800">Available Model Providers</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Provider Name</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Default Model</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Health</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Latency</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {providers.map((provider) => {
                const isActive = activeProviderMeta?.id === provider.id;
                const config = providerService.getProviderConfig(provider.id);
                const testResult = healthStatus[provider.id];

                return (
                  <tr key={provider.id} className={`hover:bg-slate-50/50 transition-all ${isActive ? 'bg-indigo-50/10' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{provider.name}</span>
                        {isActive && (
                          <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-md text-[9px] font-bold">
                            Active
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-semibold text-slate-600 font-mono">{config?.defaultModel || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        provider.status === 'Online'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}>
                        {provider.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-semibold text-slate-500">
                        {testResult === 'healthy' ? (
                          <span className="text-emerald-600 font-bold inline-flex items-center gap-1">
                            <ShieldCheck size={13} />
                            Healthy
                          </span>
                        ) : testResult === 'unhealthy' ? (
                          <span className="text-rose-600 font-bold inline-flex items-center gap-1">
                            <Activity size={13} />
                            Unreachable
                          </span>
                        ) : (
                          provider.health
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-medium text-slate-500">{provider.latency}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <button
                        onClick={() => handleTestHealth(provider.id)}
                        disabled={testingId !== null}
                        className="px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition-all inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <PlayCircle size={12} className={testingId === provider.id ? 'animate-spin' : ''} />
                        Test Health
                      </button>
                      {!isActive && provider.status === 'Online' && (
                        <button
                          onClick={() => switchProvider(provider.id)}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold shadow-sm transition-all cursor-pointer"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
