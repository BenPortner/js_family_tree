import type { ClickableNode } from '../clickableNode';

export type NodeData = ClickableNode;
export type LinkData = undefined;

export interface LayoutedNode {
  data: NodeData;
  x: number;
  y: number;
  children(): IterableIterator<LayoutedNode>;
}
export interface LayoutedLink {
  source: LayoutedNode;
  target: LayoutedNode;
}
export interface LayoutedGraph {
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
  calculateLayout(nodes: ClickableNode[], userOpts?: any): LayoutResult;
}
