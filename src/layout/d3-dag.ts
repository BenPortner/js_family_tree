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
import type { LinkData } from '../import/types';

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
  // apply two layer decrossing algorithm
  decrossTwoLayer()(layers);
  // then re-arrange to make sure that union partners are next to each other
  for (let layer of layers) {
    const layerBefore = [...layer];
    for (let node of layerBefore) {
      if (node.data.role === 'link' || node.data.node.data.isUnion) continue;
      const clickableNode = node.data.node.data;
      // nodes without visible parents are most likely someone's partner
      if (clickableNode.visibleParents.length > 0) continue;
      const partners = clickableNode.visiblePartners;
      if (partners.length == 0) continue;
      const partner = partners[0];
      const nodePartner = layer.find(
        (n) => n.data.role == 'node' && n.data.node.data == partner
      );
      if (!nodePartner) continue;
      const nodePosition = layer.indexOf(node);
      const partnerPosition = layer.indexOf(nodePartner);
      // don't do anything if they are already next to each other
      if (Math.abs(nodePosition - partnerPosition) == 1) continue;
      // else remove node from current position
      // and insert below partner
      layer.splice(nodePosition, 1);
      layer.splice(layer.indexOf(nodePartner) + 1, 0, node);
    }
  }
}

export class D3DAGLayoutCalculator implements LayoutCalculator {
  public opts: D3DAGLayoutCalculatorOptions = {
    nodeSize: (node: GraphNode<ClickableNode>) => [50, 100] as [number, number],
    layering: layeringSimplex(),
    decross: customSugiyamaDecross,
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
