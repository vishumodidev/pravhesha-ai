import type { BaseLLMProvider } from '../base/BaseLLMProvider';
import type { AIMessage, AIResponse } from '../../types';

export class OllamaProvider implements BaseLLMProvider {
  id = 'ollama';
  name = 'Ollama';

  initialize(config: any): void {
    console.log('[OllamaProvider] Initialized with config:', config);
  }

  async chat(messages: AIMessage[], _config?: any): Promise<AIResponse> {
    console.log(`[OllamaProvider] Chat invoked with ${messages.length} messages.`);
    const lastMsg = messages[messages.length - 1]?.content || '';
    return {
      message: {
        id: `msg-ollama-${Date.now()}`,
        conversationId: messages[0]?.conversationId || 'default',
        role: 'assistant',
        content: `[Ollama Local Llama 3 Mock Response] I received your prompt: "${lastMsg}"`,
        status: 'sent',
        timestamp: new Date().toISOString(),
      },
      tokens: 22 + Math.floor(lastMsg.length / 4),
      provider: this.name,
      executionTime: 95 + Math.floor(Math.random() * 50),
    };
  }

  async stream(_messages: AIMessage[], _config?: any): Promise<any> {
    console.log('[OllamaProvider] Stream invoked.');
    throw new Error('Streaming not supported yet.');
  }

  async embeddings(_text: string): Promise<number[]> {
    console.log('[OllamaProvider] Generating embeddings.');
    return Array.from({ length: 4096 }, () => Math.random());
  }

  async healthCheck(): Promise<boolean> {
    console.log('[OllamaProvider] Executing health check.');
    return false;
  }
}
