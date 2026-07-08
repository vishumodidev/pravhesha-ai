import type { BaseLLMProvider } from '../base/BaseLLMProvider';
import type { AIMessage, AIResponse } from '../../types';

export class GeminiProvider implements BaseLLMProvider {
  id = 'gemini';
  name = 'Gemini';

  initialize(config: any): void {
    console.log('[GeminiProvider] Initialized with config:', config);
  }

  async chat(messages: AIMessage[], _config?: any): Promise<AIResponse> {
    console.log(`[GeminiProvider] Chat invoked with ${messages.length} messages.`);
    const lastMsg = messages[messages.length - 1]?.content || '';
    return {
      message: {
        id: `msg-gemini-${Date.now()}`,
        conversationId: messages[0]?.conversationId || 'default',
        role: 'assistant',
        content: `[Google Gemini 1.5 Pro Mock Response] I received your prompt: "${lastMsg}"`,
        status: 'sent',
        timestamp: new Date().toISOString(),
      },
      tokens: 30 + Math.floor(lastMsg.length / 4),
      provider: this.name,
      executionTime: 180 + Math.floor(Math.random() * 100),
    };
  }

  async stream(_messages: AIMessage[], _config?: any): Promise<any> {
    console.log('[GeminiProvider] Stream invoked.');
    throw new Error('Streaming not supported yet.');
  }

  async embeddings(_text: string): Promise<number[]> {
    console.log('[GeminiProvider] Generating embeddings.');
    return Array.from({ length: 768 }, () => Math.random());
  }

  async healthCheck(): Promise<boolean> {
    console.log('[GeminiProvider] Executing health check.');
    return true;
  }
}
