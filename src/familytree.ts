import {
  D3DAGLayoutCalculator,
  type D3DAGLayoutCalculatorOptions,
} from './layout/d3-dag';
import { FamilyTreeDataImporter } from './import/familyTreeData';
import type { FamilyTreeData, NodeID } from './familyTreeData';
import { D3Renderer } from './render/d3';
import { ClickableNode } from './graph/clickableNode';
import { LayoutCalculator, type LayoutedNode } from './layout/types';
import type { Renderer } from './render/types';
import type { Importer } from './import/types';
import type { GraphBuilder } from './graph/types';
import { D3DAGGraphBuilder } from './graph/d3-dag';

export class FamilyTree {
  private nodes: ClickableNode[];
  private root: ClickableNode;

  private importer: Importer;
  private graphBuilder: GraphBuilder;
  private layouter: LayoutCalculator;
  private renderer: Renderer;

  constructor(
    data: FamilyTreeData,
    container: HTMLElement,
    layoutOptions?: D3DAGLayoutCalculatorOptions
  ) {
    this.importer = new FamilyTreeDataImporter();
    this.graphBuilder = new D3DAGGraphBuilder();
    this.layouter = new D3DAGLayoutCalculator();
    this.renderer = new D3Renderer(container, this);

    // import data
    const nodeData = this.importer.import(data);

    // link nodes to create a graph
    this.nodes = this.graphBuilder.buildGraph(nodeData);
    this.root = this.getNodeById(data.start);

    // render
    this.renderVisibleSubgraph(undefined, layoutOptions);
  }

  private getVisibleSubgraph() {
    function recursiveVisibleNeighborCollector(
      node: ClickableNode,
      res: ClickableNode[]
    ) {
      const foundIDs = res.map((n) => n.data.id);
      const newVisibleNeighbors = node.visibleNeighbors
        .filter((n) => !foundIDs.includes(n.data.id));
      res = res.concat(newVisibleNeighbors);
      newVisibleNeighbors.forEach(
        (n) => (res = recursiveVisibleNeighborCollector(n, res))
      );
      return res;
    }
    // get visible nodes
    const visibleNodeData = recursiveVisibleNeighborCollector(this.root, [
      this.root,
    ]).map((n) => {
      // return a shallow copy because data is manipulated in the next step
      return { ...n.data };
    });
    // remove parent references to invisible nodes
    const visibleNodeIds = visibleNodeData.map((d) => d.id);
    visibleNodeData.forEach((d) => {
      d.parentIds = d.parentIds.filter((pId) => visibleNodeIds.includes(pId));
    });
    return visibleNodeData;
  }

  public renderVisibleSubgraph(
    clickedNodeOld?: LayoutedNode,
    layoutOptions?: D3DAGLayoutCalculatorOptions
  ) {
    const visibleNodeData = this.getVisibleSubgraph();
    const layoutResult = this.layouter.calculateLayout(
      visibleNodeData,
      layoutOptions
    );
    // get the new position of the clicked node for transitions
    const clickedNodeNew = [...layoutResult.graph.nodes()].find(
      (n) => n.data.id === clickedNodeOld?.data.id
    );
    this.renderer.render(layoutResult, clickedNodeOld, clickedNodeNew);
  }

  public getNodeById(id: NodeID): ClickableNode {
    const result = this.nodes.filter((n) => n.data.id === id);
    if (result.length > 1) {
      throw Error('More than one node found with with id ' + id);
    } else if (result.length == 0) {
      throw Error('No node found with id ' + id);
    }
    return result[0];
  }

  public nodeClickHandler(node: LayoutedNode) {
    const clickableNode = this.getNodeById(node.data.id);
    clickableNode.click();
    this.renderVisibleSubgraph(node);
  }
}
