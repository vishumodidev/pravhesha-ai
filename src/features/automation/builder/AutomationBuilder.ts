import type { Automation, AutomationNode, AutomationConnection } from '../types';

export const AutomationBuilder = {
  /**
   * Creates a new blank or trigger-initialized automation flow
   */
  createFlow(name: string, description: string, triggerName: string = 'Lead Created'): Automation {
    const triggerNodeId = `node-trigger-${Date.now()}`;
    const initialTriggerNode: AutomationNode = {
      id: triggerNodeId,
      type: 'Trigger',
      name: triggerName,
      position: { x: 100, y: 200 },
      inputs: [],
      outputs: ['Output'],
      configuration: {
        triggerType: triggerName as any,
      },
    };

    return {
      id: `auto-${Date.now()}`,
      name,
      description,
      status: 'draft',
      trigger: triggerName,
      nodes: [initialTriggerNode],
      connections: [],
      createdBy: 'Admin User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Adds a node to the workflow
   */
  addNode(
    flow: Automation,
    nodeDetails: Omit<AutomationNode, 'id' | 'position'>,
    position: { x: number; y: number }
  ): Automation {
    const newNode: AutomationNode = {
      ...nodeDetails,
      id: `node-${nodeDetails.type.toLowerCase()}-${Date.now()}`,
      position,
    };

    return {
      ...flow,
      nodes: [...flow.nodes, newNode],
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Connects two ports on two nodes
   */
  connectNodes(
    flow: Automation,
    sourceNodeId: string,
    targetNodeId: string,
    sourceOutputPort: string = 'Output',
    targetInputPort: string = 'Input'
  ): Automation {
    // Check if connection already exists
    const exists = flow.connections.some(
      (c) =>
        c.sourceNodeId === sourceNodeId &&
        c.targetNodeId === targetNodeId &&
        c.sourceOutputPort === sourceOutputPort &&
        c.targetInputPort === targetInputPort
    );

    if (exists) return flow;

    const newConnection: AutomationConnection = {
      id: `conn-${Date.now()}`,
      sourceNodeId,
      targetNodeId,
      sourceOutputPort,
      targetInputPort,
    };

    return {
      ...flow,
      connections: [...flow.connections, newConnection],
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Deletes a node and its connections from the flow
   */
  deleteNode(flow: Automation, nodeId: string): Automation {
    return {
      ...flow,
      nodes: flow.nodes.filter((n) => n.id !== nodeId),
      connections: flow.connections.filter(
        (c) => c.sourceNodeId !== nodeId && c.targetNodeId !== nodeId
      ),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Deletes a specific connection
   */
  deleteConnection(flow: Automation, connectionId: string): Automation {
    return {
      ...flow,
      connections: flow.connections.filter((c) => c.id !== connectionId),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Updates a node's configuration or properties
   */
  updateNode(flow: Automation, nodeId: string, updates: Partial<AutomationNode>): Automation {
    return {
      ...flow,
      nodes: flow.nodes.map((n) => (n.id === nodeId ? { ...n, ...updates } : n)),
      updatedAt: new Date().toISOString(),
    };
  },
};
