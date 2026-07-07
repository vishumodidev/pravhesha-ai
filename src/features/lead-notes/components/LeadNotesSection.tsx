import { useLeadNotes } from '../hooks/useLeadNotes';
import { FileText, RefreshCw, AlertCircle, StickyNote, User, Calendar } from 'lucide-react';

interface LeadNotesSectionProps {
  leadId: string;
}

export default function LeadNotesSection({ leadId }: LeadNotesSectionProps) {
  const { notes, loading, error } = useLeadNotes(leadId);

  // Date formatter
  const formatDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center py-10 space-y-2">
        <RefreshCw className="w-6 h-6 text-indigo-500 animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Loading lead notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center py-10 text-center space-y-2">
        <AlertCircle className="w-8 h-8 text-rose-500" />
        <p className="text-xs font-bold text-slate-800">Failed to load notes</p>
      </div>
    );
  }

  // Sort notes newest first for display
  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-4">
        <StickyNote size={18} className="text-indigo-600" />
        <h3 className="text-lg font-bold text-slate-800 m-0">
          Private Notes
        </h3>
        <span className="text-[10px] bg-slate-105 text-slate-500 font-bold px-2 py-0.5 rounded-full ml-auto">
          {notes.length}
        </span>
      </div>

      {sortedNotes.length === 0 ? (
        <div className="text-center py-12 flex-1 flex flex-col justify-center">
          <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">No notes recorded for this lead yet.</p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto max-h-[450px] flex-1 pr-1 text-left">
          {sortedNotes.map((note) => (
            <div
              key={note.id}
              className="bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 hover:border-slate-200 p-4 rounded-xl shadow-sm transition-all space-y-2.5"
            >
              <div className="flex justify-between items-baseline gap-2">
                <h4 className="text-sm font-bold text-slate-800 truncate">
                  📄 {note.title}
                </h4>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-line font-medium">
                {note.content}
              </p>
              <div className="flex items-center justify-between text-[9.5px] text-slate-400 font-bold pt-1 border-t border-slate-100/50 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <User size={10} className="text-slate-350" />
                  <span>{note.createdBy}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={10} className="text-slate-350" />
                  <span>{formatDate(note.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
