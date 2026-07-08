import { useState, useEffect } from 'react';
import { promptService } from '../services/prompt.service';
import { defaultVariables } from '../variables';
import type { Prompt } from '../types';

export function usePromptBuilder(selectedPrompt: Prompt | null) {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [compiledPrompt, setCompiledPrompt] = useState<string>('');
  const [compiling, setCompiling] = useState<boolean>(false);

  // Initialize variables from prompt template
  useEffect(() => {
    if (selectedPrompt) {
      const initialVars: Record<string, string> = {};
      selectedPrompt.variables.forEach((variableName) => {
        initialVars[variableName] = defaultVariables[variableName] || '';
      });
      setVariables(initialVars);
      setCompiledPrompt('');
    } else {
      setVariables({});
      setCompiledPrompt('');
    }
  }, [selectedPrompt]);

  const updateVariable = (name: string, value: string) => {
    setVariables((prev) => ({ ...prev, [name]: value }));
  };

  const compilePrompt = async () => {
    if (!selectedPrompt) return;
    setCompiling(true);
    try {
      const result = await promptService.buildPrompt(selectedPrompt.id, variables);
      setCompiledPrompt(result);
    } catch (error) {
      console.error('[usePromptBuilder] Failed to compile prompt:', error);
      // fallback to offline builder logic
      const result = promptService.buildPromptText(selectedPrompt.template, variables);
      setCompiledPrompt(result);
    } finally {
      setCompiling(false);
    }
  };

  return {
    variables,
    compiledPrompt,
    compiling,
    updateVariable,
    compilePrompt,
  };
}
