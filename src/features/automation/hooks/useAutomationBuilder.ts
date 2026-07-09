import { create } from 'zustand';
import type { Automation, AutomationNode } from '../types';
import { AutomationBuilder } from '../builder/AutomationBuilder';
import { AutomationValidator } from '../validation/AutomationValidator';
import type { ValidationError } from '../validation/AutomationValidator';

interface AutomationBuilderState {
  activeFlow: Automation | null;
  selectedNodeId: string | null;
  validationErrors: ValidationError[];
  connectSourceNodeId: string | null;
  connectSourcePortName: string | null;
  zoom: number;
  pan: { x: number; y: number };

  // Actions
  loadFlow: (flow: Automation) => void;
  unloadFlow: () => void;
  setName: (name: string) => void;
  setDescription: (desc: string) => void;
  setStatus: (status: 'active' | 'draft' | 'inactive') => void;
  
  // Node management
  addNode: (nodeDetails: Omit<AutomationNode, 'id' | 'position'>) => void;
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  updateNodeConfig: (nodeId: string, config: Record<string, any>) => void;
  deleteNode: (nodeId: string) => void;
  selectNode: (nodeId: string | null) => void;
  
  // Connection management
  startConnecting: (nodeId: string, portName: string) => void;
  completeConnecting: (targetNodeId: string, targetPortName?: string) => void;
  cancelConnecting: () => void;
  deleteConnection: (connectionId: string) => void;
  
  // Validation
  runValidation: () => ValidationError[];
  clearValidation: () => void;
  
  // Canvas control
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
}

export const useAutomationBuilder = create<AutomationBuilderState>((set, get) => ({
  activeFlow: null,
  selectedNodeId: null,
  validationErrors: [],
  connectSourceNodeId: null,
  connectSourcePortName: null,
  zoom: 1,
  pan: { x: 0, y: 0 },

  loadFlow: (flow) => set({
    activeFlow: flow,
    selectedNodeId: null,
    validationErrors: [],
    connectSourceNodeId: null,
    connectSourcePortName: null,
    zoom: 1,
    pan: { x: 0, y: 0 }
  }),

  unloadFlow: () => set({
    activeFlow: null,
    selectedNodeId: null,
    validationErrors: [],
    connectSourceNodeId: null,
    connectSourcePortName: null
  }),

  setName: (name) => set((state) => {
    if (!state.activeFlow) return {};
    return {
      activeFlow: { ...state.activeFlow, name, updatedAt: new Date().toISOString() }
    };
  }),

  setDescription: (description) => set((state) => {
    if (!state.activeFlow) return {};
    return {
      activeFlow: { ...state.activeFlow, description, updatedAt: new Date().toISOString() }
    };
  }),

  setStatus: (status) => set((state) => {
    if (!state.activeFlow) return {};
    return {
      activeFlow: { ...state.activeFlow, status, updatedAt: new Date().toISOString() }
    };
  }),

  addNode: (nodeDetails) => set((state) => {
    if (!state.activeFlow) return {};
    
    // Position newly added node with a small offset or at center
    const spacing = 120;
    const nodeCount = state.activeFlow.nodes.length;
    // Calculate simple grid layout offset
    const x = 100 + (nodeCount % 4) * 220;
    const y = 150 + Math.floor(nodeCount / 4) * spacing;
    
    const updated = AutomationBuilder.addNode(state.activeFlow, nodeDetails, { x, y });
    return {
      activeFlow: updated
    };
  }),

  updateNodePosition: (nodeId, position) => set((state) => {
    if (!state.activeFlow) return {};
    const updated = AutomationBuilder.updateNode(state.activeFlow, nodeId, { position });
    return { activeFlow: updated };
  }),

  updateNodeConfig: (nodeId, configuration) => set((state) => {
    if (!state.activeFlow) return {};
    // Merge new config with existing
    const node = state.activeFlow.nodes.find(n => n.id === nodeId);
    if (!node) return {};
    
    const updatedConfig = {
      ...node.configuration,
      ...configuration
    };
    const updated = AutomationBuilder.updateNode(state.activeFlow, nodeId, { configuration: updatedConfig });
    return { activeFlow: updated };
  }),

  deleteNode: (nodeId) => set((state) => {
    if (!state.activeFlow) return {};
    const updated = AutomationBuilder.deleteNode(state.activeFlow, nodeId);
    return {
      activeFlow: updated,
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId
    };
  }),

  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

  startConnecting: (nodeId, portName) => set({
    connectSourceNodeId: nodeId,
    connectSourcePortName: portName
  }),

  completeConnecting: (targetNodeId, targetPortName = 'Input') => set((state) => {
    const { activeFlow, connectSourceNodeId, connectSourcePortName } = state;
    if (!activeFlow || !connectSourceNodeId || !connectSourcePortName) return {};

    // Don't connect to itself
    if (connectSourceNodeId === targetNodeId) {
      return {
        connectSourceNodeId: null,
        connectSourcePortName: null
      };
    }

    const updated = AutomationBuilder.connectNodes(
      activeFlow,
      connectSourceNodeId,
      targetNodeId,
      connectSourcePortName,
      targetPortName
    );

    return {
      activeFlow: updated,
      connectSourceNodeId: null,
      connectSourcePortName: null
    };
  }),

  cancelConnecting: () => set({
    connectSourceNodeId: null,
    connectSourcePortName: null
  }),

  deleteConnection: (connectionId) => set((state) => {
    if (!state.activeFlow) return {};
    const updated = AutomationBuilder.deleteConnection(state.activeFlow, connectionId);
    return {
      activeFlow: updated
    };
  }),

  runValidation: () => {
    const { activeFlow } = get();
    if (!activeFlow) return [];
    const errors = AutomationValidator.validate(activeFlow);
    set({ validationErrors: errors });
    return errors;
  },

  clearValidation: () => set({ validationErrors: [] }),

  setZoom: (zoom) => set({ zoom: Math.max(0.5, Math.min(2, zoom)) }),
  setPan: (pan) => set({ pan }),
}));
