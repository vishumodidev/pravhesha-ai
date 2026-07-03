import { useState } from 'react';
import {
  FileText,
  Brain,
  CheckCircle,
  Clock,
  ThumbsUp,
  MessageSquare,
  Search,
  Filter,
  Upload,
  Plus,
  ChevronRight,
  Loader2,
  Trash2,
  Eye,
  Settings,
  HelpCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const trainingPerformanceData = [
  { name: 'May 15', Accuracy: 86, Useful: 78, Time: 2.1 },
  { name: 'May 16', Accuracy: 87, Useful: 80, Time: 1.9 },
  { name: 'May 17', Accuracy: 89, Useful: 82, Time: 1.8 },
  { name: 'May 18', Accuracy: 90, Useful: 81, Time: 1.7 },
  { name: 'May 19', Accuracy: 91, Useful: 84, Time: 1.6 },
  { name: 'May 20', Accuracy: 92, Useful: 86, Time: 1.5 },
  { name: 'May 21', Accuracy: 92.4, Useful: 87.6, Time: 1.42 }
];

const categoryData = [
  { name: 'Product Info', value: 399, color: '#4f46e5' },
  { name: 'FAQs', value: 312, color: '#10b981' },
  { name: 'Pricing & Plans', value: 200, color: '#f59e0b' },
  { name: 'Policies', value: 137, color: '#e11d48' },
  { name: 'Scripts & Phrases', value: 112, color: '#8b5cf6' },
  { name: 'Others', value: 88, color: '#64748b' }
];

interface TrainingRecord {
  id: string;
  title: string;
  type: string;
  category: string;
  records: string | number;
  lastUpdated: string;
  status: 'Trained' | 'Training' | 'Syncing';
}

export default function AITraining() {
  const [activeTableTab, setActiveTableTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTrainingModel, setIsTrainingModel] = useState(false);
  const [modelAccuracy, setModelAccuracy] = useState(78);
  const [records, setRecords] = useState<TrainingRecord[]>([
    { id: '1', title: 'Product Catalog 2024.pdf', type: 'Document', category: 'Product Information', records: 245, lastUpdated: 'May 21, 2024 09:30 AM', status: 'Trained' },
    { id: '2', title: 'General FAQs', type: 'FAQ', category: 'FAQs', records: 512, lastUpdated: 'May 20, 2024 04:15 PM', status: 'Trained' },
    { id: '3', title: 'Pricing & Plans Info', type: 'Document', category: 'Pricing & Plans', records: 189, lastUpdated: 'May 19, 2024 11:20 AM', status: 'Trained' },
    { id: '4', title: 'Refund & Cancellation Policy', type: 'Document', category: 'Policies', records: 128, lastUpdated: 'May 18, 2024 02:45 PM', status: 'Trained' },
    { id: '5', title: 'Sales Call Script - May', type: 'Custom Script', category: 'Scripts & Phrases', records: 86, lastUpdated: 'May 18, 2024 10:30 AM', status: 'Training' },
    { id: '6', title: 'Website Content Sync', type: 'Website Data', category: 'Product Information', records: '—', lastUpdated: 'May 21, 2024 09:10 AM', status: 'Syncing' }
  ]);

  const handleTrainNow = () => {
    setIsTrainingModel(true);
    setTimeout(() => {
      setIsTrainingModel(false);
      setModelAccuracy(82);
      alert('AI training completed successfully! Model accuracy increased to 82%.');
    }, 3000);
  };

  const handleUploadSim = () => {
    const fileTitle = prompt('Enter document name to upload:');
    if (!fileTitle) return;
    const type = fileTitle.endsWith('.pdf') ? 'Document' : 'Custom Script';
    const newRec: TrainingRecord = {
      id: Date.now().toString(),
      title: fileTitle,
      type,
      category: 'Product Information',
      records: Math.floor(Math.random() * 100) + 10,
      lastUpdated: new Date().toLocaleString([], { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Syncing'
    };
    setRecords((prev) => [newRec, ...prev]);
    setTimeout(() => {
      setRecords((prev) =>
        prev.map((r) => (r.id === newRec.id ? { ...r, status: 'Trained' } : r))
      );
    }, 4000);
  };

  const filteredRecords = records.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTableTab === 'all') return matchesSearch;
    if (activeTableTab === 'documents') return matchesSearch && r.type === 'Document';
    if (activeTableTab === 'faqs') return matchesSearch && r.type === 'FAQ';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0">
            AI Training
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Train PRAVESHA AI with your business knowledge and optimize AI performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-1.5 rounded-xl shadow-sm text-xs font-bold text-slate-700 transition-colors">
            <Settings size={14} />
            <span>Training Settings</span>
          </button>
          <button
            onClick={handleUploadSim}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold transition-all"
          >
            <Plus size={14} />
            <span>+ New Training</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText size={18} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Training Data</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">1,248 Docs</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▲ +24.5% vs last 7d</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Brain size={18} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Questions Trained</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">3,562 QAs</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▲ +18.3% vs last 7d</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Brain size={18} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AI Accuracy</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">92.4%</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▲ +6.2% vs last 7d</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <MessageSquare size={18} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Responses Generated</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">8,925 Res</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▲ +32.1% vs last 7d</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Clock size={18} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg. Response Time</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">1.42s</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▼ -8.6% vs last 7d</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <ThumbsUp size={18} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Useful Responses</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">87.6%</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">▲ +9.3% vs last 7d</span>
          </div>
        </div>
      </div>

      {/* Middle Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Performance Line Chart */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0">Training Performance</h3>
              <p className="text-[11px] text-slate-400">Accuracy & Helpful rates over time</p>
            </div>
            <select className="text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trainingPerformanceData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="Accuracy" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Useful" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span className="text-slate-500 font-medium">Accuracy (%)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-500 font-medium">Useful Responses (%)</span>
            </div>
          </div>
        </div>

        {/* Categories Pie Chart */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm m-0">Training Data by Category</h3>
            <p className="text-[11px] text-slate-400">Distribution of knowledge base assets</p>
          </div>
          <div className="flex gap-4 items-center my-2 justify-center">
            <div className="relative w-28 h-28 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={32}
                    outerRadius={46}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-extrabold text-slate-800 leading-none">1,248</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total Docs</span>
              </div>
            </div>
            {/* List */}
            <div className="space-y-1.5 text-[10px]">
              {categoryData.slice(0, 4).map((entry, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600 truncate max-w-[80px] font-medium">{entry.name}</span>
                  <span className="text-slate-400 font-bold">({entry.value})</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full text-center text-xs text-indigo-600 font-bold hover:underline">
            View All Categories →
          </button>
        </div>

        {/* Training Status Gauge */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm m-0">Training Status</h3>
            <p className="text-[11px] text-slate-400">Current active model details</p>
          </div>

          <div className="flex flex-col items-center my-3 relative">
            <div className="w-32 h-20 overflow-hidden relative flex items-end justify-center">
              <svg width="128" height="64" className="overflow-visible">
                <path
                  d="M 10 64 A 54 54 0 0 1 118 64"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 64 A 54 54 0 0 1 112 40"
                  fill="none"
                  stroke="url(#gauge-train-gradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="169.6"
                  strokeDashoffset={169.6 - (modelAccuracy / 100) * 169.6}
                />
                <defs>
                  <linearGradient id="gauge-train-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-0 flex flex-col items-center">
                <span className="text-xl font-extrabold text-slate-800 leading-none">{modelAccuracy}%</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Model Accuracy</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-[10.5px] border-t border-slate-50 pt-2 text-slate-500">
            <div className="flex justify-between">
              <span>Last Trained:</span>
              <span className="font-semibold text-slate-700">May 21, 2024 09:30 AM</span>
            </div>
            <div className="flex justify-between">
              <span>Next Training:</span>
              <span className="font-semibold text-slate-700">May 22, 2024 09:30 AM</span>
            </div>
            <div className="flex justify-between">
              <span>Model Version:</span>
              <span className="font-semibold text-slate-700">v2.4.1</span>
            </div>
            <div className="flex justify-between">
              <span>Total Records:</span>
              <span className="font-semibold text-slate-700">25,648</span>
            </div>
          </div>

          <button
            onClick={handleTrainNow}
            disabled={isTrainingModel}
            className="w-full mt-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            {isTrainingModel ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span>Training Model...</span>
              </>
            ) : (
              <span>Train Now</span>
            )}
          </button>
        </div>
      </div>

      {/* Lower Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Training Data Table */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl">
              {['all', 'documents', 'faqs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTableTab(tab)}
                  className={`text-[10.5px] font-bold px-2.5 py-1 rounded-lg transition-all capitalize ${
                    activeTableTab === tab
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search training data..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/20 placeholder:text-slate-400 w-44 focus:w-56 transition-all"
                />
              </div>
              <button className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl transition-all">
                <Filter size={14} />
              </button>
              <button
                onClick={handleUploadSim}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Upload size={14} />
                <span>Upload</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-2 font-semibold">Title / Name</th>
                  <th className="pb-2 font-semibold">Type</th>
                  <th className="pb-2 font-semibold">Category</th>
                  <th className="pb-2 font-semibold">Records</th>
                  <th className="pb-2 font-semibold">Last Updated</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredRecords.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 group">
                    <td className="py-3 font-semibold text-slate-800 flex items-center gap-2 max-w-[200px] truncate">
                      <FileText size={14} className="text-slate-400" />
                      <span className="truncate">{row.title}</span>
                    </td>
                    <td className="py-3 text-slate-500">{row.type}</td>
                    <td className="py-3 text-slate-500">{row.category}</td>
                    <td className="py-3 text-slate-500">{row.records}</td>
                    <td className="py-3 text-slate-400">{row.lastUpdated}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                        row.status === 'Trained'
                          ? 'bg-emerald-50 text-emerald-600'
                          : row.status === 'Training'
                          ? 'bg-amber-50 text-amber-500'
                          : 'bg-cyan-50 text-cyan-600'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded">
                          <Eye size={12} />
                        </button>
                        <button
                          onClick={() => setRecords((prev) => prev.filter((r) => r.id !== row.id))}
                          className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-4 border-t border-slate-100 pt-3">
            <span>Showing 1 to {filteredRecords.length} of {records.length} records</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 bg-indigo-50 border border-indigo-200 text-indigo-600 font-bold rounded">1</button>
              <button className="px-2 py-1 border border-slate-200 text-slate-500 hover:bg-slate-50 rounded">2</button>
              <button className="px-2 py-1 border border-slate-200 text-slate-500 hover:bg-slate-50 rounded">3</button>
            </div>
          </div>
        </div>

        {/* Right Side topics and activity */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Top Learned Topics */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-sm m-0">AI Top Learned Topics</h3>
              <button className="text-xs text-indigo-600 font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {[
                { topic: 'Product Features', score: 98, color: 'bg-indigo-600' },
                { topic: 'Pricing & Plans', score: 95, color: 'bg-purple-600' },
                { topic: 'Refund Policy', score: 93, color: 'bg-emerald-600' },
                { topic: 'Integration Support', score: 90, color: 'bg-blue-600' },
                { topic: 'Account Management', score: 88, color: 'bg-amber-600' }
              ].map((topic, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[10.5px] font-medium">
                    <span className="text-slate-600">{topic.topic}</span>
                    <span className="text-slate-800 font-bold">{topic.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${topic.color} rounded-full`} style={{ width: `${topic.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Training Activity */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-sm m-0">Recent Training Activity</h3>
              <button className="text-xs text-indigo-600 font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-3.5">
              <div className="flex items-start gap-2.5 text-[11px]">
                <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-700 block leading-tight">Product Catalog 2024.pdf</span>
                  <span className="text-slate-400 block mt-0.5">Trained successfully • May 21, 09:30 AM</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-[11px]">
                <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-700 block leading-tight">50 new Q&A pairs added</span>
                  <span className="text-slate-400 block mt-0.5">Training completed • May 21, 09:15 AM</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-[11px]">
                <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-700 block leading-tight">Website content synced</span>
                  <span className="text-slate-400 block mt-0.5">120 pages completed • May 21, 09:10 AM</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-[11px]">
                <Loader2 size={14} className="text-amber-500 shrink-0 mt-0.5 animate-spin" />
                <div>
                  <span className="font-bold text-slate-700 block leading-tight">Sales Script - May</span>
                  <span className="text-slate-400 block mt-0.5">Training in progress (68%) • May 21, 08:45 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Improve metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-slate-800 text-sm mb-4 m-0">Improve AI Performance</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl flex flex-col justify-between hover:border-indigo-100 hover:bg-indigo-50/10 transition-all group">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Low Accuracy Questions</span>
              <span className="text-xl font-bold text-slate-800 mt-2 block">128</span>
              <button className="text-[10.5px] font-bold text-indigo-600 hover:underline mt-4 text-left flex items-center gap-0.5">
                Review & Improve <ChevronRight size={10} />
              </button>
            </div>

            <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl flex flex-col justify-between hover:border-indigo-100 hover:bg-indigo-50/10 transition-all group">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Unanswered Questions</span>
              <span className="text-xl font-bold text-slate-800 mt-2 block">67</span>
              <button className="text-[10.5px] font-bold text-indigo-600 hover:underline mt-4 text-left flex items-center gap-0.5">
                Add Answers <ChevronRight size={10} />
              </button>
            </div>

            <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl flex flex-col justify-between hover:border-indigo-100 hover:bg-indigo-50/10 transition-all group">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Feedback Received</span>
              <span className="text-xl font-bold text-slate-800 mt-2 block">342</span>
              <button className="text-[10.5px] font-bold text-indigo-600 hover:underline mt-4 text-left flex items-center gap-0.5">
                View Feedback <ChevronRight size={10} />
              </button>
            </div>

            <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl flex flex-col justify-between hover:border-indigo-100 hover:bg-indigo-50/10 transition-all group">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Suggested Improvements</span>
              <span className="text-xl font-bold text-slate-800 mt-2 block">89</span>
              <button className="text-[10.5px] font-bold text-indigo-600 hover:underline mt-4 text-left flex items-center gap-0.5">
                View Suggestions <ChevronRight size={10} />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-gradient-to-br from-indigo-550 via-indigo-600 to-indigo-750 text-white rounded-2xl p-5 shadow-lg flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-white/10 blur-xl group-hover:scale-110 transition-transform duration-300" />
          <div className="flex-1">
            <h3 className="font-bold text-white text-sm m-0">Need Help Training AI?</h3>
            <p className="text-[11px] text-indigo-100 mt-1.5 leading-relaxed">
              Our step-by-step interactive assistant guides you through the process of uploading, categorizing, and validating your data.
            </p>
            <button className="mt-4 px-4 py-1.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95">
              Start Training Guide
            </button>
          </div>
          <HelpCircle size={36} className="text-white/20 shrink-0 self-end" />
        </div>
      </div>
    </div>
  );
}
