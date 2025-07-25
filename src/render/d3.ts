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
import { PersonType, UnionType } from '../import/types';

export class D3Renderer implements Renderer {
  private svg;
  private g;
  private _tooltipDiv;
  private ft;

  public nodeLabelFunction;
  public linkPathFunction;
  public nodeTooltipFunction;
  public nodeSizeFunction;
  public nodeCSSClassFunction;

  constructor(container: HTMLElement, ft: FamilyTree) {
    this.ft = ft;

    // set container class
    select(container).attr('class', 'svg-container');

    // create svg element in container
    this.svg = select(container).append('svg');

    // create group element in svg
    this.g = this.svg.append('g').attr('transform', 'translate(0, 0)');

    // initialize tooltips
    this._tooltipDiv = select(container)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('visibility', 'hidden');
    this.nodeTooltipFunction = D3Renderer.defaultNodeTooltipFunction;

    this.linkPathFunction = D3Renderer.defaultLinkPathFunction;
    this.nodeLabelFunction = D3Renderer.defaultNodeLabelFunction;
    this.nodeSizeFunction = D3Renderer.defaultNodeSizeFunction;
    this.nodeCSSClassFunction = this.defaultNodeCSSClassFunction;
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

  private static defaultNodeLabelFunction(
    node: LayoutedNode,
    missingData: string = '?'
  ) {
    if (node.data.type == UnionType) return [];
    const { name, birthyear, deathyear } = node.data;
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
    if (node.data.type == UnionType) return;
    const content = `
      <span style='margin-left: 2.5px;'>
        <b>${node.data.name}</b>
      </span><br>
      <table style="margin-top: 2.5px;">
        <tr>
          <td>born</td>
          <td>${node.data.birthyear} in ${node.data.birthplace}</td>
        </tr>
        <tr>
          <td>died</td>
          <td>${node.data.deathyear} in ${node.data.deathplace}</td>
        </tr>
      </table>`;
    // replace undefined entries with ?
    return content.replace(/undefined/g, missingData);
  }

  private static defaultNodeSizeFunction(node: LayoutedNode) {
    if (node.data.type == UnionType) return 0;
    if (node.data.type == PersonType) return 10;
    return 0;
  }

  private defaultNodeCSSClassFunction(node: LayoutedNode) {
    const clickableNode = this.ft.getNodeById(node.data.id);
    const class1 = clickableNode.extendable ? 'extendable' : 'non-extendable';
    const class2 = node.data.type;
    return class1 + ' ' + class2;
  }

  private renderNodes(graph: LayoutedGraph) {
    const nodes = graph.nodes();
    const selection = this.g
      .selectAll<SVGGElement, LayoutedNode>('g')
      .data<LayoutedNode>(nodes, (n) => n.data.id);
    const enteringGroups = selection
      .enter()
      .append('g')
      .attr('class', 'node-group')
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
    enteringGroups
      .append('circle')
      .attr('r', this.nodeSizeFunction)
      .attr('class', (d) => this.nodeCSSClassFunction(d))
      .on('click', (event, d) => this.ft.nodeClickHandler(d));
    // remove hidden nodes
    selection.exit().remove();
    // update existing nodes
    selection
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
      .select('circle')
      .attr('class', (d) => this.nodeCSSClassFunction(d));
    return enteringGroups;
  }

  private renderLinks(layoutResult: LayoutResult) {
    const links = layoutResult.graph.links();
    return this.g
      .selectAll<SVGElement, LayoutedLink>('path')
      .data<LayoutedLink>(links, (l) => l.source.data.id + l.target.data.id)
      .join('path')
      .attr('d', (link) => {
        return this.linkPathFunction(link, layoutResult.orientation);
      })
      .attr('class', 'link');
  }

  private setupTooltips(
    nodeSelect: Selection<SVGGElement, LayoutedNode, SVGGElement, unknown>
  ) {
    const tooltip_div = this._tooltipDiv;
    const tooltip_func = this.nodeTooltipFunction;
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
    const nodeLabelFunction = this.nodeLabelFunction;
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

  render(layoutResult: LayoutResult) {
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
    const linkSelect = this.renderLinks(layoutResult);
    const nodeSelect = this.renderNodes(layoutResult.graph);
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
