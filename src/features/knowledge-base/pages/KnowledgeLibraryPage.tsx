import { useState, useEffect } from 'react';
import { useKnowledge } from '../hooks/useKnowledge';
import { useKnowledgeDocument } from '../hooks/useKnowledgeDocument';
import type { KnowledgeDocument } from '../types';
import { FileText, Search, BookOpen, User, Calendar, Tag, ShieldCheck, Download, ChevronRight, FileCode } from 'lucide-react';

export default function KnowledgeLibraryPage() {
  const {
    documents,
    categories,
    loading,
    error,
    selectedCategory,
    searchKeyword,
    setSelectedCategory,
    setSearchKeyword,
  } = useKnowledge();

  const { document: selectedDocument, setSelectedDocument } = useKnowledgeDocument();
  const [activeDoc, setActiveDoc] = useState<KnowledgeDocument | null>(null);

  // Set first document as default if none selected
  useEffect(() => {
    if (documents.length > 0 && !selectedDocument) {
      setSelectedDocument(documents[0]);
    }
  }, [documents, selectedDocument, setSelectedDocument]);

  useEffect(() => {
    if (selectedDocument) {
      setActiveDoc(selectedDocument);
    }
  }, [selectedDocument]);

  const handleSelectDoc = (doc: KnowledgeDocument) => {
    setSelectedDocument(doc);
    setActiveDoc(doc);
  };

  const getDocIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">PDF</div>;
      case 'DOCX':
        return <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">DOC</div>;
      case 'Markdown':
        return <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center"><FileCode size={18} /></div>;
      case 'HTML':
        return <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-[10px]">HTML</div>;
      default:
        return <div className="w-9 h-9 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center"><FileText size={18} /></div>;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/30">
      {/* Top Banner Filter */}
      <div className="bg-white border-b border-slate-200 p-5 shrink-0 text-left space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2 m-0">
              <BookOpen className="text-indigo-600" size={22} />
              Knowledge Library
            </h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Centralized repository of SOPs, training manuals, product curriculum, and business guidelines.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search documentation, tags, content..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-slate-700"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-100'
                : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-100'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Documents List Grid */}
        <div className="w-1/2 border-r border-slate-200 overflow-y-auto p-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">
              Documentation Catalogue
            </span>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              {documents.length} Matches
            </span>
          </div>

          {loading ? (
            <div className="text-center text-xs font-semibold text-slate-450 py-20">
              Loading knowledge documents...
            </div>
          ) : error ? (
            <div className="text-center text-xs font-semibold text-rose-500 py-10">
              Failed to load knowledge documentation.
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center text-xs font-semibold text-slate-400 py-20 bg-white border border-dashed border-slate-200 rounded-2xl">
              No matching documents found.
            </div>
          ) : (
            <div className="space-y-2.5">
              {documents.map((doc) => {
                const isActive = activeDoc?.id === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => handleSelectDoc(doc)}
                    className={`w-full flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                      isActive
                        ? 'bg-white border-indigo-200 shadow-md shadow-slate-100/50 scale-[1.01]'
                        : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    {getDocIcon(doc.documentType)}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-700 truncate leading-snug">{doc.title}</span>
                        <ChevronRight size={14} className={isActive ? 'text-indigo-500' : 'text-slate-350'} />
                      </div>
                      <p className="text-[10.5px] text-slate-400 font-medium line-clamp-1 mt-0.5">{doc.description}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.25 rounded">
                          {doc.category}
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold">• v{doc.version}</span>
                        <span className={`text-[9px] font-bold ml-auto ${
                          doc.status === 'Published' ? 'text-emerald-500' : 'text-amber-500'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Document Reader Pane */}
        <div className="w-1/2 bg-white overflow-y-auto p-6 text-left flex flex-col h-full">
          {!activeDoc ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2">
              <BookOpen size={40} className="text-slate-300 animate-pulse" />
              <p className="text-xs font-bold">Select a document from the left catalog to read.</p>
            </div>
          ) : (
            <div className="space-y-6 flex-1 flex flex-col">
              {/* Document Meta Header */}
              <div className="border-b border-slate-200 pb-5 space-y-4 shrink-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100/50 px-2 py-0.5 rounded-lg">
                      {activeDoc.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-800 tracking-tight mt-2 m-0">
                      {activeDoc.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">
                      {activeDoc.description}
                    </p>
                  </div>

                  <button className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-sm">
                    <Download size={14} />
                  </button>
                </div>

                {/* Meta details list */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-slate-400 font-semibold border-t border-slate-100 pt-3.5">
                  <span className="flex items-center gap-1">
                    <User size={12} className="text-slate-300" />
                    Author: <span className="text-slate-650 font-bold">{activeDoc.author}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-slate-300" />
                    Updated: <span className="text-slate-650 font-bold">{new Date(activeDoc.updatedAt).toLocaleDateString('en-IN')}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} className="text-slate-300" />
                    Version: <span className="text-slate-650 font-bold">v{activeDoc.version}</span>
                  </span>
                </div>

                {/* Tags */}
                {activeDoc.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Tag size={10} className="text-slate-400" />
                    {activeDoc.tags.map((tag) => (
                      <span key={tag} className="text-[9px] bg-slate-150/50 text-slate-550 border border-slate-200/40 px-1.5 py-0.25 rounded-md font-bold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Document Reading Viewport */}
              <div className="flex-1 min-h-[300px] border border-slate-150 rounded-2xl p-5 bg-slate-50/30 overflow-y-auto leading-relaxed shadow-inner">
                {activeDoc.documentType === 'Markdown' ? (
                  <div className="prose prose-slate prose-xs max-w-none">
                    <h1 className="text-base font-extrabold text-slate-800 border-b border-slate-200 pb-2 mb-3">{activeDoc.title}</h1>
                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">{activeDoc.content}</p>
                  </div>
                ) : activeDoc.documentType === 'HTML' ? (
                  <div className="prose prose-slate prose-xs max-w-none text-xs text-slate-700 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: activeDoc.content }} />
                ) : (
                  <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-medium font-sans">
                    {activeDoc.content}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
