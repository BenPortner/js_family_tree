import type {
  Layering,
  Decross,
  Coord,
  SugiNode,
  NodeSize,
  GraphNode,
} from 'd3-dag';
import {
  tweakFlip,
  decrossOpt,
  layeringSimplex,
  decrossTwoLayer,
  coordQuad,
  graphStratify,
  sugiyama,
} from 'd3-dag';
import { Horizontal, Vertical } from './types';
import type { ClickableNode } from '../clickableNode';
import type {
  LayoutResult,
  LayoutCalculator,
  Orientation,
  LayoutCalculatorOpts,
  LayoutedNode,
  LayoutedLink,
} from './types';
import type { LinkData, PersonData } from '../import/types';

export interface D3DAGLayoutCalculatorOptions extends LayoutCalculatorOpts {
  nodeSize: NodeSize<ClickableNode, LinkData>;
  layering: Layering<ClickableNode, LinkData>;
  decross: Decross<ClickableNode, LinkData>;
  coord: Coord<ClickableNode, LinkData>;
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

function customSugiyamaDecross(layers: SugiNode<ClickableNode>[][]): void {
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

export class D3DAGLayoutCalculator implements LayoutCalculator {
  public opts: D3DAGLayoutCalculatorOptions = {
    nodeSize: (node: GraphNode<ClickableNode>) => [50, 100] as [number, number],
    layering: layeringSimplex(),
    // decross: customSugiyamaDecross,
    decross: decrossTwoLayer(),
    coord: coordQuad(),
    orientation: Horizontal,
  };

  constructor(opts?: Partial<D3DAGLayoutCalculatorOptions>) {
    this.opts = { ...this.opts, ...opts };
  }

  calculateLayout(nodes: ClickableNode[]): LayoutResult {
    // build a temporary graph from the visible nodes
    const builder = graphStratify()
      .id((n: ClickableNode) => n.data.id)
      .parentIds((n: ClickableNode) => n.visibleParentIDs());
    const graph = builder(nodes);
    // define the layout
    const layout = sugiyama()
      .nodeSize(this.opts.nodeSize)
      .layering(this.opts.layering)
      .decross(this.opts.decross)
      .coord(this.opts.coord)
      .tweaks(translateOrientationToTweak(this.opts.orientation));
    // calculate the layout
    layout(graph);
    // write x and y back to original nodes
    const layoutedNodes = [...graph.nodes()].map((n) => {
      (n.data as LayoutedNode).x = n.x;
      (n.data as LayoutedNode).y = n.y;
      return n.data as LayoutedNode;
    });
    // unwrap links: replace source and target with ClickableNodes
    const layoutedLinks = [...graph.links()].map((l) => {
      return {
        source: l.source.data,
        target: l.target.data,
      } as LayoutedLink;
    });
    return {
      nodes: layoutedNodes,
      links: layoutedLinks,
      orientation: this.opts.orientation,
    };
  }
}
