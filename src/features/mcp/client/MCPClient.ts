import type { MCPServer, MCPTool, MCPExecutionResult } from '../types';

export class MCPClient {
  static async connect(server: MCPServer): Promise<boolean> {
    console.log(`[MCPClient] Connecting to server ${server.name} via ${server.transport}...`);
    await new Promise((resolve) => setTimeout(resolve, 400));
    return true;
  }

  static async listTools(serverId: string): Promise<MCPTool[]> {
    console.log(`[MCPClient] Querying tools from server ID: ${serverId}`);

    const key = serverId.toLowerCase();
    if (key.includes('crm')) {
      return [
        {
          id: 'crm-get-leads',
          serverId,
          name: 'get_leads_summary',
          description: 'Retrieve statistical counters for counseling leads qualified states.',
          inputSchema: { type: 'object', properties: { status: { type: 'string' } } },
          outputSchema: { type: 'object', properties: { count: { type: 'number' } } },
          enabled: true,
        },
      ];
    } else if (key.includes('gdrive')) {
      return [
        {
          id: 'gdrive-search',
          serverId,
          name: 'search_gdrive_files',
          description: 'Search documentation spreadsheets or pdf archives by filename keyword.',
          inputSchema: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] },
          outputSchema: { type: 'object', properties: { filesList: { type: 'array' } } },
          enabled: true,
        },
      ];
    } else if (key.includes('slack')) {
      return [
        {
          id: 'slack-post',
          serverId,
          name: 'post_message_alert',
          description: 'Submit an automated alert payload message directly to Slack counselor channel.',
          inputSchema: { type: 'object', properties: { channel: { type: 'string' }, message: { type: 'string' } }, required: ['message'] },
          outputSchema: { type: 'object', properties: { success: { type: 'boolean' } } },
          enabled: true,
        },
      ];
    } else if (key.includes('notion')) {
      return [
        {
          id: 'notion-read-page',
          serverId,
          name: 'read_notion_sop',
          description: 'Read the contents text of standard counseling procedures handbook page from Notion workspace.',
          inputSchema: { type: 'object', properties: { pageId: { type: 'string' } }, required: ['pageId'] },
          outputSchema: { type: 'object', properties: { contentText: { type: 'string' } } },
          enabled: true,
        },
      ];
    }

    return [];
  }

  static async executeTool(serverId: string, toolName: string, args: any): Promise<MCPExecutionResult> {
    console.log(`[MCPClient] Executing tool ${toolName} on server ${serverId} with args:`, args);
    const startTime = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 600));
    const elapsed = Date.now() - startTime;

    let resultPayload: any;
    if (toolName === 'search_gdrive_files') {
      resultPayload = {
        success: true,
        files: [
          { name: `${args.query || 'Leads'}_Coaching_Script.pdf`, sizeBytes: 154000, id: 'gdoc-105' },
          { name: `FAQ_${args.query || 'Refund'}_Guidelines.docx`, sizeBytes: 45000, id: 'gdoc-202' },
        ],
      };
    } else if (toolName === 'post_message_alert') {
      resultPayload = {
        success: true,
        postedChannel: args.channel || '#counselors-feed',
        deliveryStatus: 'delivered',
      };
    } else if (toolName === 'get_leads_summary') {
      resultPayload = {
        success: true,
        qualifiedCount: 15,
        counselorActivePool: 4,
      };
    } else if (toolName === 'read_notion_sop') {
      resultPayload = {
        success: true,
        title: 'Notion SOP page read success',
        contentText: 'Counselors standard workflow: Call qualified leads within 12 hours. Installments plans requires KYC document check.',
      };
    } else {
      resultPayload = {
        success: true,
        message: 'Mock execution successful.',
        argsReceived: args,
      };
    }

    return {
      serverId,
      toolName,
      status: 'success',
      result: resultPayload,
      executionTimeMs: elapsed,
    };
  }
}
