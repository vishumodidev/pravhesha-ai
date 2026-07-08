export type KnowledgeCategory = 'Products' | 'Policies' | 'Training' | 'FAQ' | 'Sales' | 'Support' | 'HR' | 'Finance';
export type KnowledgeDocumentType = 'PDF' | 'DOCX' | 'TXT' | 'Markdown' | 'HTML';
export type KnowledgeDocumentStatus = 'Published' | 'Draft' | 'Archived';

export interface KnowledgeDocument {
  id: string;
  title: string;
  description: string;
  category: KnowledgeCategory;
  tags: string[];
  documentType: KnowledgeDocumentType;
  status: KnowledgeDocumentStatus;
  author: string;
  version: string;
  content: string; // Document content / raw text preview
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
