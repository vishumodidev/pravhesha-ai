import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import type { Automation } from '../types';
import NodeCard from './NodeCard';

interface CanvasViewProps {
  flow: Automation;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string | null) => void;
  onDeleteNode: (nodeId: string) => void;
  onUpdateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  
  // Connection events
  connectSourceNodeId: string | null;
  connectSourcePortName: string | null;
  onStartConnect: (nodeId: string, portName: string) => void;
  onCompleteConnect: (targetNodeId: string, targetPortName: string) => void;
  onCancelConnect: () => void;
  onDeleteConnection: (connId: string) => void;
}

export default function CanvasView({
  flow,
  selectedNodeId,
  onSelectNode,
  onDeleteNode,
  onUpdateNodePosition,
  connectSourceNodeId,
  connectSourcePortName,
  onStartConnect,
  onCompleteConnect,
  onCancelConnect,
  onDeleteConnection
}: CanvasViewProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle canvas mouse move to draw temporary connection line
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    
    // Calculate coordinates inside the zoomed & panned canvas
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    
    setMousePosition({ x, y });
  };

  // Canvas Pan start
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only pan if clicking direct canvas, not nodes
    if (e.target === e.currentTarget || (e.target as HTMLElement).id === 'grid-svg') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
    handleMouseMove(e);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  useEffect(() => {
    if (isPanning) {
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [isPanning]);

  // Port coordinate calculations
  const getNodePortCoords = (nodeId: string, isOutput: boolean, _portIndex: number = 0) => {
    const node = flow.nodes.find((n) => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };

    const width = 240;
    // Approximate vertical port offsets based on layout inside NodeCard
    const heightOffset = 64; // middle of the card approx

    if (isOutput) {
      return {
        x: node.position.x + width,
        y: node.position.y + heightOffset
      };
    } else {
      return {
        x: node.position.x,
        y: node.position.y + heightOffset
      };
    }
  };

  // Draw Bezier Connection Line
  const getBezierPath = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = Math.abs(x2 - x1) * 0.4;
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  };

  return (
    <div
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleCanvasMouseMove}
      onClick={() => {
        onSelectNode(null);
        if (connectSourceNodeId) onCancelConnect();
      }}
      className={`relative w-full h-full overflow-hidden select-none bg-[#f8fafc] border border-slate-200/60 rounded-2xl cursor-grab ${
        isPanning ? 'cursor-grabbing' : ''
      }`}
      style={{
        backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
        backgroundPosition: `${pan.x}px ${pan.y}px`
      }}
    >
      {/* Zoom / Pan Controller Overlay */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 bg-white border border-slate-100 p-1.5 rounded-xl shadow-sm">
        <button
          onClick={() => setZoom(Math.max(0.6, zoom - 0.1))}
          className="p-1.5 rounded hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut size={14} />
        </button>
        <span className="text-[10px] font-bold text-slate-500 min-w-10 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
          className="p-1.5 rounded hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn size={14} />
        </button>
        <div className="w-px h-4 bg-slate-100 mx-1" />
        <button
          onClick={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
          className="p-1.5 rounded hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          title="Recenter"
        >
          <Maximize2 size={12} />
        </button>
      </div>

      {/* SVG Connections Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        <svg id="grid-svg" className="w-full h-full overflow-visible pointer-events-none">
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* Established Connections */}
          {flow.connections.map((conn) => {
            const start = getNodePortCoords(conn.sourceNodeId, true);
            const end = getNodePortCoords(conn.targetNodeId, false);
            const path = getBezierPath(start.x, start.y, end.x, end.y);
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;

            return (
              <g key={conn.id} className="pointer-events-auto group">
                {/* Visual line */}
                <path
                  d={path}
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="2.5"
                  className="group-hover:stroke-indigo-600 transition-colors"
                  markerEnd="url(#arrow)"
                />
                {/* Thick invisible click helper path */}
                <path
                  d={path}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="12"
                  className="cursor-pointer"
                />
                
                {/* Inline Delete connection button */}
                <foreignObject
                  x={midX - 10}
                  y={midY - 10}
                  width="20"
                  height="20"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConnection(conn.id);
                    }}
                    className="w-5 h-5 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-slate-300 active:scale-90 transition-all cursor-pointer"
                    title="Delete connection"
                  >
                    <X size={10} strokeWidth={3} />
                  </button>
                </foreignObject>
              </g>
            );
          })}

          {/* Pending Connection Line (dragging/connecting) */}
          {connectSourceNodeId && connectSourcePortName && (
            <path
              d={getBezierPath(
                getNodePortCoords(connectSourceNodeId, true).x,
                getNodePortCoords(connectSourceNodeId, true).y,
                mousePosition.x,
                mousePosition.y
              )}
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-dash"
            />
          )}
        </svg>
      </div>

      {/* Nodes Render Layer */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {flow.nodes.map((node) => (
          <NodeCard
            key={node.id}
            node={node}
            isSelected={selectedNodeId === node.id}
            onSelect={() => onSelectNode(node.id)}
            onDelete={() => onDeleteNode(node.id)}
            onUpdatePosition={onUpdateNodePosition}
            onStartConnect={onStartConnect}
            onCompleteConnect={onCompleteConnect}
            isConnectingSource={connectSourceNodeId === node.id}
            isConnectingModeActive={!!connectSourceNodeId}
          />
        ))}
      </div>

      {/* Quick Instruction Banner when connecting */}
      {connectSourceNodeId && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-indigo-600 text-white font-semibold text-xs py-2 px-4 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <span>Connecting Port... Click an input port on a target node to connect.</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCancelConnect();
            }}
            className="bg-white/20 hover:bg-white/35 rounded-full p-0.5 text-white active:scale-95 transition-all cursor-pointer"
          >
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
