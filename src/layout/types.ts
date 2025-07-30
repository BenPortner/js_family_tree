import type { ClickableNode } from '../clickableNode';
import { NodeID } from '../familyTreeData';

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

export type LayoutCalculatorOpts = any;
export interface LayoutResult {
  graph: LayoutedGraph;
  width: number;
  height: number;
  orientation: Orientation;
}

export interface LayoutCalculator {
  opts?: LayoutCalculatorOpts;
  calculateLayout(nodes: ClickableNode[]): LayoutResult;
}
