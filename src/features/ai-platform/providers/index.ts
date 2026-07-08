import type { AIMessage, AIResponse } from '../types';

export interface BaseAIProvider {
  id: string;
  name: string;
  generateResponse(prompt: string, history: AIMessage[]): Promise<AIResponse>;
}

export class OpenAIProvider implements BaseAIProvider {
  id = 'openai';
  name = 'OpenAI GPT-4';

  async generateResponse(prompt: string, history: AIMessage[]): Promise<AIResponse> {
    console.log(`[OpenAIProvider] Generating response for: ${prompt} (History length: ${history.length})`);
    throw new Error('Method not implemented in foundation. Connection API pending.');
  }
}

export class GeminiProvider implements BaseAIProvider {
  id = 'gemini';
  name = 'Google Gemini 1.5 Pro';

  async generateResponse(prompt: string, history: AIMessage[]): Promise<AIResponse> {
    console.log(`[GeminiProvider] Generating response for: ${prompt} (History length: ${history.length})`);
    throw new Error('Method not implemented in foundation. Connection API pending.');
  }
}

export class ClaudeProvider implements BaseAIProvider {
  id = 'claude';
  name = 'Anthropic Claude 3.5 Sonnet';

  async generateResponse(prompt: string, history: AIMessage[]): Promise<AIResponse> {
    console.log(`[ClaudeProvider] Generating response for: ${prompt} (History length: ${history.length})`);
    throw new Error('Method not implemented in foundation. Connection API pending.');
  }
}
