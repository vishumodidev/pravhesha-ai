import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  type?: 'text' | 'metrics' | 'leads' | 'help';
}

interface AICopilotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AICopilot({ isOpen, onClose }: AICopilotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am **PRAVESHA™ AI**, your business automation companion. I've finished training on your uploaded sales SOPs and FAQs. \n\nHow can I help you optimize your CRM workflow today?",
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    { text: 'Analyze today\'s lead activity', action: 'lead-analysis' },
    { text: 'Check AI Training model health', action: 'training-health' },
    { text: 'Which leads are hot right now?', action: 'hot-leads' },
    { text: 'Draft follow-up for Rahul Sharma', action: 'draft-followup' }
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiText = '';
      const query = textToSend.toLowerCase();

      if (query.includes('lead') || query.includes('analysis')) {
        aiText = `Based on current CRM logs:\n\n* **Total Leads:** 1,245 (+18.6% week-on-week)\n* **AI Qualified Leads:** 312 (22.4% qualification rate)\n* **Recent Activity:** Manish Singh just converted via Instagram Ad 2 mins ago.\n\n*Recommendation:* Re-engage the 4 hot leads flagged as overdue in your dashboard.`;
      } else if (query.includes('training') || query.includes('accuracy') || query.includes('sop')) {
        aiText = `**AI Training Module Status:**\n\n* **Current Accuracy:** 92.4% (+6.2% improvement)\n* **Data Trained:** 1,248 total documents (Product Catalog 2024, SOP - Sales Process, FAQs).\n* **Status:** Stable. Ready for further PDF uploads to boost coverage in Billing questions.`;
      } else if (query.includes('hot') || query.includes('opportunity')) {
        aiText = `I have detected **4 Hot Leads** showing high conversion intent:\n\n1. **Rahul Sharma** (TechNova Pvt Ltd) - Interested in Enterprise Plan pricing. \n2. **Amit Verma** (Verma Enterprises) - Requested custom implementation.\n3. **Sneha Iyer** (BrightCo) - Clicked on WhatsApp scheduler twice.\n4. **Manish Singh** (Instagram Ad Lead) - Gold Plan candidate.\n\n*Suggested Action:* Tap "Schedule Follow-up" in the Call Logs page to lock in meetings.`;
      } else if (query.includes('rahul') || query.includes('draft') || query.includes('whatsapp')) {
        aiText = `Here is a custom WhatsApp reply template for **Rahul Sharma** (TechNova):\n\n\`\`\`\n"Hi Rahul, thanks for speaking with us today! I noticed you are interested in the enterprise pricing model for TechNova. I would love to schedule a quick 10-minute demo to outline our custom API limits and group discounts. Let me know what time works best for you tomorrow!"\n\`\`\`\n\n*Click "Copy to Clipboard" to paste directly into your WhatsApp interface.*`;
      } else {
        aiText = `I've analyzed your query. Currently, our business metrics look strong, with **Revenue forecasting at ₹18.4L (Expected)** and ticket resolution speeds averaging **2h 45m**.\n\nLet me know if you would like me to draft marketing copies, schedule reminders, or query sales statistics.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 select-none">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-purple-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-100">
            <Bot size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1 leading-none">
              PRAVESHA™ AI Copilot
            </h3>
            <span className="text-[10px] text-indigo-600 font-medium flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Online & Learning
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
              msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
            }`}>
              {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className="space-y-1">
              <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
              }`}>
                {msg.text.split('\n').map((paragraph, index) => {
                  // Basic markdown helper for bullet points and bold texts
                  let text = paragraph;
                  
                  // Bold markdown replacement
                  const boldRegex = /\*\*(.*?)\*\*/g;
                  let parts = [];
                  let lastIdx = 0;
                  let match;
                  
                  while ((match = boldRegex.exec(text)) !== null) {
                    if (match.index > lastIdx) {
                      parts.push(text.substring(lastIdx, match.index));
                    }
                    parts.push(<strong key={match.index} className="font-bold">{match[1]}</strong>);
                    lastIdx = boldRegex.lastIndex;
                  }
                  if (lastIdx < text.length) {
                    parts.push(text.substring(lastIdx));
                  }

                  const renderedText = parts.length > 0 ? parts : text;

                  // Render code blocks or bullet points
                  if (paragraph.startsWith('`') || paragraph.startsWith('*')) {
                    if (paragraph.startsWith('*')) {
                      return (
                        <div key={index} className="flex gap-1.5 items-start mt-1 pl-1">
                          <span className="text-indigo-500 font-bold mt-0.5">•</span>
                          <span className="flex-1">{renderedText}</span>
                        </div>
                      );
                    }
                    if (paragraph.startsWith('`')) {
                      return (
                        <pre key={index} className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-[10px] font-mono text-slate-800 dark:text-slate-200 overflow-x-auto my-1.5 whitespace-pre-wrap select-all">
                          {paragraph.replace(/```/g, '').replace(/`/g, '')}
                        </pre>
                      );
                    }
                  }

                  return <p key={index} className="mb-2 last:mb-0">{renderedText}</p>;
                })}
              </div>
              <span className={`text-[9px] text-slate-400 block px-1 ${
                msg.sender === 'user' ? 'text-right' : ''
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-[85%]">
            <div className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center shrink-0 shadow-sm">
              <Bot size={14} />
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length === 1 && (
        <div className="px-4 py-2 border-t border-slate-100 bg-white">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">
            Suggested Queries
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt.text)}
                className="text-[10.5px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-1 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all text-left"
              >
                {prompt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input panel */}
      <div className="p-3 border-t border-slate-100 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all"
        >
          <input
            type="text"
            placeholder="Ask Copilot something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent px-3 py-1.5 text-xs focus:outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors cursor-pointer"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
