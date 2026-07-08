import { useQuery } from '@tanstack/react-query';
import { knowledgeService } from '../services/knowledge.service';
import { useKnowledgeStore } from '../store/knowledge.store';
import type { KnowledgeDocument, KnowledgeCategory } from '../types';

export function useKnowledge() {
  const { selectedCategory, searchKeyword, setSelectedCategory, setSearchKeyword, setSelectedDocument } = useKnowledgeStore();

  const { data: documents = [], isLoading: docsLoading, error: docsError } = useQuery<KnowledgeDocument[]>({
    queryKey: ['knowledgeDocuments'],
    queryFn: () => knowledgeService.getDocuments(),
  });

  const { data: categories = [], isLoading: catsLoading } = useQuery<KnowledgeCategory[]>({
    queryKey: ['knowledgeCategories'],
    queryFn: () => knowledgeService.getCategories(),
  });

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory = selectedCategory === 'ALL' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchKeyword.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return {
    documents: filteredDocuments,
    allDocuments: documents,
    categories,
    loading: docsLoading || catsLoading,
    error: docsError,
    selectedCategory,
    searchKeyword,
    setSelectedCategory,
    setSearchKeyword,
    setSelectedDocument,
  };
}
