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
    enteringGroups
      .append('circle')
      .on('click', (event, d) => this.opts.nodeClickFunction(d, this.ft))
      .on('contextmenu', (event, d) => this.opts.nodeRightClickFunction(d, this.ft))
      .transition()
      .duration(this.opts.transitionDuration)
      .attr('r', this.opts.nodeSizeFunction)
      .attr('class', (d) => this.opts.nodeCSSClassFunction(d));
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
    // update existing nodes
    selection
      .transition()
      .duration(this.opts.transitionDuration)
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
      .select('circle')
      .attr('class', (d) => this.opts.nodeCSSClassFunction(d));
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
   * @param enteringNodes - The selection of entering nodes.
   * @param cssClass - CSS class for the text element.
   * @param lineSep - Vertical separation between lines.
   * @param xOffset - Horizontal offset for the text.
   * @param dominantBaseline - SVG dominant-baseline attribute value.
   */
  private renderLabels(
    enteringNodes: Selection<SVGGElement, LayoutedNode, SVGGElement, unknown>,
    cssClass: string = 'node-label',
    lineSep: number = 14,
    xOffset: number = 13,
    dominantBaseline: DominantBaseline = 'central'
  ) {
    const nodeLabelFunction = this.opts.nodeLabelFunction;
    enteringNodes
      .append('text')
      .attr('class', cssClass)
      .attr('dominant-baseline', dominantBaseline)
      .selectAll('tspan')
      .data((node) => {
        const lines = nodeLabelFunction(node);
        const yOffset = (-lineSep * (lines.length - 1)) / 2;
        return lines.map((line, i) => ({
          line,
          dy: i === 0 ? yOffset : lineSep,
        }));
      })
      .enter()
      .append('tspan')
      .text((d) => d.line)
      .attr('x', xOffset)
      .attr('dy', (d) => d.dy);
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
    this.renderLabels(nodeSelect, 'node-label', 14, 13, 'central');
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
