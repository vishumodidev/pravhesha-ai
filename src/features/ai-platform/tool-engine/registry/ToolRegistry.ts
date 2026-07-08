import type { Tool } from '../types';

export class ToolRegistry {
  private static registeredTools: Map<string, Tool> = new Map();

  static registerTool(tool: Tool): void {
    this.registeredTools.set(tool.id.toLowerCase(), tool);
  }

  static findTool(id: string): Tool | undefined {
    return this.registeredTools.get(id.toLowerCase());
  }

  static validateTool(id: string, parameters: Record<string, any>): { isValid: boolean; error?: string } {
    const tool = this.findTool(id);
    if (!tool) {
      return { isValid: false, error: `Tool not registered: ${id}` };
    }

    if (!tool.enabled) {
      return { isValid: false, error: `Tool is disabled: ${tool.name}` };
    }

    // Check required parameters
    const schema = tool.parameters;
    const requiredFields = schema.required || [];
    for (const field of requiredFields) {
      if (parameters[field] === undefined || parameters[field] === null || parameters[field] === '') {
        return { isValid: false, error: `Missing required parameter: ${field}` };
      }
    }

    // Type validation
    const properties = schema.properties || {};
    for (const [key, val] of Object.entries(parameters)) {
      const propSchema = properties[key];
      if (!propSchema) continue;

      const actualType = typeof val;
      const expectedType: string = propSchema.type;

      if (expectedType === 'number' && actualType !== 'number') {
        return { isValid: false, error: `Parameter ${key} expects type number, got ${actualType}` };
      }
      if (expectedType === 'boolean' && actualType !== 'boolean') {
        return { isValid: false, error: `Parameter ${key} expects type boolean, got ${actualType}` };
      }
      if (expectedType === 'string' && actualType !== 'string') {
        return { isValid: false, error: `Parameter ${key} expects type string, got ${actualType}` };
      }

      if (propSchema.enum && !propSchema.enum.includes(val as string)) {
        return { isValid: false, error: `Parameter ${key} must be one of: ${propSchema.enum.join(', ')}` };
      }
    }

    return { isValid: true };
  }

  static getTools(): Tool[] {
    return Array.from(this.registeredTools.values());
  }

  static clear(): void {
    this.registeredTools.clear();
  }
}
