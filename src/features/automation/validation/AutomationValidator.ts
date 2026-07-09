import type { Automation } from '../types';

export interface ValidationError {
  id: string;
  nodeId?: string;
  severity: 'error' | 'warning';
  message: string;
}

export const AutomationValidator = {
  validate(flow: Automation): ValidationError[] {
    const errors: ValidationError[] = [];
    const { nodes, connections } = flow;

    // 1. Structure validations
    if (nodes.length === 0) {
      errors.push({
        id: 'err-empty-flow',
        severity: 'error',
        message: 'The workflow has no nodes. Add a Trigger node to start.',
      });
      return errors;
    }

    const triggerNodes = nodes.filter((n) => n.type === 'Trigger');
    if (triggerNodes.length === 0) {
      errors.push({
        id: 'err-no-trigger',
        severity: 'error',
        message: 'The workflow must have at least one Trigger node to initiate the flow.',
      });
    } else if (triggerNodes.length > 1) {
      errors.push({
        id: 'err-multiple-triggers',
        severity: 'warning',
        message: 'The workflow contains multiple Trigger nodes. While permitted, ensure they run independently.',
      });
    }

    // Map to quickly fetch connections by target
    const incomingConnections = new Map<string, string[]>();
    const outgoingConnections = new Map<string, string[]>();

    nodes.forEach((n) => {
      incomingConnections.set(n.id, []);
      outgoingConnections.set(n.id, []);
    });

    connections.forEach((c) => {
      if (incomingConnections.has(c.targetNodeId)) {
        incomingConnections.get(c.targetNodeId)!.push(c.sourceNodeId);
      }
      if (outgoingConnections.has(c.sourceNodeId)) {
        outgoingConnections.get(c.sourceNodeId)!.push(c.targetNodeId);
      }
    });

    // 2. Node-specific validations
    nodes.forEach((node) => {
      const incoming = incomingConnections.get(node.id) || [];
      const outgoing = outgoingConnections.get(node.id) || [];

      // Entry/Exit validations based on type
      if (node.type === 'Trigger') {
        if (incoming.length > 0) {
          errors.push({
            id: `err-trigger-incoming-${node.id}`,
            nodeId: node.id,
            severity: 'error',
            message: `Trigger node "${node.name}" cannot have incoming connections.`,
          });
        }
        if (outgoing.length === 0) {
          errors.push({
            id: `err-trigger-unconnected-${node.id}`,
            nodeId: node.id,
            severity: 'warning',
            message: `Trigger node "${node.name}" is not connected to any follow-up actions.`,
          });
        }

        // Config checks
        if (!node.configuration?.triggerType) {
          errors.push({
            id: `err-trigger-type-${node.id}`,
            nodeId: node.id,
            severity: 'error',
            message: `Trigger node "${node.name}" is missing a Trigger Type selection.`,
          });
        }
      } else {
        // Non-trigger nodes require at least one input connection
        if (incoming.length === 0) {
          errors.push({
            id: `err-node-orphaned-${node.id}`,
            nodeId: node.id,
            severity: 'error',
            message: `Node "${node.name}" is orphaned. It has no incoming connections and will never execute.`,
          });
        }

        // Warnings for terminal nodes (non-trigger nodes with no outgoing connections)
        if (outgoing.length === 0 && node.type !== 'Action' && node.type !== 'Notification') {
          errors.push({
            id: `wrn-node-terminal-${node.id}`,
            nodeId: node.id,
            severity: 'warning',
            message: `Node "${node.name}" does not lead to any further actions.`,
          });
        }

        // Configuration checks per type
        if (node.type === 'Condition') {
          if (!node.configuration?.conditionExpression?.trim()) {
            errors.push({
              id: `err-cond-expr-${node.id}`,
              nodeId: node.id,
              severity: 'error',
              message: `Condition node "${node.name}" is missing a comparison filter expression.`,
            });
          }
        } else if (node.type === 'Action') {
          if (!node.configuration?.actionType) {
            errors.push({
              id: `err-action-type-${node.id}`,
              nodeId: node.id,
              severity: 'error',
              message: `Action node "${node.name}" is missing an Action Type selection.`,
            });
          }
        } else if (node.type === 'AI') {
          if (!node.configuration?.aiPrompt?.trim()) {
            errors.push({
              id: `err-ai-prompt-${node.id}`,
              nodeId: node.id,
              severity: 'error',
              message: `AI node "${node.name}" requires an AI Instruction Prompt.`,
            });
          }
        } else if (node.type === 'Delay') {
          const dur = node.configuration?.delayDuration;
          if (dur === undefined || dur === null || isNaN(Number(dur)) || Number(dur) <= 0) {
            errors.push({
              id: `err-delay-duration-${node.id}`,
              nodeId: node.id,
              severity: 'error',
              message: `Delay node "${node.name}" requires a valid duration greater than 0.`,
            });
          }
        }
      }
    });

    // 3. Cycle Detection (DFS for back-edges)
    const visited = new Set<string>();
    const recStack = new Set<string>();
    let hasCycle = false;

    function detectCycleDFS(nodeId: string): boolean {
      visited.add(nodeId);
      recStack.add(nodeId);

      const neighbors = outgoingConnections.get(nodeId) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          if (detectCycleDFS(neighbor)) return true;
        } else if (recStack.has(neighbor)) {
          return true;
        }
      }

      recStack.delete(nodeId);
      return false;
    }

    for (const node of nodes) {
      if (!visited.has(node.id)) {
        if (detectCycleDFS(node.id)) {
          hasCycle = true;
          break;
        }
      }
    }

    if (hasCycle) {
      errors.push({
        id: 'err-cycle-detected',
        severity: 'error',
        message: 'Cyclical loop detected in the workflow. The workflow runtime cannot contain loops.',
      });
    }

    return errors;
  },
};
