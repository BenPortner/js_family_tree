import * as d3 from 'd3';
import type { D3DAGAdapter, Link, Node } from './dag';

export class D3Renderer {
  public svg;
  public g;
  public dag: D3DAGAdapter;
  private _tooltipDiv;
  private _orientation: 'vertical' | 'horizontal';

  public linkPathFunction;
  public nodeTooltipFunction;
  public nodeSizeFunction;
  public nodeCSSClassFunction;

  constructor(dag: D3DAGAdapter, container: HTMLElement) {
    this.dag = dag;
    this._orientation = 'vertical'; // default orientation

    // set container class
    d3.select(container).attr('class', 'svg-container');

    // create svg element in container
    this.svg = d3
      .select(container)
      .append('svg')
      .attr('width', dag.width)
      .attr('height', dag.height);

    // create group element in svg
    this.g = this.svg.append('g').attr('transform', 'translate(0, 0)');

    // initialize tooltips
    this._tooltipDiv = d3
      .select(container)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('visibility', 'hidden');
    this.nodeTooltipFunction = D3Renderer.defaultNodeTooltipFunction;

    this.linkPathFunction = D3Renderer.defaultLinkPathFunction;
    this.nodeSizeFunction = D3Renderer.defaultNodeSizeFunction;
    this.nodeCSSClassFunction = D3Renderer.defaultNodeCSSClassFunction;
  }

  private static defaultLinkPathFunction(
    link: Link,
    orientation: 'vertical' | 'horizontal'
  ) {
    function vertical_s_bend(s: Node, d: Node) {
      // Creates a diagonal curve fit for vertically oriented trees
      return `M ${s.x} ${s.y} 
        C ${s.x} ${(s.y + d.y) / 2},
        ${d.x} ${(s.y + d.y) / 2},
        ${d.x} ${d.y}`;
    }

    function horizontal_s_bend(s: Node, d: Node) {
      // Creates a diagonal curve fit for horizontally oriented trees
      return `M ${s.x} ${s.y}
        C ${(s.x + d.x) / 2} ${s.y},
          ${(s.x + d.x) / 2} ${d.y},
          ${d.x} ${d.y}`;
    }
    const s = link.source;
    const d = link.target;
    return orientation == 'vertical'
      ? vertical_s_bend(s, d)
      : horizontal_s_bend(s, d);
  }

  private static defaultNodeTooltipFunction(node: Node) {
    if (node.data.type == 'union') return;
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
    return content.replace(/undefined/g, '?');
  }

  private static defaultNodeSizeFunction(node: Node) {
    if (node.data.type == 'union') return 0;
    if (node.data.type == 'person') return 10;
    return 0;
  }

  private static defaultNodeCSSClassFunction(node: Node) {
    return node.data.type;
  }

  private renderNodes() {
    const nodes = this.dag.graph.nodes();
    return this.g
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', this.nodeSizeFunction)
      .attr('class', this.nodeCSSClassFunction);
  }

  private renderLinks() {
    const links = this.dag.graph.links();
    return this.g
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d', (link) => {
        return this.linkPathFunction(link, this._orientation);
      })
      .attr('class', 'link');
  }

  private setupTooltips(
    nodeSelect: d3.Selection<SVGCircleElement, Node, SVGGElement, unknown>
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

  render() {
    // render links first so that they are behind the nodes
    const linkSelect = this.renderLinks();
    const nodeSelect = this.renderNodes();
    this.setupTooltips(nodeSelect);
  }
}
