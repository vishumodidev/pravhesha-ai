import { useState, useEffect } from 'react';
import type { WhatsAppConversation, WhatsAppMessage } from '../types';
import { whatsappService } from '../services/whatsapp.service';
import whatsappMocksData from '../mocks/whatsappMocks.json';
import { whatsappTools } from '../tools/whatsappTools';

export interface WhatsAppAction {
  type: string;
  title: string;
  description: string;
  payload: any;
}

export interface WhatsAppScenario {
  conversationId: string;
  phone: string;
  name: string;
  status: 'active' | 'resolved' | 'pending_human' | 'closed';
  messages: WhatsAppMessage[];
  lastMessage: string;
  updatedAt: string;
  lead: any;
  customer: any;
  agentThoughts: string[];
  suggestedReply: string;
  suggestedActions: WhatsAppAction[];
}

export function useWhatsAppAgent() {
  const [conversations, setConversations] = useState<WhatsAppConversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>('');
  const [activeConversation, setActiveConversation] = useState<WhatsAppConversation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [queryInput, setQueryInput] = useState<string>('');

  // RAG / Actions outputs
  const [knowledgeResults, setKnowledgeResults] = useState<any[]>([]);
  const [agentThoughts, setAgentThoughts] = useState<string[]>([]);
  const [suggestedReply, setSuggestedReply] = useState<string>('');
  const [suggestedActions, setSuggestedActions] = useState<WhatsAppAction[]>([]);
  
  // CRM profiles resolved per session
  const [crmLead, setCrmLead] = useState<any | null>(null);
  const [crmCustomer, setCrmCustomer] = useState<any | null>(null);
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  // In-memory leads & tasks database for tool executions
  const [leadsDb, setLeadsDb] = useState<any[]>([]);
  const [tasksDb, setTasksDb] = useState<any[]>([]);

  // Initialize conversations list
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const list = await whatsappService.getConversations();
        setConversations(list);
        if (list.length > 0) {
          setActiveConvId(list[0].conversationId);
        }
      } catch (err) {
        console.error('Failed to load conversations list', err);
      }
    };
    fetchConversations();
  }, []);

  // Sync active conversation
  useEffect(() => {
    if (!activeConvId) return;
    const loadActive = async () => {
      try {
        const conv = await whatsappService.getConversation(activeConvId);
        setActiveConversation(conv);

        // Clear RAG matches and tools until execution
        setKnowledgeResults([]);
        setAgentThoughts([]);
        setSuggestedReply('');
        setSuggestedActions([]);
        setActionStatus(null);

        // Match context from static scenarios
        const scenario = (whatsappMocksData as unknown as WhatsAppScenario[]).find(
          (s) => s.conversationId === activeConvId
        );
        if (scenario) {
          setCrmLead(scenario.lead);
          setCrmCustomer(scenario.customer);
        } else {
          setCrmLead(null);
          setCrmCustomer(null);
        }
      } catch (err) {
        console.error('Failed to load conversation detail', err);
      }
    };
    loadActive();
  }, [activeConvId]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !activeConversation) return;

    // 1. Add human/customer message to active list
    const incoming: WhatsAppMessage = {
      id: `msg-in-${Date.now()}`,
      phone: activeConversation.phone,
      name: activeConversation.name,
      message: text,
      direction: 'inbound',
      timestamp: new Date().toISOString(),
      status: 'received'
    };

    const updatedMessages = [...activeConversation.messages, incoming];
    const updatedConv = {
      ...activeConversation,
      messages: updatedMessages,
      lastMessage: text,
      updatedAt: new Date().toISOString()
    };

    setActiveConversation(updatedConv);
    setConversations((prev) =>
      prev.map((c) => (c.conversationId === activeConvId ? updatedConv : c))
    );
    setQueryInput('');
    setLoading(true);
    setAgentThoughts(['WhatsApp webhook triggered.', 'Identifying customer matching phone number...']);

    try {
      // 2. Execute Search Knowledge RAG match
      setAgentThoughts((prev) => [...prev, 'Searching knowledge base (searchKnowledge)...']);
      const matchDocs = await whatsappTools.searchKnowledge(text);
      setKnowledgeResults(matchDocs);

      // 3. Request AI replying API
      setAgentThoughts((prev) => [...prev, 'Formulating prompt guidelines and mapping tools...']);
      const replyData = await whatsappService.receiveMessage(
        activeConversation.phone,
        text,
        activeConversation.name
      );

      await new Promise((resolve) => setTimeout(resolve, 800));

      // 4. Output reply and suggestions
      const outbound: WhatsAppMessage = {
        id: `msg-out-${Date.now()}`,
        phone: activeConversation.phone,
        name: 'Pravesha AI Agent',
        message: replyData.response,
        direction: 'outbound',
        timestamp: new Date().toISOString(),
        status: 'delivered',
        thoughts: replyData.thoughts.join('\n')
      };

      const finalMessages = [...updatedMessages, outbound];
      const finalConv = {
        ...updatedConv,
        messages: finalMessages,
        lastMessage: replyData.response
      };

      setActiveConversation(finalConv);
      setConversations((prev) =>
        prev.map((c) => (c.conversationId === activeConvId ? finalConv : c))
      );
      setAgentThoughts(replyData.thoughts);

      // Load scenario suggested actions
      const scenario = (whatsappMocksData as unknown as WhatsAppScenario[]).find(
        (s) => s.conversationId === activeConvId
      );
      if (scenario) {
        setSuggestedReply(scenario.suggestedReply);
        setSuggestedActions(scenario.suggestedActions);
      } else {
        setSuggestedReply('');
        setSuggestedActions([]);
      }
    } catch (err) {
      console.error('Failed to resolve AI response', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteAction = async (action: WhatsAppAction) => {
    setActionStatus(`Executing action: ${action.title}...`);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (action.type === 'Create Lead') {
        const lead = await whatsappTools.createLead(action.payload, leadsDb);
        setLeadsDb((prev) => [...prev, lead]);
        setCrmLead(lead);
        setActionStatus(`Success: Created Lead profile for ${lead.name}!`);
      } else if (action.type === 'Create Task') {
        const task = await whatsappTools.createTask(action.payload, tasksDb);
        setTasksDb((prev) => [...prev, task]);
        setActionStatus(`Success: Scheduled task "${task.title}"!`);
      } else if (action.type === 'Escalate to Human') {
        if (activeConversation) {
          const escalated = { ...activeConversation, status: 'pending_human' as const };
          setActiveConversation(escalated);
          setConversations((prev) =>
            prev.map((c) => (c.conversationId === activeConvId ? escalated : c))
          );
        }
        setActionStatus(`Success: Handed off conversation to Billing queue!`);
      }

      // Remove completed action
      setSuggestedActions((prev) => prev.filter((a) => a.title !== action.title));
      setTimeout(() => setActionStatus(null), 3000);
    } catch {
      setActionStatus('Failed to complete action.');
      setTimeout(() => setActionStatus(null), 3000);
    }
  };

  return {
    conversations,
    activeConvId,
    setActiveConvId,
    activeConversation,
    loading,
    queryInput,
    setQueryInput,
    knowledgeResults,
    agentThoughts,
    suggestedReply,
    suggestedActions,
    crmLead,
    crmCustomer,
    actionStatus,
    handleSendMessage,
    handleExecuteAction
  };
}
