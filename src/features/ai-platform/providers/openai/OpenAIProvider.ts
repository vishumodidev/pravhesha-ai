import type { BaseLLMProvider } from '../base/BaseLLMProvider';
import type { AIMessage, AIResponse } from '../../types';

export class OpenAIProvider implements BaseLLMProvider {
  id = 'openai';
  name = 'OpenAI';

  initialize(config: any): void {
    console.log('[OpenAIProvider] Initialized with config:', config);
  }

  async chat(messages: AIMessage[], _config?: any): Promise<AIResponse> {
    console.log(`[OpenAIProvider] Chat invoked with ${messages.length} messages.`);
    const lastMsg = messages[messages.length - 1]?.content || '';
    return {
      message: {
        id: `msg-openai-${Date.now()}`,
        conversationId: messages[0]?.conversationId || 'default',
        role: 'assistant',
        content: `[OpenAI GPT-4 Mock Response] I received your prompt: "${lastMsg}"`,
        status: 'sent',
        timestamp: new Date().toISOString(),
      },
      tokens: 25 + Math.floor(lastMsg.length / 4),
      provider: this.name,
      executionTime: 120 + Math.floor(Math.random() * 80),
    };
  }

  async stream(_messages: AIMessage[], _config?: any): Promise<any> {
    console.log('[OpenAIProvider] Stream invoked.');
    throw new Error('Streaming not supported yet.');
  }

  async embeddings(_text: string): Promise<number[]> {
    console.log('[OpenAIProvider] Generating embeddings.');
    return Array.from({ length: 1536 }, () => Math.random());
  }

  async healthCheck(): Promise<boolean> {
    console.log('[OpenAIProvider] Executing health check.');
    return true;
  }
}
