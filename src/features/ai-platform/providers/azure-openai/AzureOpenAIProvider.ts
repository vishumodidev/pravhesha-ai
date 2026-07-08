import type { BaseLLMProvider } from '../base/BaseLLMProvider';
import type { AIMessage, AIResponse } from '../../types';

export class AzureOpenAIProvider implements BaseLLMProvider {
  id = 'azure-openai';
  name = 'Azure OpenAI';

  initialize(config: any): void {
    console.log('[AzureOpenAIProvider] Initialized with config:', config);
  }

  async chat(messages: AIMessage[], _config?: any): Promise<AIResponse> {
    console.log(`[AzureOpenAIProvider] Chat invoked with ${messages.length} messages.`);
    const lastMsg = messages[messages.length - 1]?.content || '';
    return {
      message: {
        id: `msg-azure-openai-${Date.now()}`,
        conversationId: messages[0]?.conversationId || 'default',
        role: 'assistant',
        content: `[Azure OpenAI GPT-4o Mock Response] I received your prompt: "${lastMsg}"`,
        status: 'sent',
        timestamp: new Date().toISOString(),
      },
      tokens: 26 + Math.floor(lastMsg.length / 4),
      provider: this.name,
      executionTime: 110 + Math.floor(Math.random() * 60),
    };
  }

  async stream(_messages: AIMessage[], _config?: any): Promise<any> {
    console.log('[AzureOpenAIProvider] Stream invoked.');
    throw new Error('Streaming not supported yet.');
  }

  async embeddings(_text: string): Promise<number[]> {
    console.log('[AzureOpenAIProvider] Generating embeddings.');
    return Array.from({ length: 1536 }, () => Math.random());
  }

  async healthCheck(): Promise<boolean> {
    console.log('[AzureOpenAIProvider] Executing health check.');
    return true;
  }
}
