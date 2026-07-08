import { useState } from 'react';
import { useMemory } from '../hooks/useMemory';
import type { Memory, MemoryCategory } from '../types';
import { Brain, Search, Plus, Trash2, Pin, PinOff, Star, Calendar, Database, Sparkles } from 'lucide-react';

export default function MemoryPage() {
  const {
    memories,
    pinnedMemories,
    loading,
    error,
    addMemory,
    deleteMemory,
    pinMemory,
    unpinMemory,
  } = useMemory();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Form states
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newCategory, setNewCategory] = useState<MemoryCategory>('User Preference');
  const [newImportance, setNewImportance] = useState(3);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const categories: (MemoryCategory | 'ALL')[] = [
    'ALL',
    'Conversation',
    'User Preference',
    'CRM',
    'Customer',
    'Lead',
    'Task',
    'Workflow',
  ];

  const filteredMemories = memories.filter((m) => {
    const matchesSearch =
      m.key.toLowerCase().includes(search.toLowerCase()) ||
      m.value.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || m.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey || !newValue) return;
    setSubmitting(true);
    try {
      await addMemory({
        key: newKey,
        value: newValue,
        category: newCategory,
        importance: newImportance,
      });
      setNewKey('');
      setNewValue('');
      setNewImportance(3);
      setFormOpen(false);
    } catch (err) {
      console.error('[MemoryPage] Failed to add memory:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePin = (m: Memory) => {
    const isPinned = pinnedMemories.some((pm) => pm.id === m.id);
    if (isPinned) {
      unpinMemory(m.id);
    } else {
      pinMemory(m);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/20">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 p-5 shrink-0 text-left space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2 m-0">
              <Brain className="text-indigo-600 animate-pulse" size={22} />
              AI Memory Engine
            </h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Independent client contextual memory layer containing preferences, key decision summaries, and workspace history.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search memories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-slate-700"
              />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Form Toggle */}
            <button
              onClick={() => setFormOpen(!formOpen)}
              className="px-3.5 py-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-100 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Plus size={14} />
              Record Memory
            </button>
          </div>
        </div>

        {/* Category Chip Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-indigo-650 text-white shadow-sm shadow-indigo-100'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
              }`}
            >
              {cat === 'ALL' ? 'All Memories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace viewport */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
        {/* Memory Addition Overlay Form */}
        {formOpen && (
          <form
            onSubmit={handleAddMemory}
            className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-lg max-w-2xl animate-fadeIn"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Sparkles size={14} className="text-indigo-500" />
                Record New Contextual Memory Unit
              </span>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10.5px] font-bold text-slate-500">Memory Key Token</label>
                <input
                  type="text"
                  required
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold text-slate-700"
                  placeholder="e.g. Preferred Language, Target Program"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10.5px] font-bold text-slate-500">Memory Value Payload</label>
                <input
                  type="text"
                  required
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold text-slate-700"
                  placeholder="e.g. Spanish, Full Stack Development"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10.5px] font-bold text-slate-500">Category Scope</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as MemoryCategory)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold text-slate-700 cursor-pointer"
                >
                  {categories.filter((c) => c !== 'ALL').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10.5px] font-bold text-slate-500">Importance Ranking (1-5)</label>
                <div className="flex items-center gap-1.5 pt-1.5">
                  {[1, 2, 3, 4, 5].map((starsCount) => (
                    <button
                      key={starsCount}
                      type="button"
                      onClick={() => setNewImportance(starsCount)}
                      className="text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star size={18} fill={starsCount <= newImportance ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Saving Memory...' : 'Save Context Memory Unit'}
            </button>
          </form>
        )}

        {/* Pinned Section */}
        {pinnedMemories.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider flex items-center gap-1">
              <Pin size={12} className="text-indigo-500" />
              Pinned Memories
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedMemories.map((m) => (
                <div
                  key={`pin-${m.id}`}
                  className="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-left">
                      <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">
                        {m.category}
                      </span>
                      <h5 className="text-xs font-bold text-slate-800 mt-2.5 font-mono">{m.key}</h5>
                      <p className="text-xs text-indigo-900 font-bold mt-1 bg-white border border-indigo-100 rounded-lg p-2 leading-relaxed">
                        {m.value}
                      </p>
                    </div>
                    <button
                      onClick={() => handleTogglePin(m)}
                      className="text-indigo-600 hover:text-indigo-800 transition-colors p-1"
                    >
                      <PinOff size={14} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-450 border-t border-indigo-100/50 pt-2.5">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: m.importance }).map((_, i) => (
                        <Star key={i} size={10} fill="currentColor" />
                      ))}
                    </div>
                    <span>Pinned Context</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Memories Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider flex items-center gap-1.5">
            <Database size={12} className="text-slate-400" />
            Recent Context Memory Nodes
          </h4>

          {loading ? (
            <div className="text-center text-xs font-semibold text-slate-450 py-20">
              Loading memory index logs...
            </div>
          ) : error ? (
            <div className="text-center text-xs font-semibold text-rose-500 py-10">
              Failed to load memory database.
            </div>
          ) : filteredMemories.length === 0 ? (
            <div className="text-center text-xs font-semibold text-slate-400 py-20 bg-white border border-dashed border-slate-200 rounded-2xl">
              No memory units found matching filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMemories.map((m) => {
                const isPinned = pinnedMemories.some((pm) => pm.id === m.id);
                return (
                  <div
                    key={m.id}
                    className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:shadow-md hover:border-slate-300 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-left">
                        <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                          {m.category}
                        </span>
                        <h5 className="text-xs font-bold text-slate-800 mt-2.5 font-mono">{m.key}</h5>
                        <p className="text-xs text-slate-700 font-semibold mt-1 bg-slate-50 border border-slate-150 rounded-lg p-2 leading-relaxed">
                          {m.value}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleTogglePin(m)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            isPinned
                              ? 'bg-indigo-50 border-indigo-150 text-indigo-600'
                              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <Pin size={12} fill={isPinned ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          onClick={() => deleteMemory(m.id)}
                          className="p-1.5 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-150 text-slate-400 hover:text-rose-500 rounded-lg transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-2.5">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={10}
                            fill={idx < m.importance ? 'currentColor' : 'none'}
                            className={idx < m.importance ? 'text-amber-400' : 'text-slate-200'}
                          />
                        ))}
                      </div>
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(m.updatedAt).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
