import { D3DAGLayoutCalculator } from './layout/d3-dag';
import { FamilyTreeDataV1Importer } from './import/familyTreeData';
import type { FamilyTreeData } from './familyTreeData';
import { D3Renderer } from './render/d3';
import type { ClickableNode } from './clickableNode';
import type { LayoutCalculator, LayoutedNode } from './layout/types';
import type { Renderer } from './render/types';
import type { Importer } from './import/types';

export class FamilyTree {
  private nodes: ClickableNode[];
  public readonly root: ClickableNode;

  public importer: Importer;
  public layouter: LayoutCalculator;
  public renderer: Renderer;

  constructor(
    data: FamilyTreeData,
    container: HTMLElement,
    importer?: Importer,
    layouter?: LayoutCalculator,
    renderer?: Renderer
  ) {
    this.importer = importer ?? new FamilyTreeDataV1Importer();
    this.layouter = layouter ?? new D3DAGLayoutCalculator();
    container = renderer ? renderer.container : container;
    this.renderer = renderer ?? new D3Renderer(container, this);

    // import data
    this.nodes = this.importer.import(data);
    this.root =
      this.nodes.find((n) => n.data.id == data.start) ?? this.nodes[0];

    // render
    this.renderVisibleSubgraph(undefined);
  }

  private getVisibleSubgraph() {
    function recursiveVisibleNeighborCollector(
      node: ClickableNode,
      result: ClickableNode[] = []
    ) {
      if (!result.includes(node)) {
        result = result.concat([node]);
      }
      const newVisibleNeighbors = node.visibleNeighbors.filter(
        (n) => !result.includes(n)
      );
      for (let n of newVisibleNeighbors) {
        result = recursiveVisibleNeighborCollector(n, result);
      }
      return result;
    }
    return recursiveVisibleNeighborCollector(this.root);
  }

  public renderVisibleSubgraph(nodeOld?: LayoutedNode) {
    const visibleNodes = this.getVisibleSubgraph();
    const layoutResult = this.layouter.calculateLayout(visibleNodes);
    // get the new position of the clicked node for transitions
    const nodeNew = [...layoutResult.graph.nodes()].find(
      (n) => n.data === nodeOld?.data
    );
    this.renderer.render(layoutResult, nodeOld, nodeNew);
  }

  public nodeClickHandler(node: LayoutedNode) {
    node.data.click();
    this.renderVisibleSubgraph(node);
  }
}
