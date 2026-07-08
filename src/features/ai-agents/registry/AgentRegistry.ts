import type { Agent } from '../types/agent';

export class AgentRegistry {
  private static registeredAgents: Map<string, Agent> = new Map();

  static registerAgent(agent: Agent): void {
    this.registeredAgents.set(agent.id.toLowerCase(), agent);
  }

  static findAgent(id: string): Agent | undefined {
    return this.registeredAgents.get(id.toLowerCase());
  }

  static getAgents(): Agent[] {
    return Array.from(this.registeredAgents.values());
  }

  static clear(): void {
    this.registeredAgents.clear();
  }
}
