import {
  D3DAGLayoutCalculator,
  type D3DAGLayoutCalculatorOptions,
} from './layout/d3-dag';
import { FamilyTreeDataV1Importer } from './import/familyTreeData';
import type { FamilyTreeData } from './familyTreeData';
import { D3Renderer } from './render/d3';
import { ClickableNode } from './clickableNode';
import { LayoutCalculator, type LayoutedNode } from './layout/types';
import type { Renderer } from './render/types';
import type { Importer } from './import/types';

export class FamilyTree {
  private nodes: ClickableNode[];
  private root: ClickableNode;

  private importer: Importer;
  private layouter: LayoutCalculator;
  private renderer: Renderer;

  constructor(
    data: FamilyTreeData,
    container: HTMLElement,
    layoutOptions?: D3DAGLayoutCalculatorOptions
  ) {
    this.importer = new FamilyTreeDataV1Importer();
    this.layouter = new D3DAGLayoutCalculator();
    this.renderer = new D3Renderer(container, this);

    // import data
    this.nodes = this.importer.import(data);
    this.root =
      this.nodes.find((n) => n.data.id == data.start) ?? this.nodes[0];

    // render
    this.renderVisibleSubgraph(undefined, layoutOptions);
  }

  private getVisibleSubgraph() {
    function recursiveVisibleNeighborCollector(
      node: ClickableNode,
      res: ClickableNode[]
    ) {
      const foundIDs = res.map((n) => n.data.id);
      const newVisibleNeighbors = node.visibleNeighbors.filter(
        (n) => !foundIDs.includes(n.data.id)
      );
      res = res.concat(newVisibleNeighbors);
      newVisibleNeighbors.forEach(
        (n) => (res = recursiveVisibleNeighborCollector(n, res))
      );
      return res;
    }
    // get visible nodes
    const visibleNodeData = recursiveVisibleNeighborCollector(this.root, [
      this.root,
    ]);
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
      (n) => n.data.data.id === clickedNodeOld?.data.data.id
    );
    this.renderer.render(layoutResult, clickedNodeOld, clickedNodeNew);
  }

  public nodeClickHandler(node: LayoutedNode) {
    node.data.click();
    this.renderVisibleSubgraph(node);
  }
}
