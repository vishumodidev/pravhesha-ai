import { useState, useEffect } from 'react';
import { toolService } from '../services/tool.service';
import type { Tool, ToolExecutionResult } from '../types';

export function useToolExecution(selectedTool: Tool | null) {
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [result, setResult] = useState<ToolExecutionResult | null>(null);
  const [executing, setExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize parameters when tool changes
  useEffect(() => {
    if (selectedTool) {
      const initialParams: Record<string, any> = {};
      const properties = selectedTool.parameters.properties || {};
      Object.entries(properties).forEach(([key, val]) => {
        if (val.type === 'boolean') {
          initialParams[key] = false;
        } else if (val.type === 'number') {
          initialParams[key] = 0;
        } else {
          initialParams[key] = val.enum ? val.enum[0] : '';
        }
      });
      setParameters(initialParams);
      setResult(null);
      setError(null);
    } else {
      setParameters({});
      setResult(null);
      setError(null);
    }
  }, [selectedTool]);

  const updateParameter = (name: string, value: any) => {
    setParameters((prev) => ({ ...prev, [name]: value }));
  };

  const execute = async () => {
    if (!selectedTool) return;
    setExecuting(true);
    setError(null);
    setResult(null);
    try {
      const response = await toolService.executeTool(selectedTool.id, parameters);
      if (response.status === 'error') {
        setError(response.response);
      } else {
        setResult(response);
      }
    } catch (err: any) {
      console.error('[useToolExecution] Execution error:', err);
      setError(err?.message || 'Unknown execution failure');
    } finally {
      setExecuting(false);
    }
  };

  return {
    parameters,
    result,
    executing,
    error,
    updateParameter,
    execute,
  };
}
