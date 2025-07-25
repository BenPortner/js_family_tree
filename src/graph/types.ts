import type {
  LinkData,
  NodeData,
  PersonData,
  UnionData,
} from '../import/types';
import type { ClickableNode } from './clickableNode';

export interface GraphPersonData extends PersonData {
  insertedNodes: GraphNode[];
}
export interface GraphUnionData extends UnionData {
  insertedNodes: GraphNode[];
}
export type GraphNodeData = GraphPersonData | GraphUnionData;
export type GraphLinkData = LinkData;

export interface Graph {
  nodes(): IterableIterator<GraphNode>;
  links(): IterableIterator<GraphLink>;
}
export interface GraphNode {
  data: GraphNodeData;
  children(): IterableIterator<GraphNode>;
  parents(): IterableIterator<GraphNode>;
}
export interface GraphLink {
  source: GraphNode;
  target: GraphNode;
}

export interface GraphBuilder {
  buildGraph(nodeData: NodeData[]): ClickableNode[];
}
