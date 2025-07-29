import type {
  GraphNode as D3GraphNode,
  GraphLink as D3GraphLink,
  Graph as D3Graph,
} from 'd3-dag';
import type { NodeID, Person, Union } from '../familyTreeData';
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
export type LinkData = [NodeID, NodeID];
export type GraphNode = D3GraphNode<NodeData, LinkData>;
export type GraphLink = D3GraphLink<NodeData, LinkData>;
export type Graph = D3Graph<NodeData, LinkData>;

export interface Importer {
  import(data: any): ClickableNode[];
}
