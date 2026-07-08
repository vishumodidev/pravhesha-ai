export type MCPServerTransport = 'stdio' | 'sse' | 'websocket';
export type MCPServerStatus = 'connected' | 'disconnected' | 'connecting';

export interface MCPServer {
  id: string;
  name: string;
  description: string;
  url: string;
  transport: MCPServerTransport;
  status: MCPServerStatus;
  version: string;
  enabled: boolean;
}

export interface MCPTool {
  id: string;
  serverId: string;
  name: string;
  description: string;
  inputSchema: any; // JSON Schema parameter specs
  outputSchema: any; // JSON Schema returns specs
  enabled: boolean;
}

export interface MCPExecutionResult {
  serverId: string;
  toolName: string;
  status: 'success' | 'error';
  result: any;
  executionTimeMs: number;
}
