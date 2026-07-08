import type { AgentMessage } from '../types';

export class AgentCommunication {
  private static messageLog: AgentMessage[] = [];

  static sendMessage(fromAgentId: string, toAgentId: string, content: string): AgentMessage {
    const newMessage: AgentMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      fromAgentId,
      toAgentId,
      content,
      timestamp: new Date().toISOString(),
    };
    this.messageLog.push(newMessage);
    console.log(`[AgentCommunication] Message from ${fromAgentId} to ${toAgentId}: "${content}"`);
    return newMessage;
  }

  static getMessages(): AgentMessage[] {
    return this.messageLog;
  }

  static clear(): void {
    this.messageLog = [];
  }
}
