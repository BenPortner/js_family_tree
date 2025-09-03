import type { Layering, Decross, Coord, SugiNode } from 'd3-dag';
import {
  tweakFlip,
  decrossOpt,
  layeringSimplex,
  decrossTwoLayer,
  coordQuad,
  graphStratify,
  sugiyama,
} from 'd3-dag';
import {
  Horizontal,
  Vertical,
  type LayoutResult,
  type LayoutCalculator,
  type Orientation,
} from './types';
import type { ClickableNode } from '../clickableNode';
import type { NodeData, LinkData, LayoutCalculatorOpts } from './types';
import type { PersonData } from '../import/types';

export interface D3DAGLayoutCalculatorOptions extends LayoutCalculatorOpts {
  nodeSize: [number, number];
  layering: Layering<NodeData, LinkData>;
  decross: Decross<NodeData, LinkData>;
  coord: Coord<NodeData, LinkData>;
  orientation: Orientation;
}

function translateOrientationToTweak(orientation: Orientation) {
  if (orientation == Vertical) {
    return [];
  } else if (orientation == Horizontal) {
    return [tweakFlip('diagonal')];
  } else {
    throw Error('Invalid orientation: ' + orientation);
  }
}

function customSugiyamaDecross(layers: SugiNode<NodeData>[][]): void {
  // apply optimal decrossing algorithm
  decrossOpt()(layers);
  // then re-arrange to make sure that union partners are next to each other
  for (let layer of layers) {
    layer.sort((a, b) => {
      if (a.data.role === 'link') return 0;
      if (b.data.role === 'link') return 0;
      if (a.data.node.data.isUnion) return 0;
      if (b.data.node.data.isUnion) return 0;
      const aPerson = a.data.node.data.data as PersonData;
      const bPerson = b.data.node.data.data as PersonData;
      if (aPerson.own_unions?.length === 0) return 1;
      if (bPerson.own_unions?.length === 0) return -1;
      return 0;
    });
  }
}

const D3DAGLAyoutCalculatorDefaultOptions: D3DAGLayoutCalculatorOptions = {
  nodeSize: [50, 100],
  layering: layeringSimplex(),
  // decross: customSugiyamaDecross,
  decross: decrossTwoLayer(),
  coord: coordQuad(),
  orientation: Horizontal,
};

export class D3DAGLayoutCalculator implements LayoutCalculator {
  public opts?: D3DAGLayoutCalculatorOptions;

  constructor(opts?: D3DAGLayoutCalculatorOptions) {
    this.opts = opts;
  }
  calculateLayout(nodes: ClickableNode[]): LayoutResult {
    const opts = {
      ...D3DAGLAyoutCalculatorDefaultOptions,
      ...this.opts,
    };
    const builder = graphStratify()
      .id((n: ClickableNode) => n.data.id)
      .parentIds((n: ClickableNode) => n.visibleParentIDs());
    const graph = builder(nodes);
    // calculate the layout
    const layout = sugiyama()
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
