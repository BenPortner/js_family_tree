import { select, descending, type Selection } from 'd3';
import {
  type LayoutedGraph,
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

export interface D3RendererOptions {
  transitionDuration: number;
  linkPathFunction(link: LayoutedLink, orientation: Orientation): string;
  nodeClickFunction(node: LayoutedNode, ft: FamilyTree): void;
  nodeCSSClassFunction(node: LayoutedNode): string;
  nodeLabelFunction(node: LayoutedNode, missingData?: string): string[];
  nodeSizeFunction(node: LayoutedNode): number;
  nodeTooltipFunction(
    node: LayoutedNode,
    missingData?: string
  ): string | undefined;
}

export class D3Renderer implements Renderer {
  private _container!: HTMLElement;
  private svg!: Selection<SVGSVGElement, unknown, null, undefined>;
  private g!: Selection<SVGGElement, unknown, null, undefined>;
  private tooltipDiv!: Selection<HTMLDivElement, unknown, null, undefined>;
  private ft: FamilyTree;

  public opts: D3RendererOptions = {
    transitionDuration: 750, // ms
    linkPathFunction: D3Renderer.defaultLinkPathFunction,
    nodeClickFunction: D3Renderer.defaultNodeClickFunction,
    nodeCSSClassFunction: D3Renderer.defaultNodeCSSClassFunction,
    nodeLabelFunction: D3Renderer.defaultNodeLabelFunction,
    nodeTooltipFunction: D3Renderer.defaultNodeTooltipFunction,
    nodeSizeFunction: D3Renderer.defaultNodeSizeFunction,
  };

  constructor(
    container: HTMLElement,
    ft: FamilyTree,
    opts?: Partial<D3RendererOptions>
  ) {
    this.ft = ft;
    this.opts = { ...this.opts, ...opts };
    this.container = container;
  }

  get container() {
    return this._container;
  }

  set container(c: HTMLElement) {
    this._container = c;
    this.initializeContainer();
  }

  private initializeContainer() {
    // set container class
    select(this.container).attr('class', 'svg-container');

    // create svg element in container
    this.svg = select(this.container).append('svg');

    // create group element in svg
    this.g = this.svg.append('g').attr('transform', 'translate(0, 0)');

    // create tooltip div
    this.tooltipDiv = select(this.container)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('visibility', 'hidden');
  }

  private static defaultLinkPathFunction(
    link: LayoutedLink,
    orientation: Orientation
  ) {
    function vertical_s_bend(s: LayoutedNode, d: LayoutedNode) {
      // Creates a diagonal curve fit for vertically oriented trees
      return `M ${s.x} ${s.y} 
        C ${s.x} ${(s.y + d.y) / 2},
        ${d.x} ${(s.y + d.y) / 2},
        ${d.x} ${d.y}`;
    }

    function horizontal_s_bend(s: LayoutedNode, d: LayoutedNode) {
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

  private static defaultNodeClickFunction(node: LayoutedNode, ft: FamilyTree) {
    ft.nodeClickHandler(node);
  }

  private static defaultNodeLabelFunction(
    node: LayoutedNode,
    missingData: string = '?'
  ) {
    if (node.data.isUnion) return [];
    const { name, birthyear, deathyear } = node.data.data as PersonData;
    const lines = [
      name,
      `${birthyear ?? missingData} - ${deathyear ?? missingData}`,
    ];
    return lines;
  }

  private static defaultNodeTooltipFunction(
    node: LayoutedNode,
    missingData: string = '?'
  ) {
    if (node.data.isUnion) return;
    const { name, birthyear, birthplace, deathyear, deathplace } = node.data
      .data as PersonData;
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

  private static defaultNodeSizeFunction(node: LayoutedNode) {
    if (node.data.isUnion) return 0;
    if (node.data.isPerson) return 10;
    return 0;
  }

  private static defaultNodeCSSClassFunction(node: LayoutedNode) {
    const class1 = node.data.extendable ? 'extendable' : 'non-extendable';
    const class2 = node.data.data.type;
    return class1 + ' ' + class2;
  }

  private renderNodes(
    graph: LayoutedGraph,
    clickedNodeOld?: LayoutedNode,
    clickedNodeNew?: LayoutedNode
  ) {
    const nodes = graph.nodes();
    const selection = this.g
      .selectAll<SVGGElement, LayoutedNode>('g')
      .data<LayoutedNode>(nodes, (n) => n.data.data.id);
    const enteringGroups = selection.enter().append('g');
    // entering groups transition from clicked node old to final position
    enteringGroups
      .attr('transform', (d) => {
        const transitionStart = clickedNodeOld ?? d;
        return 'translate(' + transitionStart.x + ',' + transitionStart.y + ')';
      })
      .transition()
      .duration(this.opts.transitionDuration)
      .attr('class', 'node-group')
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
    enteringGroups
      .append('circle')
      .on('click', (event, d) => this.opts.nodeClickFunction(d, this.ft))
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
        const transitionEnd = clickedNodeNew ?? d;
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

  private renderLinks(
    layoutResult: LayoutResult,
    clickedNodeOld?: LayoutedNode,
    clickedNodeNew?: LayoutedNode
  ) {
    const links = layoutResult.graph.links();
    const selection = this.g
      .selectAll<SVGElement, LayoutedLink>('path')
      .data<LayoutedLink>(
        links,
        (l) => l.source.data.data.id + l.target.data.data.id
      );
    // entering links transition from old clicked node position to final position
    selection
      .enter()
      .append('path')
      .attr('d', (link) => {
        const transitionStart = clickedNodeOld ?? link.source;
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
      .attr('class', 'link');
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
        const transitionEnd = clickedNodeNew ?? link.target;
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

  private sortDomElements() {
    // will sort elements of this.g based on their tag name
    // --> ensures that nodes (g) are drawn on top of links (link)
    const nodes_and_links = this.g
      .selectChildren<SVGElement, any>()
      .nodes()
      .sort((a, b) => descending(a.tagName, b.tagName));
    nodes_and_links.forEach((el) => el.parentNode!.appendChild(el));
  }

  render(
    layoutResult: LayoutResult,
    clickedNodeOld?: LayoutedNode,
    clickedNodeNew?: LayoutedNode
  ) {
    // adapt svg element size
    const svgWidth = Math.max(
      this.svg.node()!.clientWidth,
      layoutResult.width * 1.05
    );
    const svgHeight = Math.max(
      this.svg.node()!.clientHeight,
      layoutResult.height * 1.05
    );
    this.svg.attr('width', svgWidth).attr('height', svgHeight);
    // add / update / remove links and nodes
    const linkSelect = this.renderLinks(
      layoutResult,
      clickedNodeOld,
      clickedNodeNew
    );
    const nodeSelect = this.renderNodes(
      layoutResult.graph,
      clickedNodeOld,
      clickedNodeNew
    );
    // ensure that nodes are drawn on top of links
    this.sortDomElements();
    // add tooltips and node labels
    this.setupTooltips(nodeSelect);
    this.renderLabels(nodeSelect, 'node-label', 14, 13, 'central');
  }

  clear() {
    this.g.selectAll('*').remove();
  }
}
