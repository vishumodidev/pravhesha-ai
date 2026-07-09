export interface WhatsAppKnowledgeDoc {
  id: string;
  source: 'CRM FAQ' | 'WhatsApp limits' | 'Pricing' | 'Features';
  title: string;
  content: string;
  tags: string[];
}

export const KNOWLEDGE_BASE: WhatsAppKnowledgeDoc[] = [
  {
    id: 'kb-crm-1',
    source: 'CRM FAQ',
    title: 'How to add leads to Pravesha AI',
    content: 'Leads are added automatically via incoming WhatsApp queries, Webhook endpoints, or the social leads integrations panel. You can also upload a CSV of leads in the CRM Lead List dashboard.',
    tags: ['lead', 'add', 'leads', 'import']
  },
  {
    id: 'kb-limit-1',
    source: 'WhatsApp limits',
    title: 'WhatsApp Message Rate Restrictions',
    content: 'Under the Sandbox tier, you can send messages to up to 50 unique numbers per day. To scale, register your official Meta Business ID in Settings > Channels and complete API authentication.',
    tags: ['limit', 'whatsapp', 'rates', 'meta']
  },
  {
    id: 'kb-pricing-1',
    source: 'Pricing',
    title: 'Pravesha AI Subscription Plans',
    content: '1) Basic Plan: $29/mo, includes 5 custom fields and 1 active WhatsApp Agent. 2) Standard Plan: $99/mo, includes unlimited custom fields, 3 active AI Agents, and 2,000 WhatsApp sessions. 3) Enterprise Plan: $299/mo, offers full white-labeling, RAG catalogs, and custom LLM integrations.',
    tags: ['pricing', 'subscription', 'plans', 'cost']
  },
  {
    id: 'kb-feat-1',
    source: 'Features',
    title: 'Automated CRM Dialer & Call Logs',
    content: 'Pravesha AI includes a built-in VOIP dialer. Support reps can click to call leads directly from the browser. Calls are auto-logged, and AI compiles call summaries under the Lead Activities page.',
    tags: ['features', 'dialer', 'calling', 'call logs']
  }
];

export const whatsappKnowledge = {
  search: (query: string, sources?: string[]): { doc: WhatsAppKnowledgeDoc; score: number }[] => {
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/).filter(t => t.length > 2);
    
    let filtered = KNOWLEDGE_BASE;
    if (sources && sources.length > 0) {
      filtered = KNOWLEDGE_BASE.filter(doc => sources.includes(doc.source));
    }

    const results = filtered.map(doc => {
      let score = 0;
      if (doc.title.toLowerCase().includes(queryLower)) {
        score += 0.5;
      }
      queryTerms.forEach(term => {
        if (doc.title.toLowerCase().includes(term)) score += 0.2;
        if (doc.content.toLowerCase().includes(term)) score += 0.1;
        if (doc.tags.some(tag => tag.toLowerCase() === term)) score += 0.3;
      });
      return { doc, score };
    });

    return results
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);
  }
};
