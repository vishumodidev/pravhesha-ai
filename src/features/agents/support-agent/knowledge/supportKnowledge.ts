export interface KnowledgeDoc {
  id: string;
  source: 'FAQ' | 'Support SOP' | 'Troubleshooting Guide' | 'Product Documentation' | 'Policies';
  title: string;
  content: string;
  tags: string[];
}

export const KNOWLEDGE_BASE: KnowledgeDoc[] = [
  {
    id: 'kb-faq-1',
    source: 'FAQ',
    title: 'How to Reset Your Account Password',
    content: 'To reset your account password, navigate to the Login page, click on "Forgot Password", and enter your registered email. You will receive a reset token valid for 30 minutes. Follow the email link to enter a new password.',
    tags: ['password', 'reset', 'login', 'account']
  },
  {
    id: 'kb-sop-1',
    source: 'Support SOP',
    title: 'Customer SLA Response Targets',
    content: 'Pravesha AI support SLAs are defined by plan tiers: Enterprise Plan offers a 2-hour response guarantee for Critical issues and a 4-hour guarantee for standard queries. Standard Plan has a 12-hour response window, and Basic Plan has a 24-hour response window.',
    tags: ['sla', 'response', 'time', 'guarantee', 'support']
  },
  {
    id: 'kb-sop-2',
    source: 'Support SOP',
    title: 'Escalation Guidelines for Financial Issues',
    content: 'All queries relating to invoice discrepancies, refund claims exceeding $500, or chargebacks must be routed directly to the Billing & Accounts Tier 2 queue. Standard support representatives should never approve large refunds directly.',
    tags: ['refund', 'billing', 'invoice', 'escalate', 'finance']
  },
  {
    id: 'kb-guide-1',
    source: 'Troubleshooting Guide',
    title: 'Resolving CRM API Connection Synchronization Errors',
    content: 'If your CRM data fails to sync, check the following: 1) Verify that your OAuth Token has not expired. Re-authenticate in Settings > Integrations. 2) Ensure the webhook endpoints are whitelisted in your server firewall. 3) Inspect the error logs under Settings > Developer Logs for 401 or 403 HTTP codes.',
    tags: ['crm', 'sync', 'connection', 'api', 'error', '401']
  },
  {
    id: 'kb-doc-1',
    source: 'Product Documentation',
    title: 'Custom Field Mapping in Pravesha AI Dashboard',
    content: 'You can map custom fields from leads to customer profiles under Settings > Fields. Supported data types are String, Number, Boolean, and DateTime. Ensure that the target field type in the customer object matches the source type in the lead object to avoid casting exceptions.',
    tags: ['mapping', 'fields', 'leads', 'custom', 'dashboard']
  },
  {
    id: 'kb-policy-1',
    source: 'Policies',
    title: 'Subscription Cancellation and Refund Policy',
    content: 'Customers can cancel their subscriptions at any time via the billing portal. Pravesha AI offers a full refund if requested within 30 days of the initial purchase. Refunds are not provided for partial months or mid-cycle cancellations on monthly plans.',
    tags: ['refund', 'cancel', 'policy', 'billing', 'refund policy']
  }
];

export const supportKnowledge = {
  /**
   * Simple mock term-matching search engine to simulate Vector Search / RAG query
   */
  search: (query: string, sources?: string[]): { doc: KnowledgeDoc; score: number }[] => {
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/).filter(t => t.length > 2);
    
    let filtered = KNOWLEDGE_BASE;
    if (sources && sources.length > 0) {
      filtered = KNOWLEDGE_BASE.filter(doc => sources.includes(doc.source));
    }

    const results = filtered.map(doc => {
      let score = 0;
      
      // Title match
      if (doc.title.toLowerCase().includes(queryLower)) {
        score += 0.5;
      }
      
      // Term matching
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
      .slice(0, 3);
  }
};
