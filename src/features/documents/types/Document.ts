export type DocumentEntityType = 'Lead' | 'Customer' | 'Task' | 'Ticket' | 'Quotation';

export interface Document {
  id: string;
  entityType: DocumentEntityType;
  entityId: string;
  fileName: string;
  fileType: string; // e.g., 'pdf', 'docx', 'png', 'xlsx'
  fileSize: number; // in bytes
  uploadedBy: string;
  uploadedAt: string; // ISO format date string
  url: string;
  status: 'active' | 'archived';
}
