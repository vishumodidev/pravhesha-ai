import { FileText, FileSpreadsheet, File, Download, RefreshCw, Eye } from 'lucide-react';
import { useDocuments } from '../hooks/useDocuments';

interface DocumentsPanelProps {
  entityType: string;
  entityId: string;
}

export default function DocumentsPanel({ entityType, entityId }: DocumentsPanelProps) {
  const { data: documents, loading, error, refetch } = useDocuments(entityType, entityId);

  const getFileIcon = (fileType: string) => {
    const ext = fileType.toLowerCase();
    switch (ext) {
      case 'pdf':
        return <FileText size={18} className="text-rose-600" />;
      case 'xlsx':
      case 'xls':
      case 'csv':
        return <FileSpreadsheet size={18} className="text-emerald-600" />;
      case 'doc':
      case 'docx':
        return <FileText size={18} className="text-blue-600" />;
      default:
        return <File size={18} className="text-slate-500" />;
    }
  };

  const getFileIconBg = (fileType: string) => {
    const ext = fileType.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'bg-rose-50 border-rose-100';
      case 'xlsx':
      case 'xls':
      case 'csv':
        return 'bg-emerald-50 border-emerald-100';
      case 'doc':
      case 'docx':
        return 'bg-blue-50 border-blue-100';
      default:
        return 'bg-slate-55 border-slate-100';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-left">
      {/* Panel Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-slate-800 text-sm m-0">Documents</h3>
          {!loading && !error && documents.length > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-full shrink-0">
              {documents.length}
            </span>
          )}
        </div>
        <button
          onClick={() => refetch()}
          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          title="Refresh Documents"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Panel Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 space-y-2">
          <RefreshCw className="w-5 h-5 text-indigo-500 animate-spin" />
          <p className="text-xs font-semibold text-slate-400">Loading files...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 space-y-2">
          <p className="text-xs font-bold text-rose-500">Failed to load documents</p>
          <button
            onClick={() => refetch()}
            className="px-2.5 py-1.5 text-[10px] font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center py-8 space-y-2">
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
            <File size={18} />
          </div>
          <p className="text-xs font-bold text-slate-500">No Documents</p>
          <p className="text-[10px] text-slate-400 max-w-[200px] mx-auto">
            No files have been uploaded for this {entityType}.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
          {documents.map((doc) => (
            <div key={doc.id} className="py-3 flex items-center justify-between gap-3 group first:pt-0 last:pb-0">
              <div className="flex items-center gap-3 min-w-0">
                {/* Icon box */}
                <div className={`p-2 rounded-xl border shrink-0 flex items-center justify-center ${getFileIconBg(doc.fileType)}`}>
                  {getFileIcon(doc.fileType)}
                </div>
                {/* Text details */}
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-800 truncate block hover:text-indigo-600 transition-colors cursor-pointer" title={doc.fileName}>
                    {doc.fileName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                    {doc.fileType.toUpperCase()} • {formatFileSize(doc.fileSize)} • By {doc.uploadedBy} on {formatDate(doc.uploadedAt)}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => alert(`Opening ${doc.fileName}...`)}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                  title="View Document"
                >
                  <Eye size={14} />
                </button>
                <button
                  onClick={() => alert(`Downloading ${doc.fileName}...`)}
                  className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                  title="Download"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
