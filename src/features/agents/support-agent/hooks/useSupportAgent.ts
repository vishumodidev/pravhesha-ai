import { useState, useEffect } from 'react';
import type { SupportCustomer, SupportTicket, SupportMessage } from '../types';
import { supportAgentService } from '../services/support-agent.service';
import supportMocksData from '../mocks/supportMocks.json';

export interface SupportAction {
  type: string;
  title: string;
  description: string;
  payload: any;
}

export interface SupportScenario {
  id: string;
  customer: SupportCustomer;
  history: SupportMessage[];
  tickets: SupportTicket[];
  agentThoughts: string[];
  suggestedReply: string;
  suggestedActions: SupportAction[];
}

export function useSupportAgent() {
  const scenarios: SupportScenario[] = supportMocksData as unknown as SupportScenario[];

  const [activeScenarioId, setActiveScenarioId] = useState<string>(scenarios[0]?.id || '');
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [customer, setCustomer] = useState<SupportCustomer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [queryInput, setQueryInput] = useState<string>('');

  // RAG/Thoughts outputs
  const [knowledgeResults, setKnowledgeResults] = useState<any[]>([]);
  const [agentThoughts, setAgentThoughts] = useState<string[]>([]);
  const [suggestedReply, setSuggestedReply] = useState<string>('');
  const [suggestedActions, setSuggestedActions] = useState<SupportAction[]>([]);
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  // Initialize scenario data
  useEffect(() => {
    const selected = scenarios.find((s) => s.id === activeScenarioId);
    if (selected) {
      setCustomer(selected.customer);
      setMessages(selected.history);
      setTickets(selected.tickets);
      
      // Clear outputs until execution
      setKnowledgeResults([]);
      setAgentThoughts([]);
      setSuggestedReply('');
      setSuggestedActions([]);
      setActionStatus(null);
    }
  }, [activeScenarioId, scenarios]);

  // Simulate Agent executing thinking steps, querying RAG, and running tools
  const handleQuerySubmit = async (queryText: string) => {
    if (!queryText.trim() || !customer) return;

    // 1. Add user query to conversation thread
    const userMsg: SupportMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'customer',
      text: queryText,
      timestamp: new Date().toISOString()
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setQueryInput('');
    setLoading(true);
    setAgentThoughts(['Initiating Pravesha Support Agent...', 'Loading customer session context...']);

    try {
      // 2. Perform mock RAG search
      setAgentThoughts((prev) => [...prev, 'Executing RAG retriever tool (searchKnowledge)...']);
      const ragResults = await supportAgentService.searchKnowledge(queryText);
      setKnowledgeResults(ragResults);

      // 3. Call LLM agent answering API
      setAgentThoughts((prev) => [...prev, 'Formulating reasoning pipeline and query validation...']);
      const answer = await supportAgentService.answerCustomer(queryText, customer.id, [...messages, userMsg]);

      // Simulate step delays for premium experience
      await new Promise((resolve) => setTimeout(resolve, 800));

      // 4. Output Agent Answer & Thoughts
      const agentMsg: SupportMessage = {
        id: `msg-agent-${Date.now()}`,
        sender: 'agent',
        text: answer.response,
        timestamp: new Date().toISOString(),
        thoughts: answer.thoughts.join('\n')
      };

      setMessages((prev) => [...prev, agentMsg]);
      setAgentThoughts(answer.thoughts);
      
      // Load suggestions matching the scenario
      const matchedScenario = scenarios.find((s) => s.id === activeScenarioId);
      if (matchedScenario) {
        setSuggestedReply(matchedScenario.suggestedReply);
        setSuggestedActions(matchedScenario.suggestedActions);
      } else {
        setSuggestedReply(`Dear ${customer.name},\n\nThank you for reaching out. We have received your query regarding "${queryText}". Our support team has created a ticket and is reviewing the details.\n\nBest regards,\nPravesha AI Support Team`);
        setSuggestedActions([
          {
            type: 'Create Ticket',
            title: 'Create Standard Ticket',
            description: `Generate a follow-up support ticket for ${customer.name}.`,
            payload: { title: `Query: ${queryText}`, priority: 'Medium', customerId: customer.id }
          }
        ]);
      }
    } catch (err) {
      console.error('[useSupportAgent] Error executing agent flow', err);
    } finally {
      setLoading(false);
    }
  };

  // Simulate executing an action
  const executeAction = async (action: SupportAction) => {
    setActionStatus(`Executing action: ${action.title}...`);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (action.type === 'Create Ticket') {
        const created = await supportAgentService.createTicket(action.payload);
        setTickets((prev) => [...prev, created]);
        setActionStatus(`Success: Created Ticket #${created.id}!`);
      } else if (action.type === 'Update Ticket') {
        // Find and update status
        setTickets((prev) =>
          prev.map((t) => (t.id === action.payload.ticketId ? { ...t, status: 'Resolved' } : t))
        );
        setActionStatus(`Success: Updated Ticket #${action.payload.ticketId}!`);
      } else if (action.type === 'Escalate Ticket') {
        setTickets((prev) =>
          prev.map((t) =>
            t.id === action.payload.ticketId
              ? { ...t, priority: action.payload.priority, status: 'In Progress' }
              : t
          )
        );
        setActionStatus(`Success: Escalated ticket #${action.payload.ticketId} to ${action.payload.queue}!`);
      }
      
      // Remove executed action from suggestion list
      setSuggestedActions((prev) => prev.filter((a) => a.title !== action.title));
      setTimeout(() => setActionStatus(null), 3000);
    } catch {
      setActionStatus('Failed to complete action.');
      setTimeout(() => setActionStatus(null), 3000);
    }
  };

  return {
    scenarios,
    activeScenarioId,
    setActiveScenarioId,
    customer,
    messages,
    tickets,
    loading,
    queryInput,
    setQueryInput,
    knowledgeResults,
    agentThoughts,
    suggestedReply,
    suggestedActions,
    actionStatus,
    handleQuerySubmit,
    executeAction
  };
}
