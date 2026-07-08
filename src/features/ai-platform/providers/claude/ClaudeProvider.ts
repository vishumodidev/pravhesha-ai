import type { BaseLLMProvider } from '../base/BaseLLMProvider';
import type { AIMessage, AIResponse } from '../../types';

export class ClaudeProvider implements BaseLLMProvider {
  id = 'claude';
  name = 'Claude';

  initialize(config: any): void {
    console.log('[ClaudeProvider] Initialized with config:', config);
  }

  async chat(messages: AIMessage[], _config?: any): Promise<AIResponse> {
    console.log(`[ClaudeProvider] Chat invoked with ${messages.length} messages.`);
    const lastMsg = messages[messages.length - 1]?.content || '';
    return {
      message: {
        id: `msg-claude-${Date.now()}`,
        conversationId: messages[0]?.conversationId || 'default',
        role: 'assistant',
        content: `[Anthropic Claude 3.5 Sonnet Mock Response] I received your prompt: "${lastMsg}"`,
        status: 'sent',
        timestamp: new Date().toISOString(),
      },
      tokens: 28 + Math.floor(lastMsg.length / 4),
      provider: this.name,
      executionTime: 140 + Math.floor(Math.random() * 90),
    };
  }

  async stream(_messages: AIMessage[], _config?: any): Promise<any> {
    console.log('[ClaudeProvider] Stream invoked.');
    throw new Error('Streaming not supported yet.');
  }

  async embeddings(_text: string): Promise<number[]> {
    console.log('[ClaudeProvider] Generating embeddings.');
    return Array.from({ length: 1536 }, () => Math.random());
  }

  async healthCheck(): Promise<boolean> {
    console.log('[ClaudeProvider] Executing health check.');
    return true;
  }
}
