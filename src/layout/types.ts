import type { ClickableNode } from '../clickableNode';
import { LinkData, NodeData } from '../import/types';

export interface Coordinates {
  x: number;
  y: number;
}

export type LayoutedLinkData = LinkData;

export interface LayoutedNode extends ClickableNode {
  data: NodeData;
  x: number;
  y: number;
  children(): IterableIterator<LayoutedNode>;
}

export interface LayoutedLink {
  source: LayoutedNode;
  target: LayoutedNode;
}

export const Vertical = 'vertical' as const;
export const Horizontal = 'horizontal' as const;
export type Orientation = typeof Vertical | typeof Horizontal;

export type LayoutCalculatorOpts = {};

export interface LayoutResult {
  nodes: LayoutedNode[];
  links: LayoutedLink[];
  orientation: Orientation;
}

export interface LayoutCalculator {
  opts?: LayoutCalculatorOpts;
  calculateLayout(nodes: ClickableNode[]): LayoutResult;
}
