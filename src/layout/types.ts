import type {
  Graph,
  GraphNode,
  GraphLink,
  GraphNodeData,
} from '../graph/types';

export interface LayoutedNode extends GraphNode {
  x: number;
  y: number;
}
export interface LayoutedLink extends GraphLink {
  source: LayoutedNode;
  target: LayoutedNode;
}
export interface LayoutedGraph extends Graph {
  nodes(): IterableIterator<LayoutedNode>;
  links(): IterableIterator<LayoutedLink>;
}

export const Vertical = 'vertical' as const;
export const Horizontal = 'horizontal' as const;
export type Orientation = typeof Vertical | typeof Horizontal;

export interface LayoutResult {
  graph: LayoutedGraph;
  width: number;
  height: number;
  orientation: Orientation;
}

export interface LayoutCalculator {
  calculateLayout(nodes: GraphNodeData[], userOpts?: any): LayoutResult;
}
