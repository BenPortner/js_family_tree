import { graphStratify } from 'd3-dag';
import type { NodeData } from '../import/types';
import type { Graph, GraphBuilder } from './types';
import { augmentD3DAGNodeClass, ClickableNode } from './clickableNode';

export class D3DAGGraphBuilder implements GraphBuilder {
  buildGraph(nodeData: NodeData[]) {
    const builder = graphStratify();
    const graph = builder(nodeData) as Graph;
    const nodes = [...graph.nodes()];
    // add field: insertedNodes
    nodes.forEach((n) => {
      n.data.insertedNodes = [];
    });
    // add custom methods (augment)
    augmentD3DAGNodeClass(nodes[0]);
    return nodes as ClickableNode[];
  }
}
