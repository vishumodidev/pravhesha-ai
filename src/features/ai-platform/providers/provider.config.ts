export interface LLMConfig {
  providerName: string;
  defaultModel: string;
  timeoutMs: number;
  maxTokens: number;
  temperature: number;
  apiUrl?: string;
  apiKey?: string;
}

export const providerConfigs: Record<string, LLMConfig> = {
  openai: {
    providerName: 'OpenAI',
    defaultModel: 'gpt-4o',
    timeoutMs: 30000,
    maxTokens: 4096,
    temperature: 0.7,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  },
  gemini: {
    providerName: 'Gemini',
    defaultModel: 'gemini-1.5-pro',
    timeoutMs: 30000,
    maxTokens: 8192,
    temperature: 0.4,
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  },
  claude: {
    providerName: 'Claude',
    defaultModel: 'claude-3-5-sonnet',
    timeoutMs: 30000,
    maxTokens: 4096,
    temperature: 0.5,
    apiKey: import.meta.env.VITE_CLAUDE_API_KEY || '',
  },
  ollama: {
    providerName: 'Ollama',
    defaultModel: 'llama3',
    timeoutMs: 15000,
    maxTokens: 2048,
    temperature: 0.8,
    apiUrl: import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434',
  },
  'azure-openai': {
    providerName: 'Azure OpenAI',
    defaultModel: 'gpt-4o-deployment',
    timeoutMs: 30000,
    maxTokens: 4096,
    temperature: 0.7,
    apiUrl: 'https://azure-openai-mock.openai.azure.com/',
    apiKey: 'azure-mock-key-1234',
  },
};
