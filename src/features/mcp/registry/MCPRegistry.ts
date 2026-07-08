import type { MCPServer, MCPTool } from '../types';

export class MCPRegistry {
  private static servers: Map<string, MCPServer> = new Map();
  private static toolsCache: Map<string, MCPTool[]> = new Map();

  static registerServer(server: MCPServer): void {
    this.servers.set(server.id.toLowerCase(), server);
    console.log(`[MCPRegistry] Server registered: ${server.name}`);
  }

  static cacheTools(serverId: string, tools: MCPTool[]): void {
    this.toolsCache.set(serverId.toLowerCase(), tools);
    console.log(`[MCPRegistry] Cached ${tools.length} tools for server ID: ${serverId}`);
  }

  static getServers(): MCPServer[] {
    return Array.from(this.servers.values());
  }

  static findServer(id: string): MCPServer | undefined {
    return this.servers.get(id.toLowerCase());
  }

  static getToolsForServer(serverId: string): MCPTool[] {
    return this.toolsCache.get(serverId.toLowerCase()) || [];
  }

  static getAllTools(): MCPTool[] {
    return Array.from(this.toolsCache.values()).flat();
  }

  static clear(): void {
    this.servers.clear();
    this.toolsCache.clear();
  }
}
