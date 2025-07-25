import * as d3dag from 'd3-dag';
import {
  Horizontal,
  Vertical,
  type LayoutCalculator,
  type Orientation,
} from './types';
import { UnionType, type PersonData } from '../import/types';
import type { GraphNodeData, GraphLinkData } from '../graph/types';

export interface Graph extends d3dag.MutGraph<GraphNodeData, GraphLinkData> {}
export interface Node
  extends d3dag.MutGraphNode<GraphNodeData, GraphLinkData> {}
export interface Link
  extends d3dag.MutGraphLink<GraphNodeData, GraphLinkData> {}

export interface D3DAGLayoutCalculatorOptions {
  nodeSize: [number, number];
  layering: d3dag.Layering<GraphNodeData, GraphLinkData>;
  decross: d3dag.Decross<GraphNodeData, GraphLinkData>;
  coord: d3dag.Coord<GraphNodeData, GraphLinkData>;
  orientation: Orientation;
}

function translateOrientationToTweak(orientation: Orientation) {
  if (orientation == Vertical) {
    return [];
  } else if (orientation == Horizontal) {
    return [d3dag.tweakFlip('diagonal')];
  } else {
    throw Error('Invalid orientation: ' + orientation);
  }
}

function customSugiyamaDecross(
  layers: d3dag.SugiNode<GraphNodeData>[][]
): void {
  // apply optimal decrossing algorithm
  d3dag.decrossOpt()(layers);
  // then re-arrange to make sure that union partners are next to each other
  for (let layer of layers) {
    layer.sort((a, b) => {
      if (a.data.role === 'link') return 0;
      if (b.data.role === 'link') return 0;
      if (a.data.node.data.type === UnionType) return 0;
      if (b.data.node.data.type === UnionType) return 0;
      const aPerson = a.data.node.data as PersonData;
      const bPerson = b.data.node.data as PersonData;
      if (aPerson.own_unions?.length === 0) return 1;
      if (bPerson.own_unions?.length === 0) return -1;
      return 0;
    });
  }
}

const D3DAGLAyoutCalculatorDefaultOptions: D3DAGLayoutCalculatorOptions = {
  nodeSize: [120, 120],
  layering: d3dag.layeringSimplex(),
  // decross: customSugiyamaDecross,
  decross: d3dag.decrossTwoLayer(),
  coord: d3dag.coordQuad(),
  orientation: Horizontal,
};

export class D3DAGLayoutCalculator implements LayoutCalculator {
  calculateLayout(
    nodes: GraphNodeData[],
    userOpts?: D3DAGLayoutCalculatorOptions
  ) {
    const opts = {
      ...D3DAGLAyoutCalculatorDefaultOptions,
      ...userOpts,
    };
    const builder = d3dag.graphStratify();
    const graph = builder(nodes);
    // calculate the layout
    const layout = d3dag
      .sugiyama()
      .nodeSize(opts.nodeSize)
      .layering(opts.layering)
      .decross(opts.decross)
      .coord(opts.coord)
      .tweaks(translateOrientationToTweak(opts.orientation));
    const layoutResult = layout(graph);
    return {
      graph: graph,
      width: layoutResult.width,
      height: layoutResult.height,
      orientation: opts.orientation,
    };
  }
}
