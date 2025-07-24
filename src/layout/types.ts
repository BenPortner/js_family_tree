import type { Person, Union } from '../familyTreeData';

export interface PersonData extends Person {
  type: 'person';
  parentIds: string[];
}
export interface UnionData extends Union {
  type: 'union';
  parentIds: string[];
}
export type NodeDatum = PersonData | UnionData;
export type LinkDatum = undefined;

export interface Graph {
  nodes(): IterableIterator<Node>;
  links(): IterableIterator<Link>;
}
export interface Node {
  data: NodeDatum;
  x: number;
  y: number;
}
export interface Link {
  source: Node;
  target: Node;
}

export interface LayoutResult {
  graph: Graph;
  width: number;
  height: number;
}

export interface LayoutCalculator {
  calculateLayout(nodes: NodeDatum[], userOpts?: any): LayoutResult;
}
