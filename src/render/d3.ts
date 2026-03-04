import { select, descending, zoom, type Selection, ZoomBehavior } from 'd3';
import {
  type Coordinates,
  type LayoutResult,
  type LayoutedLink,
  type LayoutedNode,
  type Orientation,
  Vertical,
} from '../layout/types';
import type { DominantBaseline } from './types';
import type { Renderer } from './types';
import type { FamilyTree } from '../familyTree';
import type { PersonData } from '../import/types';

/**
 * D3 selection type for a single node group (<g> element bound to a LayoutedNode).
 * Parent generics are <null, undefined> because this is produced by select(element)
 * directly on a DOM node, which creates a root-level selection with no parent context.
 * This is the type received by nodeRenderFunction and nodeUpdateFunction.
 */
export type NodeGroupSelection = Selection<SVGGElement, LayoutedNode, null, undefined>;

/**
 * Options for configuring the D3Renderer.
 * Allows customization of transitions, link and node rendering, labeling,
 * and tooltips.
 */
export interface D3RendererOptions {
  /** Duration of transitions in milliseconds. */
  transitionDuration: number;
  /** Function to generate the SVG path for a link. */
  linkPathFunction(link: CoordLink, orientation: Orientation): string;
  /** Function to determine the CSS class for a link. */
  linkCSSClassFunction(link: LayoutedLink): string;
  /** Function to handle node click events. */
  nodeClickFunction(node: LayoutedNode, ft: FamilyTree): void;
  /** Function to handle node right-click events. */
  nodeRightClickFunction(node: LayoutedNode, ft: FamilyTree): void;
  /** Function to determine the CSS class for a node. */
  nodeCSSClassFunction(node: LayoutedNode): string;
  /** Function to generate the label (text displayed next to the node). */
  nodeLabelFunction(node: LayoutedNode, missingData?: string): string[];
  /** Function to determine the size of a node. */
  nodeSizeFunction(node: LayoutedNode): number;
  /** Function to generate the tooltip content for a node. */
  nodeTooltipFunction(
    node: LayoutedNode,
    missingData?: string
  ): string | undefined;
  /**
   * Function called once per *entering* node to render its visual content
   * inside the positioned <g class="node-group"> element.
   * Use this to replace the default circle with portraits, cards, icons, etc.
   *
   * @param group - D3 selection of the entering <g> (single node, already bound to data)
   * @param node  - The LayoutedNode bound to this group
   * @param opts  - Full renderer opts; use nodeSizeFunction, nodeCSSClassFunction, etc.
   * @param ft    - The FamilyTree instance; pass to nodeClickFunction / nodeRightClickFunction
   */
  nodeRenderFunction(
    group: NodeGroupSelection,
    node: LayoutedNode,
    opts: D3RendererOptions,
    ft: FamilyTree
  ): void;
  /**
   * Function called on every re-render for *already-present* nodes (the D3 update selection).
   * Must keep visual state in sync with whatever nodeRenderFunction produced.
   * The default implementation updates the CSS class on the circle.
   *
   * @param group - D3 selection of the existing <g> (single node, already bound to data)
   * @param opts  - Full renderer opts
   */
  nodeUpdateFunction(
    group: NodeGroupSelection,
    opts: D3RendererOptions
  ): void;
  /**
   * Function called per node to determine the horizontal offset (in SVG units)
   * between the node centre and the start of its text label.
   * Used in horizontal orientation — return a value large enough to clear
   * whatever nodeRenderFunction draws (for the default circle: radius + margin).
   *
   * @param node - The LayoutedNode being labelled
   * @param opts - Full renderer opts (use nodeSizeFunction to derive the value)
   */
  nodeLabelOffsetFunction(node: LayoutedNode, opts: D3RendererOptions): number;
  /**
   * Function called per node to determine the vertical offset (in SVG units)
   * between the node centre and the baseline of its text label.
   * Used in vertical orientation, where the label is placed below the node
   * and centred horizontally.
   *
   * @param node - The LayoutedNode being labelled
   * @param opts - Full renderer opts (use nodeSizeFunction to derive the value)
   */
  nodeLabelVerticalOffsetFunction(node: LayoutedNode, opts: D3RendererOptions): number;
}

/**
 * Represents a link between two nodes in the layout.
 */
export interface CoordLink {
  source: Coordinates;
  target: Coordinates;
}

/**
 * D3Renderer is responsible for rendering the family tree using D3.
 * It handles SVG creation, zoom/pan, node and link rendering, tooltips, and labels.
 */
export class D3Renderer implements Renderer {
  /** The HTML container element for the SVG. */
  private _container!: HTMLElement;
  /** The main SVG selection. */
  private svg!: Selection<SVGSVGElement, unknown, null, undefined>;
  /** The group element within the SVG for all rendered elements. */
  private g!: Selection<SVGGElement, unknown, null, undefined>;
  /** The div holding the tooltip. */
  private tooltipDiv!: Selection<HTMLDivElement, unknown, null, undefined>;
  /** The D3 zoom behavior instance. */
  private zoom!: ZoomBehavior<SVGSVGElement, unknown>;
  /** Reference to the FamilyTree instance. */
  private ft: FamilyTree;

  /** Default renderer options, can be overwritten via the constructor. */
  public opts: D3RendererOptions = {
    transitionDuration: 750, // ms
    linkPathFunction: D3Renderer.defaultLinkPathFunction,
    linkCSSClassFunction: D3Renderer.defaultLinkCSSClassFunction,
    nodeClickFunction: D3Renderer.defaultNodeClickFunction,
    nodeRightClickFunction: D3Renderer.defaultNodeRightClickFunction,
    nodeCSSClassFunction: D3Renderer.defaultNodeCSSClassFunction,
    nodeLabelFunction: D3Renderer.defaultNodeLabelFunction,
    nodeTooltipFunction: D3Renderer.defaultNodeTooltipFunction,
    nodeSizeFunction: D3Renderer.defaultNodeSizeFunction,
    nodeRenderFunction: D3Renderer.defaultNodeRenderFunction,
    nodeUpdateFunction: D3Renderer.defaultNodeUpdateFunction,
    nodeLabelOffsetFunction: D3Renderer.defaultNodeLabelOffsetFunction,
    nodeLabelVerticalOffsetFunction: D3Renderer.defaultNodeLabelVerticalOffsetFunction,
  };

  /**
   * Constructs a new D3Renderer.
   * @param container - The HTML element to render into.
   * @param ft - The FamilyTree instance to visualize.
   * @param opts - Optional renderer options to override defaults.
   */
  constructor(
    container: HTMLElement,
    ft: FamilyTree,
    opts?: Partial<D3RendererOptions>
  ) {
    this.ft = ft;
    this.opts = { ...this.opts, ...opts };
    this.container = container;
  }

  /** Gets the current container element. */
  get container() {
    return this._container;
  }

  /** Sets the container element and initializes the SVG and tooltip. */
  set container(c: HTMLElement) {
    this._container = c;
    this.initializeContainer();
  }

  /** Returns true if running in a JSDOM environment (used for testing). */
  private get isJSDOM() {
    return /jsdom/i.test(
      this.container.ownerDocument.defaultView!.navigator.userAgent
    );
  }

  /**
   * Initializes the SVG, group, zoom behavior, and tooltip div in the container.
   */
  private initializeContainer() {
    // set container class
    select(this.container).attr('class', 'svg-container');

    // create svg element in container
    this.svg = select(this.container).append('svg');

    // create group element in svg
    this.g = this.svg.append('g').attr('transform', 'translate(0, 0)');

    // add zoom and pan behavior
    this.zoom = zoom<SVGSVGElement, unknown>().on('zoom', (event) => {
      this.g.attr('transform', event.transform);
    });
    this.svg.call(this.zoom);

    // create tooltip div
    this.tooltipDiv = select(this.container)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('visibility', 'hidden');
  }

  /**
   * Default function to generate the SVG path for a link, using S-bends
   * for vertical or horizontal orientation.
   */
  private static defaultLinkPathFunction(
    link: CoordLink,
    orientation: Orientation
  ) {
    function vertical_s_bend(s: Coordinates, d: Coordinates) {
      // Creates a diagonal curve fit for vertically oriented trees
      return `M ${s.x} ${s.y} 
        C ${s.x} ${(s.y + d.y) / 2},
        ${d.x} ${(s.y + d.y) / 2},
        ${d.x} ${d.y}`;
    }

    function horizontal_s_bend(s: Coordinates, d: Coordinates) {
      // Creates a diagonal curve fit for horizontally oriented trees
      return `M ${s.x} ${s.y}
        C ${(s.x + d.x) / 2} ${s.y},
          ${(s.x + d.x) / 2} ${d.y},
          ${d.x} ${d.y}`;
    }
    const s = link.source;
    const d = link.target;
    return orientation == Vertical
      ? vertical_s_bend(s, d)
      : horizontal_s_bend(s, d);
  }

  /**
   * Default node click handler: delegates to the FamilyTree's nodeClickHandler.
   */
  private static defaultNodeClickFunction(node: LayoutedNode, ft: FamilyTree) {
    ft.nodeClickHandler(node);
  }

  /**
   * Default node right-click handler: doesn't do anything.
   */
  private static defaultNodeRightClickFunction(node: LayoutedNode, ft: FamilyTree) {
    return;
  }

  /**
   * Default function to generate labels for a node.
   * Returns an array of strings containing name, birthyear and deathyear.
   * Each array entry representing a line of the label.
   */
  private static defaultNodeLabelFunction(
    node: LayoutedNode,
    missingData: string = '?'
  ) {
    if (node.isUnion) return [];
    const { name, birthyear, deathyear } = node.data as PersonData;
    const lines = [
      name,
      `${birthyear ?? missingData} - ${deathyear ?? missingData}`,
    ];
    return lines;
  }

  /**
   * Default function to generate the tooltip for a node.
   * Returns a formatted HTML string with name, birth, and death info.
   */
  private static defaultNodeTooltipFunction(
    node: LayoutedNode,
    missingData: string = '?'
  ) {
    if (node.isUnion) return;
    const { name, birthyear, birthplace, deathyear, deathplace } =
      node.data as PersonData;
    const content = `
      <span style='margin-left: 2.5px;'>
        <b>${name}</b>
      </span><br>
      <table style="margin-top: 2.5px;">
        <tr>
          <td>born</td>
          <td>${birthyear} in ${birthplace}</td>
        </tr>
        <tr>
          <td>died</td>
          <td>${deathyear} in ${deathplace}</td>
        </tr>
      </table>`;
    // replace undefined entries with ?
    return content.replace(/undefined/g, missingData);
  }

  /**
   * Default function to determine the size of a node.
   * Returns 10 for persons, 0 for unions.
   */
  private static defaultNodeSizeFunction(node: LayoutedNode) {
    if (node.isUnion) return 0;
    if (node.isPerson) return 10;
    return 0;
  }

  /**
   * Default function to determine the CSS class for a node.
   * Combines extendability (can be extended/collapsed) and type (person/union).
   */
  private static defaultNodeCSSClassFunction(node: LayoutedNode) {
    const class1 = node.extendable ? 'extendable' : 'non-extendable';
    const class2 = node.data.type;
    return class1 + ' ' + class2;
  }

  /**
   * Default function to render the visual content of an entering node.
   * Appends a circle to the group, wired to click/contextmenu handlers,
   * with radius from nodeSizeFunction and class from nodeCSSClassFunction.
   * Override via opts.nodeRenderFunction to replace circles with portraits,
   * cards, or any other SVG content.
   */
  private static defaultNodeRenderFunction(
    group: NodeGroupSelection,
    node: LayoutedNode,
    opts: D3RendererOptions,
    ft: FamilyTree
  ) {
    group
      .append('circle')
      .on('click', (event, d) => opts.nodeClickFunction(d, ft))
      .on('contextmenu', (event, d) => opts.nodeRightClickFunction(d, ft))
      .transition()
      .duration(opts.transitionDuration)
      .attr('r', opts.nodeSizeFunction)
      .attr('class', (d) => opts.nodeCSSClassFunction(d));
  }

  /**
   * Default function to update the visual content of an already-present node
   * on re-renders (the D3 update selection).
   * Mirrors what defaultNodeRenderFunction produced: refreshes the CSS class
   * on the circle so extendable/non-extendable state stays in sync.
   * Override via opts.nodeUpdateFunction whenever you override nodeRenderFunction.
   */
  private static defaultNodeUpdateFunction(
    group: NodeGroupSelection,
    opts: D3RendererOptions
  ) {
    group
      .select<SVGCircleElement>('circle')
      .attr('class', (d) => opts.nodeCSSClassFunction(d));
  }

  /**
   * Default function to determine the horizontal label offset for a node.
   * Returns nodeSizeFunction(node) + 3, placing the label just outside the
   * default circle. Override when nodeRenderFunction draws something larger
   * (e.g. a portrait with radius 28 → return 28 + 4 = 32).
   */
  private static defaultNodeLabelOffsetFunction(
    node: LayoutedNode,
    opts: D3RendererOptions
  ): number {
    return opts.nodeSizeFunction(node) + 3;
  }

  /**
   * Default function to determine the vertical label offset for a node in
   * vertical orientation. Returns nodeSizeFunction(node) + 5, placing the
   * label just below the default circle, centred horizontally.
   */
  private static defaultNodeLabelVerticalOffsetFunction(
    node: LayoutedNode,
    opts: D3RendererOptions
  ): number {
    return opts.nodeSizeFunction(node) + 5;
  }

  /**
   * Default function to determine the CSS class for a link.
   * Returns 'link' for all links.
   */
  private static defaultLinkCSSClassFunction(link: LayoutedLink) {
    return 'link';
  }

  /**
   * Renders the nodes (persons and unions), handling enter, update, and exit transitions.
   * @param nodes - The nodes to render.
   * @param previousPosition - Optional previous position for transitions.
   * @param newPosition - Optional new position for transitions.
   * @returns The selection of entering node groups.
   */
  private renderNodes(
    nodes: LayoutedNode[],
    previousPosition?: Coordinates,
    newPosition?: Coordinates
  ) {
    const selection = this.g
      .selectAll<SVGGElement, LayoutedNode>('g')
      .data<LayoutedNode>(nodes, (n) => n.data.id);
    const enteringGroups = selection.enter().append('g');
    // entering groups transition from clicked node old to final position
    enteringGroups
      .attr('transform', (d) => {
        const transitionStart = previousPosition ?? d;
        return 'translate(' + transitionStart.x + ',' + transitionStart.y + ')';
      })
      .transition()
      .duration(this.opts.transitionDuration)
      .attr('class', 'node-group')
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
    // delegate visual rendering to the (overridable) nodeRenderFunction
    enteringGroups.each((d, i, nodes) => {
      this.opts.nodeRenderFunction(
        select<SVGGElement, LayoutedNode>(nodes[i]),
        d,
        this.opts,
        this.ft
      );
    });
    // exiting nodes move from current position to clicked node new position
    selection
      .exit<LayoutedNode>()
      .transition()
      .duration(this.opts.transitionDuration)
      .attr('transform', (d) => {
        const transitionEnd = newPosition ?? d;
        return 'translate(' + transitionEnd.x + ',' + transitionEnd.y + ')';
      })
      .remove();
    // update existing nodes — position via transition, visuals via nodeUpdateFunction
    selection
      .transition()
      .duration(this.opts.transitionDuration)
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
    selection.each((d, i, nodes) => {
      this.opts.nodeUpdateFunction(
        select<SVGGElement, LayoutedNode>(nodes[i]),
        this.opts
      );
    });
    return enteringGroups;
  }

  /**
   * Renders the links as SVG paths, handling enter, update, and exit transitions.
   * @param layoutResult - The layout result containing links.
   * @param previousPosition - Optional previous position for transitions.
   * @param newPosition - Optional new position for transitions.
   */
  private renderLinks(
    layoutResult: LayoutResult,
    previousPosition?: Coordinates,
    newPosition?: Coordinates
  ) {
    const links = layoutResult.links;
    const selection = this.g
      .selectAll<SVGElement, LayoutedLink>('path')
      .data<LayoutedLink>(links, (l) => l.source.data.id + l.target.data.id);
    // entering links transition from old clicked node position to final position
    selection
      .enter()
      .append('path')
      .attr('d', (link) => {
        const transitionStart = previousPosition ?? link.source;
        const transitionStartLink = {
          source: transitionStart,
          target: transitionStart,
        };
        return this.opts.linkPathFunction(
          transitionStartLink,
          layoutResult.orientation
        );
      })
      .transition()
      .duration(this.opts.transitionDuration)
      .attr('d', (link) => {
        return this.opts.linkPathFunction(link, layoutResult.orientation);
      })
      .attr('class', this.opts.linkCSSClassFunction);
    // updated links transition from current position to new position
    selection
      .transition()
      .duration(this.opts.transitionDuration)
      .attr('d', (link) => {
        return this.opts.linkPathFunction(link, layoutResult.orientation);
      });
    // exiting links transition from current position to clicked node new position
    selection
      .exit<LayoutedLink>()
      .transition()
      .duration(this.opts.transitionDuration)
      .attr('d', (link) => {
        const transitionEnd = newPosition ?? link.target;
        const transitionEndLink = {
          source: transitionEnd,
          target: transitionEnd,
        };
        return this.opts.linkPathFunction(
          transitionEndLink,
          layoutResult.orientation
        );
      })
      .remove();
  }

  /**
   * Sets up tooltips for the given node selection.
   * Shows and hides the tooltip div on mouseover/mouseout.
   * @param nodeSelect - The d3 selection containing all nodes.
   */
  private setupTooltips(
    nodeSelect: Selection<SVGGElement, LayoutedNode, SVGGElement, unknown>
  ) {
    const tooltip_div = this.tooltipDiv;
    const tooltip_func = this.opts.nodeTooltipFunction;
    nodeSelect.on('mouseover', function (event, node) {
      const tooltipContent = tooltip_func(node);
      if (tooltipContent) tooltip_div.html(tooltipContent);
      else return;
      const height = tooltip_div.node()!.getBoundingClientRect().height;
      tooltip_div
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY - height / 2 + 'px')
        .transition()
        .duration(200)
        .style('opacity', 1)
        .style('visibility', 'visible');
    });
    nodeSelect.on('mouseout', function (d) {
      tooltip_div
        .transition()
        .duration(500)
        .style('opacity', 0)
        .style('visibility', 'hidden');
    });
  }

  /**
   * Renders multi-line labels for entering nodes.
   * Each line is rendered as a separate <tspan> element.
   *
   * In **horizontal** orientation the label sits to the right of the node:
   *   - `x` is set to `xOffset` (positive = right of centre)
   *   - `text-anchor` is `start`
   *
   * In **vertical** orientation the label sits below the node, centred:
   *   - The first tspan's `dy` is `yOffset` (vertical clearance from centre)
   *   - `x` is 0 and `text-anchor` is `middle`
   *
   * @param enteringNodes - The selection of entering nodes.
   * @param orientation - Layout orientation ('horizontal' | 'vertical').
   * @param cssClass - CSS class for the text element.
   * @param lineSep - Vertical separation between lines.
   * @param xOffset - Horizontal offset used in horizontal orientation.
   * @param yOffset - Vertical offset used in vertical orientation.
   * @param dominantBaseline - SVG dominant-baseline attribute value.
   */
  private renderLabels(
    enteringNodes: Selection<SVGGElement, LayoutedNode, SVGGElement, unknown>,
    orientation: Orientation = Vertical,
    cssClass: string = 'node-label',
    lineSep: number = 14,
    xOffset: number | ((node: LayoutedNode) => number) = 13,
    yOffset: number | ((node: LayoutedNode) => number) = 15,
    dominantBaseline: DominantBaseline = 'central'
  ) {
    const nodeLabelFunction = this.opts.nodeLabelFunction;
    const resolveXOffset = typeof xOffset === 'function' ? xOffset : () => xOffset as number;
    const resolveYOffset = typeof yOffset === 'function' ? yOffset : () => yOffset as number;
    const isVertical = orientation === Vertical;

    const textSel = enteringNodes
      .append('text')
      .attr('class', cssClass)
      .attr('dominant-baseline', dominantBaseline)
      .attr('text-anchor', isVertical ? 'middle' : 'start');

    textSel
      .selectAll('tspan')
      .data((node) => {
        const lines = nodeLabelFunction(node);
        return lines.map((line, i) => ({ line, node, i, total: lines.length }));
      })
      .enter()
      .append('tspan')
      .text((d) => d.line)
      .attr('x', (d) => isVertical ? 0 : resolveXOffset(d.node))
      .attr('dy', (d) => {
        if (isVertical) {
          // first line: drop below node; subsequent lines: line separation
          return d.i === 0 ? resolveYOffset(d.node) : lineSep;
        } else {
          // original horizontal behaviour: vertically centre the block
          const yOff = (-lineSep * (d.total - 1)) / 2;
          return d.i === 0 ? yOff : lineSep;
        }
      });
  }

  /**
   * Sorts the DOM elements in the main group so that nodes are drawn on top of links.
   * Ensures correct visual stacking order.
   */
  private sortDomElements() {
    const nodes_and_links = this.g
      .selectChildren<SVGElement, any>()
      .nodes()
      .sort((a, b) => descending(a.tagName, b.tagName));
    nodes_and_links.forEach((el) => el.parentNode!.appendChild(el));
  }

  /**
   * Main render function. Draws the current layout, updates nodes and links, tooltips, and labels.
   * Also centers the view on the clicked node unless running in JSDOM.
   * @param layoutResult - The layout result to render.
   * @param previousPosition - Optional previous position for transitions.
   * @param newPosition - Optional new position for transitions.
   */
  render(
    layoutResult: LayoutResult,
    previousPosition?: Coordinates,
    newPosition?: Coordinates
  ) {
    // add / update / remove links and nodes
    const linkSelect = this.renderLinks(
      layoutResult,
      previousPosition,
      newPosition
    );
    const nodeSelect = this.renderNodes(
      layoutResult.nodes,
      previousPosition,
      newPosition
    );
    // ensure that nodes are drawn on top of links
    this.sortDomElements();
    // add tooltips and node labels
    this.setupTooltips(nodeSelect);
    this.renderLabels(
      nodeSelect,
      layoutResult.orientation,
      'node-label',
      14,
      (node) => this.opts.nodeLabelOffsetFunction(node, this.opts),
      (node) => this.opts.nodeLabelVerticalOffsetFunction(node, this.opts),
      'central'
    );
    // center view on clicked node
    // work-around because JSDOM+d3-zoom throws errors
    if (!this.isJSDOM) {
      const centerNode = newPosition ?? layoutResult.nodes[0];
      if (!centerNode) return;
      this.zoom.translateTo(
        this.svg.transition().duration(this.opts.transitionDuration),
        centerNode.x,
        centerNode.y
      );
    }
  }

  /**
   * Deletes all rendered elements from the SVG.
   */
  clear() {
    this.g.selectAll('*').remove();
  }
}