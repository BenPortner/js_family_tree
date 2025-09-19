import type {
  Layering,
  Decross,
  Coord,
  SugiNode,
  NodeSize,
  GraphNode,
  SugiNodeDatum,
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
import type { LinkData, PersonData } from '../import/types';

/**
 * Options for configuring the D3DAGLayoutCalculator.
 * Extends the base LayoutCalculatorOpts and adds D3-DAG specific options.
 */
export interface D3DAGLayoutCalculatorOptions extends LayoutCalculatorOpts {
  /** Function to determine the size of each node. */
  nodeSize: NodeSize<ClickableNode, LinkData>;
  /** Layering algorithm for the layout. */
  layering: Layering<ClickableNode, LinkData>;
  /** Decrossing algorithm to reduce edge crossings. */
  decross: Decross<ClickableNode, LinkData>;
  /** Coordinate assignment algorithm for node placement. */
  coord: Coord<ClickableNode, LinkData>;
  /** Orientation of the layout (horizontal or vertical). */
  orientation: Orientation;
}

/**
 * Translates 'horizontal' and 'vertical' to whatever D3-DAG needs.
 */
function translateOrientationToTweak(orientation: Orientation) {
  if (orientation == Vertical) {
    return [];
  } else if (orientation == Horizontal) {
    return [tweakFlip('diagonal')];
  } else {
    throw Error('Invalid orientation: ' + orientation);
  }
}

type PriorityObj = {
  parentPos: number;
  birthyear: number;
  name: string;
  partnerOffset: number;
};
type LayerNode = SugiNode<ClickableNode>;

/**
 * Custom decrossing function for the Sugiyama layout.
 * 
 * Sorting priorities for nodes within a layer are:
 *   1. Parent position (sum of indices of visible parents in the previous layer)
 *   2. Birth year (ascending)
 *   3. Name (alphabetical)
 *   4. Partner offset (places nodes without parents above/below their partner)
 *
 * This helps to keep partner nodes visually grouped and improves the readability
 * of the family tree layout.
 *
 * @param layers - The array of layers, each containing SugiNode<ClickableNode> nodes.
 */
function customSugiyamaDecross(layers: LayerNode[][]): void {
  const priorities = new Map<LayerNode, PriorityObj>();
  const clickableNodeToLayerNodeMap = new Map<ClickableNode, LayerNode>();
  for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
    const layer = layers[layerIndex].filter((n) => n.data.role == 'node');
    const previousLayer =
      layerIndex > 0
        ? layers[layerIndex - 1].filter((n) => n.data.role == 'node')
        : null;
    const nodesWithoutParents = new Set<LayerNode>();

    // determine the priority of each node
    for (let node of layer) {
      const cnode = (node.data as SugiNodeDatum<ClickableNode>).node.data;
      clickableNodeToLayerNodeMap.set(cnode, node);

      // birth year e.g. 1990 or 60 for persons, otherwise 0
      const yearWeight = cnode.isPerson
        ? ((cnode.data as PersonData).birthyear ?? 0)
        : 0;

      // name for persons, otherwise ZZZZZZ
      const nameWeight = cnode.isPerson
        ? ((cnode.data as PersonData).name ?? 'ZZZZZZ')
        : 'ZZZZZZ';

      // sum of parent indices (layer positions) e.g. 1+2=3
      let parentWeight = 0;
      if (previousLayer) {
        const parentIndices = cnode.visibleParents.map((p) =>
          previousLayer.indexOf(clickableNodeToLayerNodeMap.get(p)!)
        );
        if (parentIndices.length > 0) {
          parentWeight = parentIndices.reduce((a, b) => a + b);
        } else {
          // nodes without parents are processed separately below
          nodesWithoutParents.add(node);
        }
      }

      // save priority in map
      priorities.set(node, {
        parentPos: parentWeight,
        birthyear: yearWeight,
        name: nameWeight,
        partnerOffset: 0,
      });
    }

    // nodes without parents copy the priority of their partner
    const partnerCounter = new Map<ClickableNode, number>();
    nodesWithoutParents.forEach((node) => {
      const cnode = (node.data as SugiNodeDatum<ClickableNode>).node.data;
      // find the partner node
      const cpartner = cnode.visiblePartners[0];
      const partner = clickableNodeToLayerNodeMap.get(cpartner);
      if (!partner) return;
      // assign same priority
      const partnerPrio = priorities.get(partner);
      if (!partnerPrio) return;
      const nodePrio = { ...partnerPrio };
      priorities.set(node, nodePrio);
      // this part makes sure that parentless nodes are arranged
      // alternately above and below their partners
      let count = partnerCounter.get(cpartner) ?? 0;
      partnerCounter.set(cpartner, count + 1);
      nodePrio.partnerOffset = count % 2 ? -1 : 1;
    });

    // debugging
    for (let node of layer) {
      // @ts-ignore
      node.data.node.data.data.priority = priorities.get(node);
    }

    // the actual sorting operation: re-arrange nodes based on their priority values
    layers[layerIndex] = layer.sort((a, b) => {
      const prioA = priorities.get(a);
      const prioB = priorities.get(b);
      if (!prioA || !prioB) return 0;
      if (prioA.parentPos !== prioB.parentPos)
        return prioA.parentPos - prioB.parentPos;
      if (prioA.birthyear !== prioB.birthyear)
        return prioA.birthyear - prioB.birthyear;
      if (prioA.name !== prioB.name)
        return prioA.name.localeCompare(prioB.name);
      else return prioA.partnerOffset - prioB.partnerOffset;
    });
  }
}

/**
 * Layout calculator using d3-dag's Sugiyama algorithm.
 * Responsible for computing node and link positions for the
 * family tree visualization.
 */
export class D3DAGLayoutCalculator implements LayoutCalculator {
  /**
   * Default options for configuring the layout algorithm.
   * Can be overwritten by passing `opts` argument to the
   * `D3DAGLayoutCalculator` constructor.
   */
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

  /**
   * Calculates the layout for the given nodes.
   * Builds a temporary graph from the visible nodes, applies the Sugiyama layout,
   * and writes the computed x/y coordinates back to the nodes.
   */
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
