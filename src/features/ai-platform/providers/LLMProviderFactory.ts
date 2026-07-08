import type { BaseLLMProvider } from './base/BaseLLMProvider';
import { OpenAIProvider } from './openai/OpenAIProvider';
import { GeminiProvider } from './gemini/GeminiProvider';
import { ClaudeProvider } from './claude/ClaudeProvider';
import { OllamaProvider } from './ollama/OllamaProvider';
import { AzureOpenAIProvider } from './azure-openai/AzureOpenAIProvider';
import { providerConfigs } from './provider.config';

export class LLMProviderFactory {
  private static instances: Record<string, BaseLLMProvider> = {};

  static getProvider(name: string): BaseLLMProvider {
    const key = name.toLowerCase();

    // Return cached instance if available
    if (this.instances[key]) {
      return this.instances[key];
    }

    let provider: BaseLLMProvider;

    switch (key) {
      case 'openai':
        provider = new OpenAIProvider();
        break;
      case 'gemini':
        provider = new GeminiProvider();
        break;
      case 'claude':
        provider = new ClaudeProvider();
        break;
      case 'ollama':
        provider = new OllamaProvider();
        break;
      case 'azure-openai':
      case 'azureopenai':
        provider = new AzureOpenAIProvider();
        break;
      default:
        throw new Error(`Unsupported model provider: ${name}`);
    }

    // Load configuration for the selected provider
    const config = providerConfigs[key];
    provider.initialize(config || {});

    // Cache the instance
    this.instances[key] = provider;

    return provider;
  }
}
