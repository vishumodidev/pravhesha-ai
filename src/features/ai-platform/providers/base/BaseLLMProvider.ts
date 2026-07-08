import type { AIMessage, AIResponse } from '../../types';

export interface BaseLLMProvider {
  id: string;
  name: string;
  initialize(config: any): void;
  chat(messages: AIMessage[], config?: any): Promise<AIResponse>;
  stream(messages: AIMessage[], config?: any): Promise<any>;
  embeddings(text: string): Promise<number[]>;
  healthCheck(): Promise<boolean>;
}
