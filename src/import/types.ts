import type { Person, Union } from '../familyTreeData';
import type { ClickableNode } from '../clickableNode';

export const CPerson = 'person' as const;
export const CUnion = 'union' as const;

export interface PersonData extends Person {
  type: typeof CPerson;
  visible: boolean;
  insertedNodes: ClickableNode[];
}
export interface UnionData extends Union {
  type: typeof CUnion;
  visible: boolean;
  insertedNodes: ClickableNode[];
}
export type NodeData = PersonData | UnionData;
export type LinkData = any;

export interface GraphNode {
  data: NodeData;
  children(): IterableIterator<GraphNode>;
  parents(): IterableIterator<GraphNode>;
}
export interface GraphLink {
  source: GraphNode;
  target: GraphNode;
}
export interface Graph {
  nodes(): IterableIterator<GraphNode>;
}

export interface Importer {
  import(data: any): ClickableNode[];
}
