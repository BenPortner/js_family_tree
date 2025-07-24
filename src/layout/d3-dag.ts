import * as d3dag from 'd3-dag';
import {
  LayoutCalculator,
  LinkDatum,
  NodeDatum,
  PersonData,
  UnionData,
} from './types';

export interface PersonNode extends d3dag.MutGraphNode<PersonData, undefined> {}
export interface UnionNode extends d3dag.MutGraphNode<UnionData, undefined> {}
export interface Graph extends d3dag.MutGraph<NodeDatum, LinkDatum> {}
export interface Node extends d3dag.MutGraphNode<NodeDatum, LinkDatum> {}
export interface Link extends d3dag.MutGraphLink<NodeDatum, LinkDatum> {}
export type Orientation = 'vertical' | 'horizontal';

export interface D3DAGLayoutCalculatorOptions {
  nodeSize: [number, number];
  layering: d3dag.Layering<NodeDatum, LinkDatum>;
  decross: d3dag.Decross<NodeDatum, LinkDatum>;
  coord: d3dag.Coord<NodeDatum, LinkDatum>;
  orientation: Orientation;
}

function translateOrientationToTweak(orientation: Orientation) {
  if (orientation == 'vertical') {
    return [];
  } else if (orientation == 'horizontal') {
    return [d3dag.tweakFlip('diagonal')];
  } else {
    throw Error('Invalid orientation: ' + orientation);
  }
}

function customSugiyamaDecross(layers: d3dag.SugiNode<NodeDatum>[][]): void {
  // apply optimal decrossing algorithm
  d3dag.decrossOpt()(layers);
  // then re-arrange to make sure that union partners are next to each other
  for (let layer of layers) {
    layer.sort((a, b) => {
      if (a.data.role === 'link') return 0;
      if (b.data.role === 'link') return 0;
      if (a.data.node.data.type === 'union') return 0;
      if (b.data.node.data.type === 'union') return 0;
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
  orientation: 'horizontal',
};

export class D3DAGLayoutCalculator implements LayoutCalculator {
  calculateLayout(nodes: NodeDatum[], userOpts?: D3DAGLayoutCalculatorOptions) {
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
    };
  }
}
