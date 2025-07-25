import { graphStratify } from 'd3-dag';
import type { NodeData } from '../import/types';
import type { Graph, GraphBuilder } from './types';
import { ClickableNode } from './clickableNode';

export class D3DAGGraphBuilder implements GraphBuilder {
  buildGraph(nodeData: NodeData[]) {
    const builder = graphStratify();
    const graph = builder(nodeData) as Graph;
    const nodes = [...graph.nodes()];
    // add field: insertedNodes
    nodes.forEach((n) => {
      n.data.insertedNodes = [];
    });
    // add custom methods (wrapper)
    return nodes.map((n) => new ClickableNode(n));
  }
}
